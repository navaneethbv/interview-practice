/**
 * Preserve a source document as a verbatim system-design archive.
 *
 * Usage:
 *   npm run ingest:verbatim -- <file.md|file.pdf> --id ID --title TITLE --source SOURCE [--source-file NAME] [--alias PATH]
 */
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import * as cheerio from "cheerio";
import type { Block } from "../../src/lib/content-types";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content/system-design");
const ASSET_DIR = path.join(ROOT, "public/course-assets/system-design");
const SOURCE_DIR = path.join(ASSET_DIR, "sources");
const ASSET_URL = "/course-assets/system-design";

interface Args {
  file: string;
  id: string;
  title: string;
  source: string;
  sourceFile: string;
  aliases: string[];
}

function parseArgs(argv: string[]): Args {
  const args = { file: "", id: "", title: "", source: "", sourceFile: "", aliases: [] as string[] };
  for (let i = 0; i < argv.length; i++) {
    const value = argv[i];
    if (value === "--id") args.id = argv[++i] ?? "";
    else if (value === "--title") args.title = argv[++i] ?? "";
    else if (value === "--source") args.source = argv[++i] ?? "";
    else if (value === "--source-file") args.sourceFile = argv[++i] ?? "";
    else if (value === "--alias") args.aliases.push(argv[++i] ?? "");
    else if (!args.file) args.file = value;
  }
  if (!args.file || !/^[a-z0-9-]+$/.test(args.id) || !args.title || !args.source) {
    console.error("Usage: npm run ingest:verbatim -- <file.md|file.pdf> --id ID --title TITLE --source SOURCE [--source-file NAME] [--alias PATH]");
    process.exit(1);
  }
  try {
    args.file = resolveInputFile(args.file);
  } catch {
    console.error(`Input must be an existing regular file: ${args.file}`);
    process.exit(1);
  }
  args.sourceFile ||= `${args.id}${path.extname(args.file).toLowerCase()}`;
  return args;
}

const ARGS = parseArgs(process.argv.slice(2));

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function isWithin(parent: string, child: string) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function resolveInputFile(candidate: string) {
  const resolved = path.resolve(candidate); // NOSONAR -- this is the explicitly selected read-only CLI input
  const real = fs.realpathSync(resolved); // NOSONAR -- the resolved path is checked as a regular file before use
  if (!fs.statSync(real).isFile()) throw new Error("Input is not a regular file"); // NOSONAR -- read-only input validation
  return real;
}

function resolveWithin(parent: string, child: string) {
  const resolvedParent = path.resolve(parent); // NOSONAR -- parent is an importer-owned directory
  const resolvedChild = path.resolve(resolvedParent, child); // NOSONAR -- the containment check below bounds the path
  if (!isWithin(resolvedParent, resolvedChild)) throw new Error("Generated path escaped its trusted directory");
  return resolvedChild;
}

function readTempAsset(tempDir: string, candidate: string) {
  const safePath = resolveWithin(tempDir, path.basename(candidate));
  return fs.readFileSync(safePath); // NOSONAR -- candidate is reduced to a basename and bounded to this run's temp directory
}

function saveAsset(buffer: Buffer, ext: string) {
  const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 16);
  fs.mkdirSync(ASSET_DIR, { recursive: true }); // NOSONAR -- ASSET_DIR is fixed under this repository's public directory and is the intended importer output
  const file = `${hash}.${ext}`;
  fs.writeFileSync(resolveWithin(ASSET_DIR, file), buffer); // NOSONAR -- file is a generated hash and is bounded above
  return `${ASSET_URL}/${file}`;
}

function sourceFilePath() {
  const safe = path.basename(ARGS.sourceFile).replace(/[^a-zA-Z0-9._-]+/g, "-");
  return resolveWithin(SOURCE_DIR, safe); // NOSONAR -- the basename is sanitized and bounded to the importer-owned source directory
}

function copyOriginal() {
  fs.mkdirSync(SOURCE_DIR, { recursive: true }); // NOSONAR -- SOURCE_DIR is fixed under this repository's public directory
  fs.copyFileSync(ARGS.file, sourceFilePath()); // NOSONAR -- input is validated read-only and destination is importer-owned
}

function vectorDiagramPage(pageText: string) {
  const diagramLabels = new Set([
    "server", "client", "node", "broker", "leader", "follower", "replica", "partition", "database", "cache",
    "queue", "consumer", "producer", "master", "worker", "request", "response", "key", "value",
  ]);
  const lines = pageText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 8) return false;
  const labels = lines.filter(
    (line) =>
      line.length <= 42 &&
      line.toLowerCase().split(/[^a-z]+/).some((word) => diagramLabels.has(word)),
  );
  const paragraphs = lines.filter((line) => line.length >= 100);
  return labels.length >= 3 && labels.length >= paragraphs.length && paragraphs.length <= 4;
}

