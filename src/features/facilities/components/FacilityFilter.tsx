import { Building2 } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { useFilterStore } from '@/store/filterStore';
import { useFacilities } from '../hooks/useFacilities';

export function FacilityFilter({
  value,
  onChange,
  className = '',
}: {
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}) {
  const globalValue = useFilterStore((state) => state.facilityId);
  const setGlobal = useFilterStore((state) => state.setFacilityId);
  const facilities = useFacilities();
  const selected = value ?? globalValue;
  return (
    <div className={`relative ${className}`}>
      <Building2
        className="pointer-events-none absolute left-3 top-3.5 z-10 text-slate-400"
        size={16}
        aria-hidden="true"
      />
      <Select
        aria-label="Hastane veya şube seç"
        value={selected}
        onChange={(event) => (onChange ?? setGlobal)(event.target.value)}
        className="w-full pl-9 sm:w-64"
      >
        <option value="">Tüm hastaneler</option>
        {facilities.data?.map((facility) => (
          <option key={facility.id} value={facility.id}>
            {facility.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
