import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector', () => {
  it('dili değiştirir, belge dilini günceller ve seçimi saklar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageSelector />);

    expect(screen.getByRole('group', { name: 'Dil seç' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'English' }));

    expect(document.documentElement).toHaveAttribute('lang', 'en');
    expect(localStorage.getItem('hospital-operation-language')).toBe('en');
    expect(screen.getByRole('group', { name: 'Select language' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
  });
});
