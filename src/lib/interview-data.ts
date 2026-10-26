import bank from "../../content/interviews/scenarios.json";

export const INTERVIEWS_KEY = "ip:interviews:v1";
export const INTERVIEW_DURATIONS = [15, 30, 45, 60] as const;
export type InterviewTrack =
  | "system-design"
  | "business-analysis"
  | "behavioral";
export interface InterviewStage {
  id: string;
  title: string;
  prompt: string;
  evidence: string;
}
export interface InterviewScenario {
  id: string;
  track: InterviewTrack;
  title: string;
  brief: string;
  context: string[];
  followUps: string[];
  debrief: string[];
}
export const INTERVIEW_TRACKS: Record<
  InterviewTrack,
  { title: string; description: string; stages: InterviewStage[] }
> = {
  "system-design": {
    title: "System design",
    description:
      "Clarify scope, size the workload and defend architecture tradeoffs.",
    stages: [
      {
        id: "requirements",
        title: "Requirements & capacity",
        prompt:
          "Who uses this system? Separate functional needs from latency, availability and consistency goals. Estimate peak requests, storage and bandwidth with explicit assumptions.",
        evidence:
          "Bounded scope, measurable SLOs and a sanity-checked capacity estimate.",
      },
      {
        id: "architecture",
        title: "APIs & data flow",
        prompt:
          "Define the important APIs, authentication boundary, data model and end-to-end read/write path. Explain keys, indexes and ownership of each component.",
        evidence:
          "A concrete contract and data flow with justified database and partition choices.",
      },
      {
        id: "scale",
        title: "Caching & tradeoffs",
        prompt:
          "Identify the bottleneck. Explain cache placement, invalidation, partitioning, queues and backpressure. Compare one alternative and the cost or consistency tradeoff.",
        evidence:
          "A bottleneck-driven scaling strategy with an explicit alternative and failure mode.",
      },
      {
        id: "operations",
        title: "Reliability, security & observability",
        prompt:
          "Walk through a dependency or regional failure. Cover retries, idempotency, recovery, access control, sensitive data and abuse. Name metrics, traces, alerts and rollout safeguards.",
        evidence:
          "Failure containment and recovery with security controls and actionable operational signals.",
      },
    ],
  },
  "business-analysis": {
    title: "Business analysis",
    description:
      "Turn stakeholder ambiguity into testable requirements and business value.",
    stages: [
      {
        id: "discovery",
        title: "Elicitation & problem framing",
        prompt:
          "Identify stakeholders, decision makers and missing evidence. Ask targeted questions. Distinguish the business problem from the proposed solution and define a measurable outcome.",
        evidence:
          "A stakeholder and evidence plan, assumptions and a baseline success measure.",
      },
      {
        id: "process",
        title: "Process & requirements",
        prompt:
          "Describe the current and future process, handoffs, exceptions and data. Write a user story with testable acceptance criteria and relevant non-functional requirements.",
        evidence:
          "An observable process change and specific requirements with exceptions.",
      },
      {
        id: "priority",
        title: "Prioritization & negotiation",
        prompt:
          "Prioritize an MVP using value, effort, risk and dependencies. Resolve conflicting stakeholder needs. Explain what is deferred and how scope changes are approved.",
        evidence:
          "A transparent decision, tradeoff and traceable change control.",
      },
      {
        id: "validation",
        title: "UAT & value realization",
        prompt:
          "Design representative UAT cases including negative paths, data and owners. Define sign-off, rollout and adoption. Explain how to compare benefits against a baseline and avoid misleading attribution.",
        evidence:
          "Traceable acceptance tests, accountable sign-off and a credible benefit measurement plan.",
      },
    ],
  },
  behavioral: {
    title: "Behavioral",
    description:
      "Rehearse specific STAR stories and thoughtful follow-up answers.",
    stages: [
      {
        id: "situation",
        title: "Situation & task",
        prompt:
          "Choose a real example. Set the context, stakes, your role and the outcome you owned. Keep background concise and distinguish your responsibility from the team’s.",
        evidence: "A specific situation and clear personal accountability.",
      },
      {
        id: "action",
        title: "Actions & judgment",
        prompt:
          "Explain what you personally did and why. Include alternatives, constraints, collaboration and how you handled disagreement. Use “I” for your actions and credit others accurately.",
        evidence:
          "Concrete actions, decision rationale and respectful collaboration.",
      },
      {
        id: "result",
        title: "Results & evidence",
        prompt:
          "State the result and how you know. Use honest quantitative or qualitative evidence. Separate your contribution from external factors and acknowledge unfinished work.",
        evidence:
          "A credible outcome linked to actions without invented metrics.",
      },
      {
        id: "reflection",
        title: "Learning & transfer",
        prompt:
          "What would you change? Describe feedback, a lasting behavior change and how you would apply that learning in a future role. Answer the interviewer’s follow-up directly.",
        evidence:
          "Specific self-awareness and a demonstrated change in behavior.",
      },
    ],
  },
};
export const INTERVIEW_SCENARIOS = bank as InterviewScenario[];
export const interviewScenario = (id: string) =>
  INTERVIEW_SCENARIOS.find((s) => s.id === id);
