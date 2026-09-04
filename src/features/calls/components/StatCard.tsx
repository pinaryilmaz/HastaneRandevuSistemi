import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/cn';
export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
  tone: 'aqua' | 'blue' | 'violet';
}) {
  return (
    <Card className="overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-navy-900">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>
        <div
          className={cn(
            'rounded-2xl p-3',
            tone === 'aqua' && 'bg-aqua-50 text-aqua-700',
            tone === 'blue' && 'bg-sky-50 text-sky-700',
            tone === 'violet' && 'bg-violet-50 text-violet-700',
          )}
        >
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </Card>
  );
}
