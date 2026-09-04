import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { LogFilters, type LogFilterValues } from './LogFilters';

const value: LogFilterValues = { service: '', level: '', correlationId: '' };

describe('LogFilters', () => {
  it('gerçek backend servisini gösterir ve seçimi iletir', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(
      <LogFilters value={value} services={['hospital-appointment-service']} onChange={onChange} />,
    );

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Log servisi' }),
      'hospital-appointment-service',
    );

    expect(screen.getByRole('option', { name: 'Hastane randevu' })).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith({
      ...value,
      service: 'hospital-appointment-service',
    });
  });

  it('seviye ve correlation ID değişikliklerini iletir', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(<LogFilters value={value} services={[]} onChange={onChange} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Log seviyesi' }), 'WARN');
    fireEvent.change(screen.getByRole('textbox', { name: 'Correlation ID' }), {
      target: { value: 'corr-12' },
    });

    expect(onChange).toHaveBeenCalledWith({ ...value, level: 'WARN' });
    expect(onChange).toHaveBeenLastCalledWith({ ...value, correlationId: 'corr-12' });
  });
});
