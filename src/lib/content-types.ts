/** Shared content model produced by the ingestion scripts and read by the site. */

export type Difficulty = "easy" | "medium" | "hard";
export type LessonType = "lesson" | "problem";
export type CodeLang = "python" | "java";

export type Block =
  | { t: "html"; html: string }
  | { t: "code"; java?: string; python?: string }
  | { t: "img"; src: string; w: number; h: number; alt?: string };

export interface CourseItem {
  id: string;
  title: string;
  type: LessonType;
  difficulty?: Difficulty;
}

export interface CourseIndex {
  id: string;
  title: string;
  description: string;
  chapters: { id: string; title: string; items: CourseItem[] }[];
}

export interface Lesson {
  id: string;
  courseId: string;
  chapterId: string;
  title: string;
  type: LessonType;
  difficulty?: Difficulty;
  /** Set for "Problem Challenge N" lessons. */
  challenge?: number;
  /** Lesson body (type === "lesson"). */
  body?: Block[];
  /** Problem statement, examples and constraints (type === "problem"). */
  statement?: Block[];
  /** Worked solution and complexity analysis (type === "problem"). */
  solution?: Block[];
  starter?: { java?: string; python?: string };
  reference?: { java?: string; python?: string };
}
