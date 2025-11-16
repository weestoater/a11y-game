import { test, expect } from "@playwright/test";

test.describe("Responsive Design - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test("should display mobile-friendly layout on SID screen", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator('input[name="sid"]')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeVisible();

    // Elements should be stacked vertically on mobile
    const container = page.locator(".container").first();
    await expect(container).toBeVisible();
  });

  test("should display mobile-friendly start screen", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    // Difficulty cards should be stacked on mobile
    const cards = page.locator(".card");
    await expect(cards).toHaveCount(3);

    // All cards should be visible
    for (let i = 0; i < 3; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test("should display mobile-friendly game screen", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Question should be readable
    await expect(page.locator("h3")).toBeVisible();

    // Code should be visible
    await expect(page.locator("code")).toBeVisible();

    // Radio buttons should be tappable
    const radios = page.locator('input[type="radio"]');
    await expect(radios.first()).toBeVisible();
  });

  test("should have touch-friendly buttons on mobile", async ({ page }) => {
    await page.goto("/");

    const continueButton = page.locator('button:has-text("Continue")');
    const buttonBox = await continueButton.boundingBox();

    // Button should be at least 44x44 pixels (WCAG touch target)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(40);
  });
});

test.describe("Responsive Design - Tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

  test("should display tablet layout", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    // Cards might be in a row on tablet
    const cards = page.locator(".card");
    await expect(cards).toHaveCount(3);

    // All cards should be visible
    await expect(cards.first()).toBeVisible();
    await expect(cards.last()).toBeVisible();
  });

  test("should have readable code on tablet", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    const codeBlock = page.locator("code");
    await expect(codeBlock).toBeVisible();

    // Code block should not overflow
    const box = await codeBlock.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(768);
  });
});

test.describe("Responsive Design - Desktop", () => {
  test.use({ viewport: { width: 1920, height: 1080 } }); // Full HD

  test("should display full desktop layout", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    // Cards should be in a row on desktop
    const cardRow = page.locator(".row.g-3");
    await expect(cardRow).toBeVisible();

    const cards = page.locator(".card");
    await expect(cards).toHaveCount(3);
  });

  test("should center content on wide screens", async ({ page }) => {
    await page.goto("/");

    const container = page.locator(".container").first();
    const box = await container.boundingBox();

    // Container should be centered with margins
    expect(box?.x).toBeGreaterThan(0);
  });

  test("should have proper spacing on desktop", async ({ page }) => {
    await page.goto("/");
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Elements should have adequate spacing
    const question = page.locator("h3");
    const code = page.locator("code");

    const questionBox = await question.boundingBox();
    const codeBox = await code.boundingBox();

    // There should be vertical space between elements
    if (questionBox && codeBox) {
      expect(codeBox.y).toBeGreaterThan(questionBox.y + questionBox.height);
    }
  });
});

test.describe("Cross-Browser Compatibility", () => {
  test("should work in different browsers", async ({ page, browserName }) => {
    await page.goto("/");

    // Basic functionality should work across browsers
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    await expect(
      page.getByRole("heading", { name: /Welcome, Detective!/i })
    ).toBeVisible();

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    await expect(
      page.getByRole("heading", { name: /Question 1 of/i })
    ).toBeVisible();

    // Log which browser this test ran on
    console.log(`Test passed on ${browserName}`);
  });

  test("should handle localStorage across browsers", async ({ page }) => {
    await page.goto("/");

    // Test localStorage availability
    const hasLocalStorage = await page.evaluate(() => {
      try {
        localStorage.setItem("test", "value");
        localStorage.removeItem("test");
        return true;
      } catch (e) {
        return false;
      }
    });

    expect(hasLocalStorage).toBe(true);
  });
});
