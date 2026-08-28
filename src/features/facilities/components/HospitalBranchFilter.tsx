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
    <div className="flex items-center gap-2">
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400"
        aria-hidden="true"
      >
        <Building2 size={18} />
      </span>
      <Select
        aria-label="Hastane şubesi seç"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1"
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
