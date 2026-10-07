import { test, expect } from '@playwright/test';
import { LeadsPage } from '../pages/leadsPage';
import { loginAsAdmin, loginAsAgent } from '../test-data/auth';
import { deletableLead } from '../test-data/leads';

test.describe('Delete a lead', () => {
  test('an admin can delete a lead and the row disappears', async ({ page }) => {
    // prediction: after deleting "Anita Lama", no row contains her name and the list reduces by 1
    const leads = new LeadsPage(page);
    await loginAsAdmin(page);
    await expect(leads.rowFor(deletableLead.name)).toHaveCount(1);
    const before = await leads.rows.count();

    await leads.deleteLead(deletableLead.name);

    await expect(leads.rowFor(deletableLead.name)).toHaveCount(0);
    await expect(leads.rows).toHaveCount(before - 1);
  });

  test('an agent does not see a delete button', async ({ page }) => {
    // prediction: agent sees the lead rows, and there are 0 delete buttons on the page
    const leads = new LeadsPage(page);
    await loginAsAgent(page);
    await expect(leads.rows.first()).toBeVisible();

    await expect(leads.deleteButtons).toHaveCount(0);
  });
});