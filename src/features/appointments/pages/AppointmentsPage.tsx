import { CalendarDays } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import type { AppointmentStatus } from '@/api/contracts';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { Pagination } from '@/components/common/Pagination';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFilterStore } from '@/store/filterStore';
import { isE164Phone } from '@/lib/isE164Phone';
import { AppointmentFilters, type AppointmentFilterValues } from '../components/AppointmentFilters';
import { AppointmentTable } from '../components/AppointmentTable';
import { useMedicalAppointments } from '../hooks/useMedicalAppointments';

function toBoundary(date: string, end = false) {
  if (!date) return undefined;
  return new Date(`${date}T${end ? '23:59:59' : '00:00:00'}+03:00`).toISOString();
}

export function AppointmentsPage() {
  const [params, setParams] = useSearchParams();
  const patientPhone = useFilterStore((state) => state.appointmentPatientPhone);
  const setPatientPhone = useFilterStore((state) => state.setAppointmentPatientPhone);
  const page = Math.max(Number(params.get('page') ?? 0), 0);
  const filters: AppointmentFilterValues = {
    patientPhone,
    storeId: params.get('storeId') ?? '',
    status: (params.get('status') ?? '') as AppointmentStatus | '',
    from: params.get('from') ?? '',
    to: params.get('to') ?? '',
  };
  const query = useMedicalAppointments({
    patientPhone: filters.patientPhone || undefined,
    storeId: filters.storeId || undefined,
    status: filters.status || undefined,
    from: toBoundary(filters.from),
    to: toBoundary(filters.to, true),
    page,
    size: 20,
  });
  const updateFilters = (next: AppointmentFilterValues) => {
    setPatientPhone(next.patientPhone);
    const search = new URLSearchParams();
    (['storeId', 'status', 'from', 'to'] as const).forEach((key) => {
      if (next[key]) search.set(key, next[key]);
    });
    setParams(search);
  };
  const updatePage = (next: number) => {
    const search = new URLSearchParams(params);
    if (next) search.set('page', String(next));
    else search.delete('page');
    setParams(search);
  };
  const normalizedPhone = patientPhone.trim();
  const invalidPhone = Boolean(normalizedPhone && !isE164Phone(normalizedPhone));

  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          <CalendarDays size={13} /> Randevu takibi
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
          Randevular
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Tüm randevuları görüntüleyin; telefon, şube, tarih ve duruma göre daraltın.
        </p>
      </header>
      <Card>
        <CardHeader className="border-b border-slate-100">
          <AppointmentFilters value={filters} onChange={updateFilters} />
          <p className="mt-3 text-xs text-slate-500">
            Telefon araması isteğe bağlıdır, E.164 biçiminde girilir ve adres çubuğuna yazılmaz.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {invalidPhone ? (
            <EmptyState
              title="Telefon biçimini kontrol edin"
              description="Numarayı ülke koduyla birlikte girin. Örnek: +38344123456"
            />
          ) : query.isLoading ? (
            <LoadingState />
          ) : query.isError ? (
            <ErrorState error={query.error} onRetry={() => void query.refetch()} />
          ) : (
            <>
              <AppointmentTable appointments={query.data?.content ?? []} />
              {query.data && (
                <Pagination
                  page={query.data.number}
                  totalPages={query.data.totalPages}
                  totalElements={query.data.totalElements}
                  onPageChange={updatePage}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
