import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The tide is coming in, slow as a held breath. Each wave reaches a little farther up the sand, then draws back, leaving the shore darker, glossier. Out past the breakers, the water keeps its own time — and it is in no hurry to arrive.\n";

const entryLength = [...ENTRY.replace(/\n$/, "")].length;
if (entryLength < 1 || entryLength > 280) {
  console.error(`entry must be 1-280 code points, got ${entryLength}`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");

const roundTrip = readFileSync(entryPath, "utf8");
if (roundTrip !== ENTRY) {
  console.error("entry.txt does not match the expected text");
  process.exit(1);
}

console.log(`wrote ${entryPath} (${[...ENTRY].length} code points)`);
