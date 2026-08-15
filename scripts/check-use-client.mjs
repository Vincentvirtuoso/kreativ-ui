import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const HOOK_PATTERN =
  /\buse(State|Effect|LayoutEffect|Ref|Context|Memo|Callback|Id)\b/;
const files = globSync("src/components/**/*.{ts,tsx}");
const shouldFix = process.argv.includes("--fix");

const missing = files.filter((file) => {
  const content = readFileSync(file, "utf-8");
  const usesHooks = HOOK_PATTERN.test(content);
  const hasDirective = content.trimStart().startsWith('"use client"');
  return usesHooks && !hasDirective;
});

if (missing.length === 0) {
  console.log('All client components have "use client".');
  process.exit(0);
}

if (shouldFix) {
  for (const file of missing) {
    const content = readFileSync(file, "utf-8");
    writeFileSync(file, `"use client";\n\n${content}`);
  }
  console.log(
    `Added "use client" to ${missing.length} file(s):\n` + missing.join("\n"),
  );
  process.exit(0);
}

console.error('Missing "use client" directive:\n' + missing.join("\n"));
console.error(
  "\nRun `npm run check:use-client -- --fix` to add it automatically.",
);
process.exit(1);
