import { steps } from "../src/data/steps";
import { pipeline } from "@huggingface/transformers";
import fs from "fs";

const chunks = steps.flatMap((step) => [
  // one entry per body
  ...step.body.map((paragraph, i) => ({
    id: `${step.id}-${i + 1}`,
    stepId: step.id,
    text: paragraph,
  })),
  // one entry for the fact callout
  {
    id: `${step.id}-fact`,
    stepId: step.id,
    text: step.factCallout,
  },
]);

async function main() {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  );

  const records = [];

  for (const chunk of chunks) {
    const output = await extractor(chunk.text, {
      pooling: "mean",
      normalize: true,
    });
    const newChunks = { ...chunk, vector: Array.from(output.data) }; // chunk + vector
    records.push(newChunks);

    console.log(chunk.id, records.length);
  }
  console.log("done:", records.length);

  fs.writeFileSync(
    "../src/data/embeddings.json",
    JSON.stringify(records, null, 2),
  );
}

main();
