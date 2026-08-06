'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

export default function CalendarPage() {
  const [month, setMonth] = useState(0);
  const labels = ['August 2026', 'September 2026', 'October 2026'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 5);

  return (
    <PageTitle eyebrow="Organize your time" title="Calendar" description="See your focus blocks, deadlines, and meetings in one place." action="New event">
      <div className="card">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={() => setMonth(Math.max(0, month - 1))} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10">
            <ChevronLeft size={18} />
          </button>
          <h2 className="section-title">{labels[month]}</h2>
          <button onClick={() => setMonth(Math.min(2, month + 1))} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="pb-3">
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, i) => (
            <div
              key={i}
              className={`min-h-24 rounded-xl border p-2 text-xs ${
                date < 1 || date > 31
                  ? 'border-transparent text-slate-300 dark:text-slate-700'
                  : date === 5
                  ? 'border-brand-400 bg-brand-50 dark:bg-brand-500/10'
                  : 'border-slate-100 dark:border-white/10'
              }`}
            >
              <b>{date > 0 && date < 32 ? date : ''}</b>
              {date === 5 && (
                <span className="mt-2 block rounded bg-brand-500 px-1 py-1 text-[9px] text-white">Focus block · 9 AM</span>
              )}
              {date === 7 && (
                <span className="mt-2 block rounded bg-violet-500 px-1 py-1 text-[9px] text-white">Design sync</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTitle>
  );
}
