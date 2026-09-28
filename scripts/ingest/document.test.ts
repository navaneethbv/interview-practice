import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import * as cheerio from "cheerio";

const project = process.cwd();
const tsx = path.join(project, "node_modules/tsx/dist/cli.mjs");
const importer = path.join(project, "scripts/ingest/document.ts");

function importHtml(html: string, args: string[] = []) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "document-import-test-"));
  const inputDir = path.join(root, "input");
  const outputDir = path.join(root, "output");
  fs.mkdirSync(inputDir); // nosemgrep -- test fixture in a temp directory
  const input = path.join(inputDir, "source.html");
  fs.writeFileSync(input, html); // nosemgrep -- test fixture in a temp directory
  execFileSync(process.execPath, [tsx, importer, input, ...args, "--out", outputDir], { cwd: project });
  const articleFile = path.join(outputDir, fs.readdirSync(outputDir).find((file) => file.endsWith(".json"))!); // nosemgrep -- test fixture in a temp directory
  const article = JSON.parse(fs.readFileSync(articleFile, "utf8")) as { // nosemgrep -- test fixture in a temp directory
    prompt: Array<{ t: string; html?: string; src?: string }>;
  };
  return { root, inputDir, outputDir, article };
}

test("HTML attribute values cannot inject event handlers", (t) => {
  const result = importHtml(`
    <article>
      <h1>Safe import</h1>
      <p><a href='https://example.com/" onclick="alert(1)'>link</a></p>
      <p><img src='https://example.com/image.png" onerror="alert(1)' alt='" onerror="alert(1)'></p>
    </article>
  `);
  t.after(() => fs.rmSync(result.root, { recursive: true, force: true }));

  const html = result.article.prompt.map((block) => block.html ?? "").join("\n");
  const $ = cheerio.load(html);
  $("*").each((_, element) => {
    if ("attribs" in element) {
      for (const name of Object.keys(element.attribs)) assert.doesNotMatch(name, /^on/i);
    }
  });
  assert.match(html, /&quot; onerror=&quot;alert\(1\)/);
  assert.match(html, /&quot; onclick=&quot;alert\(1\)/);
});

test("local images stay inside the source folder while sibling assets still import", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "document-import-test-"));
  const inputDir = path.join(root, "input");
  const outputDir = path.join(root, "output");
  fs.mkdirSync(inputDir); // nosemgrep -- test fixture in a temp directory
  fs.writeFileSync(path.join(root, "outside.png"), "outside image bytes"); // nosemgrep -- test fixture in a temp directory
  fs.writeFileSync(path.join(inputDir, "inside.png"), "inside image bytes"); // nosemgrep -- test fixture in a temp directory
  const input = path.join(inputDir, "source.html");
  fs.writeFileSync( // nosemgrep -- test fixture in a temp directory
    input,
    '<article><h1>Images</h1><img src="../outside.png"><img src="inside.png"><img src="active.svg"></article>',
  );
  fs.writeFileSync(path.join(inputDir, "active.svg"), "<svg><script>alert(1)</script></svg>"); // nosemgrep -- test fixture in a temp directory
  execFileSync(process.execPath, [tsx, importer, input, "--out", outputDir], { cwd: project });
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  const article = JSON.parse(fs.readFileSync(path.join(outputDir, "images.json"), "utf8")) as { // nosemgrep -- test fixture in a temp directory
    prompt: Array<{ t: string; src?: string }>;
  };
  const images = article.prompt.filter((block) => block.t === "img");
  assert.equal(images.length, 1);
  assert.ok(images[0].src?.includes("/course-assets/system-design/"));
  assert.equal(fs.readdirSync(path.join(outputDir, "assets")).length, 1); // nosemgrep -- test fixture in a temp directory
});

test("HTML data URLs cannot publish active SVG content", (t) => {
  const result = importHtml(
    '<article><h1>Data image</h1><img src="data:image/svg+xml;base64,PHN2Zz48c2NyaXB0PmFsZXJ0KDEpPC9zY3JpcHQ+PC9zdmc+"></article>',
  );
  t.after(() => fs.rmSync(result.root, { recursive: true, force: true }));
  assert.equal(result.article.prompt.some((block) => block.t === "img"), false);
  assert.equal(fs.existsSync(path.join(result.outputDir, "assets")), false); // nosemgrep -- test fixture in a temp directory
});

test("a source prefix keeps imported collections addressable", (t) => {
  const result = importHtml("<article><h1>Repeated lesson</h1><p>Notes</p></article>", ["--prefix", "advanced"]);
  t.after(() => fs.rmSync(result.root, { recursive: true, force: true }));
  assert.ok(fs.existsSync(path.join(result.outputDir, "advanced-repeated-lesson.json")));
});
