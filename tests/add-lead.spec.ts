import { test, expect } from '@playwright/test';

test.describe('Add a lead', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();
  });

  test('adding a lead with a chosen status saves that lead with that status', async ({ page }) => {
    // prediction: after adding "Sita Poudel" with status "Qualified", her row shows status "Qualified"
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Sita Poudel');
    await page.getByTestId('email').fill('sita@gmail.com');
    await page.getByTestId('company').fill('Qniverse');
    await page.getByTestId('status').selectOption('Qualified');
    await page.getByTestId('save-button').click();

    const row = page.getByTestId('lead-row').filter({ hasText: 'Sita Poudel' });
    await expect(row.getByTestId('lead-status')).toHaveText('Qualified');
    // actual (manual): status shows "New" instead of "Qualified"
  });

  test('the new lead appears in the list', async ({ page }) => {
    // prediction: after adding "Hari Thapa", exactly one row with that name appears
    await page.getByTestId('add-lead-button').click();
    await page.getByTestId('name').fill('Hari Thapa');
    await page.getByTestId('email').fill('hari@gmail.com');
    await page.getByTestId('company').fill('Qniverse');
    await page.getByTestId('status').selectOption('Qualified');
    await page.getByTestId('save-button').click();

    const row = page.getByTestId('lead-row').filter({ hasText: 'Hari Thapa' });
    await expect(row).toHaveCount(1);
    //actual: after adding "Hari Thapa", 1 rows with that name appear
  });
});