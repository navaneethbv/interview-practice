import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  EMPTY_INTERVIEWS,
  INTERVIEW_SCENARIOS,
  INTERVIEW_TRACKS,
  startInterview,
  updateInterview,
  expireInterview,
  finishInterview,
  parseInterviews,
  isInterviewState,
  assessInterview,
  interviewScore,
  interviewReadiness,
} from "./interview-data";
import { useInterviews } from "./interview-store";

const start = () =>
  startInterview(EMPTY_INTERVIEWS, "sd-ticketing", 15, 1_000_000, "round-1");
test("scenario bank has four substantive, unique cases per track and full stage coverage", () => {
  assert.equal(
    new Set(INTERVIEW_SCENARIOS.map((s) => s.id)).size,
    INTERVIEW_SCENARIOS.length,
  );
  for (const track of Object.keys(INTERVIEW_TRACKS)) {
    const scenarios = INTERVIEW_SCENARIOS.filter((s) => s.track === track);
    assert.ok(scenarios.length >= 4);
    scenarios.forEach((s) => {
      assert.ok(s.brief.length > 80);
      assert.ok(s.context.length >= 2);
      assert.equal(s.followUps.length, 3);
      assert.ok(s.debrief.length >= 3);
    });
  }
});
test("reload preserves exact deadline, answers, notes and reveals without extending time", () => {
  const initial = start();
  const edited = updateInterview(
    initial,
    {
      answers: {
        requirements:
          "Peak demand, admission control and inventory invariants.",
      },
      notes: "Clarify reservation duration",
      revealed: 1,
    },
    1_000_500,
  );
  const resumed = parseInterviews(JSON.stringify(edited));
  assert.deepEqual(resumed, edited);
  assert.equal(resumed.active!.deadline, 1_900_000);
  assert.equal(expireInterview(resumed, 1_899_999), resumed);
  const expired = expireInterview(resumed, 1_900_000);
  assert.equal(expired.active, null);
  assert.equal(expired.history[0].finishedAt, 1_900_000);
  assert.equal(expired.history[0].reason, "expired");
  assert.deepEqual(expired.history[0].answers, edited.active!.answers);
  assert.equal(expireInterview(expired, 9_999_999), expired);
});
test("sleep and reload past deadline finish at deadline and reject late edits", () => {
  const resumed = parseInterviews(JSON.stringify(start()));
  const slept = updateInterview(
    resumed,
    { notes: "This late answer must not be saved" },
    8_000_000,
  );
  assert.equal(slept.active, null);
  assert.equal(slept.history[0].notes, "");
  assert.equal(slept.history[0].finishedAt, 1_900_000);
  assert.ok(isInterviewState(slept));
});
test("early submission freezes a separate history record and retake receives a fresh deadline", () => {
  const completed = finishInterview(start(), 1_060_000);
  assert.equal(completed.history[0].reason, "submitted");
  assert.equal(completed.history[0].finishedAt, 1_060_000);
  const retake = startInterview(
    completed,
    "sd-ticketing",
    30,
    2_000_000,
    "round-2",
  );
  assert.equal(retake.active!.deadline, 3_800_000);
  assert.deepEqual(retake.active!.answers, {});
  assert.deepEqual(retake.history, completed.history);
  assert.equal(
    startInterview(retake, "sd-files", 15, 2_000_001, "round-3"),
    retake,
  );
});
test("strict backup validation rejects malformed state and unbounded payloads safely", () => {
  const valid = start();
  assert.ok(isInterviewState(valid));
  for (const candidate of [
    null,
    [],
    {},
    { ...valid, version: 2 },
    { ...valid, extra: 1 },
    { ...valid, active: { ...valid.active, deadline: 42 } },
    { ...valid, active: { ...valid.active, scenarioId: "unknown" } },
    { ...valid, active: { ...valid.active, notes: "x".repeat(20001) } },
    {
      ...valid,
      active: { ...valid.active, answers: { arbitrary: "injected field" } },
    },
    { ...valid, active: { ...valid.active, revealed: 99 } },
    { ...valid, active: { ...valid.active, ratings: { requirements: 4 } } },
  ]) {
    assert.equal(isInterviewState(candidate), false);
    assert.deepEqual(
      parseInterviews(JSON.stringify(candidate)),
      EMPTY_INTERVIEWS,
    );
  }
  assert.deepEqual(parseInterviews("{"), EMPTY_INTERVIEWS);
  const completed = finishInterview(valid, 1_060_000);
  assert.equal(
    isInterviewState({
      ...completed,
      history: [completed.history[0], completed.history[0]],
    }),
    false,
  );
  assert.equal(
    isInterviewState({
      ...completed,
      history: [{ ...completed.history[0], ratings: { requirements: 8 } }],
    }),
    false,
  );
});
test("self-assessment needs all dimensions; readiness excludes partial rounds and is deterministic", () => {
  let state = finishInterview(start(), 1_060_000);
  assert.equal(interviewScore(state.history[0]), null);
  state = assessInterview(
    state,
    "round-1",
    { requirements: 4 },
    "Need concrete API examples",
  );
  assert.equal(interviewReadiness(state)[0].score, null);
  state = assessInterview(
    state,
    "round-1",
    { requirements: 4, architecture: 3, scale: 2, operations: 3 },
    "Need concrete API examples",
  );
  assert.equal(interviewScore(state.history[0]), 75);
  assert.deepEqual(interviewReadiness(state)[0], {
    track: "system-design",
    completed: 1,
    assessed: 1,
    score: 75,
    latestAt: 1_060_000,
    caveat: "Self-rated practice evidence; not an objective hiring prediction.",
  });
  const rejected = assessInterview(
    state,
    "round-1",
    { requirements: 9 },
    "bad",
  );
  assert.equal(rejected, state);
});
test("SSR hook uses a stable empty snapshot without touching browser storage", () => {
  function Probe() {
    const state = useInterviews();
    return React.createElement(
      "p",
      null,
      state.active ? "active" : `empty:${state.history.length}`,
    );
  }
  assert.equal(renderToString(React.createElement(Probe)), "<p>empty:0</p>");
});
