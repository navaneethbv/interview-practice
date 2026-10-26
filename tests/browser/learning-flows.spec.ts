import { expect, test } from "@playwright/test";
import { serveCdnFromNodeModules } from "./cdn";

test.beforeEach(({ context }) => serveCdnFromNodeModules(context));

test("business SQL runs in real browser SQLite and refuses writes", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto("/practice/labs/sql");
  await page
    .getByLabel("Your query", { exact: true })
    .fill("SELECT order_id, amount FROM orders ORDER BY order_id;");
  await page.getByRole("button", { name: "Run query", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Matches expected columns and rows",
    { timeout: 90000 },
  );
  await page
    .getByLabel("Your query", { exact: true })
    .fill("DELETE FROM orders;");
  await page.getByRole("button", { name: "Run query", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    /not authorized|read.only|SELECT|denied/i,
    { timeout: 90000 },
  );
  await page.reload();
  await expect(page.getByText("1 / 12 matched", { exact: true })).toBeVisible();
});

test("saved lesson and editable mistake survive reload and keep the source link", async ({
  page,
}) => {
  await page.goto("/learn/two-pointers-introduction");
  await page
    .getByRole("button", { name: /^Bookmark / })
    .first()
    .click();
  await page
    .getByRole("link", { name: "Record a mistake", exact: true })
    .click();
  await expect(
    page.getByLabel("Internal link (optional)", { exact: true }),
  ).toHaveValue("/learn/two-pointers-introduction");
  await page
    .getByLabel("Question or topic")
    .fill("Why does this pointer move?");
  await page
    .getByLabel("My mistaken reasoning")
    .fill("I moved both pointers without checking the ordering invariant.");
  await page
    .getByLabel("Corrected reasoning / what to try next")
    .fill("Explain which value can still improve the result.");
  await page.getByLabel("Review due date").fill("2026-11-01");
  await page.getByRole("button", { name: "Add mistake", exact: true }).click();
  await page.reload();
  const note = page.locator("article").filter({
    has: page.getByRole("heading", { name: "Why does this pointer move?" }),
  });
  await expect(note).toContainText("ordering invariant");
  await note
    .getByRole("button", { name: "Edit / reschedule", exact: true })
    .click();
  await page
    .getByLabel("Corrected reasoning / what to try next")
    .fill("Updated correction with a concrete counterexample.");
  await page.getByRole("button", { name: "Save changes", exact: true }).click();
  await page.reload();
  await expect(note).toContainText("Updated correction");
  await expect(
    page.locator('main a[href="/learn/two-pointers-introduction"]').first(),
  ).toBeVisible();
});

test("BA bookmark hashes stay navigable after using lesson controls", async ({
  page,
}) => {
  await page.goto("/business-analyst/foundations#lesson-2");
  await expect(page.locator("h2#lesson-2")).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.locator("h2#lesson-1")).toBeVisible();
  await page.evaluate(() => {
    location.hash = "lesson-2";
  });
  await expect(page.locator("h2#lesson-2")).toBeVisible();
  await page.reload();
  await expect(page.locator("h2#lesson-2")).toBeVisible();
});

test("a structured interview preserves active answers and exposes the debrief only after finishing at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/practice/interviews");
  await page
    .getByRole("combobox", { name: "Duration", exact: true })
    .selectOption("15");
  await page
    .getByRole("button", { name: "Start timed round", exact: true })
    .click();
  await page
    .getByLabel("Your answer · speak aloud, then capture the evidence")
    .fill(
      "Scope: 1000 users, read-heavy traffic, explicit latency and availability targets.",
    );
  await expect(page.getByRole("heading", { name: /: debrief$/ })).toHaveCount(
    0,
  );
  await page.reload();
  await expect(
    page.getByLabel("Your answer · speak aloud, then capture the evidence"),
  ).toHaveValue(/1000 users/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Finish & debrief", exact: true })
    .click();
  await page.getByRole("button", { name: "Finish round", exact: true }).click();
  await expect(page.getByRole("heading", { name: /: debrief$/ })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.reload();
  await page.getByText("Your saved answer", { exact: true }).first().click();
  await expect(
    page.getByText("1000 users", { exact: false }).first(),
  ).toBeVisible();
});

test("lab drafts and rubric checks are saved and practice/answer workbooks download", async ({
  page,
}) => {
  await page.goto("/practice/labs/returns-transformation");
  await page
    .getByLabel("Your working draft", { exact: true })
    .fill("REQ-01: The refund status must be visible to the customer.");
  await page.locator('main input[type="checkbox"]').first().check();
  await page.reload();
  await expect(
    page.getByLabel("Your working draft", { exact: true }),
  ).toHaveValue(/REQ-01/);
  await expect(
    page.locator('main input[type="checkbox"]').first(),
  ).toBeChecked();
  await page.goto("/practice/labs");
  const links = page.locator('a[href$=".xlsx"]');
  await expect(links).toHaveCount(6);
  for (let i = 0; i < (await links.count()); i++) {
    const href = await links.nth(i).getAttribute("href");
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
    const bytes = await response.body();
    expect(bytes.subarray(0, 2).toString()).toBe("PK");
  }
});

test("appearance preferences persist with the same guarded keys backed up by account sync", async ({
  page,
}) => {
  await page.goto("/practice/today");
  await page
    .getByRole("button", { name: "Choose color theme", exact: true })
    .click();
  const palette = page.getByRole("dialog", { name: "Color themes" });
  await palette.getByRole("button", { name: /Sage|Pine/ }).click();
  await palette.getByRole("button", { name: "Dark", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-color-theme",
    "sage",
  );
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("ip:appearance:v1")!),
    ),
  ).toEqual({ palette: "sage", mode: "dark" });
});

test("legacy appearance is migrated before export without requiring a preference change", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("ip:appearance:v1")) {
      localStorage.setItem("interview-practice-color-theme", "ocean");
      localStorage.setItem("theme", "dark");
    }
  });
  await page.goto("/practice/today");
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("ip:appearance:v1")))
    .toBe(JSON.stringify({ palette: "ocean", mode: "dark" }));
  await expect(page.locator("html")).toHaveAttribute(
    "data-color-theme",
    "ocean",
  );
});

test("tabs do not fight over a failed canonical appearance write", async ({
  page,
  context,
}) => {
  await page.goto("/practice/today");
  await page.evaluate(() => {
    localStorage.setItem(
      "ip:appearance:v1",
      JSON.stringify({ palette: "classic", mode: "light" }),
    );
    localStorage.setItem("theme", "light");
  });
  await page.reload();
  const quotaTab = await context.newPage();
  await quotaTab.addInitScript(() => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "ip:appearance:v1")
        throw new DOMException("Full", "QuotaExceededError");
      return set.call(this, key, value);
    };
  });
  await quotaTab.goto("/practice/today");
  await quotaTab
    .getByRole("button", { name: "Switch to dark mode", exact: true })
    .click();
  await expect(quotaTab.locator("html")).toHaveClass(/dark/);
  await expect(page.locator("html")).toHaveClass(/dark/);
  // A legacy storage event must not cause the other tab to keep reasserting its
  // older canonical mode, which would ping-pong writes between the two tabs.
  for (let i = 0; i < 3; i++)
    await page.evaluate(() =>
      window.dispatchEvent(
        new StorageEvent("storage", { key: "theme", newValue: "dark" }),
      ),
    );
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("ip:appearance:v1")!).mode,
    ),
  ).toBe("light");
  await quotaTab.close({ runBeforeUnload: false });
});
