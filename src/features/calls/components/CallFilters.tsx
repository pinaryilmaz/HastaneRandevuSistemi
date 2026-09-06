import { RefreshCw, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CallStatus } from '@/api/contracts';
import { DebouncedSearchInput } from '@/components/common/DebouncedSearchInput';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { formatTime } from '@/lib/formatDate';
import { callStatusConfig } from '@/lib/statusConfig';

const statuses = Object.keys(callStatusConfig) as CallStatus[];

interface CallFiltersProps {
  query: string;
  status: CallStatus | '';
  lastUpdatedAt?: string;
  isRefreshing: boolean;
  hasActiveFilters: boolean;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: CallStatus | '') => void;
  onRefresh: () => void;
  onReset: () => void;
}

export function CallFilters({
  query,
  status,
  lastUpdatedAt,
  isRefreshing,
  hasActiveFilters,
  onQueryChange,
  onStatusChange,
  onRefresh,
  onReset,
}: CallFiltersProps) {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-3 xl:w-auto">
      <div className="grid w-full gap-3 sm:grid-cols-[minmax(220px,1fr)_180px_auto] xl:w-auto">
        <div className="sm:min-w-64">
          <DebouncedSearchInput
            ariaLabel={t('calls.search')}
            value={query}
            onChange={onQueryChange}
            placeholder={t('calls.searchPlaceholder')}
          />
        </div>
        <Select
          aria-label={t('calls.statusFilter')}
          value={status}
          onChange={(event) => onStatusChange(event.target.value as CallStatus | '')}
        >
          <option value="">{t('calls.allStatuses')}</option>
          {statuses.map((value) => (
            <option key={value} value={value}>
              {t(`status.call.${value}`)}
            </option>
          ))}
        </Select>
        <Button
          variant="secondary"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label={t('calls.refresh')}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} aria-hidden="true" />
          <span className="sm:sr-only">{t('calls.refreshShort')}</span>
        </Button>
      </div>
      <div className="flex min-h-5 flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span aria-live="polite">
          {lastUpdatedAt
            ? t('calls.lastUpdated', { time: formatTime(lastUpdatedAt) })
            : t('common.loadingData')}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 font-semibold text-aqua-700 hover:text-aqua-800"
          >
            <RotateCcw size={13} aria-hidden="true" />
            {t('calls.clearFilters')}
          </button>
        )}
      </div>
    </div>
  );
}
