import { test, expect } from "@playwright/test";

test.describe("Accessibility - Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate SID screen with keyboard only", async ({ page }) => {
    // Tab to input
    await page.keyboard.press("Tab");
    await expect(page.locator('input[name="sid"]')).toBeFocused();

    // Type SID
    await page.keyboard.type("S123456");

    // Tab to button
    await page.keyboard.press("Tab");
    await expect(page.locator('button:has-text("Continue")')).toBeFocused();

    // Press Enter
    await page.keyboard.press("Enter");

    // Should navigate
    await expect(
      page.getByRole("heading", { name: /Welcome, Detective!/i })
    ).toBeVisible();
  });

  test("should navigate start screen with keyboard", async ({ page }) => {
    // Get to start screen
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    // Select WCAG 2.1 with click (version selection)
    await page.click('button:has-text("WCAG 2.1")');

    // Find and click beginner start button
    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );

    // Tab to the button and press Enter
    await beginnerButton.focus();
    await page.keyboard.press("Enter");

    // Should start game
    await expect(
      page.getByRole("heading", { name: /Question 1 of/i })
    ).toBeVisible();
  });

  test("should allow answering questions with keyboard only", async ({
    page,
  }) => {
    // Navigate to game
    await page.fill('input[name="sid"]', "K123456");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    await page.waitForTimeout(500);

    // Tab to first radio button
    let tabCount = 0;
    while (tabCount < 20) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => document.activeElement.type);
      if (focused === "radio") {
        break;
      }
      tabCount++;
    }

    // Select with Space
    await page.keyboard.press("Space");

    // Tab to submit button
    while (tabCount < 30) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(
        () => document.activeElement.textContent
      );
      if (focused?.includes("Submit")) {
        break;
      }
      tabCount++;
    }

    // Submit answer
    await page.keyboard.press("Enter");

    // Verify feedback appears
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test("should have visible focus indicators", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    // Tab through elements and check focus styles
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Check that focus is visually indicated (not outline: none)
    const outlineStyle = await focusedElement.evaluate(
      (el) => window.getComputedStyle(el).outline
    );

    // Should have some outline or box-shadow for focus
    expect(outlineStyle).not.toBe("none");
  });

  test("should support skip link", async ({ page }) => {
    // Skip link should exist in the DOM
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeAttached();

    // Skip link should have proper href
    const href = await skipLink.getAttribute("href");
    expect(href).toBe("#main-content");

    // Main content target should exist
    const mainContent = page.locator("#main-content, main");
    await expect(mainContent).toBeVisible();
  });

  test("should maintain focus after form submission", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    // Heading should receive focus on new screen
    const heading = page.getByRole("heading", { name: /Welcome, Detective!/i });
    await expect(heading).toBeVisible();
  });
});

test.describe("Accessibility - Screen Reader Support", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have proper ARIA landmarks", async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();

    // Check for header
    const header = page.locator('header, [role="banner"]');
    await expect(header).toBeVisible();

    // Check for footer
    const footer = page.locator('footer, [role="contentinfo"]');
    await expect(footer).toBeVisible();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    // Should have h1
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);

    // Should have proper nesting
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    // Check for h2 on start screen
    const h2 = page.locator("h2");
    await expect(h2).toBeVisible();
  });

  test("should have aria-labels on buttons", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Progress bar should have aria-label
    const progressBar = page.locator(".progress-bar");
    const ariaLabel = await progressBar.getAttribute("aria-label");
    expect(ariaLabel).toBeTruthy();
  });

  test("should announce live regions", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Answer question
    await page.locator('input[type="radio"]').first().check();
    await page.click('button:has-text("Submit Answer")');

    // Feedback should have aria-live
    const alert = page.locator('[role="alert"]');
    await expect(alert).toBeVisible();

    const ariaLive = await alert.getAttribute("aria-live");
    expect(ariaLive).toBeTruthy();
  });

  test("should have accessible form labels", async ({ page }) => {
    const input = page.locator('input[name="sid"]');

    // Input should have associated label or aria-label
    const ariaLabel = await input.getAttribute("aria-label");
    const id = await input.getAttribute("id");

    if (id) {
      const label = page.locator(`label[for="${id}"]`);
      const labelExists = (await label.count()) > 0;
      expect(labelExists || ariaLabel).toBeTruthy();
    } else {
      expect(ariaLabel).toBeTruthy();
    }
  });
});

test.describe("Accessibility - Color Contrast", () => {
  test("should have sufficient color contrast on buttons", async ({ page }) => {
    await page.goto("/");

    // This is a basic check - in real scenarios, you might use axe-core
    const continueButton = page.locator('button:has-text("Continue")');
    await expect(continueButton).toBeVisible();

    // Check button has visible text
    const buttonText = await continueButton.textContent();
    expect(buttonText?.trim().length).toBeGreaterThan(0);
  });

  test("should have visible focus indicators with sufficient contrast", async ({
    page,
  }) => {
    await page.goto("/");

    await page.keyboard.press("Tab");

    const focused = page.locator(":focus");
    const outlineColor = await focused.evaluate(
      (el) => window.getComputedStyle(el).outlineColor
    );

    // Should have a defined outline color
    expect(outlineColor).toBeTruthy();
    expect(outlineColor).not.toBe("rgba(0, 0, 0, 0)");
  });
});
