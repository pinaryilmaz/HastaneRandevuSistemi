import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFilterStore } from '@/store/filterStore';
import { renderWithProviders } from '@/test/renderWithProviders';
import { SystemPage } from './SystemPage';

describe('SystemPage', () => {
  beforeEach(() => useFilterStore.setState({ realtimeLogs: [] }));

  it('servis durumlarını ve REST loglarını gösterip filtreler', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SystemPage />, '/system');

    expect(await screen.findByLabelText('Canlı Bildirim: çalışıyor')).toBeInTheDocument();
    expect(await screen.findByText('Çağrı katılımcı bilgisi güncellendi')).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Log seviyesi' }), 'ERROR');

    expect(
      await screen.findByText('Teyit çağrısı yanıt alınamadığı için sonlandırıldı'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Çağrı katılımcı bilgisi güncellendi')).not.toBeInTheDocument();
  });

  it('canlı log ile REST karşılığını tek satırda birleştirir', async () => {
    useFilterStore.setState({
      realtimeLogs: [
        {
          id: 'realtime-copy',
          timestamp: '2026-08-24T12:30:12Z',
          level: 'INFO',
          service: 'call-service',
          message: 'Canlı kopya',
          correlationId: 'corr-call-001',
          source: 'REALTIME',
        },
      ],
    });
    renderWithProviders(<SystemPage />, '/system');

    expect(await screen.findByText('Çağrı katılımcı bilgisi güncellendi')).toBeInTheDocument();
    expect(screen.queryByText('Canlı kopya')).not.toBeInTheDocument();
  });
});
