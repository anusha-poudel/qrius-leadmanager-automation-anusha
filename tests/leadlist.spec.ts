import { test, expect } from '@playwright/test';

test('after sign in, the number of leads is shown', async ({ page }) => {
    // prediction: after sign in, the number of leads is shown
    await page.goto('/login');
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL('http://localhost:5173/leads');
    await expect(page.getByTestId('lead-count')).toBeVisible();
  });


test('role badge shows signed-in user role', async ({ page }) => {
    // prediction: after login, nav-role badge shows the role of the signed-in user
    await page.goto('/login');
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
    });