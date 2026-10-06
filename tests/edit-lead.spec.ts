import { test, expect } from '@playwright/test';

test("editing a lead's email updates it in the list", async ({ page }) => {
  const oldEmail = 'sita@himalkart.com.np'; // what the list shows now
  const newEmail = 'sita.sh@himalkart.com.np';       // the new value to save

  // prediction: Sita Sharma's email changes from "sita@himalkart.com.np" to "sita.sh@himalkart.com.np" in the list
  await page.goto('/login');
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('nav-role')).toBeVisible();

  const row = page.getByTestId('lead-row').filter({ hasText: 'Sita Sharma' });
  await expect(row.getByRole('cell', { name: oldEmail, exact: true })).toBeVisible();

  await row.getByTestId('edit-button').click();
  await page.getByTestId('email').fill(newEmail);
  await page.getByTestId('save-button').click();

  await expect(row.getByRole('cell', { name: newEmail, exact: true })).toBeVisible();
  await expect(row.getByRole('cell', { name: oldEmail, exact: true })).toHaveCount(0);
  //actual: Sita Sharma's email changes.
});