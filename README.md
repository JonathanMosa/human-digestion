# Human Digestion

An interactive site that teaches the five stages of human digestion, pairing a 3D model of the body with written lessons, a self-check quiz, and a chatbot that answers questions using only the site's own material.

**Live site:** https://human-digestion.vercel.app/


---

## Why I Built This

Most anatomy explanations are either a wall of text or a diagram with no explanation attached. I wanted something where the visual and the writing work together: you rotate the model, click the organ you're curious about, and read about that stage without losing your place.

The chatbot came later. Once the lesson content existed as structured data, it became a natural corpus to build retrieval on top of.

---

## Features

| Feature | Description |
|---|---|
| **3D Body Viewer** | A GLTF anatomical model rendered with React Three Fiber. Users can rotate it and click a hotspot to switch the lesson to that organ. |
| **Stage Lessons** | Five lessons: mouth, esophagus, stomach, small intestine, large intestine, each with a written explanation, a fact callout, a diagram, and cited sources. |
| **Self-Check Quiz** | One multiple-choice question per stage, with immediate right/wrong feedback. |
| **Q&A Chatbot** | Answers questions about digestion using retrieval over the site's lesson content rather than the model's general knowledge. |

---

## How the Chatbot Works

The chatbot uses retrieval-augmented generation (RAG). Instead of sending a question straight to a language model, it does this:

1. The lesson content is split into chunks and embedded ahead of time by a build script (`scripts/embed.ts`), which writes the vectors to `src/data/embeddings.json`.
2. When a question comes in, the API route sends it to Hugging Face's inference API for the same model (`all-MiniLM-L6-v2`), so the question vector lines up with the pre-computed ones.
3. It ranks every chunk by cosine similarity against the question and takes the top matches.
4. Only those passages go to Groq, with an instruction to answer from the provided context.

The result is that answers stay tied to what the site actually says. If the material doesn't cover something, the model is told to say so rather than fill the gap from memory.

**On not using a vector database:** the corpus here is five lessons. At that size, loading the vectors into memory and comparing them directly removes an entire service from the stack for no real cost. If the content grew to hundreds of documents, this would need to change.

**On embedding through an API:** the question is embedded by calling Hugging Face rather than running the model inside the route. Running it needs a native library that isn't available on Vercel, so the model runs where it's supported and the route just makes a request. The tradeoff is that the first request after an idle period waits for Hugging Face to load the model.

**On keeping the key server-side:** the Groq call lives in a Next.js route handler, so the API key stays on the server and never reaches the browser. The route also rate-limits by IP and caps request body size.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| 3D | React Three Fiber + drei, over Three.js |
| Styling | Tailwind CSS 4, custom color tokens |
| Embeddings | `all-MiniLM-L6-v2` — Hugging Face Transformers locally for the build script |
| LLM | Groq |
| Hosting | Vercel |

---

## Running Locally

Requires Node 20 or newer.

```bash
git clone https://github.com/JonathanMosa/human-digestion.git
cd human-digestion
npm install
```

Create `.env.local` in the project root (see `.env.example`):

```
GROQ_API_KEY=your_key_here
HF_API_KEY=your_key_here
```

Then:

```bash
npm run dev
```

The site runs at `http://localhost:3000`.

To regenerate embeddings after editing lesson content:

```bash
npx tsx scripts/embed.ts
```

---

## Project Structure

```
scripts/embed.ts                    builds embeddings.json from lesson content
src/data/steps.ts                   all five lessons as structured data
src/data/embeddings.json            vectors for retrieval
src/app/api/chat/route.ts           RAG endpoint: embed, rank, call Groq
src/components/3d/BodyViewer.tsx    canvas, GLTF model, hotspots
src/components/StepsSection.tsx     stage selector
src/components/SingleStepSection.tsx  lesson content for the selected stage
src/components/TestSection.tsx      per-stage quiz
src/components/ChatWidget.tsx       chat UI
```

Lesson content lives entirely in `src/data/steps.ts`. Adding a stage means adding one object there.

---

## Current Status

This is an active project. Working today:

- All five lessons with content, diagrams, and cited sources
- 3D model with rotation and hotspot navigation
- Per-stage quiz
- RAG chatbot

Planned next:

- Progress tracking so a learner can see which stages they've completed
- Multi-turn chat so follow up questions keep context
- Mobile layout

---

## Known Limitations

- The **first chat** question after a quiet period is slow (10–40s) while Hugging Face loads the embedding model.
- Rate limiting is in-memory and per serverless instance, so it resets on cold starts.
- For the chat follow up questions don't carry context yet.
- Hotspot positions on the 3D model are approximate and still being adjusted.

---
