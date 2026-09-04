import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState({
  rows = 4,
  label = 'Veriler yükleniyor',
}: {
  rows?: number;
  label?: string;
}) {
  return (
    <div role="status" aria-label={label} className="space-y-3 p-5">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}
