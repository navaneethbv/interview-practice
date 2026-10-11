import type { BrowserContext } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * The browser loads Monaco and the TypeScript compiler from jsdelivr. Serve them from node_modules
 * so the tests also run where the CDN is unreachable.
 */
export async function serveCdnFromNodeModules(context: BrowserContext) {
  const compiler = await readFile(path.join(process.cwd(), "node_modules/typescript/lib/typescript.js"));
  await context.route("https://cdn.jsdelivr.net/npm/typescript@*/lib/typescript.js", (route) =>
    route.fulfill({ body: compiler, contentType: "application/javascript" }),
  );
  await context.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/monaco-editor@[^/]+\/min\/(.*)$/, async (route) => {
    const file = new URL(route.request().url()).pathname.replace(/^\/npm\/monaco-editor@[^/]+\//, "");
    try {
      const body = await readFile(path.join(process.cwd(), "node_modules/monaco-editor", file));
      await route.fulfill({ body, contentType: file.endsWith(".css") ? "text/css" : file.endsWith(".js") ? "application/javascript" : undefined });
    } catch {
      await route.continue();
    }
  });
}
