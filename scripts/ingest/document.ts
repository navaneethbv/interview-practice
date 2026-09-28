/**
 * Imports a PDF or HTML document as System Design practice pages (content/system-design/*.json).
 *
 * Each page has a prompt (shown first) and a reference design (hidden until revealed). The split
 * happens at the first heading that looks like the solution ("High-level design", "Architecture",
 * ...) or at the heading given with --split.
 *
 * Usage:
 *   npm run ingest:doc -- <file.pdf|file.html> [--title "Design X"] [--split "Step 2"] [--prefix ID] [--chapters|--lessons] [--out dir]
 *
 *   --chapters  split a whole book into one page per top-level heading (chapter)
 *   --lessons   split an advanced PDF at its page-level lesson headings
 *   --out       write somewhere other than content/system-design (useful for a dry run)
 */
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import type { Block } from "../../src/lib/content-types";

interface Args {
  file: string;
  title?: string;
  split?: string;
  prefix?: string;
  chapters: boolean;
  lessons: boolean;
  out: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { file: "", chapters: false, lessons: false, out: path.join(process.cwd(), "content/system-design") };
  // Keep in sync with DEFAULT_OUT below.
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--title") args.title = argv[++i];
    else if (a === "--split") args.split = argv[++i];
    else if (a === "--prefix") args.prefix = argv[++i];
    else if (a === "--chapters") args.chapters = true;
    else if (a === "--lessons") args.lessons = true;
    else if (a === "--out") args.out = resolveOutputDirectory(argv[++i]);
    else args.file = a;
  }
  if (!args.file || !fs.existsSync(args.file)) {
    console.error("Usage: npm run ingest:doc -- <file.pdf|file.html> [--title T] [--split HEADING] [--prefix ID] [--chapters|--lessons]");
    process.exit(1);
  }
  return args;
}

const ARGS = parseArgs(process.argv.slice(2));
const ASSET_URL = "/course-assets/system-design";
const DEFAULT_OUT = path.join(process.cwd(), "content/system-design");
// A dry run (--out elsewhere) keeps extracted images next to the output instead of in public/.
const ASSET_DIR =
  ARGS.out === DEFAULT_OUT ? path.join(process.cwd(), "public", ASSET_URL) : path.join(ARGS.out, "assets");

