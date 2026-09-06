import { describe, expect, it } from 'vitest';
import { resources } from './resources';

function collectKeys(value: object, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof child === 'object' && child !== null ? collectKeys(child, path) : [path];
  });
}

describe('translation resources', () => {
  it('Türkçe ve İngilizce sözlüklerin aynı anahtarları içerdiğini doğrular', () => {
    const turkishKeys = collectKeys(resources.tr.translation).sort();
    const englishKeys = collectKeys(resources.en.translation).sort();

    expect(englishKeys).toEqual(turkishKeys);
  });
});
