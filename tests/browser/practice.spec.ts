import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { serveCdnFromNodeModules } from "./cdn";

const problem = "/problems/lc/two-sum?set=blind-75";
const draft = "# browser regression draft\nclass Solution:\n    pass";
const codeKey = "ip:code:lc:two-sum:python";

async function edit(page: Page, text: string) {
  await page.locator(".monaco-editor .view-lines").click();
  await page.keyboard.press("Control+a");
  await page.keyboard.insertText(text);
}

test.beforeEach(({ context }) => serveCdnFromNodeModules(context));

test("drafts survive reload, language switches, cancelled resets and recovery", async ({ page }) => {
  await page.goto(problem);
  await edit(page, draft);
  await expect.poll(() => page.evaluate((key) => localStorage.getItem(key), codeKey)).toBe(draft);
  await page.getByRole("combobox", { name: "Language", exact: true }).selectOption("java");
  await page.getByRole("combobox", { name: "Language", exact: true }).selectOption("python");
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("button", { name: "Reset to starter code" }).click();
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Reset to starter code" }).click();
  await expect(page.locator(".view-lines")).not.toContainText("browser regression draft");
  await page.reload();
  await page.getByRole("button", { name: "Restore pre-reset draft" }).click();
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
  await page.reload();
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
});

test("quota failures are visible and drafts remain downloadable and retryable", async ({ page }) => {
  await page.addInitScript(() => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith("ip:code:") && !sessionStorage.getItem("allow-writes")) throw new DOMException("Full", "QuotaExceededError");
      return set.call(this, key, value);
    };
  });
  await page.goto(problem);
  await edit(page, draft);
  await expect(page.getByRole("complementary", { name: "Unsaved practice data" })).toContainText("held in this tab only");
  const leaveWarning = page.waitForEvent("dialog");
  const reload = page.evaluate(() => window.location.reload());
  const warning = await leaveWarning;
  expect(warning.type()).toBe("beforeunload");
  await warning.dismiss();
  await reload;
  await page.getByRole("combobox", { name: "Language", exact: true }).selectOption("java");
  await page.getByRole("combobox", { name: "Language", exact: true }).selectOption("python");
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download code" }).click();
  const download = await downloadEvent;
  expect(await readFile((await download.path())!, "utf8")).toBe(draft);
  await page.evaluate(() => sessionStorage.setItem("allow-writes", "yes"));
  await page.getByRole("button", { name: "Retry saving" }).click();
  await expect(page.getByRole("complementary", { name: "Unsaved practice data" })).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
});

test("malformed history is recoverable and workspace tabs support keyboard navigation", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ip:subs:lc:two-sum", "[null,{}]"));
  await page.goto(problem);
  const description = page.getByRole("tab", { name: "Description", exact: true });
  await description.focus();
  await description.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Solution", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Solution", exact: true })).toBeVisible();
  await page.getByRole("tab", { name: "Solution", exact: true }).press("End");
  await expect(page.getByRole("tabpanel", { name: "Submissions", exact: true })).toContainText("No submissions yet");
  await page.getByRole("tab", { name: "Submissions", exact: true }).press("Home");
  await expect(description).toBeFocused();
  const firstCase = page.getByRole("tab", { name: "Case 1", exact: true });
  await firstCase.focus();
  await firstCase.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Case 2", exact: true })).toBeFocused();
});

test("filters survive refresh and history navigation", async ({ page }) => {
  await page.goto("/problems/sets/blind-75");
  await page.getByRole("textbox", { name: "Search problems" }).fill("sum");
  await page.getByLabel("Difficulty", { exact: true }).selectOption("easy");
  await page.getByLabel("Status", { exact: true }).selectOption("todo");
  await page.reload();
  await expect(page.getByRole("textbox", { name: "Search problems" })).toHaveValue("sum");
  await expect(page.getByLabel("Difficulty", { exact: true })).toHaveValue("easy");
  await expect(page.getByLabel("Status", { exact: true })).toHaveValue("todo");
  await page.getByLabel("Difficulty", { exact: true }).selectOption("hard");
  await page.goBack();
  await expect(page.getByLabel("Difficulty", { exact: true })).toHaveValue("easy");
  await page.goForward();
  await expect(page.getByLabel("Difficulty", { exact: true })).toHaveValue("hard");
});

test("backup export and confirmed import restore a saved draft", async ({ page }) => {
  await page.goto(problem);
  await edit(page, draft);
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByText("Back up or restore practice data", { exact: true }).click();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export backup", exact: true }).click();
  const file = (await (await downloadEvent).path())!;
  const backup = JSON.parse(await readFile(file, "utf8"));
  expect(backup.entries[codeKey]).toBe(draft);
  await page.evaluate((key) => localStorage.setItem(key, "replacement"), codeKey);
  await page.getByLabel("Choose practice backup").setInputFiles(file);
  await expect(page.getByRole("button", { name: "Restore backup", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(page.getByLabel("Choose practice backup")).toHaveValue("");
  await page.getByLabel("Choose practice backup").setInputFiles(file);
  await expect(page.getByRole("button", { name: "Restore backup", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Restore backup", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Backup restored");
  await page.reload();
  await page.getByRole("link", { name: /Last problem.*Two Sum/ }).click();
  await expect(page).toHaveURL(/two-sum\?set=blind-75/);
  await expect(page.locator(".view-lines")).toContainText("browser regression draft");
});

test("mobile home and workbook remain within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/problems/sets/blind-75", problem]) {
    await page.goto(path);
    await expect(page.getByRole("button", { name: /Switch to .* mode/ })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (path === "/") {
      await page.getByRole("button", { name: "Switch to dark mode" }).click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      await page.getByText("Back up or restore practice data", { exact: true }).click();
      await expect(page.getByRole("button", { name: "Export backup", exact: true })).toBeVisible();
    }
  }
});

test("problem hub groups lists and the switcher moves between them", async ({ page }) => {
  await page.goto("/problems");
  await expect(page.getByRole("heading", { name: "Company lists" })).toBeVisible();
  await page.getByRole("textbox", { name: "Filter lists" }).fill("nvidia");
  await expect(page.getByRole("heading", { name: "Study plans" })).toHaveCount(0);
  await page.getByRole("link", { name: /NVIDIA/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "NVIDIA" })).toBeVisible();
  await page.getByRole("combobox", { name: "Switch list" }).selectOption("/problems/sets/blind-75");
  await expect(page.getByRole("heading", { level: 1, name: "Blind 75" })).toBeVisible();
  await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Problems" }).click();
  await expect(page).toHaveURL(/\/problems$/);
});

test("command palette jumps to a problem from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const input = page.getByRole("combobox", { name: "Search the site" });
  await expect(input).toBeFocused();
  await input.fill("two sum");
  await expect(page.getByRole("option").first()).toContainText("1. Two Sum");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/problems\/lc\/two-sum$/);
});

test("mobile menu opens, navigates and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: /Guides/ }).click();
  await expect(page).toHaveURL(/\/system-design$/);
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  for (const path of ["/problems", "/problems/sets/nvidia", "/system-design"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
