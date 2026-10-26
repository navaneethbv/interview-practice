import { expect, test } from "@playwright/test";

const routes = [
  "/practice/today",
  "/practice/notebook",
  "/practice/readiness",
  "/practice/labs",
  "/practice/labs/sql",
  "/practice/labs/returns-transformation",
  "/practice/interviews",
  "/offline",
  "/settings/sync",
  "/content-status",
];
const viewports = [
  { name: "phone", width: 320, height: 740 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 768 },
  { name: "large", width: 2560, height: 1440 },
];

for (const viewport of viewports) {
  test(`learning platform smoke at ${viewport.name} size`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(
        page.getByRole("heading", { level: 1 }),
        route,
      ).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow, `${route} must fit ${viewport.name}`).toBe(false);
    }
  });
}

test("content status filters retain honest unknown dates and original sources", async ({
  page,
}) => {
  await page.goto("/content-status");
  await page.getByRole("link", { name: "Unknown dates", exact: true }).click();
  await expect(page).toHaveURL(/filter=unknown/);
  await expect(page.locator("article").first()).toContainText("Unknown");
  await expect(
    page.locator('article a[href^="https://"]').first(),
  ).toBeVisible();
  await page.getByRole("link", { name: "Review overdue", exact: true }).click();
  await expect(page).toHaveURL(/filter=stale/);
  // The stale set changes with calendar time; every returned collection must be labeled overdue.
  for (const article of await page.locator("article").all())
    await expect(article).toContainText("Review overdue");
});

test("reader mode restores focus on Escape and reading preferences survive reload", async ({
  page,
}) => {
  await page.goto("/system-design/grokking/cap-theorem");
  await page
    .getByRole("combobox", { name: "Text size", exact: true })
    .selectOption("24");
  await page
    .getByRole("combobox", { name: "Reading width", exact: true })
    .selectOption("32");
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Text size", exact: true }),
  ).toHaveValue("24");
  await expect(
    page.getByRole("combobox", { name: "Reading width", exact: true }),
  ).toHaveValue("32");
  await page.getByRole("button", { name: "Reader mode", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Lesson reader" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Tab");
  expect(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Lesson reader" })).toHaveCount(
    0,
  );
  await expect(
    page.getByRole("button", { name: "Reader mode", exact: true }),
  ).toBeFocused();
});
