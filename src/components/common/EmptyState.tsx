import { Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export function EmptyState({ title, description }: { title?: string; description?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-2xl bg-slate-100 p-3 text-slate-500">
        <Inbox aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-slate-900">{title ?? t('common.emptyTitle')}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {description ?? t('common.emptyDescription')}
      </p>
    </div>
  );
}
