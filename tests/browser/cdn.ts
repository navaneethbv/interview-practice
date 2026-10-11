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
      const root = path.resolve(process.cwd(), "node_modules/monaco-editor");
      const target = path.resolve(root, file);
      if (!target.startsWith(root + path.sep)) throw new Error("Invalid CDN asset path");
      const body = await readFile(target);
      let contentType: string | undefined;
      if (file.endsWith(".css")) contentType = "text/css";
      else if (file.endsWith(".js")) contentType = "application/javascript";
      await route.fulfill({ body, contentType });
    } catch {
      await route.continue();
    }
  });
}
