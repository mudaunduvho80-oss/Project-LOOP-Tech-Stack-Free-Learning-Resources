'use client';

import { useState } from 'react';
import { Focus } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

export default function FocusPage() {
  const [active, setActive] = useState(false);
  const [minutes, setMinutes] = useState(25);

  return (
    <PageTitle eyebrow="Protect your attention" title="Focus Mode" description="Create room for deep work without distractions.">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card grid min-h-[390px] place-items-center text-center">
          <div>
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
              <Focus size={30} />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-brand-500">
              {active ? 'Focus session in progress' : 'Ready when you are'}
            </p>
            <b className="mt-2 block text-6xl tracking-tight">{String(minutes).padStart(2, '0')}:00</b>
            <p className="mt-3 text-sm text-slate-400">One task. No interruptions. Your future self will thank you.</p>
            <button
              onClick={() => setActive((v) => !v)}
              className="mt-7 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25"
            >
              {active ? 'Pause session' : 'Start focus session'}
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Session settings</h2>
          <p className="section-copy">Choose a duration that fits your energy.</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[25, 45, 60].map((value) => (
              <button
                key={value}
                onClick={() => setMinutes(value)}
                className={`rounded-xl border py-3 text-sm font-bold ${
                  minutes === value
                    ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10'
                    : 'border-slate-200 text-slate-500 dark:border-white/10'
                }`}
              >
                {value} min
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-slate-50 p-4 dark:bg-white/5">
            <b className="text-sm">Today's deep work</b>
            <p className="mt-2 text-3xl font-bold">3h 45m</p>
            <p className="mt-1 text-xs text-emerald-500">+18% from yesterday</p>
          </div>
        </div>
      </div>
    </PageTitle>
  );
}
