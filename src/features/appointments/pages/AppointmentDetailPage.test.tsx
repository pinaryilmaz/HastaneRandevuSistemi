import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { AppointmentDetailPage } from './AppointmentDetailPage';

describe('AppointmentDetailPage', () => {
  it('randevuyu yeniden yükleyip hasta telefonunu maskeli gösterir', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/appointments/:appointmentId" element={<AppointmentDetailPage />} />
      </Routes>,
      '/appointments/apt-001',
    );

    expect(await screen.findByRole('heading', { name: 'Randevu detayı' })).toBeInTheDocument();
    expect(screen.getByText('Ayşe Yılmaz')).toBeInTheDocument();
    expect(screen.queryByText('+905321234512')).not.toBeInTheDocument();
    expect(screen.getByText(/•••••/)).toBeInTheDocument();
    expect(screen.getByText('Dr. Selin Kaya')).toBeInTheDocument();
  });
});
