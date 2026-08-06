'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowDownRight, ArrowUpRight, BarChart3, Bell, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileText, Focus, Link2, MoreHorizontal, Plus, Sparkles, Target, TimerReset, TrendingUp } from 'lucide-react';

const taskRows = [
  ['Finalize mobile app wireframes', 'Design', 'Today, 10:30 AM', 'High'],
  ['Review Q3 product roadmap', 'Strategy', 'Today, 12:00 PM', 'Medium'],
  ['Prepare team stand-up notes', 'Team', 'Today, 2:30 PM', 'Low'],
  ['Reply to client feedback', 'Customer', 'Today, 4:00 PM', 'High'],
];

const analyticsByPeriod = {
  weekly: {
    focusTime: '8h 24m', tasksCompleted: 18, productivityScore: 82, focusChange: 14, taskChange: 12,
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
    focusTime: '34h 18m', tasksCompleted: 74, productivityScore: 79, focusChange: 9, taskChange: 18,
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

export function TasksPage() {
  const [completed, setCompleted] = useState<string[]>(['Reply to client feedback']);
  const [query, setQuery] = useState('');
  const rows = taskRows.filter(([title]) => title.toLowerCase().includes(query.toLowerCase()));
  const toggle = (title: string) => setCompleted(v => v.includes(title) ? v.filter(item => item !== title) : [...v, title]);
  return <PageTitle eyebrow="Plan your day" title="Tasks" description="Keep your work moving, one meaningful task at a time." action="Add task">
    <div className="card"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="section-title">Today&apos;s tasks</h2><p className="section-copy">{completed.length} of {taskRows.length} completed</p></div><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks..." className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/5"/></div><div className="space-y-2">{rows.map(([title, project, due, priority]) => { const done = completed.includes(title); return <div key={title} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 dark:border-white/10"><button aria-label={`Toggle ${title}`} onClick={() => toggle(title)} className={`grid h-5 w-5 place-items-center rounded-full border ${done ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>{done && <CheckCircle2 size={13}/>}</button><div className="min-w-0 flex-1"><b className={`block text-sm ${done ? 'text-slate-400 line-through' : ''}`}>{title}</b><small className="text-[11px] text-slate-400">{project} · {due}</small></div><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${priority === 'High' ? 'bg-rose-50 text-rose-500 dark:bg-rose-500/10' : priority === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'}`}>{priority}</span><MoreHorizontal size={17} className="text-slate-400"/></div>})}</div></div>
  </PageTitle>;
}

export function CalendarPage() { const [month, setMonth] = useState(8); const labels = ['August 2026', 'September 2026', 'October 2026']; const dates = Array.from({length: 35}, (_, i) => i - 5); return <PageTitle eyebrow="Organize your time" title="Calendar" description="See your focus blocks, deadlines, and meetings in one place." action="New event"><div className="card"><div className="mb-6 flex items-center justify-between"><button onClick={() => setMonth(Math.max(0, month-1))} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10"><ChevronLeft size={18}/></button><h2 className="section-title">{labels[month]}</h2><button onClick={() => setMonth(Math.min(2, month+1))} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-white/10"><ChevronRight size={18}/></button></div><div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d} className="pb-3">{d}</span>)}</div><div className="grid grid-cols-7 gap-2">{dates.map((date, i) => <div key={i} className={`min-h-24 rounded-xl border p-2 text-xs ${date < 1 || date > 31 ? 'border-transparent text-slate-300 dark:text-slate-700' : date === 5 ? 'border-brand-400 bg-brand-50 dark:bg-brand-500/10' : 'border-slate-100 dark:border-white/10'}`}><b>{date > 0 && date < 32 ? date : ''}</b>{date === 5 && <span className="mt-2 block rounded bg-brand-500 px-1 py-1 text-[9px] text-white">Focus block · 9 AM</span>}{date === 7 && <span className="mt-2 block rounded bg-violet-500 px-1 py-1 text-[9px] text-white">Design sync</span>}</div>)}</div></div></PageTitle>; }

export function FocusPage() { const [active, setActive] = useState(false); const [minutes, setMinutes] = useState(25); return <PageTitle eyebrow="Protect your attention" title="Focus Mode" description="Create room for deep work without distractions."><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><div className="card grid min-h-[390px] place-items-center text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/10"><Focus size={30}/></span><p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-brand-500">{active ? 'Focus session in progress' : 'Ready when you are'}</p><b className="mt-2 block text-6xl tracking-tight">{String(minutes).padStart(2, '0')}:00</b><p className="mt-3 text-sm text-slate-400">One task. No interruptions. Your future self will thank you.</p><button onClick={() => setActive(v => !v)} className="mt-7 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25">{active ? 'Pause session' : 'Start focus session'}</button></div></div><div className="card"><h2 className="section-title">Session settings</h2><p className="section-copy">Choose a duration that fits your energy.</p><div className="mt-6 grid grid-cols-3 gap-2">{[25, 45, 60].map(value => <button key={value} onClick={() => setMinutes(value)} className={`rounded-xl border py-3 text-sm font-bold ${minutes === value ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10' : 'border-slate-200 text-slate-500 dark:border-white/10'}`}>{value} min</button>)}</div><div className="mt-8 rounded-xl bg-slate-50 p-4 dark:bg-white/5"><b className="text-sm">Today&apos;s deep work</b><p className="mt-2 text-3xl font-bold">3h 45m</p><p className="mt-1 text-xs text-emerald-500">+18% from yesterday</p></div></div></div></PageTitle>; }

export function GoalsPage() { const goals = [['Complete 20 deep work sessions',16,20],['Ship mobile app design',72,100],['Maintain a 7-day streak',7,7],['Reduce meeting time',18,25]]; return <PageTitle eyebrow="Build momentum" title="Goals" description="Turn long-term ambition into visible, daily progress." action="New goal"><div className="grid gap-4 md:grid-cols-2">{goals.map(([title,current,total]) => { const pct = Math.round(Number(current) / Number(total) * 100); return <div className="card" key={String(title)}><div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10"><Target size={19}/></span><b className="text-sm text-brand-500">{pct}%</b></div><h2 className="mt-5 text-base font-bold">{title}</h2><p className="mt-1 text-xs text-slate-400">{current} of {total} complete</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{inlineSize:`${pct}%`}}/></div></div>})}</div></PageTitle>; }

export function AnalyticsPage() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const data = analyticsByPeriod[period];
  const completionRate = Math.round(data.overview.reduce((total, item) => total + item.completed, 0) / data.overview.reduce((total, item) => total + item.planned, 0) * 100);
  const bestPeriod = data.overview.reduce((best, item) => item.productivity > best.productivity ? item : best, data.overview[0]);

  return <PageTitle eyebrow="Learn from your rhythm" title="Analytics" description="A clear view of your time, output, and focus habits.">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-slate-400">Your data is updated from completed tasks and focus sessions.</p>
      <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-white/5">
        {(['weekly', 'monthly'] as const).map(option => <button key={option} onClick={() => setPeriod(option)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${period === option ? 'bg-white text-brand-600 shadow-sm dark:bg-[#1a2339] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{option}</button>)}
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AnalyticsStat icon={<Clock3 size={19}/>} label="Focus time" value={data.focusTime} change={`+${data.focusChange}%`} detail={`vs last ${period.slice(0, -2)}`} />
      <AnalyticsStat icon={<CheckCircle2 size={19}/>} label="Tasks completed" value={String(data.tasksCompleted)} change={`+${data.taskChange}%`} detail={`vs last ${period.slice(0, -2)}`} />
      <AnalyticsStat icon={<TrendingUp size={19}/>} label="Productivity score" value={`${data.productivityScore}%`} change="On track" detail="Above your 75% goal" />
      <AnalyticsStat icon={<Target size={19}/>} label="Task completion" value={`${completionRate}%`} change="Strong" detail={`${data.overview.reduce((total, item) => total + item.planned, 0)} tasks planned`} />
    </div>

    <div className="grid gap-5 xl:grid-cols-[1.65fr_.85fr]">
      <section className="card min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h2 className="section-title">Productivity overview</h2><p className="section-copy">A combined view of your output and focus quality.</p></div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10"><ArrowUpRight size={13}/> {data.productivityScore - 70}% above baseline</span>
        </div>
        <div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.overview}>
          <defs><linearGradient id="analyticsProductivity" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6c4cfd" stopOpacity=".34"/><stop offset="1" stopColor="#6c4cfd" stopOpacity="0"/></linearGradient></defs>
          <CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" opacity={.45}/><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }}/><YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={value => `${value}%`}/><Tooltip formatter={(value: number) => [`${value}%`, 'Productivity']} cursor={{ stroke: '#6c4cfd', strokeDasharray: '4 4' }}/><Area type="monotone" dataKey="productivity" stroke="#6c4cfd" strokeWidth={3} fill="url(#analyticsProductivity)" activeDot={{ r: 5, strokeWidth: 3, fill: '#fff' }}/>
        </AreaChart></ResponsiveContainer></div>
      </section>

      <section className="card"><div><h2 className="section-title">{period === 'weekly' ? 'Weekly' : 'Monthly'} productivity</h2><p className="section-copy">Your most productive window</p></div><div className="mt-6 rounded-2xl bg-brand-50 p-4 dark:bg-brand-500/10"><p className="text-[11px] font-semibold text-brand-600 dark:text-brand-300">Peak performance</p><b className="mt-1 block text-2xl">{bestPeriod.label}</b><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">You reached a {bestPeriod.productivity}% productivity score.</p></div><div className="mt-5 space-y-3">{data.overview.map(item => <div key={item.label}><div className="mb-1.5 flex justify-between text-[11px]"><span className="font-medium text-slate-500 dark:text-slate-300">{item.label}</span><b>{item.productivity}%</b></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" style={{ inlineSize: `${item.productivity}%` }}/></div></div>)}</div></section>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      <section className="card min-w-0"><div className="flex items-start justify-between"><div><h2 className="section-title">Time spent</h2><p className="section-copy">Focused hours compared with task output.</p></div><Clock3 size={18} className="text-brand-500"/></div><div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.overview} barSize={18}><CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" opacity={.45}/><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/><Tooltip formatter={(value: number) => [`${value}h`, 'Focus time']} cursor={{ fill: 'rgba(108,76,253,.05)' }}/><Bar dataKey="focus" fill="#6c4cfd" radius={[6, 6, 0, 0]}/></BarChart></ResponsiveContainer></div></section>
      <section className="card min-w-0"><div><h2 className="section-title">Task completion rate</h2><p className="section-copy">Completed tasks versus your planned work.</p></div><div className="mt-6 h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data.overview}><CartesianGrid vertical={false} stroke="#cbd5e1" strokeDasharray="3 3" opacity={.45}/><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }}/><Tooltip/><Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}/><Line type="monotone" dataKey="planned" name="Planned" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false}/><Line type="monotone" dataKey="completed" name="Completed" stroke="#22c55e" strokeWidth={3} dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}/></LineChart></ResponsiveContainer></div></section>
    </div>

    <section className="card"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="section-title">Category breakdown</h2><p className="section-copy">How you allocated your focus time this {period === 'weekly' ? 'week' : 'month'}.</p></div><span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400"><ArrowDownRight size={14}/> Meetings use 18% of your time</span></div><div className="mt-5 grid items-center gap-6 md:grid-cols-[220px_1fr]"><div className="h-52"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3}>{categoryData.map(category => <Cell key={category.name} fill={category.color}/>)}</Pie><Tooltip formatter={(value: number) => `${value}%`}/></PieChart></ResponsiveContainer></div><div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">{categoryData.map(category => <div key={category.name} className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs dark:border-white/10"><span className="flex items-center gap-2 font-medium"><i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: category.color }}/>{category.name}</span><b>{category.value}%</b></div>)}</div></div></section>
  </PageTitle>;
}

function AnalyticsStat({ icon, label, value, change, detail }: { icon: React.ReactNode; label: string; value: string; change: string; detail: string }) { return <div className="card"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">{icon}</span><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/10">{change}</span></div><p className="mt-5 text-xs font-semibold text-slate-400">{label}</p><b className="mt-1 block text-2xl tracking-tight">{value}</b><small className="mt-1 block text-[11px] text-slate-400">{detail}</small></div>; }

export function NotesPage() { const [note, setNote] = useState('Project ideas\n\n• Simplify the mobile onboarding flow\n• Review research before Friday\n• Share a first draft with the team'); return <PageTitle eyebrow="Think in one place" title="Notes" description="Capture ideas, meeting notes, and the details worth remembering." action="New note"><div className="grid gap-5 lg:grid-cols-[260px_1fr]"><div className="card"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">My notes</p>{['Project ideas','Design sync — Aug 5','Weekly review'].map((item,i) => <button key={item} className={`mt-3 w-full rounded-xl p-3 text-left text-xs font-semibold ${i === 0 ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}>{item}<small className="mt-1 block font-normal text-slate-400">Edited today</small></button>)}</div><div className="card"><input defaultValue="Project ideas" className="w-full bg-transparent text-xl font-bold outline-none"/><textarea value={note} onChange={e => setNote(e.target.value)} className="mt-6 min-h-72 w-full resize-none bg-transparent text-sm leading-7 text-slate-600 outline-none dark:text-slate-300"/><div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-white/10">Saved locally · Just now</div></div></div></PageTitle>; }

export function IntegrationsPage() { const [connected, setConnected] = useState(['Google Calendar']); const apps = [['Google Calendar','Keep your events in sync.', CalendarDays],['Slack','Share task updates with your team.', Bell],['Notion','Turn notes into project knowledge.', FileText]] as const; return <PageTitle eyebrow="Connect your workflow" title="Integrations" description="Bring the tools your team uses into one productive loop."><div className="grid gap-4 md:grid-cols-3">{apps.map(([name,copy,Icon]) => {const enabled = connected.includes(name); return <div className="card" key={name}><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10"><Icon size={21}/></span><h2 className="mt-5 text-base font-bold">{name}</h2><p className="mt-2 min-h-10 text-xs leading-relaxed text-slate-400">{copy}</p><button onClick={() => setConnected(v => enabled ? v.filter(item => item !== name) : [...v,name])} className={`mt-5 w-full rounded-xl py-2.5 text-xs font-bold ${enabled ? 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300' : 'bg-brand-500 text-white'}`}>{enabled ? 'Connected' : 'Connect'}</button></div>})}</div></PageTitle>; }

function PageTitle({eyebrow,title,description,action,children}:{eyebrow:string;title:string;description:string;action?:string;children:React.ReactNode}) { return <div className="space-y-6"><section className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-500">{eyebrow}</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p></div>{action && <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"><Plus size={17}/>{action}</button>}</section>{children}</div>; }
function Stat({icon,label,value,note}:{icon:React.ReactNode;label:string;value:string;note:string}) { return <div className="card"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">{icon}</span><p className="mt-5 text-xs font-semibold text-slate-400">{label}</p><b className="mt-1 block text-2xl">{value}</b><small className="text-[11px] text-emerald-500">{note}</small></div>; }
