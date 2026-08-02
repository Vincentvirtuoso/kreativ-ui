import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  keepNames: true,
  minify: true,
  target: "es2020",
  outDir: "dist",
  external: ["react", "react-dom", "react/jsx-runtime"],
  banner: {
    js: '"use client";',
  },
});
