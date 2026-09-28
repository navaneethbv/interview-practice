/**
 * Ingests the saved Educative "Grokking the Coding Interview" HTML pages into
 * structured JSON under content/courses/grokking/.
 *
 * Each lesson folder holds several saved copies of the same page, one per selected
 * language tab. We parse every copy, align code blocks by position and keep the Java
 * and Python versions.
 *
 * Usage: npm run ingest:grokking -- "<path to course folder>"
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import * as cheerio from "cheerio";
import type { AnyNode, Element } from "domhandler";
import katex from "katex";
import type { Block, CourseIndex, Lesson, LessonType } from "../../src/lib/content-types";

function resolveSourceDirectory(candidate: string | undefined) {
  if (!candidate) throw new Error("Pass the course folder path as the first argument.");
  const resolved = path.resolve(candidate);
  const allowedRoots = [path.resolve(process.cwd()), path.resolve(process.cwd(), "..")];
  if (!allowedRoots.some((root) => isWithin(root, resolved))) {
    throw new Error("The course folder path must be inside the project workspace.");
  }
  if (!fs.statSync(resolved).isDirectory()) throw new Error("The course folder path must be a directory."); // NOSONAR nosemgrep -- resolved is allowlisted to the project workspace before filesystem access
  const source = fs.realpathSync(resolved); // NOSONAR nosemgrep -- resolved is allowlisted and the canonical path is checked again below
  if (!allowedRoots.some((root) => isWithin(root, source))) throw new Error("The course folder path must be inside the project workspace.");
  return source;
}

let SRC: string;
try {
  SRC = resolveSourceDirectory(process.argv[2]);
} catch {
  console.error("Pass the course folder path as the first argument.");
  process.exit(1);
}

const COURSE_ID = "grokking";
const OUT_DIR = path.join(process.cwd(), "content/courses", COURSE_ID);
const IMG_DIR = path.join(process.cwd(), "public/course-assets", COURSE_ID);

type Lang = "java" | "python" | "cpp" | "js" | "text";

function detectLang(code: string): Lang {
  const looksLikeCode = /[{};=]/.test(code) || /\bdef\b/.test(code) || /\breturn\b/.test(code);
  if (!looksLikeCode) return "text";
  if (code.includes("#include") || code.includes("std::") || code.includes("using namespace") || code.includes("vector<")) {
    return "cpp";
  }
  const firstLine = code.split("\n").find((line) => line.trim())?.trim() ?? "";
  const pythonHeader =
    firstLine.startsWith("def ") ||
    (firstLine.startsWith("class ") && firstLine.endsWith(":")) ||
    firstLine.startsWith("import ") ||
    firstLine.startsWith("from ") && firstLine.includes(" import ");
  const hasSemicolonLine = code.split("\n").some((line) => line.trimEnd().endsWith(";"));
  if (pythonHeader && !hasSemicolonLine) return "python";
  const looksLikeJavaScript = /\bconsole\.log/.test(code) || /\bfunction\b/.test(code) || /\b(const|let) \w+ =/.test(code) || code.includes("=>");
  if (looksLikeJavaScript && !/\bpublic\b/.test(code) && !/System\.out/.test(code)) return "js";
  return "java";
}

function naturalKey(name: string): number[] {
  const match = /^[\d.]+/.exec(name);
  return (match?.[0] ?? "999").split(".").filter(Boolean).map(Number);
}
function naturalSort(a: string, b: string) {
  const ka = naturalKey(a);
  const kb = naturalKey(b);
  for (let i = 0; i < Math.max(ka.length, kb.length); i++) {
    const d = (ka[i] ?? -1) - (kb[i] ?? -1);
    if (d) return d;
  }
  return a.localeCompare(b);
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/['’‘]/g, "")
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function chapterTitle(dir: string) {
  const t = dir.replace(/^\d+\.\s*/, "").replace(/\s+/g, " ").trim();
  const fixes: Record<string, string> = {
    "Pattern Fast _ Slow pointers": "Pattern: Fast & Slow Pointers",
    "Pattern Top _K_ Elements": "Pattern: Top 'K' Elements",
    "Pattern 0 or 1 Knapsack (Dynamic Programming)": "Pattern: 0/1 Knapsack (Dynamic Programming)",
    "Pattern K-way merge": "Pattern: K-way Merge",
  };
  return fixes[t] ?? t.replace(/^Pattern /, "Pattern: ");
}

