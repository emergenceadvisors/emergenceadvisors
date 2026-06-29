const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Service Accordion', () => {
  let filePath;

  test.beforeAll(() => {
    filePath = `file://${path.resolve(__dirname, '../index.html')}`;
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(filePath);
  });

  test('initial state: first item should be closed', async ({ page }) => {
    const item = page.locator('.svc-accord li').nth(0);
    const btn = page.locator('.svc-btn').nth(0);
    const body = page.locator('.svc-body').nth(0);

    await expect(item).not.toHaveClass(/open/);
    await expect(btn).toHaveAttribute('aria-expanded', 'false');

    // Check computed style max-height is 0
    const bodyMaxHeight = await body.evaluate((el) => window.getComputedStyle(el).maxHeight);
    expect(bodyMaxHeight).toBe('0px');
  });

  test('clicking closed item opens it', async ({ page }) => {
    const item = page.locator('.svc-accord li').nth(0);
    const btn = page.locator('.svc-btn').nth(0);

    await btn.click();

    await expect(item).toHaveClass(/open/);
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  test('clicking open item closes it', async ({ page }) => {
    const item = page.locator('.svc-accord li').nth(0);
    const btn = page.locator('.svc-btn').nth(0);

    // Open it first
    await btn.click();
    await expect(item).toHaveClass(/open/);

    // Click again to close
    await btn.click();

    await expect(item).not.toHaveClass(/open/);
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  test('opening an item closes previously opened items', async ({ page }) => {
    const item1 = page.locator('.svc-accord li').nth(0);
    const btn1 = page.locator('.svc-btn').nth(0);

    const item2 = page.locator('.svc-accord li').nth(1);
    const btn2 = page.locator('.svc-btn').nth(1);

    // Open first item
    await btn1.click();
    await expect(item1).toHaveClass(/open/);

    // Open second item
    await btn2.click();

    // Verify second item is open
    await expect(item2).toHaveClass(/open/);
    await expect(btn2).toHaveAttribute('aria-expanded', 'true');

    // Verify first item is now closed
    await expect(item1).not.toHaveClass(/open/);
    await expect(btn1).toHaveAttribute('aria-expanded', 'false');
  });
});
