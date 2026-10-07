import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAsAdmin } from '../test-data/auth';
import { seededLead, totalSeededLeads, nonExistentSearch } from '../test-data/leads';

test.describe('Search', () => {
  let leads: LeadsPage;

  test.beforeEach(async ({ page }) => {
    leads = new LeadsPage(page);
    await loginAsAdmin(page);
    await expect(leads.rows).toHaveCount(totalSeededLeads);
  });

  test("searching by a lead's name narrows the list", async () => {
    // prediction: searching "Sita Sharma" leaves 1 row, and it contains "Sita Sharma"
    await leads.search(seededLead.name);
    await expect(leads.rows).toHaveCount(1);
    await expect(leads.rows).toContainText(seededLead.name);
  });

  test('searching by a company name narrows the list', async () => {
    // prediction: searching "HimalKart" leaves N rows (fill in N), and every row shows "HimalKart"
    await leads.search(seededLead.company);
    await expect(leads.rows).toHaveCount(1); // change to the real number
    await expect(leads.rows.filter({ hasNotText: seededLead.company })).toHaveCount(0);
  });

  test('searching for something that does not exist shows the empty state', async () => {
    // prediction: 0 rows and the empty-state message is visible
    await leads.search(nonExistentSearch);
    await expect(leads.rows).toHaveCount(0);
    await expect(leads.emptyState).toBeVisible();
  });

  test('the count text reflects how many leads are shown after a search', async () => {
    // prediction: before searching it shows 12; after searching "Sita Sharma" it shows 1
    await expect(leads.countText).toContainText('12');
    await leads.search(seededLead.name);
    await expect(leads.rows).toHaveCount(1);
    await expect(leads.countText).toContainText('1');
  });
});