/* ------------------------------------------------------------------ parsing */

type RawBlock =
  | { t: "md"; html: string }
  | { t: "code"; code: string }
  | { t: "svg"; svg: string }
  | { t: "data"; uri: string; alt?: string };

interface ParsedPage {
  title: string;
  blocks: RawBlock[];
}

function codeFromEditor($: cheerio.CheerioAPI, el: Element): string {
  const lines: { top: number; text: string }[] = [];
  $(el)
    .find(".view-line")
    .each((_, l) => {
      const topMatch = /top:\s*(\d+)/.exec($(l).attr("style") ?? "");
      lines.push({ top: Number(topMatch?.[1] ?? 0), text: $(l).text().replaceAll(" ", " ") });
    });
  lines.sort((a, b) => a.top - b.top);
  return trimTrailingNewlines(lines.map((l) => l.text.trimEnd()).join("\n"));
}

function trimTrailingNewlines(text: string) {
  let end = text.length;
  while (end > 1 && text[end - 1] === "\n" && text[end - 2] === "\n") end--;
  return text.slice(0, end);
}

function renderMath($: cheerio.CheerioAPI, root: cheerio.Cheerio<AnyNode>) {
  root.find(".katex").each((_, k) => {
    const $k = $(k);
    const tex = $k.find('annotation[encoding="application/x-tex"]').first().text();
    const display = $k.parent().hasClass("katex-display");
    let html: string;
    try {
      html = katex.renderToString(tex, { displayMode: display, throwOnError: false, output: "html" });
    } catch {
      html = `<code>${tex}</code>`;
    }
    (display ? $k.parent() : $k).replaceWith(`<span data-math="1">${html}</span>`);
  });
}

const KEEP_ATTRS = new Set(["href", "src", "alt", "colspan", "rowspan"]);

