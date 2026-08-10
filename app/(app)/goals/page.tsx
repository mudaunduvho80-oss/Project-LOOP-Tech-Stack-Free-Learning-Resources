'use client';

import { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Plus, Sparkles, Target } from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';
import { ProgressBar } from '@/components/ProgressBar';

type Milestone = {
  id: string;
  label: string;
  done: boolean;
};

type GoalItem = {
  id: string;
  title: string;
  progress: number;
  target: number;
  deadline: string;
  milestones: Milestone[];
  note: string;
};

const initialGoals: GoalItem[] = [
  {
    id: 'learn-react',
    title: 'Learn React',
    progress: 65,
    target: 100,
    deadline: '2026-09-12',
    note: 'Work through hooks, components, and state management.',
    milestones: [
      { id: 'jsx', label: 'Understand JSX syntax', done: true },
      { id: 'hooks', label: 'Build with hooks', done: true },
      { id: 'router', label: 'Add routing', done: false },
      { id: 'state', label: 'State patterns', done: false },
    ],
  },
  {
    id: 'mobile-design',
    title: 'Ship mobile app design',
    progress: 42,
    target: 100,
    deadline: '2026-09-28',
    note: 'Finalize UI, hand off assets, and review animations.',
    milestones: [
      { id: 'wireframes', label: 'Complete wireframes', done: true },
      { id: 'prototype', label: 'Create prototype', done: false },
      { id: 'handoff', label: 'Design handoff', done: false },
    ],
  },
  {
    id: 'streak',
    title: 'Maintain a 7-day streak',
    progress: 85,
    target: 100,
    deadline: '2026-08-14',
    note: 'Keep daily focus sessions consistent.',
    milestones: [
      { id: 'day-1', label: 'Day 1', done: true },
      { id: 'day-4', label: 'Day 4', done: true },
      { id: 'day-7', label: 'Day 7', done: false },
    ],
  },
  {
    id: 'meeting-time',
    title: 'Reduce meeting time',
    progress: 56,
    target: 100,
    deadline: '2026-09-05',
    note: 'Trim agendas and keep meetings under 30 minutes.',
    milestones: [
      { id: 'agenda', label: 'Set clear agendas', done: true },
      { id: 'timebox', label: 'Timebox discussions', done: false },
      { id: 'review', label: 'Review meeting notes', done: false },
    ],
  },
];

const getStatus = (goal: GoalItem) => {
  if (goal.progress >= 100) return 'Complete';
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
  );
  return daysLeft <= 3 ? 'At risk' : 'On track';
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(undefined, {
  month: 'short', day: 'numeric', year: 'numeric',
});

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalItem[]>(initialGoals);

  const summary = useMemo(() => {
    const activeCount = goals.filter((goal) => goal.progress < 100).length;
    const averageCompletion = Math.round(
      goals.reduce((total, goal) => total + goal.progress, 0) / goals.length,
    );
    const nextDeadline = goals.reduce((closest, goal) => {
      const date = new Date(goal.deadline);
      return !closest || date < new Date(closest.deadline) ? goal : closest;
    }, goals[0]);

    return { activeCount, averageCompletion, nextDeadline };
  }, [goals]);

  const addGoal = () => {
    setGoals((current) => [
      {
        id: String(Date.now()),
        title: 'New goal',
        progress: 0,
        target: 100,
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().slice(0, 10),
        note: 'Create milestones and track completion.',
        milestones: [
          { id: 'phase-1', label: 'Define scope', done: false },
          { id: 'phase-2', label: 'Create plan', done: false },
        ],
      },
      ...current,
    ]);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              milestones: goal.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, done: !milestone.done }
                  : milestone,
              ),
            }
          : goal,
      ),
    );
  };

  const bumpProgress = (goalId: string) => {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              progress: Math.min(100, goal.progress + 10),
            }
          : goal,
      ),
    );
  };

  return (
    <PageTitle
      eyebrow="Build momentum"
      title="Goals"
      description="Track long-term objectives with deadlines, milestones, and progress insights."
      action="New goal"
      onAction={addGoal}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Active goals</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{summary.activeCount}</p>
              <p className="mt-1 text-sm text-slate-500">Goals currently in progress</p>
            </div>
            <div className="card rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Average completion</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{summary.averageCompletion}%</p>
              <p className="mt-1 text-sm text-slate-500">Across all tracked goals</p>
            </div>
            <div className="card rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Next deadline</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{formatDate(summary.nextDeadline.deadline)}</p>
              <p className="mt-1 text-sm text-slate-500">{summary.nextDeadline.title}</p>
            </div>
          </div>

          <div className="grid gap-4">
            {goals.map((goal) => {
              const percent = Math.round((goal.progress / goal.target) * 100);
              const status = getStatus(goal);
              return (
                <div key={goal.id} className="card rounded-3xl">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                          <Target size={18} />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Goal</p>
                          <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{goal.title}</h3>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        status === 'Complete'
                          ? 'bg-emerald-50 text-emerald-600'
                          : status === 'At risk'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-slate-500">Due {formatDate(goal.deadline)}</p>
                        <p className="text-sm font-semibold text-slate-600">{percent}%</p>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <ProgressBar progress={percent} />
                      </div>
                    </div>
                    <button
                      onClick={() => bumpProgress(goal.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      <Sparkles size={14} />
                      Add progress
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">{goal.note}</p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-slate-400">
                      <CheckCircle2 size={14} />
                      Milestones
                    </div>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <button
                          key={milestone.id}
                          onClick={() => toggleMilestone(goal.id, milestone.id)}
                          className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                            milestone.done
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{milestone.label}</span>
                          <span className="text-xs uppercase tracking-[.18em]">
                            {milestone.done ? 'Done' : 'Pending'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="card rounded-3xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Goal progress</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Track & prioritize</h2>
              </div>
              <button
                onClick={addGoal}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
              >
                <Plus size={16} />
                New goal
              </button>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-slate-500">Milestone completion</p>
                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{goals.reduce((sum, goal) => sum + goal.milestones.filter((m) => m.done).length, 0)}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-slate-500">Goal reminders</p>
                <div className="mt-4 space-y-3">
                  {goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-950/60">
                      <div className="flex items-center justify-between gap-2">
                        <span>{goal.title}</span>
                        <span className="text-[10px] uppercase tracking-[.22em] text-slate-400">Due {formatDate(goal.deadline)}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{getStatus(goal) === 'At risk' ? 'Needs attention' : 'On track'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card rounded-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Calendar size={18} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Upcoming due dates</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Plan ahead</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {goals
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .slice(0, 4)
                .map((goal) => (
                  <div key={goal.id} className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-950/60">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{goal.title}</p>
                      <span className="text-xs uppercase tracking-[.18em] text-slate-400">{formatDate(goal.deadline)}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <ProgressBar progress={Math.round((goal.progress / goal.target) * 100)} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageTitle>
  );
}
