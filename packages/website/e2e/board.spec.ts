import { expect, test } from "@playwright/test";

test("Enter board and set counts", async ({ page }) => {
  await page.goto("http://localhost:3000/board");

  await page.locator("button").nth(0).click();

  await page.locator("button").nth(1).click();
  await page.locator("button").nth(1).click();

  await page.locator("button").nth(2).click();
  await page.locator("button").nth(2).click();
  await page.locator("button").nth(2).click();

  // await page.click()
  // Click the get started link.

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Board" })).toBeVisible();

  await expect(page.getByText("1 / 6")).toBeVisible();
  await expect(page.getByText("2 / 6")).toBeVisible();
  await expect(page.getByText("3 / 6")).toBeVisible();
});
