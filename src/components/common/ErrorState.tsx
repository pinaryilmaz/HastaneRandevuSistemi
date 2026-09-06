import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { toApiError } from '@/api/apiError';

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const { t } = useTranslation();
  const detail = toApiError(error);
  return (
    <div
      role="alert"
      className="m-5 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-900"
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <h3 className="font-semibold">{t('common.dataUnavailable')}</h3>
          <p className="mt-1 text-sm text-rose-800">{detail.message}</p>
          {detail.correlationId && (
            <p className="mt-2 font-mono text-xs">
              {t('common.trackingCode', { code: detail.correlationId })}
            </p>
          )}
          {onRetry && (
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 border-rose-200 bg-white text-rose-700"
              onClick={onRetry}
            >
              <RotateCcw size={15} /> {t('common.retry')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
