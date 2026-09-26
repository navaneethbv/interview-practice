/**
 * Imports a PDF or HTML document as System Design practice pages (content/system-design/*.json).
 *
 * Each page has a prompt (shown first) and a reference design (hidden until revealed). The split
 * happens at the first heading that looks like the solution ("High-level design", "Architecture",
 * ...) or at the heading given with --split.
 *
 * Usage:
 *   npm run ingest:doc -- <file.pdf|file.html> [--title "Design X"] [--split "Step 2"] [--chapters] [--out dir]
 *
 *   --chapters  split a whole book into one page per top-level heading (chapter)
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
  chapters: boolean;
  out: string;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { file: "", chapters: false, out: path.join(process.cwd(), "content/system-design") };
  // Keep in sync with DEFAULT_OUT below.
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--title") args.title = argv[++i];
    else if (a === "--split") args.split = argv[++i];
    else if (a === "--chapters") args.chapters = true;
    else if (a === "--out") args.out = path.resolve(argv[++i]);
    else args.file = a;
  }
  if (!args.file || !fs.existsSync(args.file)) {
    console.error("Usage: npm run ingest:doc -- <file.pdf|file.html> [--title T] [--split HEADING] [--chapters]");
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
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function saveAsset(buf: Buffer, ext: string): string {
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 16);
  fs.mkdirSync(ASSET_DIR, { recursive: true });
  fs.writeFileSync(path.join(ASSET_DIR, `${hash}.${ext}`), buf);
  return `${ASSET_URL}/${hash}.${ext}`;
}

/* ---------------------------------------------------------------- sections */

/** A flat document: headings and content in reading order. */
type Node = { kind: "heading"; level: number; text: string } | { kind: "block"; block: Block };

interface Article {
  title: string;
  nodes: Node[];
}

