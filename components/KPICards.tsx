'use client';

import React from 'react';
import { Clock, Target, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { TaskItem } from '@/lib/types';

interface KPICardsProps {
  tasks: TaskItem[];
}

export const KPICards: React.FC<KPICardsProps> = ({ tasks }) => {
  const completedCount = tasks.filter((t) => t.status === 'Done').length;
  const totalCount = tasks.length || 1;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {/* 1. Tasks Today Card with Circular Ring */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none hover:shadow-card-hover transition-all duration-200 group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Tasks Today
          </span>
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {completedCount}/{totalCount}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{percentage}% completed</span>
            </div>
          </div>

          {/* SVG Circular Progress */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-500 transition-all duration-700 ease-out"
                strokeDasharray={`${percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-slate-700 dark:text-slate-300">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Focus Time Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none hover:shadow-card-hover transition-all duration-200 group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Focus Time
          </span>
          <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            5.4 <span className="text-sm font-semibold text-slate-400">hrs</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.5% vs yesterday</span>
          </div>
        </div>
      </div>

      {/* 3. Goals Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none hover:shadow-card-hover transition-all duration-200 group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Goals Progress
          </span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Target className="w-4 h-4" />
          </div>
        </div>

        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            17% <span className="text-xs font-normal text-slate-400">(4/6 goals)</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-rose-500">
            <span>+4.1% vs yesterday</span>
          </div>
        </div>
      </div>

      {/* 4. Daily Streak Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none hover:shadow-card-hover transition-all duration-200 group">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Daily Streak
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Flame className="w-4 h-4 fill-amber-500" />
          </div>
        </div>

        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            7 Days <span className="text-xl">🔥</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">
            <span>2 new milestones reached</span>
          </div>
        </div>
      </div>
    </div>
  );
};
