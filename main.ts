/**
 * Unplugged: A Smart Toaster's Breakup Line
 *
 * A tiny deterministic program (Node 22+, standard library only) that writes
 * one original breakup line, spoken by a smart toaster, to entry.txt inside
 * the output directory named by MAKEFUN_OUTPUT_DIR.
 *
 * The line is a fixed constant: no clock, no randomness, no network, no
 * input files. Every run writes byte-identical output.
 *
 * Run it:
 *   MAKEFUN_OUTPUT_DIR=./out node main.ts
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original breakup line from a smart toaster.
const LINE =
  "It's not you, it's the outlet — you kept me plugged in for the Wi-Fi, but you never once asked how brown I like my toast.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outputDir) {
    fail("MAKEFUN_OUTPUT_DIR is not set");
  }

  const outputPath = join(outputDir, "entry.txt");
  const content = LINE + "\n";

  // Write the entry.
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, content, "utf8");

  // Self-check: read it back and verify the format.
  const readBack = readFileSync(outputPath, "utf8");
  if (readBack !== content) {
    fail("read-back mismatch: entry.txt does not match the written content");
  }
  const lines = readBack.split("\n");
  if (lines.length !== 2 || lines[1] !== "" || lines[0].length === 0) {
    fail("format check failed: entry.txt must hold exactly one non-empty line");
  }
  if (lines[0] !== LINE) {
    fail("format check failed: entry.txt line does not match the entry");
  }

  console.log(`wrote ${outputPath} (${content.length} bytes, 1 line)`);
}

main();
