import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';
import type { LogEvent } from '@/api/contracts';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/cn';

const level = { INFO: { icon: CircleCheck, className: 'text-sky-700 bg-sky-50' }, WARN: { icon: TriangleAlert, className: 'text-amber-700 bg-amber-50' }, ERROR: { icon: CircleAlert, className: 'text-rose-700 bg-rose-50' } };
export function LogStream({ logs }: { logs: LogEvent[] }) {
  const container = useRef<HTMLDivElement>(null); const [paused, setPaused] = useState(false); const firstId = logs[0]?.id;
  useEffect(() => { if (!paused) container.current?.scrollTo({ top: 0, behavior: 'smooth' }); }, [firstId, paused]);
  const rows = useMemo(() => logs, [logs]);
  return <div className="relative"><div ref={container} onScroll={(event) => setPaused(event.currentTarget.scrollTop > 30)} className="max-h-[520px] overflow-y-auto bg-[#0b1729] p-3 font-mono text-xs sm:p-4">{rows.length ? rows.map((log) => { const item = level[log.level]; const Icon = item.icon; return <article key={log.id} className="grid gap-2 border-b border-white/5 px-2 py-3 last:border-0 sm:grid-cols-[150px_92px_140px_1fr]"><time className="text-slate-500">{formatDate(log.timestamp)}</time><span className={cn('inline-flex h-6 w-fit items-center gap-1 rounded px-2 font-semibold', item.className)}><Icon size={11} />{log.level}</span><span className="truncate text-aqua-100">{log.service}</span><div><p className="leading-5 text-slate-200">{log.message}</p><p className="mt-1 truncate text-[10px] text-slate-600">correlation: {log.correlationId}</p></div></article>; }) : <p className="p-10 text-center text-slate-500">Henüz log kaydı yok.</p>}</div>{paused && <Button size="sm" className="absolute bottom-4 right-5 shadow-lg" onClick={() => { container.current?.scrollTo({ top: 0, behavior: 'smooth' }); setPaused(false); }}><ArrowUp size={14} /> Canlı akışa dön</Button>}</div>;
}
