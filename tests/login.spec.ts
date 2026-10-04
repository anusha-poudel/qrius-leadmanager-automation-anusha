import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login page has the correct title', async ({ page }) => {
    // prediction: tab title is Qrius Lead Manager and visible heading is Lead Manager
    await expect(page).toHaveTitle('Qrius Lead Manager'); 
    await expect(page.getByRole('heading', { name: 'Lead Manager', level: 2 })).toBeVisible();
  });

  test('admin can sign in and reaches the Leads page', async ({ page }) => {
    // prediction: URL becomes /leads, heading is Leads, and the role is Admin
    await page.getByLabel('Username').fill('admin.qrius');
    await page.getByLabel('Password').fill('Admin@123');
  });

  test('agent can sign in and sees their role', async ({ page }) => {
    // prediction: URL becomes /leads, heading is Leads, and the role is Agent
    await page.getByLabel('Username').fill('agent.qrius');
    await page.getByLabel('Password').fill('Agent@123');
  });

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    // prediction: URL remains /login, and an error message is displayed
    await page.getByLabel('Username').fill('admin.qrius');
    await page.getByLabel('Password').fill('WrongPassword');
  });
});

