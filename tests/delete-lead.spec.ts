import { test, expect } from '@playwright/test';

test('an admin can delete a lead and the row disappears', async ({ page }) => {
  // prediction: after deleting "Sita Sharma", no row contains her name and the list drops from 12 to 11 rows
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  await expect(page.getByTestId('lead-row')).toHaveCount(12);

  const row = page.getByTestId('lead-row').filter({ hasText: 'Sita Sharma' });
  await expect(row).toHaveCount(1);

  await row.getByTestId('delete-button').click();

  await expect(row).toHaveCount(0);
  await expect(page.getByTestId('lead-row')).toHaveCount(11);
  //actual: after deleting "Sita Sharma", no row contains her name and the list drops from 12 to 11 rows
});


test('an agent does not see a delete button', async ({ page }) => {
  // prediction: agent signs in, sees 12 lead rows, and there are 0 delete buttons on the page
  await page.goto('/login');
  await page.getByTestId('username').fill('agent.qrius');
  await page.getByTestId('password').fill('Agent@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  await expect(page.getByTestId('lead-row')).toHaveCount(11);

  await expect(page.getByTestId('delete-button')).toHaveCount(0);
  //actual: agent signs in, sees 11 lead rows, and there are 0 delete buttons on the page
});