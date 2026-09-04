import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';
import type { LogEvent } from '@/api/contracts';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/cn';

const level = {
  INFO: { icon: CircleCheck, className: 'text-sky-700 bg-sky-50' },
  WARN: { icon: TriangleAlert, className: 'text-amber-700 bg-amber-50' },
  ERROR: { icon: CircleAlert, className: 'text-rose-700 bg-rose-50' },
};
export function LogStream({ logs }: { logs: LogEvent[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const firstId = logs[0]?.id;
  useEffect(() => {
    if (!paused) container.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [firstId, paused]);
  const rows = useMemo(() => logs, [logs]);
  return (
    <div className="relative">
      <div
        ref={container}
        role="log"
        aria-label="Canlı sistem logları"
        tabIndex={0}
        onScroll={(event) => setPaused(event.currentTarget.scrollTop > 30)}
        className="max-h-[520px] overflow-y-auto bg-[#0b1729] p-3 font-mono text-xs sm:p-4"
      >
        {rows.length ? (
          rows.map((log) => {
            const item = level[log.level];
            const Icon = item.icon;
            return (
              <article
                key={log.id}
                className="grid gap-2 border-b border-white/5 px-2 py-3 last:border-0 sm:grid-cols-[150px_92px_140px_minmax(0,1fr)]"
              >
                <time className="text-slate-400">{formatDate(log.timestamp)}</time>
                <span
                  className={cn(
                    'inline-flex h-6 w-fit items-center gap-1 rounded px-2 font-semibold',
                    item.className,
                  )}
                >
                  <Icon size={11} aria-hidden="true" />
                  {log.level}
                </span>
                <span className="break-all text-aqua-100 sm:truncate">{log.service}</span>
                <div className="min-w-0">
                  <p className="break-words leading-5 text-slate-200">{log.message}</p>
                  <p className="mt-1 break-all text-[10px] text-slate-500 sm:truncate">
                    correlation: {log.correlationId}
                  </p>
                </div>
              </article>
            );
          })
        ) : (
          <p className="p-8 text-center text-slate-400 sm:p-10">Henüz log kaydı yok.</p>
        )}
      </div>
      {paused && (
        <Button
          size="sm"
          className="absolute bottom-4 right-3 shadow-lg sm:right-5"
          onClick={() => {
            container.current?.scrollTo({ top: 0, behavior: 'smooth' });
            setPaused(false);
          }}
        >
          <ArrowUp size={14} aria-hidden="true" /> Canlı akışa dön
        </Button>
      )}
    </div>
  );
}