function cleanMarkdown($: cheerio.CheerioAPI, el: Element): string {
  const $el = $(el).clone();
  renderMath($, $el);
  // Educative headings end with an anchor "#" link.
  $el.find("h1,h2,h3,h4,h5,h6").each((_, h) => {
    $(h)
      .find("*")
      .filter((__, a) => $(a).text().trim() === "#")
      .remove();
    const html = ($(h).html() ?? "").trimEnd();
    $(h).html(html.endsWith("#") ? html.slice(0, -1).trimEnd() : html);
  });
  $el.find("script,style,button,noscript").remove();
  $el.find("*").each((_, n) => {
    const node = n as Element;
    if ($(node).closest("[data-math]").length) return; // keep KaTeX markup intact
    for (const name of Object.keys(node.attribs ?? {})) {
      if (!KEEP_ATTRS.has(name)) $(node).removeAttr(name);
    }
    if (node.tagName === "a") {
      if (!/^https?:\/\//i.test($(node).attr("href") ?? "")) $(node).removeAttr("href");
      else $(node).attr("target", "_blank").attr("rel", "noreferrer");
    }
    if (node.tagName === "img" && !/^(https:|data:image\/)/i.test($(node).attr("src") ?? "")) $(node).remove();
  });
  // Unwrap attribute-less wrappers to keep the HTML compact.
  let changed = true;
  while (changed) {
    changed = false;
    $el.find("div,span").each((_, n) => {
      const node = n as Element;
      if (Object.keys(node.attribs ?? {}).length) return;
      $(node).replaceWith($(node).contents());
      changed = true;
    });
  }
  $el.find("p").each((_, p) => {
    if (!$(p).text().trim() && !$(p).find("img").length) $(p).remove();
  });
  return ($el.html() ?? "").replace(/\n\s*\n/g, "\n").trim();
}

function parseViewerBlock($: cheerio.CheerioAPI, b: AnyNode, file: string): RawBlock | null {
  const $b = $(b);
  const editors = $b.find('[class*="CodeEditorStyled"]');
  if (editors.length) return { t: "code", code: codeFromEditor($, editors[0] as Element) };
  const svg = $b.find(".canvas-svg-viewmode svg").first();
  if (svg.length) return { t: "svg", svg: $.html(svg) };
  const md = $b.find(".markdownViewer").first();
  if (md.length) return { t: "md", html: cleanMarkdown($, md[0] as Element) };
  const img = $b.find('img[src^="data:"]').first();
  if (img.length) return { t: "data", uri: img.attr("src")!, alt: img.attr("alt") };
  const diagram = $b.find("svg").not(".sf-hidden").first();
  if (diagram.length) return { t: "svg", svg: $.html(diagram) };
  if ($b.text().trim()) console.warn(`  ! unknown block in ${path.basename(file)}: ${$b.text().slice(0, 60)}`);
  return null;
}

function parsePage(file: string): ParsedPage {
  const $ = cheerio.load(fs.readFileSync(file, "utf8"));
  const rawTitle = $("title").text();
  const titleMarker = " - Grokking the Coding Interview";
  const markerIndex = rawTitle.indexOf(titleMarker);
  const title = (markerIndex >= 0 ? rawTitle.slice(0, markerIndex) : rawTitle).trim();
  const blocks: RawBlock[] = [];
  $('[class*="ViewerComponentViewStyled"]').each((_, b) => {
    const block = parseViewerBlock($, b, file);
    if (block) blocks.push(block);
  });
  return { title, blocks };
}

/* ------------------------------------------------------- lesson assembly */

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function isWithin(parent: string, child: string) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function resolveWithin(parent: string, child: string) {
  const resolved = path.resolve(parent, child);
  if (!isWithin(parent, resolved)) throw new Error("Generated output escaped its trusted directory");
  return resolved;
}

/** Challenge pages whose problem name is not in a heading. */
const TITLE_OVERRIDES: Record<string, string> = {
  "bitwise-xor/1": "Flip and Invert an Image (hard)",
};

function saveSvg(svg: string): Block {
  const hash = crypto.createHash("sha1").update(svg).digest("hex").slice(0, 16);
  fs.mkdirSync(IMG_DIR, { recursive: true }); // NOSONAR nosemgrep -- IMG_DIR is fixed under the repository public directory
  let out = svg;
  if (!/xmlns=/.test(out)) out = out.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  fs.writeFileSync(resolveWithin(IMG_DIR, `${hash}.svg`), out); // NOSONAR nosemgrep -- the generated hash filename is bounded to IMG_DIR
  const viewBox = /viewBox="[\d.\s-]*?\s([\d.]+)\s+([\d.]+)"/.exec(svg);
  const width = /<svg[^>]*\swidth="([\d.]+)/.exec(svg);
  const height = /<svg[^>]*\sheight="([\d.]+)/.exec(svg);
  const w = Math.round(Number(width?.[1] ?? viewBox?.[1] ?? 600));
  const h = Math.round(Number(height?.[1] ?? viewBox?.[2] ?? 400));
  return { t: "img", src: `/course-assets/${COURSE_ID}/${hash}.svg`, w, h };
}

const DATA_EXT: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp" };

function saveDataUri(uri: string, alt?: string): Block | null {
  if (!uri.startsWith("data:")) return null;
  const comma = uri.indexOf(",");
  if (comma < 0) return null;
  const metadata = uri.slice(5, comma).split(";");
  const mime = metadata.shift()?.toLowerCase() ?? "";
  const payload = uri.slice(comma + 1);
  const buf = metadata.includes("base64") ? Buffer.from(payload, "base64") : Buffer.from(decodeURIComponent(payload));
  if (mime === "image/svg+xml") {
    const img = saveSvg(buf.toString("utf8"));
    return img.t === "img" ? { ...img, alt } : img;
  }
  const ext = DATA_EXT[mime];
  if (!ext) return null;
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 16);
  fs.mkdirSync(IMG_DIR, { recursive: true }); // NOSONAR nosemgrep -- IMG_DIR is fixed under the repository public directory
  fs.writeFileSync(resolveWithin(IMG_DIR, `${hash}.${ext}`), buf); // NOSONAR nosemgrep -- the generated hash filename is bounded to IMG_DIR
  let w = 600;
  let h = 400;
  if (ext === "png") {
    w = buf.readUInt32BE(16);
    h = buf.readUInt32BE(20);
  }
  return { t: "img", src: `/course-assets/${COURSE_ID}/${hash}.${ext}`, w, h, alt };
}

