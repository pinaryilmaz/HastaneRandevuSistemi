import { Activity, Info } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DebouncedSearchInput } from '@/components/common/DebouncedSearchInput';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { IntegrationPendingState } from '@/components/common/IntegrationPendingState';
import { FacilityFilter } from '@/features/facilities/components/FacilityFilter';
import { useFilterStore } from '@/store/filterStore';
import { env } from '@/lib/env';
import { CallStats } from '../components/CallStats';
import { CallTable } from '../components/CallTable';
import { useCalls } from '../hooks/useCalls';
import { useCallRows } from '../hooks/useCallRows';
import { calculateCallStats, sortCalls } from '../model/callUtils';

export function DashboardPage() {
  const facilityId = useFilterStore((state) => state.facilityId);
  const [query, setQuery] = useState('');
  const changeQuery = useCallback((value: string) => setQuery(value), []);
  const callsQuery = useCalls({ storeId: facilityId || undefined, q: query || undefined });
  const calls = useMemo(() => sortCalls(callsQuery.data ?? []), [callsQuery.data]);
  const { rows } = useCallRows(calls);
  const stats = useMemo(() => calculateCallStats(calls), [calls]);
  if (!env.operationsApiEnabled) return <div className="space-y-6"><header><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-700"><Activity size={13} /> Canlı operasyon</div><h1 className="text-3xl font-semibold tracking-tight text-navy-900">Çağrı yönetim paneli</h1><p className="mt-2 text-sm text-slate-500">AI destekli teyit çağrılarını ve eşleşmeleri tek görünümden izleyin.</p></header><IntegrationPendingState title="Çağrı servisi henüz bağlanmadı" description="Yeni hastane backend'i çağrı verilerini sunmuyor. API Gateway ve çağrı servisi sözleşmesi tamamlandığında bu panel otomatik olarak gerçek zamanlı izlemeye açılacak." items={['Çağrı listesi ve detayları', 'Canlı katılımcı sayaçları', 'Randevu eşleştirmeleri', 'WebSocket olay akışı']} /></div>;
  return <div className="space-y-6"><header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-aqua-50 px-3 py-1 text-xs font-semibold text-aqua-700"><Activity size={13} /> Canlı operasyon</div><h1 className="text-3xl font-semibold tracking-tight text-navy-900">Çağrı yönetim paneli</h1><p className="mt-2 text-sm text-slate-500">AI destekli teyit çağrılarını ve eşleşmeleri tek görünümden izleyin.</p></div><FacilityFilter /></header><CallStats stats={stats} /><Card><CardHeader className="flex flex-col justify-between gap-4 border-b border-slate-100 sm:flex-row sm:items-center"><div><h2 className="font-semibold text-navy-900">Çağrı akışı</h2><p className="mt-1 text-xs text-slate-500">Aktif kayıtlar öncelikli gösterilir.</p></div><div className="w-full sm:w-80"><DebouncedSearchInput value={query} onChange={changeQuery} placeholder="Oda veya telefon ara..." /></div></CardHeader><CardContent className="p-0">{callsQuery.isLoading ? <LoadingState /> : callsQuery.isError ? <ErrorState error={callsQuery.error} onRetry={() => void callsQuery.refetch()} /> : <CallTable calls={rows} />}</CardContent></Card><div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500"><Info className="mt-0.5 shrink-0" size={14} /><p>Hasta isimleri çağrının bağlı olduğu randevu kaydından alınır. Telefon numaraları güvenlik gereği maskelenmiştir.</p></div></div>;
}
