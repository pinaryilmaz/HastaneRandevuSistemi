import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
export function Alert({
  children,
  variant = 'info',
  className,
}: {
  children: ReactNode;
  variant?: 'info' | 'error' | 'warning';
  className?: string;
}) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-xl border p-4 text-sm',
        variant === 'info' && 'border-sky-200 bg-sky-50 text-sky-800',
        variant === 'error' && 'border-rose-200 bg-rose-50 text-rose-800',
        variant === 'warning' && 'border-amber-200 bg-amber-50 text-amber-800',
        className,
      )}
    >
      {children}
    </div>
  );
}
