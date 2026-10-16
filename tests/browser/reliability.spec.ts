import { expect, test } from "@playwright/test";
import { serveCdnFromNodeModules } from "./cdn";

const problem = "/problems/lc/two-sum";
test.beforeEach(({ context }) => serveCdnFromNodeModules(context));

test("mock expiry unlocks the solution on a phone and persists one debrief", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const now = Date.now();
  await page.clock.setFixedTime(now);
  await page.addInitScript((startedAt) => {
    if (sessionStorage.getItem("seeded")) return;
    sessionStorage.setItem("seeded", "yes");
    localStorage.setItem("ip:mock:v1", JSON.stringify({
      active: { startedAt, minutes: 1, source: "blind-75", problems: ["lc:two-sum"] }, history: [],
    }));
  }, now);
  await page.goto(problem);
  await page.getByRole("tab", { name: "Solution", exact: true }).click();
  await expect(page.getByText("The walkthrough is hidden during your mock interview")).toBeVisible();
  await page.clock.setFixedTime(now + 60_001);
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.getByText("The walkthrough is hidden during your mock interview")).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("ip:mock:v1")!).active)).toBeNull();
  await page.goto("/practice");
  await expect(page.getByRole("heading", { name: "Debrief" })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Past interviews (1)")).toBeVisible();
  const history = await page.evaluate(() => JSON.parse(localStorage.getItem("ip:mock:v1")!).history);
  expect(history).toHaveLength(1);
  expect(history[0].endedAt).toBe(now + 60_000);
});

test("runner outage keeps a phone draft and does not record a failed submission", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const draft = "class Solution { public int[] twoSum(int[] nums, int target) { return new int[]{0, 1}; } }";
  await page.addInitScript((code) => {
    localStorage.setItem("ip:code:lc:two-sum:java", code);
    localStorage.setItem("ip:prefs:v1", JSON.stringify({ lang: "java", fontSize: 14 }));
  }, draft);
  await page.route("**/api/run/java", (route) => route.fulfill({ status: 503, json: { error: "unavailable" } }));
  await page.goto(problem);
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Internal Error" })).toBeVisible();
  await expect(page.getByText(/Java runner is currently unavailable/)).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("ip:code:lc:two-sum:java"))).toBe(draft);
  expect(await page.evaluate(() => localStorage.getItem("ip:subs:lc:two-sum"))).toBeNull();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const width of [390, 768]) {
  test(`company evidence and populated practice history fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/problems/sets/google");
    const sources = page.getByText(/^Sources and dates/).first();
    await sources.click();
    const evidence = sources.locator("..");
    await expect(evidence.locator("time").first()).toBeVisible();
    await expect(evidence.getByRole("link").first()).toHaveAttribute("href", /^https:\/\//);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => localStorage.setItem("ip:mock:v1", JSON.stringify({ active: null, history: [{
      startedAt: 1000, endedAt: 61000, minutes: 1, source: "object-oriented-design", problems: ["lc:two-sum"], solved: [], ratings: { Coding: 3 },
    }] })));
    await page.goto("/practice");
    await page.getByText("Past interviews (1)").click();
    await expect(page.getByRole("cell", { name: "Object-Oriented Design", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("restoring a backup immediately updates the review queue", async ({ page }) => {
  await page.goto("/practice");
  await expect(page.getByText("Solve a problem to start your review queue.")).toBeVisible();
  await page.getByText("Back up or restore practice data", { exact: true }).click();
  const backup = { format: "interview-practice", version: 1, exportedAt: new Date().toISOString(), entries: {
    "ip:review:v1": JSON.stringify({ "lc:two-sum": { step: 0, due: 0, last: 0 } }),
  } };
  await page.getByLabel("Choose practice backup").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(backup)) });
  await page.getByRole("button", { name: "Restore backup", exact: true }).click();
  await expect(page.locator("#review").getByRole("link", { name: /Two Sum/ })).toBeVisible();
  await page.reload();
  await expect(page.locator("#review").getByRole("link", { name: /Two Sum/ })).toBeVisible();
});
