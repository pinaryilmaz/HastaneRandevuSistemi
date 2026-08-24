import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Pagination({ page, totalPages, totalElements, onPageChange }: { page: number; totalPages: number; totalElements: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return <p className="px-5 py-4 text-sm text-slate-500">Toplam {totalElements} kayıt</p>;
  return <div className="flex items-center justify-between gap-4 px-5 py-4"><p className="text-sm text-slate-500">Toplam {totalElements} kayıt · Sayfa {page + 1}/{totalPages}</p><div className="flex gap-2"><Button variant="secondary" size="sm" disabled={page <= 0} onClick={() => onPageChange(page - 1)}><ChevronLeft size={16} /> Önceki</Button><Button variant="secondary" size="sm" disabled={page >= totalPages - 1} onClick={() => onPageChange(page + 1)}>Sonraki <ChevronRight size={16} /></Button></div></div>;
}
