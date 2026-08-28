import { describe, expect, it } from 'vitest';
import { isE164Phone } from './isE164Phone';

describe('isE164Phone', () => {
  it.each(['+38344123456', '+905551112233', ' +442071838750 '])(
    'geçerli E.164 numarasını kabul eder: %s',
    (phone) => expect(isE164Phone(phone)).toBe(true),
  );

  it.each(['05551112233', '+12', '+90 555 111 22 33', '']) (
    'geçersiz numarayı reddeder: %s',
    (phone) => expect(isE164Phone(phone)).toBe(false),
  );
});
