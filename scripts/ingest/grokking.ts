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

const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) {
  console.error("Pass the course folder path as the first argument.");
  process.exit(1);
}

const COURSE_ID = "grokking";
const OUT_DIR = path.join(process.cwd(), "content/courses", COURSE_ID);
const IMG_DIR = path.join(process.cwd(), "public/course-assets", COURSE_ID);

type Lang = "java" | "python" | "cpp" | "js" | "text";

function detectLang(code: string): Lang {
  if (!/[{};=]|\bdef\b|\breturn\b/.test(code)) return "text";
  if (/#include|std::|using namespace|vector</.test(code)) return "cpp";
  if (/^\s*(def |class \w+(\(.*\))?:|import \w|from \w+ import)/m.test(code) && !/;\s*$/m.test(code)) return "python";
  if (/\bconsole\.log|\bfunction\b|\b(const|let) \w+ =|=>/.test(code) && !/\bpublic\b|System\.out/.test(code)) return "js";
  return "java";
}

function naturalKey(name: string): number[] {
  return (name.match(/^[\d.]+/)?.[0] ?? "999").split(".").filter(Boolean).map(Number);
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
    .replace(/&/g, " and ")
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
      const top = Number(($(l).attr("style") ?? "").match(/top:\s*(\d+)/)?.[1] ?? 0);
      lines.push({ top, text: $(l).text().replace(/ /g, " ") });
    });
  lines.sort((a, b) => a.top - b.top);
  return lines
    .map((l) => l.text.replace(/\s+$/, ""))
    .join("\n")
    .replace(/\n+$/, "\n");
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
    $(h).html(($(h).html() ?? "").replace(/\s*#\s*$/, ""));
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

function parsePage(file: string): ParsedPage {
  const $ = cheerio.load(fs.readFileSync(file, "utf8"));
  const title = $("title").text().replace(/\s*-\s*Grokking the Coding Interview.*$/, "").trim();
  const blocks: RawBlock[] = [];
  $('[class*="ViewerComponentViewStyled"]').each((_, b) => {
    const $b = $(b);
    const editors = $b.find('[class*="CodeEditorStyled"]');
    if (editors.length) {
      // A tabbed code widget renders only the selected language.
      blocks.push({ t: "code", code: codeFromEditor($, editors[0] as Element) });
      return;
    }
    const svg = $b.find(".canvas-svg-viewmode svg").first();
    if (svg.length) {
      blocks.push({ t: "svg", svg: $.html(svg) });
      return;
    }
    const md = $b.find(".markdownViewer").first();
    if (md.length) {
      blocks.push({ t: "md", html: cleanMarkdown($, md[0] as Element) });
      return;
    }
    const img = $b.find('img[src^="data:"]').first();
    if (img.length) {
      blocks.push({ t: "data", uri: img.attr("src")!, alt: img.attr("alt") });
      return;
    }
    const diagram = $b.find("svg").not(".sf-hidden").first();
    if (diagram.length) {
      blocks.push({ t: "svg", svg: $.html(diagram) });
      return;
    }
    if (!$b.text().trim()) return;
    console.warn(`  ! unknown block in ${path.basename(file)}: ${$b.text().slice(0, 60)}`);
  });
  return { title, blocks };
}

/* ------------------------------------------------------- lesson assembly */

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Challenge pages whose problem name is not in a heading. */
const TITLE_OVERRIDES: Record<string, string> = {
  "bitwise-xor/1": "Flip and Invert an Image (hard)",
};

function saveSvg(svg: string): Block {
  const hash = crypto.createHash("sha1").update(svg).digest("hex").slice(0, 16);
  fs.mkdirSync(IMG_DIR, { recursive: true });
  let out = svg;
  if (!/xmlns=/.test(out)) out = out.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  fs.writeFileSync(path.join(IMG_DIR, `${hash}.svg`), out);
  const viewBox = svg.match(/viewBox="[\d.\s-]*?\s([\d.]+)\s+([\d.]+)"/);
  const w = Math.round(Number(svg.match(/<svg[^>]*\swidth="([\d.]+)/)?.[1] ?? viewBox?.[1] ?? 600));
  const h = Math.round(Number(svg.match(/<svg[^>]*\sheight="([\d.]+)/)?.[1] ?? viewBox?.[2] ?? 400));
  return { t: "img", src: `/course-assets/${COURSE_ID}/${hash}.svg`, w, h };
}

const DATA_EXT: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp" };

function saveDataUri(uri: string, alt?: string): Block | null {
  const m = uri.match(/^data:([^;,]+)(;base64)?,([\s\S]*)$/);
  if (!m) return null;
  const [, mime, b64, payload] = m;
  const buf = b64 ? Buffer.from(payload, "base64") : Buffer.from(decodeURIComponent(payload));
  if (mime === "image/svg+xml") {
    const img = saveSvg(buf.toString("utf8"));
    return img.t === "img" ? { ...img, alt } : img;
  }
  const ext = DATA_EXT[mime];
  if (!ext) return null;
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 16);
  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMG_DIR, `${hash}.${ext}`), buf);
  let w = 600;
  let h = 400;
  if (ext === "png") {
    w = buf.readUInt32BE(16);
    h = buf.readUInt32BE(20);
  }
  return { t: "img", src: `/course-assets/${COURSE_ID}/${hash}.${ext}`, w, h, alt };
}

/** Merge the parsed variants of a page into language-aware blocks. */
function mergeVariants(pages: ParsedPage[]): { title: string; blocks: Block[] } {
  const base = pages.reduce((a, b) => (b.blocks.length > a.blocks.length ? b : a), pages[0]);
  const mismatched = pages.filter((p) => p.blocks.length !== base.blocks.length);
  if (mismatched.length) console.warn(`  ! variant block counts differ for ${base.title}`);
  const blocks: Block[] = [];
  base.blocks.forEach((rb, i) => {
    if (rb.t === "md") blocks.push({ t: "html", html: rb.html });
    else if (rb.t === "svg") blocks.push(saveSvg(rb.svg));
    else if (rb.t === "data") {
      const img = saveDataUri(rb.uri, rb.alt);
      if (img) blocks.push(img);
    } else {
      const code: Partial<Record<Lang, string>> = {};
      for (const p of pages) {
        const other = p.blocks[i];
        if (other?.t !== "code" || !other.code.trim()) continue;
        code[detectLang(other.code)] ??= other.code;
      }
      if (code.text && !code.java && !code.python) {
        blocks.push({ t: "html", html: `<pre><code>${escapeHtml(code.text)}</code></pre>` });
        return;
      }
      if (!code.java && !code.python) return;
      blocks.push({ t: "code", java: code.java, python: code.python });
    }
  });
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
  const last = solution.filter((b): b is CodeBlock => b.t === "code").at(-1);
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
  const m = title.match(/\((easy|medium|hard)\)/i);
  return m ? (m[1].toLowerCase() as Lesson["difficulty"]) : undefined;
}

/** Problem challenge pages name the actual problem in their first heading or paragraph. */
function challengeName(statement: Block[]): string | undefined {
  for (const b of statement) {
    if (b.t !== "html") continue;
    const $ = cheerio.load(b.html);
    const h = $("h1,h2,h3").first().text().trim();
    if (h && !/problem statement|problem challenge/i.test(h)) return h;
    const m = $.root().text().trim().match(/^(.{3,80}?\((?:easy|medium|hard)\))/i);
    if (m) return m[1];
  }
  return undefined;
}

/* ------------------------------------------------------------------ main */

function listHtml(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .sort(naturalSort)
    .map((f) => path.join(dir, f));
}

function writeLesson(lesson: Lesson) {
  fs.writeFileSync(path.join(OUT_DIR, "lessons", `${lesson.id}.json`), JSON.stringify(lesson, null, 1));
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
    .readdirSync(SRC, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(naturalSort);

  for (const chDir of chapterDirs) {
    const chTitle = chapterTitle(chDir);
    const chSlug = slugify(chTitle.replace(/^Pattern:\s*/, ""));
    const chapter: CourseIndex["chapters"][number] = { id: chSlug, title: chTitle, items: [] };
    const chPath = path.join(SRC, chDir);

    // Units are subfolders (one lesson, several language variants) or loose html files.
    const entries = fs.readdirSync(chPath, { withFileTypes: true }).sort((a, b) => naturalSort(a.name, b.name));
    const units: { name: string; files: string[] }[] = [];
    for (const e of entries) {
      if (e.isDirectory()) units.push({ name: e.name, files: listHtml(path.join(chPath, e.name)) });
      else if (e.name.endsWith(".html")) units.push({ name: e.name, files: [path.join(chPath, e.name)] });
    }

    const challenges = new Map<string, Lesson>();
    for (const unit of units) {
      if (!unit.files.length) continue;
      const merged = mergeVariants(unit.files.map(parsePage));
      const unitName = unit.name.replace(/^\d+\.\s*/, "").replace(/\.html$/, "");
      const title = merged.title || unitName;
      const review = /^Solution Review/i.test(title) || /^Solution Review/i.test(unitName);
      const challengeNum = (title.match(/Problem Challenge (\d+)/i) ?? unitName.match(/Problem Challenge (\d+)/i))?.[1];

      if (review && challengeNum) {
        const target = challenges.get(challengeNum);
        if (!target) {
          console.warn(`  ! review without challenge: ${chSlug} / ${title}`);
          continue;
        }
        target.solution = solutionPart(merged.blocks);
        const code = target.solution.filter((b): b is CodeBlock => b.t === "code").at(-1);
        target.reference = { java: code?.java, python: code?.python };
        writeLesson(target);
        continue;
      }

      const hasStarter = merged.blocks.some((b) => b.t === "code" && (isTodo(b.java) || isTodo(b.python)));
      const type: LessonType = hasStarter || difficultyOf(title) ? "problem" : "lesson";
      let lesson: Lesson;
      if (type === "problem") {
        const parts = splitProblem(merged.blocks);
        const displayTitle =
          (challengeNum && (TITLE_OVERRIDES[`${chSlug}/${challengeNum}`] ?? challengeName(parts.statement))) || title;
        const clean = displayTitle.replace(/\s*\((easy|medium|hard)\)\s*$/i, "").trim();
        lesson = {
          id: uniqueSlug(slugify(clean), chSlug),
          courseId: COURSE_ID,
          chapterId: chSlug,
          title: clean,
          type,
          difficulty: difficultyOf(displayTitle) ?? "medium",
          challenge: challengeNum ? Number(challengeNum) : undefined,
          ...parts,
        };
      } else {
        const intro = /^introduction$/i.test(title);
        lesson = {
          id: uniqueSlug(slugify(intro ? `${chSlug}-introduction` : title), chSlug),
          courseId: COURSE_ID,
          chapterId: chSlug,
          title,
          type,
          body: merged.blocks,
        };
      }
      console.log(`${chSlug} / ${lesson.id} [${lesson.type}]`);
      chapter.items.push({ id: lesson.id, title: lesson.title, type: lesson.type, difficulty: lesson.difficulty });
      if (challengeNum) challenges.set(challengeNum, lesson);
      writeLesson(lesson);
    }
    course.chapters.push(chapter);
  }
  fs.writeFileSync(path.join(OUT_DIR, "course.json"), JSON.stringify(course, null, 2));
  const n = course.chapters.reduce((a, c) => a + c.items.length, 0);
  console.log(`\nWrote ${course.chapters.length} chapters, ${n} items.`);
}

main();
