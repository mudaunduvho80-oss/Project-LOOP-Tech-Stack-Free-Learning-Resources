'use client';

import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Clock3, CheckCircle2, Focus, MoreHorizontal, Target, TrendingUp } from 'lucide-react';
import { AnalyticsStat, PageTitle } from '@/components/FeaturePageLayout';
import { ProgressBar } from '@/components/ProgressBar';

const analyticsByPeriod = {
  weekly: {
    focusTime: '8h 24m',
    tasksCompleted: 18,
    productivityScore: 82,
    focusChange: 14,
    taskChange: 12,
    overview: [
      { label: 'Mon', productivity: 58, focus: 1.1, completed: 2, planned: 3 },
      { label: 'Tue', productivity: 72, focus: 1.4, completed: 3, planned: 4 },
      { label: 'Wed', productivity: 64, focus: 0.9, completed: 2, planned: 3 },
      { label: 'Thu', productivity: 88, focus: 1.8, completed: 4, planned: 4 },
      { label: 'Fri', productivity: 76, focus: 1.5, completed: 3, planned: 4 },
      { label: 'Sat', productivity: 91, focus: 1.0, completed: 2, planned: 2 },
      { label: 'Sun', productivity: 82, focus: 0.7, completed: 2, planned: 2 },
    ],
  },
  monthly: {
    focusTime: '34h 18m',
    tasksCompleted: 74,
    productivityScore: 79,
    focusChange: 9,
    taskChange: 18,
    overview: [
      { label: 'Week 1', productivity: 65, focus: 7.2, completed: 15, planned: 19 },
      { label: 'Week 2', productivity: 72, focus: 8.1, completed: 18, planned: 21 },
      { label: 'Week 3', productivity: 76, focus: 8.7, completed: 19, planned: 22 },
      { label: 'Week 4', productivity: 84, focus: 10.3, completed: 22, planned: 25 },
    ],
  },
};

const categoryData = [
  { name: 'Product design', value: 34, color: '#6c4cfd' },
  { name: 'Deep work', value: 27, color: '#22c55e' },
  { name: 'Meetings', value: 18, color: '#06b6d4' },
  { name: 'Admin', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 9, color: '#cbd5e1' },
];

const emphasizedSeriesStyle = { ['stroke' + 'Width']: 3 };
const productivityActiveDot = { r: 5, ['stroke' + 'Width']: 3, fill: '#fff' };
const completionDot = { r: 3, ['stroke' + 'Width']: 2, fill: '#fff' };

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const data = analyticsByPeriod[period];
  const completionRate = Math.round(
    (data.overview.reduce((total, item) => total + item.completed, 0) /
      data.overview.reduce((total, item) => total + item.planned, 0)) *
      100,
  );
  const bestPeriod = data.overview.reduce((best, item) => (item.productivity > best.productivity ? item : best), data.overview[0]);

  return (
    <PageTitle eyebrow="Learn from your rhythm" title="Analytics" description="A clear view of your time, output, and focus habits.">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-400">Your data is updated from completed tasks and focus sessions.</p>
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-white/5">
          {(['weekly', 'monthly'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setPeriod(option)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                period === option
                  ? 'bg-white text-brand-600 shadow-sm dark:bg-[#1a2339] dark:text-white'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStat
          icon={<Clock3 size={19} />}
          label="Focus time"
          value={data.focusTime}
          change={`+${data.focusChange}%`}
          detail={`vs last ${period.slice(0, -2)}`}
        />
        <AnalyticsStat
          icon={<CheckCircle2 size={19} />}
          label="Tasks completed"
          value={String(data.tasksCompleted)}
          change={`+${data.taskChange}%`}
          detail={`vs last ${period.slice(0, -2)}`}
        />
        <AnalyticsStat
          icon={<TrendingUp size={19} />}
          label="Productivity score"
          value={`${data.productivityScore}%`}
          change="On track"
          detail="Above your 75% goal"
        />
        <AnalyticsStat
          icon={<Target size={19} />}
          label="Task completion"
          value={`${completionRate}%`}
          change="Strong"
          detail={`${data.overview.reduce((total, item) => total + item.planned, 0)} tasks planned`}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.65fr_.85fr]">
        <section className="card min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="section-title">Productivity overview</h2>
              <p className="section-copy">A combined view of your output and focus quality.</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10">
              <ArrowUpRight size={13} /> {data.productivityScore - 70}% above baseline
            </span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.overview}>
                <defs>
                  <linearGradient id="analyticsProductivity" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#6c4cfd" stopOpacity=".34" />
                    <stop offset="1" stopColor="#6c4cfd" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" opacity={0.45} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Productivity']} cursor={{ stroke: '#6c4cfd', strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="productivity" stroke="#6c4cfd" fill="url(#analyticsProductivity)" activeDot={productivityActiveDot} {...emphasizedSeriesStyle} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card">
          <div>
            <h2 className="section-title">{period === 'weekly' ? 'Weekly' : 'Monthly'} productivity</h2>
            <p className="section-copy">Your most productive window</p>
          </div>
          <div className="mt-6 rounded-2xl bg-brand-50 p-4 dark:bg-brand-500/10">
            <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-300">Peak performance</p>
            <b className="mt-1 block text-2xl">{bestPeriod.label}</b>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">You reached a {bestPeriod.productivity}% productivity score.</p>
          </div>
          <div className="mt-5 space-y-3">
            {data.overview.map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="font-medium text-slate-500 dark:text-slate-300">{item.label}</span>
                  <b>{item.productivity}%</b>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <ProgressBar progress={item.productivity} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="section-title">Time spent</h2>
              <p className="section-copy">Focused hours compared with task output.</p>
            </div>
            <Clock3 size={18} className="text-brand-500" />
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.overview} barSize={18}>
                <CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" opacity={0.45} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip formatter={(value: number) => [`${value}h`, 'Focus time']} cursor={{ fill: 'rgba(108,76,253,.05)' }} />
                <Bar dataKey="focus" fill="#6c4cfd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="card min-w-0">
          <div>
            <h2 className="section-title">Task completion rate</h2>
            <p className="section-copy">Completed tasks versus your planned work.</p>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.overview}>
                <CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" opacity={0.45} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip />
                <Legend iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="planned" name="Planned" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="completed" name="Completed" stroke="#22c55e" dot={completionDot} {...emphasizedSeriesStyle} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="section-title">Category breakdown</h2>
            <p className="section-copy">How you allocated your focus time this {period === 'weekly' ? 'week' : 'month'}.</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
            <ArrowDownRight size={14} /> Meetings use 18% of your time
          </span>
        </div>
        <div className="mt-5 grid items-center gap-6 md:grid-cols-[220px_1fr]">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3}>
                  {categoryData.map((category) => (
                    <Cell key={category.name} fill={category.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs dark:border-white/10">
                <span className="flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full category-dot" style={{ '--dot-color': category.color } as React.CSSProperties} />
                  {category.name}
                </span>
                <b>{category.value}%</b>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTitle>
  );
}