const SOLUTION_HEADING =
  /\b(high[- ]level design|architecture|detailed design|design deep dive|deep dive|solution|component design|database (design|schema)|data model|step 2|step 3|propose)\b/i;

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
      (split ? n.text.toLowerCase().includes(split.toLowerCase()) : SOLUTION_HEADING.test(n.text)),
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
  const data = src.match(/^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,([\s\S]*)$/i);
  if (data) {
    const ext = data[1].toLowerCase().replace("jpeg", "jpg").replace("svg+xml", "svg");
    return saveAsset(Buffer.from(data[2], "base64"), ext);
  }
  if (/^https:\/\//i.test(src)) return src;
  if (!src) return null;
  const local = path.resolve(baseDir, decodeURIComponent(src.split(/[?#]/)[0]));
  if (fs.existsSync(local)) {
    const ext = path.extname(local).slice(1).toLowerCase() || "png";
    return saveAsset(fs.readFileSync(local), ext);
  }
  return null;
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
        if (url) out += `<img src="${escapeHtml(url)}" alt="${escapeHtml($(child).attr("alt") ?? "")}">`;
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
        if (/^https?:\/\//i.test(href)) attrs = ` href="${escapeHtml(href)}" target="_blank" rel="noreferrer"`;
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
    const text = run
      .map((l) => l.text)
      .reduce((acc, t) => (/^[,.:;!?)]/.test(t) ? acc + t : `${acc} ${t}`))
      .trim();
    const size = Math.max(...run.map((l) => l.size));
    a.line = { ...a.line, text, size, bold: run.every((l) => l.bold), mono: run.every((l) => l.mono) };
    items.splice(i + 1, run.length - 1);
  }
}

function importPdf(file: string): Article[] {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-import-"));
  try {
    // XML output gives every text line with its font and position, plus extracted images.
    execFileSync("pdftohtml", ["-xml", "-q", "-nodrm", "-zoom", "1", "-fmt", "png", file, path.join(tmp, "doc")], {
      maxBuffer: 1 << 30,
    });
    const $ = cheerio.load(fs.readFileSync(path.join(tmp, "doc.xml"), "utf8"), { xml: true });

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
      $(p)
        .children()
        .each((__, c) => {
          const tag = (c as Element).tagName;
          const top = Number($(c).attr("top"));
          if (tag === "text") {
            const font = fonts.get($(c).attr("font") ?? "") ?? { size: 10, mono: false };
            const text = $(c).text().replace(/\s+/g, " ").trim();
            if (!text) return;
            const bold = $(c).find("b").text().replace(/\s+/g, " ").trim() === text;
            const line = { page, top, height: Number($(c).attr("height")), size: font.size, mono: font.mono, bold, text };
            items.push({ kind: "line", page, top, line });
            lineCounts.set(text, (lineCounts.get(text) ?? 0) + 1);
          } else if (tag === "image") {
            const w = Number($(c).attr("width"));
            const h = Number($(c).attr("height"));
            const src = path.join(tmp, path.basename($(c).attr("src") ?? ""));
            if (w >= 80 && h >= 40 && fs.existsSync(src)) items.push({ kind: "img", page, top, src, w, h });
          }
        });
    });
    items.sort((a, b) => a.page - b.page || a.top - b.top);
    mergeRuns(items);

    // Body size = the font size carrying the most text.
    const weight = new Map<number, number>();
    for (const it of items) if (it.kind === "line") weight.set(it.line.size, (weight.get(it.line.size) ?? 0) + it.line.text.length);
    const body = [...weight.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 10;
    const isRunningHeader = (l: Line) =>
      /^\d+$/.test(l.text) || (pages > 4 && (lineCounts.get(l.text) ?? 0) > pages * 0.3 && l.text.length < 80);

    const nodes: Node[] = [];
    let para: string[] = [];
    let paraKind: "p" | "li" | "pre" = "p";
    let last: Line | null = null;
    const flush = () => {
      if (!para.length) return;
      let html: string;
      if (paraKind === "pre") html = `<pre><code>${escapeHtml(para.join("\n"))}</code></pre>`;
      else {
        const text = escapeHtml(para.join(" ").replace(/(\w)-\s(?=[a-z])/g, "$1"));
        html = paraKind === "li" ? `<ul><li>${text.replace(/^[•●▪◦\-–]\s*/, "")}</li></ul>` : `<p>${text}</p>`;
      }
      nodes.push({ kind: "block", block: { t: "html", html } });
      para = [];
    };

    for (const it of items) {
      if (it.kind === "img") {
        flush();
        nodes.push({ kind: "block", block: { t: "img", src: saveAsset(fs.readFileSync(it.src), "png"), w: it.w, h: it.h } });
        last = null;
        continue;
      }
      const l = it.line;
      if (isRunningHeader(l)) continue;
      const ratio = l.size / body;
      // Short, fully bold lines at body size are section headings in many books ("Step 1 - ...").
      const boldHeading = l.bold && ratio >= 0.95 && l.text.length < 100 && !/[.,;:]$/.test(l.text) && !BULLET.test(l.text);
      if ((ratio >= 1.2 && l.text.length < 120) || boldHeading) {
        flush();
        const level = ratio >= 1.9 ? 1 : ratio >= 1.45 ? 2 : 3;
        const prev = nodes.at(-1);
        // Headings that wrap onto two lines arrive as consecutive heading lines.
        if (prev?.kind === "heading" && prev.level === level && last?.page === l.page && l.top - last.top < l.height * 1.8) {
          prev.text += ` ${l.text}`;
        } else nodes.push({ kind: "heading", level, text: l.text });
        last = l;
        continue;
      }
      const kind: typeof paraKind = l.mono ? "pre" : BULLET.test(l.text) ? "li" : "p";
      const gap = last && last.page === l.page ? l.top - (last.top + last.height) : Infinity;
      const sameBlock =
        para.length > 0 &&
        kind === paraKind &&
        (kind === "pre" ? gap < l.height : gap < l.height * 0.6) &&
        !(kind === "li" && BULLET.test(l.text));
      const acrossPage =
        para.length > 0 && kind === "p" && paraKind === "p" && last !== null && last.page !== l.page && !/[.:?!]$/.test(para.at(-1) ?? "");
      if (!sameBlock && !acrossPage) {
        flush();
        paraKind = kind;
      }
      para.push(l.text);
      last = l;
    }
    flush();

    const title = ARGS.title ?? path.basename(file, path.extname(file));
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
  const CHAPTER = /^(chapter|part)\s+\d+/i;
  const labelled = nodes.filter((n) => n.kind === "heading" && CHAPTER.test(n.text)).length >= 2;
  const startsChapter = (n: Node) => n.kind === "heading" && (labelled ? CHAPTER.test(n.text) : n.level === top);
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

/* ---------------------------------------------------------------- main */

function main() {
  const ext = path.extname(ARGS.file).toLowerCase();
  const articles = ext === ".pdf" ? importPdf(ARGS.file) : importHtml(ARGS.file);
  fs.mkdirSync(ARGS.out, { recursive: true });
  let written = 0;
  for (const a of articles) {
    const json = toArticleJson(a, ARGS.split);
    if (!json.id) continue;
    fs.writeFileSync(path.join(ARGS.out, `${json.id}.json`), JSON.stringify(json, null, 1));
    written++;
    const refNote = json.reference.length ? `${json.reference.length} reference blocks` : "no reference split found";
    console.log(`✓ ${json.id} (${json.prompt.length} prompt blocks, ${refNote})`);
  }
  console.log(`\nImported ${written} page(s) into ${path.relative(process.cwd(), ARGS.out) || "."}`);
}

main();
