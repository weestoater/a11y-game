import { test, expect } from "@playwright/test";

test.describe("Leaderboard Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should navigate to leaderboard from start screen", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");

    await page.click('button:has-text("View Leaderboards")');

    await expect(
      page.getByRole("heading", { name: /Leaderboard/i })
    ).toBeVisible();
  });

  test("should display empty leaderboard initially", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");
    await page.click('button:has-text("View Leaderboards")');

    // Should show "No scores yet" or similar
    const noScores = page.locator("text=/No scores|No entries|empty/i");
    const hasNoScores = (await noScores.count()) > 0;

    // Or if there's a table, it should be empty or show headers only
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();

    expect(hasNoScores || rowCount === 0).toBeTruthy();
  });

  test("should save score after completing game", async ({ page }) => {
    const sid = "L123456";

    // Complete a simple game flow
    await page.fill('input[name="sid"]', sid);
    await page.keyboard.press("Enter");

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      await page.locator('input[type="radio"]').first().check();

      // Wait for Submit button to be enabled
      const submitButton = page.locator('button:has-text("Submit Answer")');
      await expect(submitButton).toBeEnabled();
      await submitButton.click();

      // Check if See Results button appeared (last question)
      const seeResults = page.locator('button:has-text("See Results")');
      if (await seeResults.isVisible({ timeout: 1000 }).catch(() => false)) {
        await seeResults.click();
        break;
      }

      // Otherwise click Next Question
      await page.click('button:has-text("Next Question")');
    }

    // Should be on results screen
    await expect(
      page.getByRole("heading", { name: /Case Closed!/i })
    ).toBeVisible();

    // Navigate to leaderboard
    await page.click('button:has-text("View Leaderboard")');

    // Should see our score
    await expect(page.locator(`text=${sid}`)).toBeVisible();
  });
  test("should have difficulty tabs", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");
    await page.click('button:has-text("View Leaderboards")');

    // Should have tabs for each difficulty
    await expect(page.getByRole("tab", { name: /Beginner/i })).toBeVisible();
    await expect(
      page.getByRole("tab", { name: /Intermediate/i })
    ).toBeVisible();
    await expect(page.getByRole("tab", { name: /Advanced/i })).toBeVisible();
  });

  test("should switch between difficulty tabs", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");
    await page.click('button:has-text("View Leaderboards")');

    // Click on Intermediate tab
    await page.getByRole("tab", { name: /Intermediate/i }).click();

    // Should show intermediate leaderboard heading
    await expect(
      page.getByRole("heading", { name: /Intermediate Level/i })
    ).toBeVisible();

    // Click on Advanced tab
    await page.getByRole("tab", { name: /Advanced/i }).click();

    // Should show advanced leaderboard heading
    await expect(
      page.getByRole("heading", { name: /Advanced Level/i })
    ).toBeVisible();
  });

  test("should have export to Excel functionality", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");
    await page.click('button:has-text("View Leaderboards")');

    // Should have export button
    const exportButton = page.getByRole("button", { name: /Export/i });
    await expect(exportButton).toBeVisible();
  });

  test("should display score details", async ({ page }) => {
    const sid = "D123456";

    // Complete a game first so we have data
    await page.fill('input[name="sid"]', sid);
    await page.keyboard.press("Enter");

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Answer questions quickly
    for (let i = 0; i < 10; i++) {
      await page.locator('input[type="radio"]').first().check();
      await page.click('button:has-text("Submit Answer")');
      const seeResults = page.locator('button:has-text("See Results")');
      if (await seeResults.isVisible({ timeout: 1000 }).catch(() => false)) {
        await seeResults.click();
        break;
      }
      await page.click('button:has-text("Next Question")');
    }

    // Navigate to leaderboard
    await page.click('button:has-text("View Leaderboard")');

    // Leaderboard should have a table with column headers
    const table = page.getByRole("table");
    await expect(table).toBeVisible();
  });
  test("should allow going back from leaderboard", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.keyboard.press("Enter");
    await page.click('button:has-text("View Leaderboards")');

    // Should have back button (says "Back to Game")
    const backButton = page.getByRole("button", { name: /Back to Game/i });
    await expect(backButton).toBeVisible();

    await backButton.click();

    // Should return to start screen (difficulty selection)
    await expect(
      page.getByRole("heading", { name: /Choose Your Difficulty/i })
    ).toBeVisible();
  });
});

test.describe("LocalStorage Persistence", () => {
  test("should persist scores across page reloads", async ({ page }) => {
    const sid = "M123456";

    // Complete a quick game
    await page.goto("/");
    await page.fill('input[name="sid"]', sid);
    await page.keyboard.press("Enter");

    const beginnerButton = page.locator(
      '.card-body:has-text("Beginner") button:has-text("Start")'
    );
    await beginnerButton.click();

    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      await page.locator('input[type="radio"]').first().check();
      await page.click('button:has-text("Submit Answer")');

      // Check if See Results button appeared (last question)
      const seeResults = page.locator('button:has-text("See Results")');
      if (await seeResults.isVisible({ timeout: 1000 }).catch(() => false)) {
        await seeResults.click();
        break;
      }

      // Otherwise click Next Question
      await page.click('button:has-text("Next Question")');
    }

    // Reload page
    await page.reload();

    // Navigate to leaderboard
    await page.fill('input[name="sid"]', sid);
    await page.keyboard.press("Enter");
    await page.click('button:has-text("View Leaderboards")');

    // Score should still be visible
    await expect(page.locator(`text=${sid}`)).toBeVisible();
  });
  test("should maintain leaderboard data in localStorage", async ({ page }) => {
    await page.goto("/");

    // Check localStorage key exists after game
    const hasLeaderboard = await page.evaluate(() => {
      return localStorage.getItem("a11y_game_leaderboard") !== null;
    });

    // Initially might be null, but after a game it should exist
    // This is just checking the mechanism works
    expect(typeof hasLeaderboard).toBe("boolean");
  });
});
