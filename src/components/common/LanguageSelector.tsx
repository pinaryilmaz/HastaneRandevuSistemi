import { useTranslation } from 'react-i18next';
import type { AppLanguage } from '@/i18n';
import { cn } from '@/lib/cn';

export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'tr';
  const changeLanguage = (nextLanguage: AppLanguage) => {
    if (nextLanguage !== language) void i18n.changeLanguage(nextLanguage);
  };

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn(
        'inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm',
        compact ? 'h-10' : 'h-11',
      )}
    >
      {(['tr', 'en'] as const).map((item) => {
        const selected = language === item;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={selected}
            aria-label={item === 'tr' ? t('language.turkish') : t('language.english')}
            title={item === 'tr' ? t('language.turkish') : t('language.english')}
            onClick={() => changeLanguage(item)}
            className={cn(
              'inline-flex h-7 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua-500 focus-visible:ring-offset-1',
              selected
                ? 'bg-navy-900 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900',
            )}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
