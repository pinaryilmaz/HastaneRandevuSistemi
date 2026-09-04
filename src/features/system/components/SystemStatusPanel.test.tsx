import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/renderWithProviders';
import { SystemStatusPanel } from './SystemStatusPanel';

describe('SystemStatusPanel', () => {
  it('UP ve DOWN servislerini ikon yanında erişilebilir metinle gösterir', () => {
    renderWithProviders(
      <SystemStatusPanel
        status={{ dialer: 'DOWN', livekitAgent: 'DOWN', dashboard: 'UP', whatsapp: 'DOWN' }}
      />,
    );

    expect(screen.getByLabelText('Canlı Bildirim: çalışıyor')).toBeInTheDocument();
    expect(screen.getByLabelText('WhatsApp: erişilemiyor')).toBeInTheDocument();
    expect(screen.getAllByText('Erişilemiyor')).toHaveLength(3);
  });
});