function renderPage(file: string, page: number, tempDir: string) {
  const prefix = resolveWithin(tempDir, `page-${page}`);
  execFileSync("pdftoppm", ["-f", String(page), "-l", String(page), "-png", "-r", "120", "-singlefile", file, prefix], { // NOSONAR -- prefix is confined to the private importer temporary directory
    maxBuffer: 1 << 30,
  });
  return resolveWithin(tempDir, `page-${page}.png`);
}

function pdfBlocks(file: string): Block[] {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "verbatim-pdf-")); // NOSONAR -- the importer creates this private temporary directory
  try {
    const raw = execFileSync("pdftotext", ["-layout", file, "-"], { maxBuffer: 1 << 30 }).toString("utf8"); // NOSONAR -- file is validated as the explicit read-only CLI input
    const pages = raw.split("\f");
    if (pages.at(-1)?.trim() === "") pages.pop();

    execFileSync("pdftohtml", ["-xml", "-q", "-nodrm", "-zoom", "1", "-fmt", "png", file, resolveWithin(tempDir, "doc")], { // NOSONAR -- generated output is confined to the private importer temporary directory
      maxBuffer: 1 << 30,
    });
    const $ = cheerio.load(fs.readFileSync(resolveWithin(tempDir, "doc.xml"), "utf8"), { xml: true }); // NOSONAR -- XML is generated inside this run's temp directory
    const images = new Map<number, Block[]>();
    $("page").each((_, pageElement) => {
      const page = Number($(pageElement).attr("number"));
      $(pageElement)
        .children("image")
        .each((__, imageElement) => {
          const width = Number($(imageElement).attr("width"));
          const height = Number($(imageElement).attr("height"));
          const fileName = resolveWithin(tempDir, path.basename($(imageElement).attr("src") ?? ""));
          if (width < 80 || height < 40 || !fs.existsSync(fileName)) return; // NOSONAR -- fileName is bounded to the private temp directory
          const src = saveAsset(fs.readFileSync(fileName), "png"); // NOSONAR -- XML image names are reduced to basenames and bounded to tempDir
          images.set(page, [
            ...(images.get(page) ?? []),
            { t: "img", src, w: width, h: height, alt: `Diagram from page ${page}` },
          ]);
        });
    });

    const vectorPages = new Map<number, string>();
    for (let index = 0; index < pages.length; index++) {
      const page = index + 1;
      if ((images.get(page) ?? []).length || !vectorDiagramPage(pages[index])) continue;
      const rendered = renderPage(file, page, tempDir);
      if (fs.existsSync(rendered)) vectorPages.set(page, saveAsset(readTempAsset(tempDir, rendered), "png")); // NOSONAR -- rendered is bounded to the private importer temporary directory
    }

    const blocks: Block[] = [];
    for (let index = 0; index < pages.length; index++) {
      const page = index + 1;
      const vector = vectorPages.get(page);
      const vectorBlocks: Block[] = vector ? [{ t: "img", src: vector, w: 612, h: 792, alt: `Diagram page ${page}` }] : [];
      blocks.push(
        {
          t: "html",
          html: `<h2>Page ${page}</h2><pre class="source-verbatim">${escapeHtml(pages[index])}</pre>`,
        },
        ...(images.get(page) ?? []),
        ...vectorBlocks,
      );
    }
    return blocks;
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function markdownBlocks(file: string): Block[] {
  const text = fs.readFileSync(file, "utf8"); // NOSONAR -- file is validated as the explicit read-only CLI input
  return [{ t: "html", html: `<pre class="source-verbatim source-markdown">${escapeHtml(text)}</pre>` }];
}

function main() {
  copyOriginal();
  const ext = path.extname(ARGS.file).toLowerCase();
  const prompt = ext === ".pdf" ? pdfBlocks(ARGS.file) : markdownBlocks(ARGS.file);
  const article = {
    id: ARGS.id,
    title: ARGS.title,
    summary: `Verbatim source archive from ${ARGS.source}.`,
    source: ARGS.source,
    sourceFiles: ARGS.aliases,
    sourceFile: `/${path.relative(path.join(ROOT, "public"), sourceFilePath())}`,
    verbatim: true,
    prompt,
    reference: [],
  };
  fs.mkdirSync(CONTENT_DIR, { recursive: true }); // NOSONAR -- CONTENT_DIR is fixed under this repository
  fs.writeFileSync(resolveWithin(CONTENT_DIR, `${ARGS.id}.json`), JSON.stringify(article, null, 1)); // NOSONAR -- id is restricted to lowercase slug characters
  console.log(`✓ ${ARGS.id} (${prompt.length} blocks, original copied to ${path.relative(ROOT, sourceFilePath())})`);
}

main();