export interface InterviewSession {
  id: string;
  scenarioId: string;
  duration: number;
  startedAt: number;
  deadline: number;
  answers: Record<string, string>;
  notes: string;
  revealed: number;
}
export interface CompletedInterview extends InterviewSession {
  finishedAt: number;
  reason: "submitted" | "expired";
  ratings: Record<string, number>;
  reflection: string;
}
export interface InterviewState {
  version: 1;
  active: InterviewSession | null;
  history: CompletedInterview[];
}
export const EMPTY_INTERVIEWS: InterviewState = {
  version: 1,
  active: null,
  history: [],
};
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
const time = (v: unknown): v is number =>
  typeof v === "number" && Number.isSafeInteger(v) && v >= 0;
const text = (v: unknown, max = 20000): v is string =>
  typeof v === "string" && v.length <= max;
const keys = (v: Record<string, unknown>, allowed: string[]) =>
  Object.keys(v).every((k) => allowed.includes(k));
function isSession(v: unknown, completed = false): v is InterviewSession {
  if (!record(v) || !text(v.id, 120) || !v.id || !text(v.scenarioId, 100))
    return false;
  const scenario = interviewScenario(v.scenarioId);
  if (
    !scenario ||
    !INTERVIEW_DURATIONS.includes(v.duration as 15) ||
    !time(v.startedAt) ||
    !time(v.deadline) ||
    v.deadline !== v.startedAt + (v.duration as number) * 60000
  )
    return false;
  const stages = INTERVIEW_TRACKS[scenario.track].stages.map((s) => s.id);
  return (
    record(v.answers) &&
    Object.entries(v.answers).every(
      ([k, a]) => stages.includes(k) && text(a),
    ) &&
    text(v.notes) &&
    Number.isInteger(v.revealed) &&
    (v.revealed as number) >= 0 &&
    (v.revealed as number) <= scenario.followUps.length &&
    keys(v, [
      "id",
      "scenarioId",
      "duration",
      "startedAt",
      "deadline",
      "answers",
      "notes",
      "revealed",
      ...(completed ? ["finishedAt", "reason", "ratings", "reflection"] : []),
    ])
  );
}
export function isCompletedInterview(v: unknown): v is CompletedInterview {
  if (!isSession(v, true)) return false;
  const c = v as unknown as Record<string, unknown>;
  const stageIds = INTERVIEW_TRACKS[
    interviewScenario(v.scenarioId)!.track
  ].stages.map((s) => s.id);
  return (
    time(c.finishedAt) &&
    c.finishedAt >= v.startedAt &&
    c.finishedAt <= v.deadline &&
    (c.reason === "submitted" || c.reason === "expired") &&
    (c.reason !== "expired" || c.finishedAt === v.deadline) &&
    record(c.ratings) &&
    Object.entries(c.ratings).every(
      ([k, n]) =>
        stageIds.includes(k) &&
        typeof n === "number" &&
        Number.isInteger(n) &&
        n >= 0 &&
        n <= 4,
    ) &&
    text(c.reflection)
  );
}
export function isInterviewState(v: unknown): v is InterviewState {
  return (
    record(v) &&
    keys(v, ["version", "active", "history"]) &&
    v.version === 1 &&
    (v.active === null || isSession(v.active)) &&
    Array.isArray(v.history) &&
    v.history.length <= 50 &&
    v.history.every(isCompletedInterview) &&
    new Set(v.history.map((h) => h.id)).size === v.history.length &&
    !v.history.some((h) => record(v.active) && h.id === v.active.id)
  );
}
export function parseInterviews(raw: string | null): InterviewState {
  try {
    const v: unknown = JSON.parse(raw ?? "null");
    return isInterviewState(v) ? v : EMPTY_INTERVIEWS;
  } catch {
    return EMPTY_INTERVIEWS;
  }
}
export function startInterview(
  state: InterviewState,
  scenarioId: string,
  duration: number,
  now: number,
  id: string,
): InterviewState {
  if (
    state.active ||
    !interviewScenario(scenarioId) ||
    !INTERVIEW_DURATIONS.includes(duration as 15) ||
    !time(now) ||
    !id
  )
    return state;
  const next: InterviewState = {
    ...state,
    active: {
      id,
      scenarioId,
      duration,
      startedAt: now,
      deadline: now + duration * 60000,
      answers: {},
      notes: "",
      revealed: 0,
    },
  };
  return isInterviewState(next) ? next : state;
}
export function finishInterview(
  state: InterviewState,
  now: number,
): InterviewState {
  if (!state.active || !time(now)) return state;
  const expired = now >= state.active.deadline;
  const finished: CompletedInterview = {
    ...state.active,
    finishedAt: expired
      ? state.active.deadline
      : Math.max(now, state.active.startedAt),
    reason: expired ? "expired" : "submitted",
    ratings: {},
    reflection: "",
  };
  return {
    version: 1,
    active: null,
    history: [finished, ...state.history].slice(0, 50),
  };
}
export function expireInterview(
  state: InterviewState,
  now: number,
): InterviewState {
  return state.active && now >= state.active.deadline
    ? finishInterview(state, now)
    : state;
}
export function updateInterview(
  state: InterviewState,
  patch: Partial<Pick<InterviewSession, "answers" | "notes" | "revealed">>,
  now: number,
): InterviewState {
  const next = expireInterview(state, now);
  if (!next.active) return next;
  const candidate = { ...next, active: { ...next.active, ...patch } };
  return isInterviewState(candidate) ? candidate : next;
}
export function assessInterview(
  state: InterviewState,
  id: string,
  ratings: Record<string, number>,
  reflection: string,
): InterviewState {
  const next = {
    ...state,
    history: state.history.map((h) =>
      h.id === id ? { ...h, ratings, reflection } : h,
    ),
  };
  return isInterviewState(next) ? next : state;
}
export const RATING_ANCHORS = [
  "Not demonstrated",
  "Mentioned; little supporting detail",
  "Concrete approach; important gaps remain",
  "Clear evidence and justified decisions",
  "Strong evidence, alternatives and reflection",
];
/** A deterministic mean of all four self-ratings. Missing ratings never count as readiness. */
export function interviewScore(session: CompletedInterview): number | null {
  const stages =
    INTERVIEW_TRACKS[interviewScenario(session.scenarioId)!.track].stages;
  return stages.every((s) => Object.hasOwn(session.ratings, s.id))
    ? Math.round(
        (stages.reduce((n, s) => n + session.ratings[s.id], 0) /
          (stages.length * 4)) *
          100,
      )
    : null;
}
export function interviewReadiness(state: InterviewState) {
  return (Object.keys(INTERVIEW_TRACKS) as InterviewTrack[]).map((track) => {
    const completed = state.history.filter(
      (h) => interviewScenario(h.scenarioId)?.track === track,
    );
    const scored = completed.filter((h) => interviewScore(h) !== null);
    return {
      track,
      completed: completed.length,
      assessed: scored.length,
      score: scored.length
        ? Math.round(
            scored.reduce((n, h) => n + interviewScore(h)!, 0) / scored.length,
          )
        : null,
      latestAt: completed[0]?.finishedAt ?? null,
      caveat:
        "Self-rated practice evidence; not an objective hiring prediction.",
    };
  });
}
