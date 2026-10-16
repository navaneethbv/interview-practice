import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Browser traces can embed entire third-party bundles; they are generated test output.
    "test-results/**",
    "playwright-report/**",
    // Reference solutions are standalone files spliced into judge harnesses.
    "content/**",
    // Generated QuickJS vendor bundle; lint the authored worker in scripts/judge instead.
    "public/js-worker.js",
  ]),
]);

export default eslintConfig;
