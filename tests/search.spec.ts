import { test, expect } from '@playwright/test';

test('Searching by a lead name narrows the list', async ({ page }) => {
  // prediction: searching Sita Sharma gives 1 employee row with that name
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('search-input').fill('Sita Sharma');
  await expect(page.getByTestId('lead-row')).toHaveCount(1);
  await expect(page.getByTestId('lead-row')).toContainText('Sita Sharma');
  //status: passed
});


test('searching by a company name narrows the list', async ({ page }) => {
  // prediction: searching eSewa gives 1 lead row with that company
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('search-input').fill('eSewa');
  await expect(page.getByTestId('lead-row')).toHaveCount(1);
  await expect(page.getByTestId('lead-row')).toContainText('eSewa');
  //status: failed
});


test('searching for a non-existent lead shows the empty state', async ({ page }) => {
  // prediction: searching for anusha gives 0 leads row and shows the empty state
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('search-input').fill('anusha');
  await expect(page.getByTestId('lead-row')).toHaveCount(0);
  await expect(page.getByTestId('empty-state')).toBeVisible();
  //status: passed
});


test('count text reflects the number of leads after a search', async ({ page }) => {
  // prediction: before search, count text=12; after searching Mina Gurung, count text=1
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('search-input').fill('Mina Gurung');
  await expect(page.getByTestId('lead-row')).toHaveCount(1);
  await expect(page.getByTestId('lead-count')).toContainText('1');
  //actual: 12 out of 12 leads shown
});
