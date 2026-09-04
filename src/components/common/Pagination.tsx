import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Pagination({
  page,
  totalPages,
  totalElements,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1)
    return <p className="px-5 py-4 text-sm text-slate-500">Toplam {totalElements} kayıt</p>;
  return (
    <nav
      aria-label="Sayfalama"
      className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <p className="text-sm text-slate-500" aria-live="polite">
        Toplam {totalElements} kayıt · Sayfa {page + 1}/{totalPages}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          aria-label="Önceki sayfaya git"
        >
          <ChevronLeft size={16} aria-hidden="true" /> Önceki
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          aria-label="Sonraki sayfaya git"
        >
          Sonraki <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
