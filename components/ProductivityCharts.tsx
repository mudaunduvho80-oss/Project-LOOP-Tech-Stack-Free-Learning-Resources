'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import { weeklyProductivityTrend, focusCategories } from '@/lib/mockData';
import { TrendingUp, BarChart3, ChevronDown, PieChart } from 'lucide-react';

export const ProductivityCharts: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7 Days');

  return (
    <div className="space-y-6">
      {/* Top Grid: Main Line Chart + Category Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Columns: Productivity Trend Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 lg:p-6 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-500" />
                Productivity & Sentiment Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Weekly focus score and completed task velocity
              </p>
            </div>

            {/* Timeframe selector */}
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 pr-8 rounded-xl text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="7 Days">7 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="This Month">This Month</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Recharts Line Container */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyProductivityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="focusScore"
                  name="Focus Score (%)"
                  stroke="#6C4CFD"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6C4CFD', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="positive"
                  name="Tasks Velocity"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Footnotes */}
          <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-500" />
              <span>Focus Score (Primary)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-500" />
              <span>Task Velocity (Dashed)</span>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Top Themes / Category Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 lg:p-6 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-brand-500" />
              Top Focus Themes
            </h3>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">View All</span>
          </div>

          <div className="space-y-4 my-auto">
            {focusCategories.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.category}
                  </span>
                  <span>{cat.percentage}% ({cat.hours}h)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-brand-50/60 dark:bg-brand-950/40 rounded-xl border border-brand-100 dark:border-brand-900/40 text-xs text-brand-700 dark:text-brand-300 font-medium">
            💡 <span className="font-bold">Shipping</span> accounts for 38% of focus hours this week.
          </div>
        </div>
      </div>

      {/* Bottom Grid: Feedback Volume / Tasks Bar Chart + Time Allocation Area Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bar Chart: Daily Tasks Volume */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Feedback & Task Volume (7 Days)
          </h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProductivityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="positive" name="Completed Tasks" fill="#6C4CFD" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart: Focus Hours Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Daily Focus Curve
          </h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProductivityTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="focusColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.4} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="focusScore"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#focusColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
