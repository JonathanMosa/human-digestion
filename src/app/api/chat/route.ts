// RAG endpoint. embed the question, find the closest lesson chunks by
// cosine similarity, hand those to groq as context, return the answer.

import embeddings from "@/data/embeddings.json";

export const runtime = "nodejs";
export const maxDuration = 60; // two hops (hugging face + groq), and HF is slow

// embedding

async function embedText(text: string): Promise<number[]> {
  const res = await fetch(
    "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
      },
      body: JSON.stringify({ inputs: text }),
      signal: AbortSignal.timeout(45_000),
    },
  );

  if (!res.ok) {
    throw new Error(`HF embedding failed (${res.status}): ${await res.text()}`);
  }

  const vector = (await res.json()) as number[];
  return normalize(vector);
}

// embed.ts stored unit-length vectors, normalize for the dot product.
function normalize(v: number[]): number[] {
  const length = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
  return v.map((x) => x / length);
}

// retrieval

// vectors are normalized, so the dot product is the cosine similarity.
function dotProduct(a: number[], b: number[]): number {
  let accumulator = 0;
  for (let i = 0; i < a.length; i++) {
    accumulator += a[i] * b[i];
  }
  return accumulator;
}

// score every chunk against the question, best k first. keep text on the result because askGroq needs the actual chunk content.
function retrieve(questionVector: number[], k: number) {
  const ranked = embeddings.map((e) => ({
    id: e.id,
    stepId: e.stepId,
    text: e.text,
    score: dotProduct(questionVector, e.vector as number[]),
  }));
  return ranked.sort((a, b) => b.score - a.score).slice(0, k);
}

// generation

async function askGroq(context: string, question: string): Promise<string> {
  const messages = [
    {
      role: "system",
      content:
        "Only answer from the context provided, only about human digestion, a few sentences max, and if the context doesn't contain the answer say you don't know.",
    },
    {
      role: "user",
      content: `Context:\n${context}\n\nQuestion: ${question}`,
    },
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.2,
    }),
    // give up if groq hangs, so the route doesn't hang with it.
    signal: AbortSignal.timeout(15_000),
  });

  // a bad key or dead model comes back as an error object with no choices.
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Groq request failed (${res.status}): ${detail}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

// route

// track request times per IP so one client can't hammer the endpoint.
const recentByIp = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-real-ip") ?? "local";

  // keep only this IP's hits from the last minute, add the current one, reject if that's more than 10.
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  recentByIp.set(ip, recent);
  if (recent.length > 10) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  // stop a huge body before parse it
  const bodySize = Number(request.headers.get("content-length") ?? 0);
  if (bodySize > 2000) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  // bad json is the caller's fault -> 400
  let question: unknown;
  try {
    const body = await request.json();
    question = body.question;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof question !== "string" ||
    !question.trim() ||
    question.length > 500
  ) {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }

  // anything that throws past here is my fault -> 500
  try {
    const questionVector = await embedText(question);
    const top = retrieve(questionVector, 3);
    const context = top.map((c) => c.text).join("\n\n");
    const answer = await askGroq(context, question);

    return Response.json({ answer, sources: top.map((c) => c.stepId) });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