function mergeCodeBlock(pages: ParsedPage[], index: number): Block | null {
  const code: Partial<Record<Lang, string>> = {};
  for (const page of pages) {
    const block = page.blocks[index];
    if (block?.t === "code" && block.code.trim()) code[detectLang(block.code)] ??= block.code;
  }
  if (code.text && !code.java && !code.python) return { t: "html", html: `<pre><code>${escapeHtml(code.text)}</code></pre>` };
  if (!code.java && !code.python) return null;
  return { t: "code", java: code.java, python: code.python };
}

function mergeBlock(block: RawBlock, pages: ParsedPage[], index: number): Block | null {
  if (block.t === "md") return { t: "html", html: block.html };
  if (block.t === "svg") return saveSvg(block.svg);
  if (block.t === "data") return saveDataUri(block.uri, block.alt);
  return mergeCodeBlock(pages, index);
}

/** Merge the parsed variants of a page into language-aware blocks. */
function mergeVariants(pages: ParsedPage[]): { title: string; blocks: Block[] } {
  const base = pages.reduce((a, b) => (b.blocks.length > a.blocks.length ? b : a), pages[0]);
  if (pages.some((page) => page.blocks.length !== base.blocks.length)) {
    console.warn(`  ! variant block counts differ for ${base.title}`);
  }
  const blocks = base.blocks.map((block, index) => mergeBlock(block, pages, index)).filter((block): block is Block => block !== null);
  return { title: base.title, blocks };
}

const TRY_IT = /^try it yourself/i;
const SOLUTION_START = /^(solution|code|time complexity|space complexity|similar problems?)\b/i;

function isTodo(code?: string) {
  return !!code && /TODO/.test(code);
}

/** Split a markdown block's HTML at the first heading that satisfies `pred`. */
function splitHtmlAt(html: string, pred: (h: string) => boolean): [string, string, string] | null {
  const re = /<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const text = cheerio.load(m[1]).text().trim();
    if (pred(text)) return [html.slice(0, m.index).trim(), html.slice(m.index).trim(), text];
  }
  return null;
}

type CodeBlock = Extract<Block, { t: "code" }>;

interface ProblemParts {
  statement: Block[];
  solution: Block[];
  starter: { java?: string; python?: string };
  reference: { java?: string; python?: string };
}

function splitProblem(blocks: Block[]): ProblemParts {
  const starterIdx = blocks.findIndex((b) => b.t === "code" && (isTodo(b.java) || isTodo(b.python)));
  const statement: Block[] = [];
  const solution: Block[] = [];
  let starter: ProblemParts["starter"] = {};
  let phase: "statement" | "try" | "solution" = "statement";
  blocks.forEach((b, i) => {
    if (i === starterIdx && b.t === "code") {
      starter = { java: b.java, python: b.python };
      phase = "solution";
      return;
    }
    if (phase === "solution") {
      solution.push(b);
      return;
    }
    if (b.t === "html") {
      const split = splitHtmlAt(b.html, (h) => TRY_IT.test(h) || SOLUTION_START.test(h));
      if (split && phase === "statement") {
        if (split[0]) statement.push({ t: "html", html: split[0] });
        if (TRY_IT.test(split[2])) {
          phase = "try";
        } else {
          solution.push({ t: "html", html: split[1] });
          phase = "solution";
        }
        return;
      }
    }
    if (phase === "statement") statement.push(b);
  });
  const last = solution.findLast((b): b is CodeBlock => b.t === "code");
  return { statement, solution, starter, reference: { java: last?.java, python: last?.python } };
}

