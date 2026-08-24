import type { AppointmentStatus } from '@/api/contracts';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { FacilityFilter } from '@/features/facilities/components/FacilityFilter';

export interface AppointmentFilterValues { storeId: string; status: AppointmentStatus | ''; from: string; to: string }
export function AppointmentFilters({ value, onChange }: { value: AppointmentFilterValues; onChange: (value: AppointmentFilterValues) => void }) {
  const update = <K extends keyof AppointmentFilterValues>(key: K, next: AppointmentFilterValues[K]) => onChange({ ...value, [key]: next });
  return <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><FacilityFilter value={value.storeId} onChange={(id) => update('storeId', id)} className="w-full [&_select]:w-full" /><Select aria-label="Randevu durumu" value={value.status} onChange={(event) => update('status', event.target.value as AppointmentStatus | '')}><option value="">Tüm durumlar</option><option value="PENDING">Bekliyor</option><option value="CONFIRMED">Onaylandı</option><option value="CANCELLED">İptal</option><option value="RESCHEDULED">Yeniden planlandı</option><option value="NO_SHOW">Gelmedi</option></Select><Input aria-label="Başlangıç tarihi" type="date" value={value.from} onChange={(event) => update('from', event.target.value)} /><Input aria-label="Bitiş tarihi" type="date" value={value.to} onChange={(event) => update('to', event.target.value)} /></div>;
}
