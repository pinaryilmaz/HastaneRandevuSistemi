import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className, ...props }, ref) => (
  <select ref={ref} className={cn('h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100', className)} {...props} />
));
Select.displayName = 'Select';
