import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
});

test('operasyon paneli gerçek backend ile uçtan uca çalışır', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  const loginResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes('/hospital-api/v1/auth/login') &&
      response.request().method() === 'POST',
  );

  await page.getByRole('button', { name: 'Güvenli giriş yap' }).click();

  const loginResponse = await loginResponsePromise;
  expect(loginResponse.status()).toBe(200);
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Çağrı yönetim paneli' })).toBeVisible();

  const callDetailLink = page.getByRole('link', { name: /çağrı detayını aç/i }).first();
  await expect(callDetailLink).toBeVisible({ timeout: 15_000 });
  await callDetailLink.click();
  await expect(page.getByRole('heading', { name: 'Çağrı detayı' })).toBeVisible();

  await page.getByRole('link', { name: 'Randevular' }).click();
  await expect(page.getByRole('heading', { name: 'Randevular' })).toBeVisible();
  await expect(page.getByText(/Toplam 1 kayıt/)).toBeVisible({ timeout: 15_000 });

  const appointmentDetailLink = page
    .getByRole('link', { name: /randevu detayını aç/i })
    .first();
  await expect(appointmentDetailLink).toBeVisible();
  await appointmentDetailLink.click();
  await expect(page.getByRole('heading', { name: 'Randevu detayı' })).toBeVisible();

  await page.getByRole('link', { name: 'Sistem ve loglar' }).click();
  await expect(page.getByRole('heading', { name: 'Sistem ve loglar' })).toBeVisible();
  await expect(page.getByText('Çalışıyor', { exact: true }).first()).toBeVisible({ timeout: 15_000 });

  expect(pageErrors).toEqual([]);
});
