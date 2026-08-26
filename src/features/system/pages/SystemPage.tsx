import { ServerCog } from 'lucide-react';
import { useMemo, useState } from 'react';
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

export function SystemPage() {
  const status = useSystemStatus(); const [filters, setFilters] = useState<LogFilterValues>({ service: '', level: '', correlationId: '' }); const [page, setPage] = useState(0); const logs = useLogs({ service: filters.service || undefined, level: filters.level || undefined, correlationId: filters.correlationId || undefined, page, size: 50 }); const realtime = useFilterStore((state) => state.realtimeLogs);
  const merged = useMemo(() => { const live = realtime.filter((item) => (!filters.service || item.service === filters.service) && (!filters.level || item.level === filters.level) && (!filters.correlationId || item.correlationId.includes(filters.correlationId))); const all = [...live, ...(logs.data?.content ?? [])]; return Array.from(new Map(all.map((item) => [item.id, item])).values()).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); }, [filters, logs.data, realtime]);
  const updateFilters = (next: LogFilterValues) => { setFilters(next); setPage(0); };
  if (!env.operationsApiEnabled) return <div className="space-y-6"><header><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"><ServerCog size={13} /> Sistem gözlemi</div><h1 className="text-3xl font-semibold tracking-tight text-navy-900">Sistem ve loglar</h1><p className="mt-2 text-sm text-slate-500">Mikroservis sağlığını ve uçtan uca olay akışını takip edin.</p></header><IntegrationPendingState title="Sistem gözlem servisi hazırlanıyor" description="Yeni backend henüz merkezi sağlık ve log endpoint'lerini sağlamıyor. İlgili servisler API Gateway'e eklendiğinde bu ekran yeniden kod değişikliği gerektirmeden etkinleştirilecek." items={['Mikroservis sağlık durumları', 'Seviye ve servis filtreleri', 'Correlation ID takibi', 'Canlı log olayları']} /></div>;
  return <div className="space-y-6"><header><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"><ServerCog size={13} /> Sistem gözlemi</div><h1 className="text-3xl font-semibold tracking-tight text-navy-900">Sistem ve loglar</h1><p className="mt-2 text-sm text-slate-500">Mikroservis sağlığını ve uçtan uca olay akışını takip edin.</p></header>{status.isLoading ? <LoadingState rows={2} /> : status.isError ? <ErrorState error={status.error} onRetry={() => void status.refetch()} /> : status.data && <SystemStatusPanel status={status.data} />}<Card className="overflow-hidden"><CardHeader className="border-b border-slate-100"><div className="mb-4"><h2 className="font-semibold text-navy-900">Canlı log akışı</h2><p className="mt-1 text-xs text-slate-500">REST kayıtları ve anlık olaylar tek kronolojide birleştirilir.</p></div><LogFilters value={filters} onChange={updateFilters} /></CardHeader><CardContent className="p-0">{logs.isLoading ? <LoadingState /> : logs.isError ? <ErrorState error={logs.error} onRetry={() => void logs.refetch()} /> : <><LogStream logs={merged} />{logs.data && <Pagination page={logs.data.number} totalPages={logs.data.totalPages} totalElements={logs.data.totalElements} onPageChange={setPage} />}</>}</CardContent></Card></div>;
}
