import path from 'path';
import { pathToFileURL } from 'url';
import { test, expect } from '@playwright/test';

const siteRoot = path.resolve(__dirname, '..', 'vida');
const indexUrl = pathToFileURL(path.join(siteRoot, 'index.html')).href;

test.describe('Mobile navigation drawer', () => {
  test('toggles open state and reveals links', async ({ page }) => {
    await page.goto(indexUrl);

    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    const panel = page.locator('.sidebar__panel');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(panel).toHaveAttribute('aria-hidden', 'false');

    await expect(page.getByRole('link', { name: 'Reservation' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
  });

  test('closes when a navigation link is selected', async ({ page }) => {
    await page.goto(indexUrl);
    await page.getByRole('button', { name: /menu/i }).click();

    await page.getByRole('link', { name: 'News' }).click();
    await page.waitForLoadState('domcontentloaded');

    const menuButton = page.getByRole('button', { name: /menu/i });
    const panel = page.locator('.sidebar__panel');

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
  });
});
