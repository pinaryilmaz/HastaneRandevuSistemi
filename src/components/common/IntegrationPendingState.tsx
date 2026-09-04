import { CircleCheck, Clock3, PlugZap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function IntegrationPendingState({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <Card className="overflow-hidden border-sky-200 bg-gradient-to-br from-white to-sky-50/60">
      <CardContent className="p-7 sm:p-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <PlugZap size={26} aria-hidden="true" />
          </span>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
              <Clock3 size={13} aria-hidden="true" /> Backend entegrasyonu bekleniyor
            </div>
            <h2 className="mt-4 text-xl font-semibold text-navy-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CircleCheck size={15} className="shrink-0 text-aqua-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500">
              Hazır hastane modülleri kullanılabilir; bu ekran gerekli API sağlandığında
              etkinleşecektir.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
