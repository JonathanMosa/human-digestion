import embeddings from "@/data/embeddings.json";
import { pipeline } from "@huggingface/transformers";
export const runtime = "nodejs";

let extractorPromise: Promise<any> | null = null;
function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );
  }
  return extractorPromise;
}

function dotProduct(a: number[], b: number[]): number {
  let accumulator = 0;
  for (let i = 0; i < a.length; i++) {
    accumulator += a[i] * b[i];
  }
  return accumulator;
}

export async function POST(request: Request) {
  // Read + validate input
  try {
    const { question } = await request.json();
    if (
      typeof question !== "string" ||
      !question.trim() ||
      question.length > 500
    ) {
      return Response.json({ error: "Bad Request" }, { status: 400 });
    }
    const extractor = await getExtractor();
    const output = await extractor(question, {
      pooling: "mean",
      normalize: true,
    });
    const questionVector = Array.from(output.data) as number[];

    const ranked = embeddings.map((e) => ({
      id: e.id,
      stepId: e.stepId,
      text: e.text,
      score: dotProduct(questionVector, e.vector as number[]),
    }));

    const top3 = ranked.sort((a, b) => b.score - a.score).slice(0, 3);

    

    return Response.json({ top: top3 }, { status: 200 });
  } catch {
    return Response.json({ error: "Bad Request" }, { status: 400 });
  }
}
