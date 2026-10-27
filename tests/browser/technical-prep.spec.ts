import { expect, test } from "@playwright/test";
for (const width of [320, 768, 1024, 1366, 2560]) {
  test(`technical theory and questions at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/interview-prep");
    await expect(
      page.getByRole("heading", {
        name: "Technical interview prep",
        exact: true,
      }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.goto("/interview-prep/algorithms/search-and-windows");
    await expect(
      page.getByRole("heading", {
        name: "Binary search, two pointers and sliding windows",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("complementary", { name: "Big O analysis" }),
    ).toBeVisible();
    await page.getByText("Check your reasoning", { exact: true }).click();
    await expect(
      page.getByText("The empty array returns 0.", { exact: false }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.goto("/interview-prep/java");
    await page.getByRole("searchbox").fill("volatile atomic");
    await page
      .getByLabel("Difficulty", { exact: true })
      .selectOption("Advanced");
    await expect(
      page.getByRole("heading", {
        name: "volatile, synchronized or atomic variable?",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator("section[aria-labelledby=question-bank] output")).toHaveText("1 of 20 questions");
    await page.locator("#java-volatile").getByText("Reveal answer and example", { exact: true }).click();
    await expect(
      page.getByText("Use AtomicInteger.incrementAndGet", { exact: false }),
    ).toBeVisible();
    await page.getByRole("searchbox").fill("no-such-term");
    await expect(
      page.getByText("No questions match.", { exact: false }),
    ).toBeVisible();
  });
}
