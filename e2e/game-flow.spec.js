import { test, expect } from "@playwright/test";

test.describe("Complete Game Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should complete full game flow with WCAG 2.1 beginner questions", async ({
    page,
  }) => {
    await page.goto("/");

    // Step 1: Enter valid SID
    await expect(
      page.getByRole("heading", { name: /Enter Your Standard ID/i })
    ).toBeVisible();
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    // Step 2: Select WCAG version and difficulty
    await expect(
      page.getByRole("heading", { name: /Welcome, Detective!/i })
    ).toBeVisible();

    // Select WCAG 2.1
    await page.click('button:has-text("WCAG 2.1")');
    await expect(
      page.locator('button:has-text("WCAG 2.1")').first()
    ).toHaveAttribute("aria-pressed", "true");

    // Start beginner game
    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Step 3: Play through questions
    await expect(
      page.getByRole("heading", { name: /Question 1 of/i })
    ).toBeVisible();

    // Answer first question
    const firstOption = page.locator('input[type="radio"]').first();
    await firstOption.check();
    await page.click('button:has-text("Submit Answer")');

    // Wait for feedback
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page.locator(".alert-heading")).toBeVisible();

    // Continue to next question
    const nextButton = page.locator('button:has-text("Next Question")');
    if (await nextButton.isVisible()) {
      await nextButton.click();
    }

    // Step 4: Verify game is progressing
    await expect(page.locator("text=/Question \\d+ of/i")).toBeVisible();
    await expect(page.locator("text=/Score:/i")).toBeVisible();
    await expect(page.locator("text=/Time:/i")).toBeVisible();
  });

  test("should complete full game with WCAG 2.2 questions", async ({
    page,
  }) => {
    await page.goto("/");

    // Enter SID
    await page.fill('input[name="sid"]', "A999999");
    await page.click('button:has-text("Continue")');

    // Select WCAG 2.2
    await page.click('button:has-text("WCAG 2.2")');
    await expect(
      page.locator("button").filter({ hasText: /^WCAG 2\.2$/ })
    ).toHaveAttribute("aria-pressed", "true");

    // Verify question count is displayed
    await expect(page.locator("text=/questions available/i")).toBeVisible();

    // Start beginner game
    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Verify we're in the game
    await expect(
      page.getByRole("heading", { name: /Question 1 of/i })
    ).toBeVisible();
  });

  test("should allow playing multiple difficulties", async ({ page }) => {
    await page.goto("/");

    // Enter SID
    await page.fill('input[name="sid"]', "B111111");
    await page.click('button:has-text("Continue")');

    // Test intermediate difficulty
    const intermediateButton = page.locator(
      '.card-body:has-text("Intermediate") button:has-text("Start")'
    );
    await intermediateButton.click();

    await expect(
      page.getByRole("heading", { name: /Question 1 of/i })
    ).toBeVisible();

    // Answer one question
    await page.locator('input[type="radio"]').first().check();
    await page.click('button:has-text("Submit Answer")');
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test("should handle combined WCAG 2.1 & 2.2 questions", async ({ page }) => {
    await page.goto("/");

    // Enter SID
    await page.fill('input[name="sid"]', "C222222");
    await page.click('button:has-text("Continue")');

    // Combined should be default
    await expect(
      page.locator('button:has-text("WCAG 2.1 & 2.2")')
    ).toHaveAttribute("aria-pressed", "true");

    // Start advanced game
    const advancedButton = page.locator(
      '.card-body:has-text("Advanced") button:has-text("Start")'
    );
    await advancedButton.click();

    await expect(
      page.getByRole("heading", { name: /Question 1 of/i })
    ).toBeVisible();
  });

  test("should track timer during game", async ({ page }) => {
    await page.goto("/");

    await page.fill('input[name="sid"]', "D333333");
    await page.click('button:has-text("Continue")');

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Verify timer starts at 0:00
    await expect(page.locator("text=/Time: 0:0/i")).toBeVisible();

    // Wait a moment and verify timer increments
    await page.waitForTimeout(2000);
    const timerText = await page
      .locator('.badge:has-text("Time:")')
      .textContent();
    expect(timerText).toMatch(/Time: 0:0[1-9]/);
  });

  test("should display progress bar", async ({ page }) => {
    await page.goto("/");

    await page.fill('input[name="sid"]', "E444444");
    await page.click('button:has-text("Continue")');

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Verify progress bar exists and shows 0%
    const progressBar = page.locator(".progress-bar");
    await expect(progressBar).toBeAttached();

    const ariaValueNow = await progressBar.getAttribute("aria-valuenow");
    expect(parseInt(ariaValueNow)).toBe(0);
  });

  // TODO: Fix this test - WCAG references not displaying correctly
  test.skip("should show WCAG references in feedback", async ({ page }) => {
    await page.goto("/");

    await page.fill('input[name="sid"]', "F555555");
    await page.click('button:has-text("Continue")');

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Answer question
    await page.locator('input[type="radio"]').first().check();
    await page.click('button:has-text("Submit Answer")');

    // Verify WCAG reference is shown
    await expect(page.locator("text=/WCAG Reference:/i")).toBeVisible();
    await expect(page.locator("text=/WCAG 2\\./i")).toBeVisible();
  });
});
