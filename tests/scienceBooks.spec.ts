import { test, expect } from '@playwright/test';
interface Book {
  title: string | null;
  price: string | null;
  availability: string | undefined;
}


test('BookScrape', async ({ page }) => {
  await page.goto("https://books.toscrape.com/");

  await expect(page.getByText(" We love being scraped!")).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: ' Science', exact: true }).click();

  await expect(page.getByRole("heading", { name: "Science" })).toBeVisible();


  //  Grab all book elements
  const books = page.locator('.product_pod');

  //  Prepare an array to store data
  let bookDetails: Book[] = [];
  let inStockCount = 0;
 const totalcount = await books.count();


  for (let i = 0; i < totalcount; i++) {
    const book = books.nth(i);

    //  Grab details from current book card
    const title = await book.locator('h3 a').getAttribute('title');
    const price = await book.locator('.price_color').textContent();
    const availability = await book.locator('.availability').textContent();
    
    if (availability?.includes('In stock')) {
      inStockCount++;
    }
    
    //  Push to array
    bookDetails.push({
      title,
      price,
      availability: availability?.trim()
    });
  }

  await page.getByText('Home').click();

  
  
  console.log(totalcount);
  console.log(`Items in stock: ${inStockCount}`);



  //  Output
  console.log(bookDetails);
  console.table(bookDetails);

  

});
