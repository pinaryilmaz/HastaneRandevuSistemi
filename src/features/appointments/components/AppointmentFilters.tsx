import type { AppointmentStatus } from '@/api/contracts';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const update = <K extends keyof AppointmentFilterValues>(
    key: K,
    next: AppointmentFilterValues[K],
  ) => onChange({ ...value, [key]: next });

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <div>
        <Label htmlFor="appointment-phone">{t('appointments.patientPhone')}</Label>
        <DebouncedSearchInput
          id="appointment-phone"
          ariaLabel={t('appointments.phoneSearch')}
          value={value.patientPhone}
          onChange={(phone) => update('patientPhone', phone)}
          placeholder={t('appointments.phonePlaceholder')}
        />
      </div>
      <div>
        <span
          className="mb-1.5 block text-sm font-medium text-slate-700"
          id="appointment-branch-label"
        >
          {t('appointments.hospitalBranch')}
        </span>
        <HospitalBranchFilter value={value.storeId} onChange={(id) => update('storeId', id)} />
      </div>
      <div>
        <Label htmlFor="appointment-status">{t('appointments.status')}</Label>
        <Select
          id="appointment-status"
          value={value.status}
          onChange={(event) => update('status', event.target.value as AppointmentStatus | '')}
        >
          <option value="">{t('calls.allStatuses')}</option>
          <option value="PENDING">{t('status.appointment.PENDING')}</option>
          <option value="CONFIRMED">{t('status.appointment.CONFIRMED')}</option>
          <option value="CANCELLED">{t('status.appointment.CANCELLED')}</option>
          <option value="RESCHEDULED">{t('status.appointment.RESCHEDULED')}</option>
          <option value="NO_SHOW">{t('status.appointment.NO_SHOW')}</option>
          <option value="COMPLETED">{t('status.appointment.COMPLETED')}</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="appointment-from">{t('appointments.startDate')}</Label>
        <Input
          id="appointment-from"
          type="date"
          value={value.from}
          onChange={(event) => update('from', event.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="appointment-to">{t('appointments.endDate')}</Label>
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
