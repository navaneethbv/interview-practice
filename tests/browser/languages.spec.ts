import { expect, test, type Page } from "@playwright/test";
import { serveCdnFromNodeModules } from "./cdn";

const problem = "/problems/lc/two-sum?set=blind-75";
const language = (page: Page) => page.getByRole("combobox", { name: "Language", exact: true });

async function edit(page: Page, text: string) {
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("Control+a");
  await page.keyboard.insertText(text);
}

test.beforeEach(({ context }) => serveCdnFromNodeModules(context));

const SOLUTIONS = {
  javascript: "var twoSum = function(nums, target) {\nconst seen = new Map();\nfor (let i = 0; i < nums.length; i++) {\nif (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];\nseen.set(nums[i], i);\n}\n};",
  typescript: "function twoSum(nums: number[], target: number): number[] {\nconst seen = new Map<number, number>();\nfor (let i = 0; i < nums.length; i++) {\nconst j = seen.get(target - nums[i]);\nif (j !== undefined) return [j, i];\nseen.set(nums[i], i);\n}\nreturn [];\n}",
  cpp: "class Solution {\npublic:\nvector<int> twoSum(vector<int>& nums, int target) {\nunordered_map<int, int> seen;\nfor (int i = 0; i < (int)nums.size(); i++) {\nif (seen.count(target - nums[i])) return {seen[target - nums[i]], i};\nseen[nums[i]] = i;\n}\nreturn {};\n}\n};",
  go: "func twoSum(nums []int, target int) []int {\nseen := map[int]int{}\nfor i, x := range nums {\nif j, ok := seen[target-x]; ok {\nreturn []int{j, i}\n}\nseen[x] = i\n}\nreturn nil\n}",
} as const;

for (const [lang, code] of Object.entries(SOLUTIONS)) {
  test(`${lang} solutions are judged and accepted`, async ({ page }) => {
    // CI serves a production build without a sandbox snapshot, so compiled languages have no runner there;
    // their harnesses are covered by the unit tests with local compilers.
    test.skip(!!process.env.CI && (lang === "cpp" || lang === "go"), "no code runner sandbox in CI");
    test.setTimeout(120_000);
    // Seed the saved draft directly; typing into Monaco would add auto-closed brackets and indentation.
    await page.addInitScript(([l, c]) => {
      localStorage.setItem(`ip:code:lc:two-sum:${l}`, c);
      localStorage.setItem("ip:prefs:v1", JSON.stringify({ lang: l, fontSize: 14 }));
    }, [lang, code]);
    await page.goto(problem);
    await expect(language(page)).toHaveValue(lang);
    await expect(page.locator(".view-lines")).toContainText("twoSum");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByRole("heading", { name: "Accepted" })).toBeVisible({ timeout: 90_000 });
  });
}

test("problems with helper types outside the core set stay Python and Java only", async ({ page }) => {
  await page.goto("/problems/lc/clone-graph");
  await expect(language(page).locator("option")).toHaveText(["Python3", "Java"]);
});

test("javascript syntax errors are compile errors", async ({ page }) => {
  await page.goto(problem);
  await language(page).selectOption("javascript");
  await edit(page, "var twoSum = function( {");
  await page.getByRole("button", { name: "Run", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Compile Error" })).toBeVisible();
});

test("a mock interview hides walkthroughs and accepted problems join the review queue", async ({ page }) => {
  await page.goto("/practice");
  await page.getByRole("combobox", { name: /^Problem list/ }).selectOption("blind-75");
  await page.getByRole("combobox", { name: /^Problems/ }).selectOption("1");
  await page.getByRole("button", { name: "Start interview" }).click();
  await expect(page.getByRole("button", { name: "End interview" })).toBeVisible();
  const link = page.locator("#mock ol a").first();
  const href = await link.getAttribute("href");
  await link.click();
  await expect(page).toHaveURL(new RegExp(href!));
  await expect(page.getByTitle("Mock interview: walkthroughs are hidden until you finish")).toBeVisible();
  await page.getByRole("tab", { name: "Solution" }).click();
  await expect(page.getByText("The walkthrough is hidden during your mock interview")).toBeVisible();

  await page.goto("/practice");
  await page.getByRole("button", { name: "End interview" }).click();
  await expect(page.getByRole("heading", { name: "Debrief" })).toBeVisible();
  await page.getByText("Solid").first().click();
  await page.getByRole("button", { name: "Save debrief" }).click();
  await expect(page.getByText("Past interviews (1)")).toBeVisible();

  // An accepted submission schedules the problem for review.
  await page.evaluate(() => localStorage.setItem("ip:review:v1", JSON.stringify({ "lc:two-sum": { step: 0, due: 0, last: 0 } })));
  await page.reload();
  await expect(page.locator("#review").getByRole("link", { name: /Two Sum/ })).toBeVisible();
  await page.locator("#review").getByRole("button", { name: /Remove/ }).click();
  await expect(page.locator("#review").getByText("Solve a problem to start your review queue.")).toBeVisible();
});

test("hints reveal one at a time and the complexity check compares answers", async ({ page }) => {
  await page.goto(problem);
  await page.getByRole("button", { name: "Show a hint" }).click();
  await expect(page.getByText("Topics: Array, Hashing.")).toBeVisible();
  await page.getByRole("button", { name: "Next hint" }).click();
  await expect(page.getByText(/Pattern to consider/)).toBeVisible();
  await page.getByLabel("Time").fill("O(n)");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(page.getByText("(matches yours)")).toBeVisible();
});

test("the study plan links problems", async ({ page }) => {
  await page.goto("/practice/plan");
  await expect(page.getByRole("heading", { name: "Week 1: Arrays & Hashing" })).toBeVisible();
  await expect(page.locator("#week-1").getByRole("link", { name: "Two Sum" })).toHaveAttribute("href", "/problems/lc/two-sum");
});

test("practice pages fit a phone screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/practice", "/practice/plan"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("concurrency problems offer threaded languages and run on real threads", async ({ page }) => {
  test.skip(!!process.env.CI, "no code runner sandbox in CI");
  test.setTimeout(120_000);
  const code = await (await import("node:fs/promises")).readFile("content/leetcode/print-in-order.java", "utf8");
  await page.addInitScript((c) => localStorage.setItem("ip:code:lc:print-in-order:java", c), code);
  await page.goto("/problems/lc/print-in-order");
  await expect(language(page).locator("option")).toHaveText(["Java", "C++", "Go"]);
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("heading", { name: "Accepted" })).toBeVisible({ timeout: 90_000 });
});

test("new interview guides render", async ({ page }) => {
  for (const [book, heading] of [["ai-assisted", "What changed and how these rounds are graded"], ["case-studies", "How to use these case studies"], ["career", "Write a resume that gets interviews"]]) {
    await page.goto(`/system-design/${book}`);
    await page.getByRole("link", { name: heading }).first().click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
  }
});
