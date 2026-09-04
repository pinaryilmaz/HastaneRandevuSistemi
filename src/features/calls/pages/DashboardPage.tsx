import { useQueryClient } from '@tanstack/react-query';
import { Activity, Info } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import type { CallStatus } from '@/api/contracts';
import { queryKeys } from '@/api/queryKeys';
import { ErrorState } from '@/components/common/ErrorState';
import { IntegrationPendingState } from '@/components/common/IntegrationPendingState';
import { LoadingState } from '@/components/common/LoadingState';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HospitalBranchFilter } from '@/features/facilities/components/HospitalBranchFilter';
import { env } from '@/lib/env';
import { useFilterStore } from '@/store/filterStore';
import { CallFilters } from '../components/CallFilters';
import { CallStats } from '../components/CallStats';
import { CallTable } from '../components/CallTable';
import { useCallRows } from '../hooks/useCallRows';
import { useCalls } from '../hooks/useCalls';
import { calculateCallStats, filterCallsByStatus, sortCalls } from '../model/callUtils';

export function DashboardPage() {
  const queryClient = useQueryClient();
  const facilityId = useFilterStore((state) => state.facilityId);
  const setFacilityId = useFilterStore((state) => state.setFacilityId);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<CallStatus | ''>('');
  const changeQuery = useCallback((value: string) => setQuery(value), []);
  const callsQuery = useCalls({ storeId: facilityId || undefined, q: query || undefined });
  const calls = useMemo(() => sortCalls(callsQuery.data ?? []), [callsQuery.data]);
  const visibleCalls = useMemo(() => filterCallsByStatus(calls, status), [calls, status]);
  const { rows } = useCallRows(visibleCalls);
  const stats = useMemo(() => calculateCallStats(calls), [calls]);
  const lastUpdatedAt = callsQuery.dataUpdatedAt
    ? new Date(callsQuery.dataUpdatedAt).toISOString()
    : undefined;

  const resetFilters = () => {
    setQuery('');
    setStatus('');
    setFacilityId('');
  };

  const refresh = () => {
    void Promise.all([
      callsQuery.refetch(),
      queryClient.invalidateQueries({ queryKey: queryKeys.medicalAppointments.all }),
    ]);
  };

  if (!env.callsApiEnabled) {
    return (
      <div className="space-y-6">
        <header>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-700">
            <Activity size={13} /> Canlı operasyon
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Çağrı yönetim paneli
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            AI destekli teyit çağrılarını ve eşleşmeleri tek görünümden izleyin.
          </p>
        </header>
        <IntegrationPendingState
          title="Çağrı servisi henüz bağlanmadı"
          description="Yeni hastane backend'i çağrı verilerini sunmuyor. API Gateway ve çağrı servisi sözleşmesi tamamlandığında bu panel otomatik olarak gerçek zamanlı izlemeye açılacak."
          items={[
            'Çağrı listesi ve detayları',
            'Canlı katılımcı sayaçları',
            'Randevu eşleştirmeleri',
            'WebSocket olay akışı',
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-700">
            <Activity size={13} /> Canlı operasyon
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            Çağrı yönetim paneli
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            AI destekli teyit çağrılarını ve eşleşmeleri tek görünümden izleyin.
          </p>
        </div>
        <div className="w-full sm:w-80">
          <HospitalBranchFilter value={facilityId} onChange={setFacilityId} />
        </div>
      </header>

      <CallStats stats={stats} />

      <Card>
        <CardHeader className="flex flex-col justify-between gap-4 border-b border-slate-100 xl:flex-row xl:items-start">
          <div className="shrink-0">
            <h2 className="font-semibold text-navy-900">Çağrı akışı</h2>
            <p className="mt-1 text-xs text-slate-500">
              Aktif kayıtlar öncelikli · {visibleCalls.length}/{calls.length} kayıt gösteriliyor
            </p>
          </div>
          <CallFilters
            query={query}
            status={status}
            lastUpdatedAt={lastUpdatedAt}
            isRefreshing={callsQuery.isFetching}
            hasActiveFilters={Boolean(query || status || facilityId)}
            onQueryChange={changeQuery}
            onStatusChange={setStatus}
            onRefresh={refresh}
            onReset={resetFilters}
          />
        </CardHeader>
        <CardContent className="p-0">
          {callsQuery.isLoading ? (
            <LoadingState />
          ) : callsQuery.isError ? (
            <ErrorState error={callsQuery.error} onRetry={() => void callsQuery.refetch()} />
          ) : (
            <CallTable calls={rows} />
          )}
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
        <Info className="mt-0.5 shrink-0" size={14} />
        <p>
          Hasta isimleri çağrının bağlı olduğu randevu kaydından alınır. Telefon numaraları güvenlik
          gereği maskelenmiştir.
        </p>
      </div>
    </div>
  );
}
