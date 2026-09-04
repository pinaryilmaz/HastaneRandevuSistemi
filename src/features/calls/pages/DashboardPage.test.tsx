import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFilterStore } from '@/store/filterStore';
import { renderWithProviders } from '@/test/renderWithProviders';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
  beforeEach(() => {
    useFilterStore.setState({ facilityId: '', connectionMode: 'polling' });
  });

  it('sayaçları ve çağrıları yükleyip durum filtresini uygular', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DashboardPage />, '/dashboard');

    expect((await screen.findAllByText('Ayşe Yılmaz')).length).toBeGreaterThan(0);
    expect(screen.getByText('Aktif çağrı')).toBeInTheDocument();
    expect(screen.getAllByText('Katılımcı').length).toBeGreaterThan(0);
    expect(screen.getByText('Eşleşen')).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Çağrı durumuna göre filtrele' }),
      'FAILED',
    );

    expect(screen.getAllByText('Murat Şahin').length).toBeGreaterThan(0);
    expect(screen.queryByText('Ayşe Yılmaz')).not.toBeInTheDocument();
  });

  it('aramayı debounce sonrasında API filtresine uygular ve temizler', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DashboardPage />, '/dashboard');
    await screen.findAllByText('Ayşe Yılmaz');

    await user.type(screen.getByRole('textbox', { name: 'Oda veya telefon ara' }), 'room-003');

    await waitFor(() => expect(screen.queryAllByText('Ayşe Yılmaz')).toHaveLength(0));
    expect((await screen.findAllByText('Zeynep Aksoy')).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Filtreleri temizle' }));
    expect((await screen.findAllByText('Ayşe Yılmaz')).length).toBeGreaterThan(0);
  });
});