/** For a "Solution Review" page, drop the repeated problem statement. */
function solutionPart(blocks: Block[]): Block[] {
  const out: Block[] = [];
  let started = false;
  for (const b of blocks) {
    if (started) {
      out.push(b);
      continue;
    }
    if (b.t === "html") {
      const split = splitHtmlAt(b.html, (h) => SOLUTION_START.test(h));
      if (split) {
        started = true;
        out.push({ t: "html", html: split[1] });
      }
    }
  }
  return out.length ? out : blocks;
}

function difficultyOf(title: string): Lesson["difficulty"] {
  const m = /\((easy|medium|hard)\)/i.exec(title);
  return m ? (m[1].toLowerCase() as Lesson["difficulty"]) : undefined;
}

/** Problem challenge pages name the actual problem in their first heading or paragraph. */
function challengeName(statement: Block[]): string | undefined {
  for (const b of statement) {
    if (b.t !== "html") continue;
    const $ = cheerio.load(b.html);
    const h = $("h1,h2,h3").first().text().trim();
    if (h && !/problem statement|problem challenge/i.test(h)) return h;
    const text = $.root().text().trim();
    for (const marker of [" (easy)", " (medium)", " (hard)"]) {
      const end = text.toLowerCase().indexOf(marker);
      if (end >= 3 && end < 80) return text.slice(0, end + marker.length);
    }
  }
  return undefined;
}

/* ------------------------------------------------------------------ main */

function listHtml(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .sort(naturalSort)
    .map((f) => resolveWithin(dir, f));
}

function writeLesson(lesson: Lesson) {
  fs.writeFileSync(resolveWithin(path.join(OUT_DIR, "lessons"), `${lesson.id}.json`), JSON.stringify(lesson, null, 1)); // NOSONAR nosemgrep -- lesson.id is a generated slug bounded to the lessons directory
}

interface Unit {
  name: string;
  files: string[];
}

function listUnits(chPath: string): Unit[] {
  const entries = fs.readdirSync(chPath, { withFileTypes: true }).sort((a, b) => naturalSort(a.name, b.name));
  const units: Unit[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) units.push({ name: entry.name, files: listHtml(resolveWithin(chPath, entry.name)) });
    else if (entry.name.endsWith(".html")) units.push({ name: entry.name, files: [resolveWithin(chPath, entry.name)] });
  }
  return units;
}

function challengeNumber(title: string, unitName: string) {
  const titleMatch = /Problem Challenge (\d+)/i.exec(title);
  const unitMatch = /Problem Challenge (\d+)/i.exec(unitName);
  return (titleMatch ?? unitMatch)?.[1];
}

function withoutDifficulty(title: string) {
  const lower = title.toLowerCase();
  const suffix = [" (easy)", " (medium)", " (hard)"].find((value) => lower.endsWith(value));
  return suffix ? title.slice(0, title.length - suffix.length).trim() : title.trim();
}

