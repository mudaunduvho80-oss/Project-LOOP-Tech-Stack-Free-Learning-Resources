'use client';

import { useState } from 'react';
import { CheckCircle2, MoreHorizontal } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

const taskRows = [
  ['Finalize mobile app wireframes', 'Design', 'Today, 10:30 AM', 'High'],
  ['Review Q3 product roadmap', 'Strategy', 'Today, 12:00 PM', 'Medium'],
  ['Prepare team stand-up notes', 'Team', 'Today, 2:30 PM', 'Low'],
  ['Reply to client feedback', 'Customer', 'Today, 4:00 PM', 'High'],
];

export default function TasksPage() {
  const [completed, setCompleted] = useState<string[]>(['Reply to client feedback']);
  const [query, setQuery] = useState('');
  const rows = taskRows.filter(([title]) => title.toLowerCase().includes(query.toLowerCase()));

  const toggle = (title: string) =>
    setCompleted((value) => (value.includes(title) ? value.filter((item) => item !== title) : [...value, title]));

  return (
    <PageTitle eyebrow="Plan your day" title="Tasks" description="Keep your work moving, one meaningful task at a time." action="Add task">
      <div className="card">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="section-title">Today's tasks</h2>
            <p className="section-copy">{completed.length} of {taskRows.length} completed</p>
          </div>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks..."
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/5"
          />
        </div>

        <div className="space-y-2">
          {rows.map(([title, project, due, priority]) => {
            const done = completed.includes(title);
            return (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 dark:border-white/10"
              >
                <button
                  aria-label={`Toggle ${title}`}
                  onClick={() => toggle(title)}
                  className={`grid h-5 w-5 place-items-center rounded-full border ${
                    done ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {done && <CheckCircle2 size={13} />}
                </button>
                <div className="min-w-0 flex-1">
                  <b className={`block text-sm ${done ? 'text-slate-400 line-through' : ''}`}>{title}</b>
                  <small className="text-[11px] text-slate-400">{project} · {due}</small>
                </div>
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                    priority === 'High'
                      ? 'bg-rose-50 text-rose-500 dark:bg-rose-500/10'
                      : priority === 'Medium'
                      ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
                  }`}
                >
                  {priority}
                </span>
                <MoreHorizontal size={17} className="text-slate-400" />
              </div>
            );
          })}
        </div>
      </div>
    </PageTitle>
  );
}
