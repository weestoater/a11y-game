import { test, expect } from "@playwright/test";

test.describe("SID Screen Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display SID input form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Enter Your Standard ID/i })
    ).toBeVisible();
    await expect(page.locator('input[name="sid"]')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeVisible();
  });

  test("should accept valid SID format (letter + 6 digits)", async ({
    page,
  }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.click('button:has-text("Continue")');

    // Should navigate to start screen
    await expect(
      page.getByRole("heading", { name: /Welcome, Detective!/i })
    ).toBeVisible();
  });

  test("should accept different valid SID formats", async ({ page }) => {
    const validSIDs = ["A000000", "Z999999", "M555555"];

    for (const sid of validSIDs) {
      await page.goto("/");
      await page.fill('input[name="sid"]', sid);
      await page.click('button:has-text("Continue")');
      await expect(
        page.getByRole("heading", { name: /Welcome, Detective!/i })
      ).toBeVisible();
    }
  });

  test("should reject SID with too few digits", async ({ page }) => {
    await page.fill('input[name="sid"]', "S12345");
    await page.click('button:has-text("Continue")');

    // Should show error
    await expect(
      page.locator("text=/SID must be one letter followed by 6 digits/i")
    ).toBeVisible();
    // Should still be on SID screen
    await expect(page.locator('input[name="sid"]')).toBeVisible();
  });

  test("should limit SID input to 7 characters", async ({ page }) => {
    const input = page.locator('input[name="sid"]');
    await input.fill("S12345678901234"); // Try to type many characters

    // Should be limited to 7 characters by maxLength
    const value = await input.inputValue();
    expect(value.length).toBeLessThanOrEqual(7);
  });

  test("should reject SID starting with number", async ({ page }) => {
    await page.fill('input[name="sid"]', "1123456");
    await page.click('button:has-text("Continue")');

    await expect(
      page.locator("text=/SID must be one letter followed by 6 digits/i")
    ).toBeVisible();
  });

  test("should accept SID with lowercase letter (auto-uppercases)", async ({
    page,
  }) => {
    await page.fill('input[name="sid"]', "s123456");
    await page.click('button:has-text("Continue")');

    // Should navigate to start screen (component uppercases the input)
    await expect(
      page.getByRole("heading", { name: /Welcome, Detective!/i })
    ).toBeVisible();
  });

  test("should reject empty SID", async ({ page }) => {
    await page.click('button:has-text("Continue")');

    await expect(page.locator("text=/Please enter your SID/i")).toBeVisible();
  });

  test("should reject SID with special characters", async ({ page }) => {
    await page.fill('input[name="sid"]', "S12@456");
    await page.click('button:has-text("Continue")');

    await expect(
      page.locator("text=/SID must be one letter followed by 6 digits/i")
    ).toBeVisible();
  });

  test("should focus on SID input on page load", async ({ page }) => {
    const sidInput = page.locator('input[name="sid"]');

    // Check if input is focused or becomes focused quickly
    await expect(sidInput).toBeFocused();
  });

  test("should allow submitting with Enter key", async ({ page }) => {
    await page.fill('input[name="sid"]', "S123456");
    await page.locator('input[name="sid"]').press("Enter");

    // Should navigate to start screen
    await expect(
      page.getByRole("heading", { name: /Welcome, Detective!/i })
    ).toBeVisible();
  });

  test("should display helpful placeholder text", async ({ page }) => {
    const input = page.locator('input[name="sid"]');
    const placeholder = await input.getAttribute("placeholder");

    expect(placeholder).toBeTruthy();
    expect(placeholder).toMatch(/A123456/i);
  });

  test("should have accessible error messages", async ({ page }) => {
    await page.fill('input[name="sid"]', "invalid");
    await page.click('button:has-text("Continue")');

    // Error should be in an alert role or similar
    const error = page.locator(
      "text=/SID must be one letter followed by 6 digits/i"
    );
    await expect(error).toBeVisible();
  });
});
