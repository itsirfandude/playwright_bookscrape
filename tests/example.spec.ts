import { test, expect } from '@playwright/test';
import fs from "fs";
interface Book {
  title: string | null;
  price: string | null;
  availability: string | undefined;
}


test('BookScrape', async ({ page }) => {
  await page.goto("https://books.toscrape.com/");

  await expect(page.getByText(" We love being scraped!")).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: ' Science' , exact: true }).click();

  await expect(page.getByRole("heading", { name: "Science" })).toBeVisible();
  

// 1. Grab all book elements
const books = page.locator('.product_pod');

// 2. Prepare an array to store data
let bookDetails: Book[] = [];

for (let i = 0; i < 3; i++) {
  const book = books.nth(i);

  // 3. Grab details from current book card
  const title = await book.locator('h3 a').getAttribute('title');
  const price = await book.locator('.price_color').textContent();
  const availability = await book.locator('.availability').textContent();

  // 4. Push to array
  bookDetails.push({
    title,
    price,
    availability: availability?.trim()
  });
}

// 5. Output
console.log(bookDetails);
console.table(bookDetails);
fs.writeFileSync("books.json", JSON.stringify(bookDetails, null, 2));

});
