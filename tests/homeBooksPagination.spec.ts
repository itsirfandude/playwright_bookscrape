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

    let bookDetails: Book[] = [];
for (let pageno = 1; pageno <= 3; pageno++) {
  const booksOnPage = page.locator(".product_pod");

  for (let i = 0; i < (await booksOnPage.count()); i++) {
    const book = booksOnPage.nth(i);
    const title = await book.locator("h3 a").getAttribute("title");
    const price = await book.locator(".price_color").textContent();
    const availability = await book.locator(".availability").textContent();

    bookDetails.push({
      title,
      price,
      availability: availability?.trim(),
    });
  }
  await page.getByText("next").click();
}

fs.writeFileSync("books.json", JSON.stringify(bookDetails, null, 2));
})