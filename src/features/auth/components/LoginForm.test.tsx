import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { useAuthStore } from '../store/authStore';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  beforeEach(() => useAuthStore.getState().clearSession());
  it('MSW login sözleşmesiyle oturum oluşturur', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />, '/login');
    await user.click(screen.getByRole('button', { name: 'Güvenli giriş yap' }));
    await waitFor(() => expect(useAuthStore.getState().user?.email).toBe('operator@hastane.local'));
  });
});
