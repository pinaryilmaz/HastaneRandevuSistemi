import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function DebouncedSearchInput({ value, onChange, placeholder = 'Ara...', delay = 300 }: { value: string; onChange: (value: string) => void; placeholder?: string; delay?: number }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  useEffect(() => { const timer = window.setTimeout(() => onChange(draft), delay); return () => window.clearTimeout(timer); }, [draft, delay, onChange]);
  return <div className="relative w-full"><Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={17} aria-hidden="true" /><Input aria-label="Ara" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={placeholder} className="pl-9 pr-9" />{draft && <button type="button" aria-label="Aramayı temizle" onClick={() => setDraft('')} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700"><X size={17} /></button>}</div>;
}
