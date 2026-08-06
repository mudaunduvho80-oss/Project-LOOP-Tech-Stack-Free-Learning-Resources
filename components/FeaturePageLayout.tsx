import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

export function PageTitle({
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-500">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        {action && (
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25">
            <Plus size={17} />
            {action}
          </button>
        )}
      </section>
      {children}
    </div>
  );
}

export function AnalyticsStat({
  icon,
  label,
  value,
  change,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
  detail: string;
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">{icon}</span>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10">{change}</span>
      </div>
      <p className="mt-5 text-xs font-semibold text-slate-400">{label}</p>
      <b className="mt-1 block text-2xl tracking-tight">{value}</b>
      <small className="mt-1 block text-[11px] text-slate-400">{detail}</small>
    </div>
  );
}

export function Stat({
  icon,
  label,
  value,
  note,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="card">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">{icon}</span>
      <p className="mt-5 text-xs font-semibold text-slate-400">{label}</p>
      <b className="mt-1 block text-2xl">{value}</b>
      <small className="text-[11px] text-emerald-500">{note}</small>
    </div>
  );
}
