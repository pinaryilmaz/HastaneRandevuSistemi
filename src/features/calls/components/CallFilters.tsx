import { RefreshCw, RotateCcw } from 'lucide-react';
import type { CallStatus } from '@/api/contracts';
import { DebouncedSearchInput } from '@/components/common/DebouncedSearchInput';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { formatTime } from '@/lib/formatDate';
import { callStatusConfig } from '@/lib/statusConfig';

const statuses = Object.entries(callStatusConfig) as Array<
  [CallStatus, (typeof callStatusConfig)[CallStatus]]
>;

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
  return (
    <div className="flex w-full flex-col gap-3 xl:w-auto">
      <div className="grid w-full gap-3 sm:grid-cols-[minmax(220px,1fr)_180px_auto] xl:w-auto">
        <div className="sm:min-w-64">
          <DebouncedSearchInput
            ariaLabel="Oda veya telefon ara"
            value={query}
            onChange={onQueryChange}
            placeholder="Oda veya telefon ara..."
          />
        </div>
        <Select
          aria-label="Çağrı durumuna göre filtrele"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as CallStatus | '')}
        >
          <option value="">Tüm durumlar</option>
          {statuses.map(([value, config]) => (
            <option key={value} value={value}>
              {config.label}
            </option>
          ))}
        </Select>
        <Button
          variant="secondary"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Çağrı listesini yenile"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} aria-hidden="true" />
          <span className="sm:sr-only">Yenile</span>
        </Button>
      </div>
      <div className="flex min-h-5 flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span aria-live="polite">
          {lastUpdatedAt ? `Son güncelleme: ${formatTime(lastUpdatedAt)}` : 'Veriler yükleniyor...'}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 font-semibold text-aqua-700 hover:text-aqua-800"
          >
            <RotateCcw size={13} aria-hidden="true" />
            Filtreleri temizle
          </button>
        )}
      </div>
    </div>
  );
}