function buildLesson(merged: { title: string; blocks: Block[] }, unitName: string, chSlug: string, uniqueSlug: (s: string, chapter: string) => string) {
  const title = merged.title || unitName;
  const challenge = challengeNumber(title, unitName);
  const hasStarter = merged.blocks.some((block) => block.t === "code" && (isTodo(block.java) || isTodo(block.python)));
  const type: LessonType = hasStarter || difficultyOf(title) ? "problem" : "lesson";
  if (type === "lesson") {
    const intro = /^introduction$/i.test(title);
    const lessonId = intro ? `${chSlug}-introduction` : title;
    return {
      challenge,
      lesson: {
        id: uniqueSlug(slugify(lessonId), chSlug),
        courseId: COURSE_ID,
        chapterId: chSlug,
        title,
        type,
        body: merged.blocks,
      } satisfies Lesson,
    };
  }

  const parts = splitProblem(merged.blocks);
  let displayTitle = title;
  if (challenge) {
    const override = TITLE_OVERRIDES[`${chSlug}/${challenge}`];
    const discovered = challengeName(parts.statement);
    if (override) displayTitle = override;
    else if (discovered) displayTitle = discovered;
  }
  const clean = withoutDifficulty(displayTitle);
  return {
    challenge,
    lesson: {
      id: uniqueSlug(slugify(clean), chSlug),
      courseId: COURSE_ID,
      chapterId: chSlug,
      title: clean,
      type,
      difficulty: difficultyOf(displayTitle) ?? "medium",
      challenge: challenge ? Number(challenge) : undefined,
      ...parts,
    } satisfies Lesson,
  };
}

function processUnit(unit: Unit, chSlug: string, challenges: Map<string, Lesson>, uniqueSlug: (s: string, chapter: string) => string): Lesson | null {
  if (!unit.files.length) return null;
  const merged = mergeVariants(unit.files.map(parsePage));
  const unitName = unit.name.replace(/^\d+\.\s*/, "").replace(/\.html$/, "");
  const title = merged.title || unitName;
  const review = /^Solution Review/i.test(title) || /^Solution Review/i.test(unitName);
  const challenge = challengeNumber(title, unitName);

  if (review && challenge) {
    const target = challenges.get(challenge);
    if (!target) {
      console.warn(`  ! review without challenge: ${chSlug} / ${title}`);
      return null;
    }
    target.solution = solutionPart(merged.blocks);
    const code = target.solution.findLast((block): block is CodeBlock => block.t === "code");
    target.reference = { java: code?.java, python: code?.python };
    writeLesson(target);
    return null;
  }

  const built = buildLesson(merged, unitName, chSlug, uniqueSlug);
  if (built.challenge) challenges.set(built.challenge, built.lesson);
  return built.lesson;
}

function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.rmSync(IMG_DIR, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT_DIR, "lessons"), { recursive: true });

  const course: CourseIndex = {
    id: COURSE_ID,
    title: "Grokking the Coding Interview: Patterns for Coding Questions",
    description:
      "The recurring patterns behind most coding interview questions, with hands-on problems in Java and Python.",
    chapters: [],
  };
  const usedSlugs = new Set<string>();
  const uniqueSlug = (s: string, chapter: string) => {
    const slug = usedSlugs.has(s) ? `${s}-${chapter}` : s;
    usedSlugs.add(slug);
    return slug;
  };

  const chapterDirs = fs
    .readdirSync(SRC, { withFileTypes: true }) // NOSONAR nosemgrep -- SRC is allowlisted to the workspace and canonicalized by resolveSourceDirectory
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(naturalSort);

  for (const chDir of chapterDirs) {
    const chTitle = chapterTitle(chDir);
    const chSlug = slugify(chTitle.replace(/^Pattern:\s*/, ""));
    const chapter: CourseIndex["chapters"][number] = { id: chSlug, title: chTitle, items: [] };
    const chPath = resolveWithin(SRC, chDir);

    const challenges = new Map<string, Lesson>();
    for (const unit of listUnits(chPath)) {
      const lesson = processUnit(unit, chSlug, challenges, uniqueSlug);
      if (!lesson) continue;
      console.log(`${chSlug} / ${lesson.id} [${lesson.type}]`);
      chapter.items.push({ id: lesson.id, title: lesson.title, type: lesson.type, difficulty: lesson.difficulty });
      writeLesson(lesson);
    }
    course.chapters.push(chapter);
  }
  fs.writeFileSync(resolveWithin(OUT_DIR, "course.json"), JSON.stringify(course, null, 2)); // NOSONAR nosemgrep -- course.json is fixed under the repository content directory
  const n = course.chapters.reduce((a, c) => a + c.items.length, 0);
  console.log(`\nWrote ${course.chapters.length} chapters, ${n} items.`);
}

main();
