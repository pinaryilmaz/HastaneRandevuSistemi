import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFilterStore } from '@/store/filterStore';
import { renderWithProviders } from '@/test/renderWithProviders';
import { AppointmentsPage } from './AppointmentsPage';

describe('AppointmentsPage', () => {
  beforeEach(() => useFilterStore.setState({ appointmentPatientPhone: '' }));

  it('randevuları listeler, URL ile senkron durum filtresi uygular', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppointmentsPage />, '/appointments');

    expect((await screen.findAllByText('Ayşe Yılmaz')).length).toBeGreaterThan(0);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Randevu durumu' }), 'CANCELLED');

    expect((await screen.findAllByText('Murat Şahin')).length).toBeGreaterThan(0);
    await waitFor(() => expect(screen.queryByText('Ayşe Yılmaz')).not.toBeInTheDocument());
    expect(window.location.search).not.toContain('patientPhone');
  });

  it('geçersiz telefon biçiminde backend isteği yerine açıklama gösterir', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AppointmentsPage />, '/appointments');

    await user.type(screen.getByRole('textbox', { name: 'Hasta telefonu' }), '0555');

    expect(await screen.findByText('Telefon biçimini kontrol edin')).toBeInTheDocument();
  });
});
