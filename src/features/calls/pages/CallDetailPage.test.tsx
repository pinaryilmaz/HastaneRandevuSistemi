import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { CallDetailPage } from './CallDetailPage';

describe('CallDetailPage', () => {
  it('çağrı, bağlı randevu, sonuç, timeline ve güvenli transcript bilgisini gösterir', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/calls/:callId" element={<CallDetailPage />} />
      </Routes>,
      '/calls/call-003',
    );

    expect(await screen.findByRole('heading', { name: 'Çağrı detayı' })).toBeInTheDocument();
    expect(await screen.findByText('Zeynep Aksoy')).toBeInTheDocument();
    expect(screen.getByText('Randevu doğrulandı')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Görüşme kaydını aç/ })).toHaveAttribute(
      'href',
      'https://example.com/transcripts/demo',
    );
    expect(screen.getByText('Durum zaman çizelgesi')).toBeInTheDocument();
  });
});
