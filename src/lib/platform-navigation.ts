/** Shared discovery links for the home page, practice hub and command palette. */
export const LEARNING_TOOLS = [
  { href: "/interview-prep", title: "Technical interview prep", description: "20 theory chapters, 75 questions and Big O across DSA, Java, Spring Boot and OOD." },
  {
    href: "/practice/today",
    title: "Today's plan",
    description:
      "A realistic 30, 60 or 120 minute schedule that adapts as you study.",
  },
  {
    href: "/practice/labs",
    title: "Business practice labs",
    description:
      "Build BA deliverables, run SQL and work through Excel datasets.",
  },
  {
    href: "/practice/interviews",
    title: "Interview simulations",
    description:
      "Timed system design, BA and behavioral rounds with structured debriefs.",
  },
  {
    href: "/practice/readiness",
    title: "Readiness evidence",
    description: "See what you have read, practiced and demonstrated by skill.",
  },
  {
    href: "/practice/notebook",
    title: "Bookmarks & mistake notebook",
    description:
      "Save useful sections and revisit your reasoning and corrections.",
  },
  {
    href: "/offline",
    title: "Offline library",
    description: "Install the app and manage lessons downloaded for travel.",
  },
] as const;
