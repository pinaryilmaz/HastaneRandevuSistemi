import { describe, expect, it } from 'vitest';
import { maskPhone } from './maskPhone';
describe('maskPhone', () => {
  it('telefonun yalnızca başını ve son iki hanesini gösterir', () => {
    expect(maskPhone('+905321234512')).toMatch(/^\+9053•+12$/);
    expect(maskPhone('+905321234512')).not.toContain('12345');
  });
  it('boş değeri güvenli gösterir', () => {
    expect(maskPhone(null)).toBe('—');
  });
});
