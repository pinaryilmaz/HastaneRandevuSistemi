import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function login(page: Page) {
  const loginResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes('/hospital-api/v1/auth/login') &&
      response.request().method() === 'POST',
  );

  await page.getByRole('button', { name: 'Güvenli giriş yap' }).click();
  expect((await loginResponsePromise).status()).toBe(200);
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function expectNoSeriousAccessibilityViolations(page: Page) {
  await page.waitForTimeout(350);
  const results = await new AxeBuilder({ page }).analyze();
  const violations = results.violations.filter(
    ({ impact }) => impact === 'serious' || impact === 'critical',
  );
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
});

test('operasyon paneli gerçek backend ile uçtan uca çalışır', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await expectNoSeriousAccessibilityViolations(page);
  await login(page);
  await expect(page.getByRole('heading', { name: 'Çağrı yönetim paneli' })).toBeVisible();
  await expect(page.getByText('Canlı', { exact: true })).toBeVisible({ timeout: 15_000 });

  const statusFilter = page.getByRole('combobox', { name: 'Çağrı durumuna göre filtrele' });
  await statusFilter.selectOption('ACTIVE');
  await expect(statusFilter).toHaveValue('ACTIVE');
  await page.getByRole('button', { name: 'Filtreleri temizle' }).click();
  await expect(statusFilter).toHaveValue('');
  await expectNoSeriousAccessibilityViolations(page);

  const callDetailLink = page.getByRole('link', { name: /çağrı detayını aç/i }).first();
  await expect(callDetailLink).toBeVisible({ timeout: 15_000 });
  await callDetailLink.click();
  await expect(page.getByRole('heading', { name: 'Çağrı detayı' })).toBeVisible();

  await page.getByRole('link', { name: 'Randevular' }).click();
  await expect(page.getByRole('heading', { name: 'Randevular' })).toBeVisible();
  await expect(page.getByText(/Toplam 1 kayıt/)).toBeVisible({ timeout: 15_000 });

  const appointmentDetailLink = page.getByRole('link', { name: /randevu detayını aç/i }).first();
  await expect(appointmentDetailLink).toBeVisible();
  await appointmentDetailLink.click();
  await expect(page.getByRole('heading', { name: 'Randevu detayı' })).toBeVisible();

  await page.getByRole('link', { name: 'Sistem ve loglar' }).click();
  await expect(page.getByRole('heading', { name: 'Sistem ve loglar' })).toBeVisible();
  await expect(page.getByText('Çalışıyor', { exact: true }).first()).toBeVisible({
    timeout: 15_000,
  });
  await expectNoSeriousAccessibilityViolations(page);

  expect(pageErrors).toEqual([]);
});

test('tablet ve mobil görünümde menü erişilebilir ve yatay taşma yoktur', async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  await login(page);

  await page.getByRole('button', { name: 'Ana menüyü aç' }).click();
  await expect(page.getByRole('dialog', { name: 'Uygulama menüsü' })).toBeVisible();
  await page.getByRole('link', { name: 'Randevular' }).click();
  await expect(page.getByRole('heading', { name: 'Randevular' })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Ana menüyü aç' }).click();
  await page.getByRole('link', { name: 'Çağrı paneli' }).click();
  await expect(page.getByRole('heading', { name: 'Çağrı yönetim paneli' })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await expectNoSeriousAccessibilityViolations(page);
});
