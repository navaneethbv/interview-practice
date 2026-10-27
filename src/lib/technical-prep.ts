import questionData from "../../content/interview-prep/questions.json";
import chapterData from "../../content/interview-prep/chapters.json";

export interface Complexity {
  time: string;
  space: string;
  notes: string;
}
export interface PrepQuestion {
  id: string;
  topic: string;
  level: string;
  title: string;
  answer: string;
  example: string;
  pitfall: string;
  followUp: string;
  complexity: Complexity | null;
}
export interface PrepChapter {
  topic: string;
  id: string;
  title: string;
  goal: string;
  sections: { title: string; body: string }[];
  code: string;
  walkthrough: string;
  exercise: string;
  solution: string;
  complexity: Complexity;
}
const java = "https://docs.oracle.com/en/java/javase/21/";
const spring = "https://docs.spring.io/spring-boot/3.5/reference/";
export const PREP_TOPICS = [
  {
    id: "data-structures",
    title: "Data structures",
    description: "Arrays to graphs, with operation costs and invariants.",
    prerequisite: "Variables, loops and basic Java syntax.",
    sources: [
      {
        label: "Java collections contracts",
        url: java + "docs/api/java.base/java/util/package-summary.html",
      },
      {
        label: "MIT algorithms resources",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/problem-solving-notes/",
      },
    ],
  },
  {
    id: "algorithms",
    title: "Algorithms & Big O",
    description:
      "Complexity, search, traversal, dynamic programming and proofs.",
    prerequisite: "Arrays, maps, queues and graph representations.",
    sources: [
      {
        label: "MIT algorithm design notes",
        url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/problem-solving-notes/",
      },
    ],
  },
  {
    id: "java",
    title: "Java",
    description:
      "Language contracts, collections, concurrency and JVM diagnosis.",
    prerequisite:
      "Read simple Java methods; start with the values chapter if new.",
    sources: [
      { label: "Java 21 documentation", url: java },
      {
        label: "ConcurrentHashMap contract",
        url:
          java +
          "docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html",
      },
      {
        label: "JDK 24 virtual-thread behavior",
        url: "https://docs.oracle.com/en/java/javase/24/core/virtual-threads.html",
      },
    ],
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    description:
      "Injection, HTTP, transactions, testing and production behavior.",
    prerequisite:
      "Java interfaces, exceptions, HTTP basics and relational database concepts.",
    sources: [
      { label: "Spring Boot 3.5 reference", url: spring },
      {
        label: "Spring transaction boundaries",
        url: "https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html",
      },
      {
        label: "Boot 3.5 testing",
        url: spring + "testing/spring-boot-applications.html",
      },
    ],
  },
  {
    id: "object-oriented-design",
    title: "Object-oriented design",
    description:
      "Contracts, composition, state, concurrency and complete design rounds.",
    prerequisite: "Java classes/interfaces and the basic collections chapters.",
    sources: [
      {
        label: "Java language: classes",
        url: java + "docs/api/java.base/java/lang/Class.html",
      },
      {
        label: "Java collection interfaces and contracts",
        url: java + "docs/api/java.base/java/util/package-summary.html",
      },
    ],
  },
] as const;
export const prepQuestions: readonly PrepQuestion[] = questionData;
export const prepChapters: readonly PrepChapter[] = chapterData;
export function prepTopic(id: string) {
  return PREP_TOPICS.find((topic) => topic.id === id);
}
export function questionsFor(topic: string) {
  return prepQuestions.filter((q) => q.topic === topic);
}
export function chaptersFor(topic: string) {
  return prepChapters.filter((ch) => ch.topic === topic);
}
export const COMPLEXITY_REFERENCE = [
  [
    "O(1)",
    "Direct array index",
    "Does not grow with element count; not a latency guarantee.",
  ],
  [
    "O(log n)",
    "Binary search",
    "Repeatedly halves a sorted random-access candidate region.",
  ],
  [
    "O(n)",
    "Complete scan",
    "Each input item is examined a bounded number of times.",
  ],
  [
    "O(n log n)",
    "Merge sort",
    "Logarithmic levels with linear work per level.",
  ],
  [
    "O(n²)",
    "Every unordered pair",
    "n(n−1)/2 comparisons still grows quadratically.",
  ],
  [
    "O(n · 2^n)",
    "Materialize all subsets",
    "Counts the elements copied into the exponential output.",
  ],
  [
    "O(V + E)",
    "Graph traversal",
    "Assumes adjacency lists; a matrix scan is O(V²).",
  ],
] as const;
