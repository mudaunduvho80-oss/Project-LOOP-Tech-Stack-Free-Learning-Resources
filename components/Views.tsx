'use client';

import React from 'react';
import { TaskItem, TaskPriority } from '@/lib/types';
import {
  Search,
  Plus,
  Filter,
  Download,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  User,
  Bell,
  Shield,
  Palette,
  Upload,
} from 'lucide-react';

interface TasksViewProps {
  tasks: TaskItem[];
  onToggleTaskStatus: (id: string) => void;
  onOpenTaskDetail: (task: TaskItem) => void;
  onOpenAddTask: () => void;
}

export const FullTasksView: React.FC<TasksViewProps> = ({
  tasks,
  onToggleTaskStatus,
  onOpenTaskDetail,
  onOpenAddTask,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('All');

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card-light">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Tasks & Feedback Inbox
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Browse, filter and analyze all customer feedback & productivity tasks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200">
            <Upload className="w-3.5 h-3.5" />
            Upload CSV
          </button>
          <button
            onClick={onOpenAddTask}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Feedback
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter feedback or search key terms..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 border border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none"
          >
            <option value="All">All Themes</option>
            <option value="Shipping">Shipping</option>
            <option value="Pricing">Pricing</option>
            <option value="Customer Support">Customer Support</option>
            <option value="Product Quality">Product Quality</option>
            <option value="Returns">Returns</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card-light overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="p-4">Status</th>
              <th className="p-4">Feedback / Task</th>
              <th className="p-4">Source</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Theme</th>
              <th className="p-4">AI Confidence</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((task) => (
              <tr
                key={task.id}
                onClick={() => onOpenTaskDetail(task)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={task.status === 'Done'}
                    onChange={() => onToggleTaskStatus(task.id)}
                    className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500 cursor-pointer"
                  />
                </td>
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-100 max-w-xs truncate">
                  {task.title}
                </td>
                <td className="p-4 text-slate-500">Web / App</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      task.priority === 'High'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400'
                        : task.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="p-4 font-medium text-brand-600 dark:text-brand-400">
                  {task.category}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${task.aiConfidence}%` }}
                      />
                    </div>
                    <span className="font-semibold text-[11px] text-slate-600 dark:text-slate-400">
                      {task.aiConfidence}%
                    </span>
                  </div>
                </td>
                <td className="p-4 text-slate-400">{task.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CalendarView: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-card-light space-y-4">
    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-brand-500" />
        Focus & Meeting Calendar (May 2026)
      </h2>
      <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-100">
        Today: May 18, 2026
      </span>
    </div>

    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 py-2">
      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
    </div>

    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 31 }).map((_, i) => {
        const dayNum = i + 1;
        const isToday = dayNum === 18;
        return (
          <div
            key={i}
            className={`min-h-[70px] p-2 rounded-xl border text-xs flex flex-col justify-between transition-colors ${
              isToday
                ? 'bg-brand-50/80 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-300 font-bold shadow-xs'
                : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{dayNum}</span>
            {dayNum === 18 && (
              <span className="text-[10px] bg-brand-500 text-white px-1.5 py-0.5 rounded font-medium truncate">
                3 Focus Blocks
              </span>
            )}
            {dayNum === 20 && (
              <span className="text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded font-medium truncate">
                Q3 Sprint
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export const GoalsView: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-card-light space-y-6">
    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-500" />
          Productivity & Focus Goals
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Track quarterly OKRs and daily focus targets</p>
      </div>
      <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-xs">
        + New Goal
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { title: 'Complete 20 Deep Work Focus Sessions', current: 16, total: 20, pct: 80 },
        { title: 'Maintain 7-Day Daily Streak', current: 7, total: 7, pct: 100 },
        { title: 'Reduce Meeting Overlap by 25%', current: 18, total: 25, pct: 72 },
        { title: 'Resolve Top 5 Customer Bug Themes', current: 4, total: 5, pct: 80 },
      ].map((goal, idx) => (
        <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">{goal.title}</h3>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">{goal.pct}%</span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full" style={{ width: `${goal.pct}%` }} />
          </div>
          <p className="text-[11px] text-slate-400">
            {goal.current} of {goal.total} targets completed
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const SettingsView: React.FC<{ darkMode: boolean; onToggleDarkMode: () => void }> = ({
  darkMode,
  onToggleDarkMode,
}) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-card-light space-y-6">
    <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Workspace & Account Settings
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400">Manage preferences, team members, and appearance</p>
    </div>

    <div className="space-y-6 max-w-xl text-xs">
      {/* Profile Info */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <User className="w-4 h-4 text-brand-500" /> Account Profile
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-500 mb-1 font-medium">Name</label>
            <input
              type="text"
              defaultValue="Princy Winciya"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 mb-1 font-medium">Workspace</label>
            <input
              type="text"
              defaultValue="Zidio Technologies"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Theme Appearance */}
      <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-500" /> Interface Theme
        </h3>
        <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">Dark Mode</p>
            <p className="text-slate-400 text-[11px]">Toggle dark background and high-contrast gradients</p>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
              darkMode ? 'bg-brand-500 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
