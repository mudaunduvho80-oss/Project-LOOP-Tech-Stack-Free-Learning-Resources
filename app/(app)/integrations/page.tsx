'use client';

import { useState } from 'react';
import { Bell, CalendarDays, FileText } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

const apps = [
  ['Google Calendar', 'Keep your events in sync.', CalendarDays],
  ['Slack', 'Share task updates with your team.', Bell],
  ['Notion', 'Turn notes into project knowledge.', FileText],
] as const;

export default function IntegrationsPage() {
  const [connected, setConnected] = useState(['Google Calendar']);

  return (
    <PageTitle eyebrow="Connect your workflow" title="Integrations" description="Bring the tools your team uses into one productive loop.">
      <div className="grid gap-4 md:grid-cols-3">
        {apps.map(([name, copy, Icon]) => {
          const enabled = connected.includes(name);
          return (
            <div className="card" key={name}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                <Icon size={21} />
              </span>
              <h2 className="mt-5 text-base font-bold">{name}</h2>
              <p className="mt-2 min-h-10 text-xs leading-relaxed text-slate-400">{copy}</p>
              <button
                onClick={() =>
                  setConnected((v) =>
                    enabled ? v.filter((item) => item !== name) : [...v, name],
                  )
                }
                className={`mt-5 w-full rounded-xl py-2.5 text-xs font-bold ${
                  enabled
                    ? 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                    : 'bg-brand-500 text-white'
                }`}
              >
                {enabled ? 'Connected' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </PageTitle>
  );
}
