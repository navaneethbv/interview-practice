import type { BrowserContext } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * The browser loads Monaco and the TypeScript compiler from jsdelivr. Serve them from node_modules
 * so the tests also run where the CDN is unreachable.
 */
export async function serveCdnFromNodeModules(context: BrowserContext) {
  // Optional local copies of the real pinned runtime keep SQL end-to-end tests
  // usable in environments where browser traffic cannot reach the CDN.
  const pyodideAssets = process.env.PYODIDE_TEST_ASSETS;
  if (pyodideAssets) {
    await context.route(
      "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/**",
      async (route) => {
        const name = new URL(route.request().url()).pathname.split("/").at(-1)!;
        if (!/^[a-zA-Z0-9_.-]+$/.test(name)) return route.abort();
        const body = await readFile(path.join(pyodideAssets, name));
        await route.fulfill({
          body,
          contentType: name.endsWith(".js")
            ? "application/javascript"
            : name.endsWith(".wasm")
              ? "application/wasm"
              : "application/octet-stream",
        });
      },
    );
  }
  const compiler = await readFile(
    path.join(process.cwd(), "node_modules/typescript/lib/typescript.js"),
  );
  await context.route(
    "https://cdn.jsdelivr.net/npm/typescript@*/lib/typescript.js",
    (route) =>
      route.fulfill({ body: compiler, contentType: "application/javascript" }),
  );
  await context.route(
    /^https:\/\/cdn\.jsdelivr\.net\/npm\/monaco-editor@[^/]+\/min\/(.*)$/,
    async (route) => {
      const file = new URL(route.request().url()).pathname.replace(
        /^\/npm\/monaco-editor@[^/]+\//,
        "",
      );
      try {
        const root = path.resolve(process.cwd(), "node_modules/monaco-editor");
        const target = path.resolve(root, file);
        if (!target.startsWith(root + path.sep))
          throw new Error("Invalid CDN asset path");
        const body = await readFile(target);
        let contentType: string | undefined;
        if (file.endsWith(".css")) contentType = "text/css";
        else if (file.endsWith(".js")) contentType = "application/javascript";
        await route.fulfill({ body, contentType });
      } catch {
        await route.continue();
      }
    },
  );
}
