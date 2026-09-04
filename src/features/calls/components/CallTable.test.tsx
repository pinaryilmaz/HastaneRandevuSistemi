import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockAppointments } from '@/mocks/fixtures/appointments';
import { mockCalls } from '@/mocks/fixtures/calls';
import { renderWithProviders } from '@/test/renderWithProviders';
import { toCallRow } from '../model/callMapper';
import { CallTable } from './CallTable';
describe('CallTable', () => {
  it('boş durumda yönlendirici mesaj gösterir', () => {
    renderWithProviders(<CallTable calls={[]} />);
    expect(screen.getByText('Çağrı bulunamadı')).toBeInTheDocument();
  });
  it('hasta bilgisini ve maskeli telefonu gösterir', () => {
    renderWithProviders(<CallTable calls={[toCallRow(mockCalls[0], mockAppointments[0])]} />);
    expect(screen.getAllByText('Ayşe Yılmaz').length).toBeGreaterThan(0);
    expect(screen.queryByText('+905321234512')).not.toBeInTheDocument();
  });
});
