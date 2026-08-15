import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";

const CLIENT_PATTERN =
  /\b(createContext|use(State|Effect|LayoutEffect|Ref|Context|Memo|Callback|Id|Reducer|ImperativeHandle|InsertionEffect|DeferredValue|Transition))\b/;
  
  const files = globSync("src/**/*.{ts,tsx}");const shouldFix = process.argv.includes("--fix");

const missing = files.filter((file) => {
  const content = readFileSync(file, "utf-8");
  const usesHooks = CLIENT_PATTERN.test(content);
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
