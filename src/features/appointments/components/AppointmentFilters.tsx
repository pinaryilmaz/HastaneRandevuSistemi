import type { AppointmentStatus } from '@/api/contracts';
import { DebouncedSearchInput } from '@/components/common/DebouncedSearchInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { HospitalBranchFilter } from '@/features/facilities/components/HospitalBranchFilter';

export interface AppointmentFilterValues {
  patientPhone: string;
  storeId: string;
  status: AppointmentStatus | '';
  from: string;
  to: string;
}

export function AppointmentFilters({
  value,
  onChange,
}: {
  value: AppointmentFilterValues;
  onChange: (value: AppointmentFilterValues) => void;
}) {
  const update = <K extends keyof AppointmentFilterValues>(
    key: K,
    next: AppointmentFilterValues[K],
  ) => onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <div>
        <Label htmlFor="appointment-phone">Hasta telefonu</Label>
        <DebouncedSearchInput
          id="appointment-phone"
          ariaLabel="Hasta telefonuyla ara"
          value={value.patientPhone}
          onChange={(phone) => update('patientPhone', phone)}
          placeholder="Hasta telefonu ile ara"
        />
      </div>
      <div>
        <span
          className="mb-1.5 block text-sm font-medium text-slate-700"
          id="appointment-branch-label"
        >
          Hastane / şube
        </span>
        <HospitalBranchFilter value={value.storeId} onChange={(id) => update('storeId', id)} />
      </div>
      <div>
        <Label htmlFor="appointment-status">Randevu durumu</Label>
        <Select
          id="appointment-status"
          value={value.status}
          onChange={(event) => update('status', event.target.value as AppointmentStatus | '')}
        >
          <option value="">Tüm durumlar</option>
          <option value="PENDING">Bekliyor</option>
          <option value="CONFIRMED">Onaylandı</option>
          <option value="CANCELLED">İptal</option>
          <option value="RESCHEDULED">Yeniden planlandı</option>
          <option value="NO_SHOW">Gelmedi</option>
          <option value="COMPLETED">Tamamlandı</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="appointment-from">Başlangıç tarihi</Label>
        <Input
          id="appointment-from"
          type="date"
          value={value.from}
          onChange={(event) => update('from', event.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="appointment-to">Bitiş tarihi</Label>
        <Input
          id="appointment-to"
          type="date"
          value={value.to}
          min={value.from || undefined}
          onChange={(event) => update('to', event.target.value)}
        />
      </div>
    </div>
  );
}
