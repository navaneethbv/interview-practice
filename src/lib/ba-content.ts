import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { Marked } from "marked";
import type { BaQuestion } from "./ba-data";
import indexJson from "../../content/business-analyst/index.json";
import seniorIndexJson from "../../content/business-analyst/senior/index.json";
import tipsJson from "../../content/business-analyst/tips.json";
import seniorTipsJson from "../../content/business-analyst/senior/tips.json";

/**
 * Loads the Business Analyst course from content/business-analyst/. Each chapter is one
 * Markdown file: text before the first `##` is the introduction and every `##` section is a
 * lesson. `<id>.quiz.json` holds the chapter's question bank, with the correct answer first.
 */

const DIR = path.join(process.cwd(), "content", "business-analyst");
const TRACK_DIR = { beginner: DIR, senior: path.join(DIR, "senior") } as const;
const SLUG = /^[a-z0-9-]+$/;

export type BaTrack = "beginner" | "senior";

export interface BaChapterMeta {
  id: string;
  title: string;
  summary: string;
  skills: string[];
}

export interface BaIndex {
  title: string;
  passPercent: number;
  quizSize: number;
  final: { size: number; passPercent: number };
  chapters: BaChapterMeta[];
}

export interface BaLesson {
  n: number;
  title: string;
  html: string;
  minutes: number;
}

export interface BaChapter extends BaChapterMeta {
  number: number;
  introHtml: string;
  lessons: BaLesson[];
  minutes: number;
}

type AuthoredQuestion = Omit<BaQuestion, "id">;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/** Course text is authored in this repo; links are still limited to safe destinations and raw HTML is escaped. */
const parser = new Marked({
  gfm: true,
  renderer: {
    link({ href, tokens }) {
      const inner = this.parser.parseInline(tokens);
      if (/^https?:\/\//i.test(href)) return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${inner}</a>`;
      if (/^\/[a-z0-9/_-]*$/i.test(href)) return `<a href="${escapeHtml(href)}">${inner}</a>`;
      return inner;
    },
    image() {
      return "";
    },
    html({ text }) {
      return escapeHtml(text);
    },
  },
});

const render = (md: string) => parser.parse(md, { async: false });
const minutesFor = (md: string) => Math.max(1, Math.round(md.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length / 200));

export const getBaIndex = cache((track: BaTrack = "beginner"): BaIndex => {
  const index = (track === "senior" ? seniorIndexJson : indexJson) as BaIndex;
  if (!index.chapters.every((c) => SLUG.test(c.id))) throw new Error("Invalid chapter id in content/business-analyst/index.json");
  return index;
});

export const getBaChapter = cache((id: string, track: BaTrack = "beginner"): BaChapter | null => {
  const index = getBaIndex(track);
  const i = index.chapters.findIndex((c) => c.id === id);
  if (i === -1) return null;
  const meta = index.chapters[i];
  // The id was matched against index.json, so the path stays inside the course folder.
  const md = fs.readFileSync(path.join(TRACK_DIR[track], `${meta.id}.md`), "utf8"); // nosemgrep -- id validated against index.json
  const [intro, ...sections] = md.split(/^## /m);
  const lessons = sections.map((section, n) => {
    const newline = section.indexOf("\n");
    const title = section.slice(0, newline).trim();
    const body = section.slice(newline + 1);
    return { n: n + 1, title, html: render(body), minutes: minutesFor(body) };
  });
  return {
    ...meta,
    number: i + 1,
    introHtml: render(intro),
    lessons,
    minutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
  };
});

export const getBaBank = cache((id: string, track: BaTrack = "beginner"): BaQuestion[] => {
  const meta = getBaIndex(track).chapters.find((c) => c.id === id);
  if (!meta) return [];
  const raw = JSON.parse(fs.readFileSync(path.join(TRACK_DIR[track], `${meta.id}.quiz.json`), "utf8")) as AuthoredQuestion[]; // nosemgrep -- id validated against index.json
  return raw.map((q, i) => ({ ...q, id: `${meta.id}-${i + 1}` }));
});

export const listBaChapters = cache((track: BaTrack = "beginner") => getBaIndex(track).chapters.map((c) => getBaChapter(c.id, track)).filter((c): c is BaChapter => c !== null));

export const getBaTips = cache((track: BaTrack = "beginner"): string[] => track === "senior" ? seniorTipsJson : tipsJson);

/** Lightweight chapter summaries for client components (no lesson HTML). */
export function baOutline(track: BaTrack = "beginner") {
  return listBaChapters(track).map((c) => ({
    id: c.id,
    number: c.number,
    title: c.title,
    summary: c.summary,
    skills: c.skills,
    minutes: c.minutes,
    lessons: c.lessons.map((l) => ({ n: l.n, title: l.title })),
    questions: getBaBank(c.id, track).length,
  }));
}

export type BaOutline = ReturnType<typeof baOutline>;
