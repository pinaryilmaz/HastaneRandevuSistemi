import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/formatNumber';

export function Pagination({
  page,
  totalPages,
  totalElements,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}) {
  const { t } = useTranslation();
  if (totalPages <= 1)
    return (
      <p className="px-5 py-4 text-sm text-slate-500">
        {t('pagination.total', { total: formatNumber(totalElements) })}
      </p>
    );
  return (
    <nav
      aria-label={t('pagination.label')}
      className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <p className="text-sm text-slate-500" aria-live="polite">
        {t('pagination.summary', {
          total: formatNumber(totalElements),
          page: formatNumber(page + 1),
          pages: formatNumber(totalPages),
        })}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          aria-label={t('pagination.previousLabel')}
        >
          <ChevronLeft size={16} aria-hidden="true" /> {t('pagination.previous')}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          aria-label={t('pagination.nextLabel')}
        >
          {t('pagination.next')} <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
