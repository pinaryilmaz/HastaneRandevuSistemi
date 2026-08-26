import { Building2 } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { useHospitalBranches } from '../hooks/useHospitalBranches';

export function HospitalBranchFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const branches = useHospitalBranches();

  return (
    <div className="relative">
      <Building2
        className="pointer-events-none absolute left-3 top-3.5 z-10 text-slate-400"
        size={16}
        aria-hidden="true"
      />
      <Select
        aria-label="Hastane şubesi seç"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full pl-9"
        disabled={branches.isLoading || branches.isError}
      >
        <option value="">
          {branches.isLoading
            ? 'Şubeler yükleniyor...'
            : branches.isError
              ? 'Şubeler alınamadı'
              : 'Tüm hastane şubeleri'}
        </option>
        {branches.data?.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.hospitalName} · {branch.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
