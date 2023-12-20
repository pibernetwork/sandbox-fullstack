import { expect, test } from "@playwright/test";

test("Enter list items", async ({ page }) => {
  await page.goto("http://localhost:3000/items/list");

  // Click the get started link.

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "List Item" })).toBeVisible();
});
