import { expect, test } from "@playwright/test";

const lesson = "/learn/two-pointers-introduction";

test("reader preferences persist and focus cannot escape the visible reader", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(lesson);
  await page
    .getByRole("combobox", { name: "Text size", exact: true })
    .selectOption("24");
  await page
    .getByRole("combobox", { name: "Line spacing", exact: true })
    .selectOption("2");
  await page
    .getByRole("combobox", { name: "Reading width", exact: true })
    .selectOption("32");
  await page
    .getByRole("combobox", { name: "Speed", exact: true })
    .selectOption("1.2");
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Text size", exact: true }),
  ).toHaveValue("24");
  await expect(
    page.getByRole("combobox", { name: "Line spacing", exact: true }),
  ).toHaveValue("2");
  await expect(
    page.getByRole("combobox", { name: "Reading width", exact: true }),
  ).toHaveValue("32");
  await expect(
    page.getByRole("combobox", { name: "Speed", exact: true }),
  ).toHaveValue("1.2");
  const enter = page.getByRole("button", { name: "Reader mode", exact: true });
  await enter.focus();
  await enter.click();
  await expect(
    page.getByRole("dialog", { name: "Lesson reader" }),
  ).toBeVisible();
  for (let i = 0; i < 24; i++) {
    await page.keyboard.press(i < 12 ? "Tab" : "Shift+Tab");
    expect(
      await page.evaluate(
        () => !!document.activeElement?.closest(".reader-page"),
      ),
    ).toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(enter).toBeFocused();
  expect(
    await page.evaluate(() => document.querySelectorAll("[inert]").length),
  ).toBe(0);
  await enter.click();
  await page
    .getByRole("button", { name: "Exit reader mode" })
    .click({ button: "right" });
  await expect(enter).toBeFocused();
});

test("speech really pauses/resumes and canceled callbacks cannot duplicate playback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = {
      spoken: [] as SpeechSynthesisUtterance[],
      pauses: 0,
      resumes: 0,
      cancels: 0,
    };
    Object.defineProperty(window, "__readerSpeech", { value: state });
    const synth = new EventTarget();
    Object.assign(synth, {
      getVoices: () => [],
      speak: (utterance: SpeechSynthesisUtterance) =>
        state.spoken.push(utterance),
      cancel: () => {
        state.cancels++;
      },
      pause: () => {
        state.pauses++;
      },
      resume: () => {
        state.resumes++;
      },
    });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: synth,
    });
  });
  await page.goto(lesson);
  await page.getByRole("button", { name: "Read aloud", exact: true }).click();
  await expect(page.locator("[data-reading-active]")).toHaveCount(1);
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await page.getByRole("button", { name: "Resume audio", exact: true }).click();
  expect(
    await page.evaluate(() => {
      const state = (
        window as unknown as {
          __readerSpeech: {
            pauses: number;
            resumes: number;
            spoken: unknown[];
          };
        }
      ).__readerSpeech;
      return [state.pauses, state.resumes, state.spoken.length];
    }),
  ).toEqual([1, 1, 1]);
  await page.getByRole("button", { name: "Stop", exact: true }).click();
  await page.getByRole("button", { name: "Read aloud", exact: true }).click();
  await page.evaluate(() => {
    const state = (
      window as unknown as {
        __readerSpeech: { spoken: SpeechSynthesisUtterance[] };
      }
    ).__readerSpeech;
    state.spoken[0].dispatchEvent(new Event("end"));
    state.spoken[0].onend?.call(state.spoken[0], {} as SpeechSynthesisEvent);
  });
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { __readerSpeech: { spoken: unknown[] } })
          .__readerSpeech.spoken.length,
    ),
  ).toBe(2);
  await page.evaluate(() => {
    const state = (
      window as unknown as {
        __readerSpeech: { spoken: SpeechSynthesisUtterance[] };
      }
    ).__readerSpeech;
    state.spoken[1].onend?.call(state.spoken[1], {} as SpeechSynthesisEvent);
  });
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { __readerSpeech: { spoken: unknown[] } })
          .__readerSpeech.spoken.length,
    ),
  ).toBe(3);
  await page.getByRole("button", { name: "Stop", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Read from saved position" }),
  ).toBeVisible();
});

test("production download survives disconnected navigation and can be removed", async ({
  page,
  context,
}) => {
  test.skip(
    !process.env.CI && !process.env.TEST_OFFLINE_PRODUCTION,
    "Service worker registration is intentionally production-only.",
  );
  await page.goto(lesson);
  await page
    .getByRole("button", { name: "Download lesson", exact: true })
    .click();
  await expect(page.getByText(/Lesson saved\./)).toBeVisible({
    timeout: 90000,
  });
  await page.goto("/offline");
  await expect(
    page.getByRole("button", { name: "Remove download", exact: false }),
  ).toHaveCount(1);
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Offline lessons", exact: true }),
  ).toBeVisible();
  await page.locator('main a[href="/learn/two-pointers-introduction"]').click();
  await expect(page.locator("#reader-content")).toBeVisible();
  await expect(
    page.getByRole("combobox", { name: "Text size", exact: true }),
  ).toBeVisible();
  await page.goto("/offline");
  await page
    .getByRole("button", { name: "Remove download", exact: false })
    .click();
  await expect(page.getByText(/No downloads yet/)).toBeVisible();
  const privateCaches = await page.evaluate(async () => {
    const paths: string[] = [];
    for (const name of await caches.keys()) {
      const cache = await caches.open(name);
      for (const key of await cache.keys())
        paths.push(new URL(key.url).pathname);
    }
    return paths.filter((path) => /\/(api|auth|sync)\//.test(path));
  });
  expect(privateCaches).toEqual([]);
});
