import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

export const supportedLanguages = ['tr', 'en'] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

const storageKey = 'hospital-operation-language';

function isSupportedLanguage(value: string | null): value is AppLanguage {
  return supportedLanguages.includes(value as AppLanguage);
}

function getInitialLanguage(): AppLanguage {
  if (import.meta.env.MODE === 'test') return 'tr';

  const saved = typeof localStorage === 'undefined' ? null : localStorage.getItem(storageKey);
  if (isSupportedLanguage(saved)) return saved;

  return typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('tr')
    ? 'tr'
    : 'en';
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  initAsync: false,
  fallbackLng: 'tr',
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  returnNull: false,
});

function applyLanguage(language: string) {
  const resolved = isSupportedLanguage(language) ? language : 'tr';
  if (typeof document !== 'undefined') document.documentElement.lang = resolved;
  if (typeof localStorage !== 'undefined') localStorage.setItem(storageKey, resolved);
}

applyLanguage(i18n.resolvedLanguage ?? i18n.language);
i18n.on('languageChanged', applyLanguage);

export function getCurrentLanguage(): AppLanguage {
  const language = i18n.resolvedLanguage ?? i18n.language;
  return isSupportedLanguage(language) ? language : 'tr';
}

export function getCurrentLocale(): 'tr-TR' | 'en-US' {
  return getCurrentLanguage() === 'tr' ? 'tr-TR' : 'en-US';
}

export { i18n };
