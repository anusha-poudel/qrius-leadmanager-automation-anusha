import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAsAdmin } from '../test-data/auth';
import { statusLead, listLead } from '../test-data/leads';

test.describe('Add a lead', () => {
  let leads: LeadsPage;

  test.beforeEach(async ({ page }) => {
    leads = new LeadsPage(page);
    await loginAsAdmin(page);
    await expect(leads.rows.first()).toBeVisible(); // the list has loaded
  });

  test('adding a lead with a chosen status saves that lead with that status', async () => {
    // prediction: after adding "Hari Poudel" with status "Qualified", his row shows a cell "Qualified"
    await leads.addLead(statusLead);

    const row = leads.rowFor(statusLead.name);
    await expect(row.getByRole('cell', { name: statusLead.status, exact: true })).toBeVisible();
  });

  test('the new lead appears in the list', async () => {
    // prediction: after adding "Sita Poudel", the list grows by 1 and exactly one row contains her name
    const before = await leads.rows.count();
    await leads.addLead(listLead);

    await expect(leads.rowFor(listLead.name)).toHaveCount(1);
    await expect(leads.rows).toHaveCount(before + 1);
  });
});