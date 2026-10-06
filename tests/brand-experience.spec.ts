import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
  expect(widths.body).toBeLessThanOrEqual(widths.viewport + 1);
}

async function scrollToSectionCenter(page: Page, id: string) {
  await page.locator(`#${id}`).evaluate((section) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + Math.max(0, (section.clientHeight - window.innerHeight) / 2), behavior: "instant" });
  });
}

test("brand sections, images, and layout remain usable across viewport sizes", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Cherry Dolly/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/甘くて、\s*ごきげん。/);
  await expect(page.getByRole("link", { name: "カップケーキに会いにいく" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await expect.poll(() => page.locator(".hero img").evaluateAll((images) =>
    images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
  )).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("hero.png"), animations: "disabled" });

  await expect(page.locator("#lineup li")).toHaveCount(4);
  for (const name of ["Cherry Vanilla", "Lemon Cream", "Strawberry Milk", "Chocolate Sundae"]) {
    await expect(page.locator("#lineup").getByRole("heading", { name, exact: true })).toBeAttached();
  }

  for (const id of ["lineup", "our-recipe", "a-little-bite", "our-story"]) {
    const section = page.locator(`#${id}`);
    await expect(section.getByRole("heading", { level: 2 })).toBeAttached();
    await scrollToSectionCenter(page, id);
    if (id === "lineup" && testInfo.project.name !== "desktop") {
      // Offscreen cards load lazily; visit the end of the native scroller before checking every image.
      await page.locator(".lineup-viewport").evaluate((element) => element.scrollTo({ left: element.scrollWidth, behavior: "instant" }));
    }
    await expectNoHorizontalOverflow(page);
    await expect.poll(() => section.locator("img").evaluateAll((images) =>
      images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
    )).toBe(true);
  }
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Cherry Dolly、ページの先頭へ" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  expect(await page.locator("img").evaluateAll((images) => images.every((image) => !!(image as HTMLImageElement).alt.trim()))).toBe(true);
  expect(errors).toEqual([]);
});

test("a scroll milestone takes a bite, and keyboard and pointer controls restore and repeat it", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#a-little-bite");
  const button = section.getByRole("button");
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await scrollToSectionCenter(page, "a-little-bite");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(section.getByRole("img", { name: "ひとくち食べて、スポンジの断面が見えるバニラカップケーキ" })).toBeVisible();
  await expect(section.getByText("ぱくっ", { exact: true })).toBeVisible();
  await expect(section.locator('[aria-live="polite"]')).toContainText("ぱくっ");

  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await expect(section.getByRole("img", { name: "チェリーをのせた、ふわふわのバニラカップケーキ", exact: true })).toBeVisible();
  await page.keyboard.press("Space");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "false");
});

test("desktop vertical scroll moves the lineup to its last flavor", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop parallax is replaced by a native scroller at other sizes/preferences.");
  await page.goto("/");
  const section = page.locator("#lineup");
  const row = section.getByRole("list");
  await expect(section.locator(".lineup-viewport")).toHaveCSS("overflow-x", "hidden");
  await section.evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY, behavior: "instant" }));
  const start = await row.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  await section.evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + element.clientHeight - window.innerHeight, behavior: "instant" }));
  await expect.poll(() => row.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41)).toBeLessThan(start - 100);
  await expect(section.getByRole("heading", { name: "Chocolate Sundae", exact: true })).toBeInViewport();
});

test("mobile and reduced-motion users can scroll all flavors directly", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop", "Desktop uses scroll-linked motion.");
  await page.goto("/");
  const viewport = page.locator(".lineup-viewport");
  await viewport.scrollIntoViewIfNeeded();
  await expect(viewport).toHaveCSS("overflow-x", /^(auto|scroll)$/);
  const overflow = await viewport.evaluate((element) => element.scrollWidth - element.clientWidth);
  expect(overflow).toBeGreaterThan(0);
  await viewport.evaluate((element) => element.scrollTo({ left: element.scrollWidth, behavior: "instant" }));
  await expect.poll(() => viewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  await expect(page.locator("#lineup").getByRole("heading", { name: "Chocolate Sundae", exact: true })).toBeInViewport();
  await expectNoHorizontalOverflow(page);
});

test("mobile menu responds to the keyboard and closes after navigation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "The desktop navigation is shown at wider widths.");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "メニューを開く" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "メニューを閉じる" })).toHaveAttribute("aria-expanded", "true");
  const navigation = page.getByRole("navigation", { name: "モバイルナビゲーション" });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: /OUR STORY/ }).click();
  await expect(page).toHaveURL(/#our-story$/);
  await expect(navigation).toBeHidden();
  await expect(page.getByRole("button", { name: "メニューを開く" })).toHaveAttribute("aria-expanded", "false");
});

test("missing replaceable photography switches to the SVG artwork", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One project is sufficient to validate the shared image fallback.");
  await page.route("**/images/cupcake-vanilla.png", (route) => route.fulfill({ status: 404, contentType: "text/plain", body: "Missing optional photograph" }));
  await page.goto("/");
  const vanilla = page.locator(".hero-cake-vanilla img");
  await expect(vanilla).toHaveAttribute("src", "/images/placeholders/cupcake-vanilla.svg");
  await expect.poll(() => vanilla.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(vanilla).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("reduced motion removes floating and scroll transforms while keeping bite controls", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "reduced-motion", "This behavior requires the reduced-motion browser preference.");
  await page.goto("/");
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  const floats = page.locator(".hero-box, .hero-box > div, .hero-cake, .hero-cake > div, .hero-wordmark");
  const transforms = () => floats.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).transform));
  const initial = await transforms();
  await page.waitForTimeout(450); // Observe a time interval that would otherwise advance the floating animation.
  expect(await transforms()).toEqual(initial);
  await page.evaluate(() => window.scrollTo({ top: 180, behavior: "instant" }));
  await page.waitForTimeout(150);
  expect(await transforms()).toEqual(initial);
  await scrollToSectionCenter(page, "a-little-bite");
  const button = page.locator("#a-little-bite").getByRole("button");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await button.press("Enter");
  await expect(button).toHaveAttribute("aria-pressed", "false");
});

test("changing the motion preference live switches to a native scroller and stops floating", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One desktop project verifies the live media-query change.");
  await page.goto("/");
  const viewport = page.locator(".lineup-viewport");
  await expect(viewport).toHaveCSS("overflow-x", "hidden");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(viewport).toHaveCSS("overflow-x", /^(auto|scroll)$/);
  const floats = page.locator(".hero-box, .hero-box > div, .hero-cake, .hero-cake > div, .hero-wordmark");
  const transforms = () => floats.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).transform));
  await expect.poll(() => floats.evaluateAll((elements) => elements.every((element) => {
    const transform = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return Math.abs(transform.m41) < 0.01 && Math.abs(transform.m42) < 0.01;
  }))).toBe(true);
  const still = await transforms();
  await page.waitForTimeout(450);
  expect(await transforms()).toEqual(still);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(viewport).toHaveCSS("overflow-x", "hidden");
  await expect.poll(transforms).not.toEqual(still);
});
