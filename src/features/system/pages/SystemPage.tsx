import { ServerCog } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { IntegrationPendingState } from '@/components/common/IntegrationPendingState';
import { Pagination } from '@/components/common/Pagination';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFilterStore } from '@/store/filterStore';
import { env } from '@/lib/env';
import { LogFilters, type LogFilterValues } from '../components/LogFilters';
import { LogStream } from '../components/LogStream';
import { SystemStatusPanel } from '../components/SystemStatusPanel';
import { useLogs } from '../hooks/useLogs';
import { useSystemStatus } from '../hooks/useSystemStatus';
import { collectLogServices, mergeAndFilterLogs } from '../model/logUtils';

const emptyLogs: never[] = [];

export function SystemPage() {
  const { t } = useTranslation();
  const status = useSystemStatus();
  const [filters, setFilters] = useState<LogFilterValues>({
    service: '',
    level: '',
    correlationId: '',
  });
  const [page, setPage] = useState(0);
  const logs = useLogs({
    service: filters.service || undefined,
    level: filters.level || undefined,
    correlationId: filters.correlationId || undefined,
    page,
    size: 50,
  });
  const realtime = useFilterStore((state) => state.realtimeLogs);
  const restLogs = logs.data?.content ?? emptyLogs;
  const merged = useMemo(
    () => mergeAndFilterLogs(realtime, restLogs, filters),
    [filters, realtime, restLogs],
  );
  const services = useMemo(() => collectLogServices(realtime, restLogs), [realtime, restLogs]);
  const updateFilters = (next: LogFilterValues) => {
    setFilters(next);
    setPage(0);
  };
  if (!env.observabilityApiEnabled)
    return (
      <div className="space-y-6">
        <header>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            <ServerCog size={13} /> {t('system.eyebrow')}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            {t('system.title')}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{t('system.description')}</p>
        </header>
        <IntegrationPendingState
          title={t('system.pendingTitle')}
          description={t('system.pendingDescription')}
          items={[
            t('system.pendingItems.health'),
            t('system.pendingItems.filters'),
            t('system.pendingItems.correlation'),
            t('system.pendingItems.events'),
          ]}
        />
      </div>
    );
  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
          <ServerCog size={13} /> {t('system.eyebrow')}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
          {t('system.title')}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{t('system.description')}</p>
      </header>
      {status.isLoading ? (
        <LoadingState rows={2} />
      ) : status.isError ? (
        <ErrorState error={status.error} onRetry={() => void status.refetch()} />
      ) : (
        status.data && <SystemStatusPanel status={status.data} />
      )}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-100">
          <div className="mb-4">
            <h2 className="font-semibold text-navy-900">{t('system.logStream')}</h2>
            <p className="mt-1 text-xs text-slate-500">{t('system.logDescription')}</p>
          </div>
          <LogFilters value={filters} services={services} onChange={updateFilters} />
        </CardHeader>
        <CardContent className="p-0">
          {logs.isLoading ? (
            <LoadingState />
          ) : logs.isError ? (
            <ErrorState error={logs.error} onRetry={() => void logs.refetch()} />
          ) : (
            <>
              <LogStream logs={merged} />
              {logs.data && (
                <Pagination
                  page={logs.data.number}
                  totalPages={logs.data.totalPages}
                  totalElements={logs.data.totalElements}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
