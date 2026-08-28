import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('mobil menü açıldığında odağı kapatma düğmesine taşır ve Escape ile kapanır', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Sidebar open onClose={onClose} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('dialog', { name: 'Uygulama menüsü' })).toHaveAttribute(
      'aria-modal',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Ana menüyü kapat' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('aktif sayfayı erişilebilir biçimde işaretler', () => {
    render(
      <MemoryRouter initialEntries={['/appointments']}>
        <Sidebar open={false} onClose={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Randevular' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
