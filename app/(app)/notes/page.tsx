'use client';

import { useState } from 'react';
import { PageTitle } from '@/components/FeaturePageLayout';

export default function NotesPage() {
  const [note, setNote] = useState(
    'Project ideas\n\n• Simplify the mobile onboarding flow\n• Review research before Friday\n• Share a first draft with the team',
  );

  return (
    <PageTitle eyebrow="Think in one place" title="Notes" description="Capture ideas, meeting notes, and the details worth remembering." action="New note">
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <div className="card">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">My notes</p>
          {['Project ideas', 'Design sync — Aug 5', 'Weekly review'].map((item, index) => (
            <button
              key={item}
              className={`mt-3 w-full rounded-xl p-3 text-left text-xs font-semibold ${
                index === 0 ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {item}
              <small className="mt-1 block font-normal text-slate-400">Edited today</small>
            </button>
          ))}
        </div>

        <div className="card">
          <input defaultValue="Project ideas" className="w-full bg-transparent text-xl font-bold outline-none" />
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="mt-6 min-h-72 w-full resize-none bg-transparent text-sm leading-7 text-slate-600 outline-none dark:text-slate-300"
          />
          <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-white/10">Saved locally · Just now</div>
        </div>
      </div>
    </PageTitle>
  );
}
