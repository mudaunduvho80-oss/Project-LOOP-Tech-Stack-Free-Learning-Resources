'use client';

import { Target } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';
import { ProgressBar } from '@/components/ProgressBar';

const goals = [
  ['Complete 20 deep work sessions', 16, 20],
  ['Ship mobile app design', 72, 100],
  ['Maintain a 7-day streak', 7, 7],
  ['Reduce meeting time', 18, 25],
] as const;

export default function GoalsPage() {
  return (
    <PageTitle eyebrow="Build momentum" title="Goals" description="Turn long-term ambition into visible, daily progress." action="New goal">
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map(([title, current, total]) => {
          const pct = Math.round((Number(current) / Number(total)) * 100);
          return (
            <div className="card" key={String(title)}>
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                  <Target size={19} />
                </span>
                <b className="text-sm text-brand-500">{pct}%</b>
              </div>
              <h2 className="mt-5 text-base font-bold">{title}</h2>
              <p className="mt-1 text-xs text-slate-400">{current} of {total} complete</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <ProgressBar progress={pct} />
              </div>
            </div>
          );
        })}
      </div>
    </PageTitle>
  );
}
