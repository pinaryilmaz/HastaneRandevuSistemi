import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { DebouncedSearchInput } from './DebouncedSearchInput';
describe('DebouncedSearchInput', () => { it('değeri gecikme sonunda iletir', () => { vi.useFakeTimers(); const onChange = vi.fn(); render(<DebouncedSearchInput value="" onChange={onChange} />); fireEvent.change(screen.getByRole('textbox', { name: 'Ara' }), { target: { value: 'Ayşe' } }); expect(onChange).not.toHaveBeenCalled(); act(() => vi.advanceTimersByTime(300)); expect(onChange).toHaveBeenLastCalledWith('Ayşe'); vi.useRealTimers(); }); });