function slugify(s: string) {
  return s
    .toLowerCase()
    .replaceAll("'", "")
    .replaceAll("’", "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(s: string) {
  return escapeHtml(s).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function isWithin(parent: string, child: string) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function resolveOutputDirectory(candidate: string) {
  const resolved = path.resolve(candidate); // NOSONAR -- the explicit allowlist below bounds the CLI output path
  const allowedRoots = [path.resolve(process.cwd()), path.resolve(os.tmpdir())];
  if (!allowedRoots.some((root) => isWithin(root, resolved))) {
    throw new Error(`Output directory must be inside the project or the system temporary directory: ${candidate}`);
  }
  return resolved;
}

function readTempAsset(tempDir: string, candidate: string) {
  const resolvedTempDir = path.resolve(tempDir); // NOSONAR -- tempDir is created by this importer
  const resolvedCandidate = path.resolve(candidate); // NOSONAR -- candidate is checked against tempDir below
  if (!isWithin(resolvedTempDir, resolvedCandidate)) {
    throw new Error("Generated asset escaped the import temporary directory");
  }
  return fs.readFileSync(resolvedCandidate); // NOSONAR nosemgrep -- candidate is constrained to this run's private temporary directory
}

function resolveWithin(parent: string, child: string) {
  const resolvedParent = path.resolve(parent); // NOSONAR -- parent is an importer-owned output directory
  const resolvedChild = path.resolve(resolvedParent, child); // NOSONAR -- the containment check below bounds the path
  if (!isWithin(resolvedParent, resolvedChild)) throw new Error("Generated output escaped its trusted directory");
  return resolvedChild;
}

function saveAsset(buf: Buffer, ext: string): string {
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 16);
  fs.mkdirSync(ASSET_DIR, { recursive: true }); // NOSONAR nosemgrep -- ASSET_DIR is importer-owned output under the repository or the validated dry-run directory
  fs.writeFileSync(resolveWithin(ASSET_DIR, `${hash}.${ext}`), buf); // NOSONAR nosemgrep -- the generated asset name is bounded to ASSET_DIR
  return `${ASSET_URL}/${hash}.${ext}`;
}

/* ---------------------------------------------------------------- sections */

/** A flat document: headings and content in reading order. */
type Node =
  | { kind: "heading"; level: number; text: string; page?: number; top?: number }
  | { kind: "block"; block: Block };

interface Article {
  title: string;
  nodes: Node[];
}

const SOLUTION_HEADING_PREFIXES = [
  "high-level design",
  "high level design",
  "architecture",
  "detailed design",
  "design deep dive",
  "deep dive",
  "solution",
  "component design",
  "database design",
  "database schema",
  "data model",
  "step 2",
  "step 3",
  "propose",
];

const NUMBERED_SECTION_PREFIXES = [
  "requirements",
  "capacity",
  "system api",
  "system apis",
  "system interface",
  "database",
  "high-level",
  "high level",
  "detailed",
  "component",
  "basic system",
  "data partition",
  "cache",
  "load balanc",
  "purging",
  "telemetry",
  "security",
  "fault",
  "replication",
  "ranking",
  "concurrency",
  "design considerations",
  "some design",
];

function hasWordPrefix(text: string, prefixes: string[]) {
  const normalized = text.trim().toLowerCase();
  return prefixes.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix} `) || normalized.startsWith(`${prefix}:`));
}

function isSolutionHeading(text: string) {
  return hasWordPrefix(text, SOLUTION_HEADING_PREFIXES);
}

function isNumberedSectionHeading(text: string) {
  const match = /^\d{1,2}[.)]\s+/.exec(text);
  return match ? hasWordPrefix(text.slice(match[0].length), NUMBERED_SECTION_PREFIXES) : false;
}

function normalizePdfText(text: string) {
  return text
    .replaceAll("\uFFFD", "")
    .replaceAll("ﬁ", "fi")
    .replaceAll("ﬂ", "fl")
    .replace(/\bCon\s+ict/gi, "Conflict")
    .replace(/\bwork\s+ow(s?)\b/gi, "workflow$1")
    .replace(/\bre\s+nements\b/gi, "refinements")
    .replace(/\blesystem\b/g, "filesystem");
}

function nodesToBlocks(nodes: Node[]): Block[] {
  const blocks: Block[] = [];
  let html = "";
  const flush = () => {
    if (html.trim()) blocks.push({ t: "html", html });
    html = "";
  };
  for (const n of nodes) {
    if (n.kind === "heading") html += `<h${n.level}>${escapeHtml(n.text)}</h${n.level}>`;
    else if (n.block.t === "html") html += n.block.html;
    else {
      flush();
      blocks.push(n.block);
    }
  }
  flush();
  return blocks;
}

function toArticleJson(a: Article, split?: string) {
  const idx = a.nodes.findIndex(
    (n, i) =>
      i > 0 &&
      n.kind === "heading" &&
      (split ? n.text.toLowerCase().includes(split.toLowerCase()) : isSolutionHeading(n.text)),
  );
  const promptNodes = idx === -1 ? a.nodes : a.nodes.slice(0, idx);
  const referenceNodes = idx === -1 ? [] : a.nodes.slice(idx);
  const firstText = a.nodes.find((n) => n.kind === "block" && n.block.t === "html");
  const summary =
    firstText?.kind === "block" && firstText.block.t === "html"
      ? cheerio.load(firstText.block.html).text().replace(/\s+/g, " ").trim().slice(0, 220)
      : undefined;
  return {
    id: slugify(a.title),
    title: a.title,
    summary,
    source: path.basename(ARGS.file),
    prompt: nodesToBlocks(promptNodes),
    reference: nodesToBlocks(referenceNodes),
  };
}

/* ---------------------------------------------------------------- HTML */

const ALLOWED = new Set([
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "pre", "code", "b", "strong", "i", "em",
  "a", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "br", "hr", "sup", "sub",
]);

function resolveImage(src: string, baseDir: string): string | null {
  const data = /^data:image\/(png|jpe?g|gif|webp);base64,([\s\S]*)$/i.exec(src);
  if (data) {
    const ext = data[1].toLowerCase().replace("jpeg", "jpg");
    return saveAsset(Buffer.from(data[2], "base64"), ext);
  }
  if (/^https:\/\//i.test(src)) return src;
  if (!src) return null;
  let local: string;
  try {
    const base = fs.realpathSync(baseDir); // nosemgrep -- resolved path is checked against the source directory
    local = fs.realpathSync(path.resolve(base, decodeURIComponent(src.split(/[?#]/)[0]))); // nosemgrep -- resolved path is checked against the source directory
    if (!isWithin(base, local) || !fs.statSync(local).isFile()) return null; // nosemgrep -- resolved path is checked against the source directory
  } catch {
    return null;
  }
  const ext = path.extname(local).slice(1).toLowerCase() || "png";
  if (!["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return null;
  return saveAsset(fs.readFileSync(local), ext);
}

/** Rebuilds HTML from an allowlist of tags; drops every attribute except safe links and images. */
function sanitize($: cheerio.CheerioAPI, el: Element, baseDir: string): string {
  let out = "";
  $(el)
    .contents()
    .each((_, child) => {
      if (child.type === "text") {
        out += escapeHtml((child as unknown as { data: string }).data);
        return;
      }
      if (child.type !== "tag") return;
      const tag = (child as Element).tagName.toLowerCase();
      if (tag === "img") {
        const url = resolveImage($(child).attr("src") ?? "", baseDir);
        if (url) out += `<img src="${escapeAttribute(url)}" alt="${escapeAttribute($(child).attr("alt") ?? "")}">`;
        return;
      }
      const inner = sanitize($, child as Element, baseDir);
      if (!ALLOWED.has(tag)) {
        out += inner;
        return;
      }
      let attrs = "";
      if (tag === "a") {
        const href = $(child).attr("href") ?? "";
        if (/^https?:\/\//i.test(href)) attrs = ` href="${escapeAttribute(href)}" target="_blank" rel="noreferrer"`;
      }
      out += `<${tag}${attrs}>${inner}</${tag}>`;
    });
  return out;
}

function importHtml(file: string): Article[] {
  const $ = cheerio.load(fs.readFileSync(file, "utf8"));
  $("script,style,noscript,nav,header,footer,aside,form,button,iframe").remove();
  const root = ($("article").first()[0] ?? $("main").first()[0] ?? $("body")[0]) as Element;
  const title =
    ARGS.title ?? ($("h1").first().text().trim() || $("title").text().trim() || path.basename(file, path.extname(file)));
  const nodes: Node[] = [];
  const baseDir = path.dirname(file);

  const walk = (el: Element) => {
    $(el)
      .children()
      .each((_, c) => {
        const tag = (c as Element).tagName.toLowerCase();
        const m = tag.match(/^h([1-6])$/);
        if (m) {
          const text = $(c).text().replace(/\s+/g, " ").trim();
          if (text) nodes.push({ kind: "heading", level: Math.min(4, Math.max(2, Number(m[1]))), text });
        } else if (["div", "section", "main", "article", "span"].includes(tag) && $(c).children().length) {
          walk(c as Element);
        } else if (tag === "img" || tag === "figure") {
          const img = tag === "img" ? $(c) : $(c).find("img").first();
          const url = resolveImage(img.attr("src") ?? "", baseDir);
          if (url) nodes.push({ kind: "block", block: { t: "img", src: url, w: 720, h: 400, alt: img.attr("alt") } });
          const caption = $(c).find("figcaption").text().trim();
          if (caption) nodes.push({ kind: "block", block: { t: "html", html: `<p><em>${escapeHtml(caption)}</em></p>` } });
        } else if (tag !== "br") {
          const html = sanitize($, c as Element, baseDir).trim();
          if (html) {
            const wrapped = ALLOWED.has(tag) ? `<${tag}>${html}</${tag}>` : `<p>${html}</p>`;
            nodes.push({ kind: "block", block: { t: "html", html: wrapped } });
          }
        }
      });
  };
  walk(root);
  if (nodes[0]?.kind === "heading" && nodes[0].text === title) nodes.shift();
  return ARGS.chapters ? splitChapters(nodes, title) : [{ title, nodes }];
}

/* ---------------------------------------------------------------- PDF */

interface Line {
  page: number;
  top: number;
  height: number;
  size: number;
  mono: boolean;
  bold: boolean;
  text: string;
}

type Item =
  | { kind: "line"; page: number; top: number; line: Line }
  | { kind: "img"; page: number; top: number; src: string; w: number; h: number };

type ParaKind = "p" | "li" | "pre";

const BULLET = /^([•●▪◦]|[-–]\s|\d+[.)]\s)/;

/** pdftohtml emits one element per text run; join runs that sit on the same baseline into one line. */
function mergeRuns(items: Item[]) {
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    if (a.kind !== "line") continue;
    const run: Line[] = [a.line];
    let j = i + 1;
    while (j < items.length) {
      const b = items[j];
      if (b.kind !== "line" || b.page !== a.page || Math.abs(b.top - a.top) > 2) break;
      run.push(b.line);
      j++;
    }
    if (run.length === 1) continue;
    const noSpaceBefore = new Set([",", ".", ":", ";", "!", "?", ")"]);
    const text = run
      .map((l) => l.text)
      .reduce((acc, t) => (noSpaceBefore.has(t[0] ?? "") ? acc + t : `${acc} ${t}`), "")
      .trim();
    const size = Math.max(...run.map((l) => l.size));
    a.line = { ...a.line, text, size, bold: run.every((l) => l.bold), mono: run.every((l) => l.mono) };
    items.splice(i + 1, run.length - 1);
  }
}

/**
 * Advanced system-design PDFs often draw diagrams as vector shapes instead of embedded images.
 * The text extractor preserves their labels but cannot preserve the shapes, so identify pages
 * with several short architecture labels and capture those pages as a readable fallback image.
 */
function pageLooksLikeVectorDiagram(items: Item[]): boolean {
  const diagramLabels = new Set([
    "server", "client", "node", "broker", "leader", "follower", "replica", "partition", "database", "cache",
    "queue", "consumer", "producer", "master", "worker", "request", "response", "key", "value",
  ]);
  const lines = items
    .filter((item): item is Extract<Item, { kind: "line" }> => item.kind === "line")
    .map((item) => item.line);
  if (lines.length < 8) return false;
  const labels = lines.filter(
    (line) =>
      line.text.length <= 42 &&
      line.text.toLowerCase().split(/[^a-z]+/).some((word) => diagramLabels.has(word)),
  );
  const paragraphs = lines.filter((line) => line.text.length >= 100);
  return labels.length >= 3 && labels.length >= paragraphs.length && paragraphs.length <= 4;
}

function renderPage(file: string, page: number, tmp: string): string {
  const prefix = resolveWithin(tmp, `rendered-${page}`);
  execFileSync("pdftoppm", ["-f", String(page), "-l", String(page), "-png", "-r", "120", "-singlefile", file, prefix], { // NOSONAR -- prefix is confined to the private importer temporary directory
    maxBuffer: 1 << 30,
  });
  return resolveWithin(tmp, `rendered-${page}.png`);
}

interface PdfItems {
  items: Item[];
  lineCounts: Map<string, number>;
  pages: number;
}

function extractPdfItems($: cheerio.CheerioAPI, tmp: string): PdfItems {
  const fonts = new Map<string, { size: number; mono: boolean }>();
  $("fontspec").each((_, f) => {
    const family = $(f).attr("family") ?? "";
    fonts.set($(f).attr("id") ?? "", { size: Number($(f).attr("size")), mono: /mono|courier|consol|code/i.test(family) });
  });
  const items: Item[] = [];
  const lineCounts = new Map<string, number>();
  const pages = $("page").length;
  $("page").each((_, p) => {
    const page = Number($(p).attr("number"));
    $(p).children().each((__, c) => {
      const tag = (c as Element).tagName;
      const top = Number($(c).attr("top"));
      if (tag === "text") {
        const font = fonts.get($(c).attr("font") ?? "") ?? { size: 10, mono: false };
        const text = normalizePdfText($(c).text().replace(/\s+/g, " ").trim());
        if (!text) return;
        const bold = $(c).find("b").text().replace(/\s+/g, " ").trim() === text;
        const line = { page, top, height: Number($(c).attr("height")), size: font.size, mono: font.mono, bold, text };
        items.push({ kind: "line", page, top, line });
        lineCounts.set(text, (lineCounts.get(text) ?? 0) + 1);
        return;
      }
      if (tag !== "image") return;
      const w = Number($(c).attr("width"));
      const h = Number($(c).attr("height"));
      const src = resolveWithin(tmp, path.basename($(c).attr("src") ?? ""));
      if (w >= 80 && h >= 40 && fs.existsSync(src)) items.push({ kind: "img", page, top, src, w, h });
    });
  });
  items.sort((a, b) => a.page - b.page || a.top - b.top);
  mergeRuns(items);
  return { items, lineCounts, pages };
}

function pdfBodySize(items: Item[]) {
  const weight = new Map<number, number>();
  for (const item of items) {
    if (item.kind === "line") weight.set(item.line.size, (weight.get(item.line.size) ?? 0) + item.line.text.length);
  }
  return [...weight.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 10;
}

function renderedDiagramPages(file: string, tmp: string, items: Item[]) {
  const pageItems = new Map<number, Item[]>();
  for (const item of items) pageItems.set(item.page, [...(pageItems.get(item.page) ?? []), item]);
  const rendered = new Map<number, string>();
  if (!ARGS.lessons) return rendered;
  for (const [page, contents] of pageItems) {
    if (contents.some((item) => item.kind === "img") || !pageLooksLikeVectorDiagram(contents)) continue;
    const pageFile = renderPage(file, page, tmp);
    if (fs.existsSync(pageFile)) rendered.set(page, saveAsset(readTempAsset(tmp, pageFile), "png"));
  }
  return rendered;
}

function paragraphHtml(kind: ParaKind, para: string[]) {
  if (kind === "pre") return `<pre><code>${escapeHtml(para.join("\n"))}</code></pre>`;
  const normalized = para.join(" ").replace(/(\w)-\s(?=[a-z])/g, "$1");
  const text = escapeHtml(normalizePdfText(normalized));
  if (kind === "li") return `<ul><li>${text.replace(/^[•●▪◦\-–]\s*/, "")}</li></ul>`;
  return `<p>${text}</p>`;
}

interface PdfRenderState {
  nodes: Node[];
  para: string[];
  paraKind: ParaKind;
  last: Line | null;
  renderedPages: Map<number, string>;
  insertedRenderedPage: Set<number>;
}

function flushParagraph(state: PdfRenderState) {
  if (!state.para.length) return;
  state.nodes.push({ kind: "block", block: { t: "html", html: paragraphHtml(state.paraKind, state.para) } });
  state.para = [];
}

function headingLevel(ratio: number) {
  if (ratio >= 1.9) return 1;
  if (ratio >= 1.45) return 2;
  return 3;
}

function isPdfHeading(line: Line, ratio: number) {
  const boldHeading = line.bold && ratio >= 1.2 && line.text.length < 100 && !/[.,;:]$/.test(line.text) && !BULLET.test(line.text);
  return (ratio >= 1.2 && line.text.length < 120) || boldHeading || isNumberedSectionHeading(line.text) || /^step\s+[2-7]\b/i.test(line.text);
}

function lineKind(line: Line): ParaKind {
  if (line.mono) return "pre";
  if (BULLET.test(line.text)) return "li";
  return "p";
}

function addPdfItem(state: PdfRenderState, item: Item, body: number, isRunningHeader: (line: Line) => boolean) {
  if (state.renderedPages.has(item.page) && !state.insertedRenderedPage.has(item.page)) {
    flushParagraph(state);
    state.nodes.push({ kind: "block", block: { t: "img", src: state.renderedPages.get(item.page)!, w: 612, h: 792, alt: `Diagram page ${item.page}` } });
    state.insertedRenderedPage.add(item.page);
  }
  if (item.kind === "img") {
    flushParagraph(state);
    state.nodes.push({ kind: "block", block: { t: "img", src: saveAsset(fs.readFileSync(item.src), "png"), w: item.w, h: item.h } });
    state.last = null;
    return;
  }
  const line = item.line;
  if (isRunningHeader(line)) return;
  const ratio = line.size / body;
  if (isPdfHeading(line, ratio)) {
    flushParagraph(state);
    const level = headingLevel(ratio);
    const previous = state.nodes[state.nodes.length - 1];
    if (previous?.kind === "heading" && previous.level === level && state.last?.page === line.page && line.top - state.last.top < line.height * 1.8) {
      previous.text += ` ${line.text}`;
    } else {
      state.nodes.push({ kind: "heading", level, text: line.text, page: line.page, top: line.top });
    }
    state.last = line;
    return;
  }
  const kind = lineKind(line);
  const gap = state.last && state.last.page === line.page ? line.top - (state.last.top + state.last.height) : Infinity;
  const sameBlock = state.para.length > 0 && kind === state.paraKind && (kind === "pre" ? gap < line.height : gap < line.height * 0.6) && !(kind === "li" && BULLET.test(line.text));
  const previousText = state.para[state.para.length - 1] ?? "";
  const acrossPage = state.para.length > 0 && kind === "p" && state.paraKind === "p" && state.last !== null && state.last.page !== line.page && !/[.:?!]$/.test(previousText);
  if (!sameBlock && !acrossPage) {
    flushParagraph(state);
    state.paraKind = kind;
  }
  state.para.push(line.text);
  state.last = line;
}

function buildPdfNodes(file: string, tmp: string, items: Item[], pages: number, lineCounts: Map<string, number>) {
  const body = pdfBodySize(items);
  const renderedPages = renderedDiagramPages(file, tmp, items);
  const state: PdfRenderState = { nodes: [], para: [], paraKind: "p", last: null, renderedPages, insertedRenderedPage: new Set() };
  const isRunningHeader = (line: Line) => /^\d+$/.test(line.text) || (pages > 4 && (lineCounts.get(line.text) ?? 0) > pages * 0.3 && line.text.length < 80);
  for (const item of items) addPdfItem(state, item, body, isRunningHeader);
  flushParagraph(state);
  return state.nodes;
}

function importPdf(file: string): Article[] {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-import-"));
  try {
    execFileSync("pdftohtml", ["-xml", "-q", "-nodrm", "-zoom", "1", "-fmt", "png", file, resolveWithin(tmp, "doc")], {
      maxBuffer: 1 << 30,
    });
    const $ = cheerio.load(fs.readFileSync(resolveWithin(tmp, "doc.xml"), "utf8"), { xml: true });
    const { items, lineCounts, pages } = extractPdfItems($, tmp);
    const nodes = buildPdfNodes(file, tmp, items, pages, lineCounts);
    const title = ARGS.title ?? path.basename(file, path.extname(file));
    if (ARGS.lessons) return splitLessons(nodes, title);
    return ARGS.chapters ? splitChapters(nodes, title) : [{ title, nodes }];
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/** Splits a book into one article per top-level heading. */
function splitChapters(nodes: Node[], fallbackTitle: string): Article[] {
  const levels = nodes.filter((n): n is Extract<Node, { kind: "heading" }> => n.kind === "heading").map((n) => n.level);
  if (!levels.length) return [{ title: fallbackTitle, nodes }];
  const top = Math.min(...levels);
  // Books usually label chapters explicitly; prefer that over font size, which diagrams can fool.
  const isChapterHeading = (text: string) => {
    const normalized = text.trim().toLowerCase();
    return ["chapter ", "part "].some((prefix) => normalized.startsWith(prefix) && /^\d+/.test(normalized.slice(prefix.length)));
  };
  const labelled = nodes.filter((n) => n.kind === "heading" && isChapterHeading(n.text)).length >= 2;
  const startsChapter = (n: Node) => n.kind === "heading" && (labelled ? isChapterHeading(n.text) : n.level === top);
  // Top-level headings that repeat (e.g. "Reference materials" in every chapter) are sections, not chapters.
  const topCounts = new Map<string, number>();
  for (const n of nodes) if (n.kind === "heading" && n.level === top) topCounts.set(n.text, (topCounts.get(n.text) ?? 0) + 1);
  const articles: Article[] = [];
  let current: Article | null = null;
  for (const n of nodes) {
    if (startsChapter(n) && n.kind === "heading" && (topCounts.get(n.text) ?? 0) > 1 && current) {
      current.nodes.push({ ...n, level: 2 });
    } else if (startsChapter(n) && n.kind === "heading") {
      current = { title: n.text, nodes: [] };
      articles.push(current);
    } else if (current) {
      // Shift remaining headings so each chapter's sections start at h2.
      current.nodes.push(n.kind === "heading" ? { ...n, level: Math.min(4, Math.max(2, n.level - top + 2)) } : n);
    }
  }
  return articles.filter((a) => a.nodes.some((n) => n.kind === "block"));
}

/**
 * The advanced guide uses one large lesson heading near the top of each page.
 * Its internal sections use the same heading levels, so page position is the stable boundary.
 */
function splitLessons(nodes: Node[], fallbackTitle: string): Article[] {
  const startsLesson = (n: Node): n is Extract<Node, { kind: "heading" }> =>
    n.kind === "heading" && n.page !== undefined && n.top !== undefined && n.top <= 90 && n.text.length > 3;
  const articles: Article[] = [];
  let current: Article | null = null;
  for (const n of nodes) {
    if (startsLesson(n)) {
      const title = n.text.endsWith(" #") ? n.text.slice(0, -2).trimEnd() : n.text;
      current = { title: normalizePdfText(title), nodes: [] };
      articles.push(current);
    } else if (current) {
      current.nodes.push(n);
    }
  }
  return articles.length ? articles.filter((a) => a.nodes.some((n) => n.kind === "block")) : [{ title: fallbackTitle, nodes }];
}

/* ---------------------------------------------------------------- main */

function main() {
  const ext = path.extname(ARGS.file).toLowerCase();
  const articles = ext === ".pdf" ? importPdf(ARGS.file) : importHtml(ARGS.file);
  fs.mkdirSync(ARGS.out, { recursive: true }); // NOSONAR nosemgrep -- ARGS.out is constrained to the project or system temporary directory
  let written = 0;
  const ids = new Map<string, number>();
  for (const a of articles) {
    const json = toArticleJson(a, ARGS.split);
    if (!json.id) continue;
    const count = ids.get(json.id) ?? 0;
    ids.set(json.id, count + 1);
    const prefixedId = ARGS.prefix ? `${slugify(ARGS.prefix)}-${json.id}` : json.id;
    const id = count === 0 ? prefixedId : `${prefixedId}-${count + 1}`;
    const outputFile = resolveWithin(ARGS.out, `${id}.json`);
    fs.writeFileSync(outputFile, JSON.stringify({ ...json, id }, null, 1)); // NOSONAR nosemgrep -- outputFile is bounded to the validated output directory
    written++;
    const refNote = json.reference.length ? `${json.reference.length} reference blocks` : "no reference split found";
    console.log(`✓ ${id} (${json.prompt.length} prompt blocks, ${refNote})`);
  }
  console.log(`\nImported ${written} page(s) into ${path.relative(process.cwd(), ARGS.out) || "."}`);
}

main();
