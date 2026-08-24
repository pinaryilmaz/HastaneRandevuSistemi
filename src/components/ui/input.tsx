import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn('h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-aqua-500 focus:ring-2 focus:ring-aqua-100 disabled:bg-slate-50', className)} {...props} />
));
Input.displayName = 'Input';
