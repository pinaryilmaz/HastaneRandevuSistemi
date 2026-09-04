import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { LogEvent } from '@/api/contracts';
import { renderWithProviders } from '@/test/renderWithProviders';
import { LogStream } from './LogStream';

const log: LogEvent = {
  id: 'log-1',
  timestamp: '2026-09-04T09:00:00Z',
  level: 'WARN',
  service: 'hospital-appointment-service',
  message: 'Deneme logu',
  correlationId: 'corr-1',
};

describe('LogStream', () => {
  it('boş ve dolu akışları gösterir', () => {
    const { rerender } = renderWithProviders(<LogStream logs={[]} />);
    expect(screen.getByText('Henüz log kaydı yok.')).toBeInTheDocument();

    rerender(<LogStream logs={[log]} />);
    expect(screen.getByText('Deneme logu')).toBeInTheDocument();
    expect(screen.getByText('WARN')).toBeInTheDocument();
  });

  it('kullanıcı geçmişe kaydırınca akışı durdurur ve geri döndürür', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LogStream logs={[log]} />);
    const stream = screen.getByRole('log', { name: 'Canlı sistem logları' });
    const scrollTo = vi.fn();
    Object.defineProperty(stream, 'scrollTo', { value: scrollTo });

    Object.defineProperty(stream, 'scrollTop', { value: 60, configurable: true });
    fireEvent.scroll(stream);
    await user.click(screen.getByRole('button', { name: 'Canlı akışa dön' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
