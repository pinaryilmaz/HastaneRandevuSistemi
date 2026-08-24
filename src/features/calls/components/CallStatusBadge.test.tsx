import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CallStatusBadge } from './CallStatusBadge';
describe('CallStatusBadge', () => { it('durumu ikon ve Türkçe metinle gösterir', () => { render(<CallStatusBadge status="ACTIVE" />); expect(screen.getByText('Aktif')).toBeInTheDocument(); }); it('hata durumunu metinle ayırt eder', () => { render(<CallStatusBadge status="FAILED" />); expect(screen.getByText('Başarısız')).toHaveClass('text-rose-700'); }); });
