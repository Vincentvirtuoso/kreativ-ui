import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const filesToPatch = [
  join(process.cwd(), "dist", "index.js"),
  join(process.cwd(), "dist", "index.cjs"),
];

const DIRECTIVE = '"use client";\n\n';

async function ensureDirective(filePath) {
  try {
    const content = await readFile(filePath, "utf-8");
    if (!content.startsWith(DIRECTIVE)) {
      const cleanContent = content.replace(/^"use client";\s*/g, "");
      await writeFile(filePath, DIRECTIVE + cleanContent);
      console.log(`✅ Added "use client" to ${filePath}`);
    } else {
      console.log(`⏩ "use client" already at top of ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Failed to process ${filePath}:`, error);
    process.exit(1);
  }
}

async function main() {
  for (const file of filesToPatch) {
    await ensureDirective(file);
  }
}

main();
