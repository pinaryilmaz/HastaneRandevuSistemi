import { CalendarDays } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import type { AppointmentStatus } from '@/api/contracts';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { Pagination } from '@/components/common/Pagination';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AppointmentFilters, type AppointmentFilterValues } from '../components/AppointmentFilters';
import { AppointmentTable } from '../components/AppointmentTable';
import { useAppointments } from '../hooks/useAppointments';

function toBoundary(date: string, end = false) { if (!date) return undefined; return new Date(`${date}T${end ? '23:59:59' : '00:00:00'}+03:00`).toISOString(); }
export function AppointmentsPage() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(Number(params.get('page') ?? 0), 0);
  const filters: AppointmentFilterValues = { storeId: params.get('storeId') ?? '', status: (params.get('status') ?? '') as AppointmentStatus | '', from: params.get('from') ?? '', to: params.get('to') ?? '' };
  const query = useAppointments({ storeId: filters.storeId || undefined, status: filters.status || undefined, from: toBoundary(filters.from), to: toBoundary(filters.to, true), page, size: 20 });
  const updateFilters = (next: AppointmentFilterValues) => { const search = new URLSearchParams(); Object.entries(next).forEach(([key, value]) => { if (value) search.set(key, value); }); setParams(search); };
  const updatePage = (next: number) => { const search = new URLSearchParams(params); if (next) search.set('page', String(next)); else search.delete('page'); setParams(search); };
  return <div className="space-y-6"><header><div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"><CalendarDays size={13} /> Randevu takibi</div><h1 className="text-3xl font-semibold tracking-tight text-navy-900">Randevular</h1><p className="mt-2 text-sm text-slate-500">Tüm hastanelerdeki randevuları tarih, şube ve durumla filtreleyin.</p></header><Card><CardHeader className="border-b border-slate-100"><AppointmentFilters value={filters} onChange={updateFilters} /></CardHeader><CardContent className="p-0">{query.isLoading ? <LoadingState /> : query.isError ? <ErrorState error={query.error} onRetry={() => void query.refetch()} /> : <><AppointmentTable appointments={query.data?.content ?? []} />{query.data && <Pagination page={query.data.number} totalPages={query.data.totalPages} totalElements={query.data.totalElements} onPageChange={updatePage} />}</>}</CardContent></Card></div>;
}
