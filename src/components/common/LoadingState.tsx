import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';

export function LoadingState({ rows = 4, label }: { rows?: number; label?: string }) {
  const { t } = useTranslation();
  const resolvedLabel = label ?? t('common.loadingData');
  return (
    <div role="status" aria-label={resolvedLabel} className="space-y-3 p-5">
      <span className="sr-only">{resolvedLabel}</span>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}
