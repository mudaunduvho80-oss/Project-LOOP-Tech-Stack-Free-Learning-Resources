'use client';

import React, { useState } from 'react';
import { TaskItem, TaskPriority } from '@/lib/types';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  Building2,
  Tag,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  MessageSquare,
} from 'lucide-react';

interface TaskDetailDrawerProps {
  task: TaskItem | null;
  onClose: () => void;
  onUpdateStatus: (taskId: string, newStatus: 'To Do' | 'In Progress' | 'Done') => void;
  onUpdatePriority: (taskId: string, newPriority: TaskPriority) => void;
}

export const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({
  task,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'related'>('overview');

  if (!task) return null;

  const priorityColors: Record<TaskPriority, string> = {
    High: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-900',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900',
    Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-900',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-100 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-xl border ${
                task.status === 'Done'
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 border-emerald-200'
                  : 'bg-brand-50 text-brand-600 dark:bg-brand-950/50 border-brand-200'
              }`}
            >
              {task.status === 'Done' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {task.title}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority} Priority
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {task.category}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Header */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 text-xs font-semibold border-b-2 mr-6 transition-colors ${
              activeTab === 'overview'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`py-3 text-xs font-semibold border-b-2 mr-6 transition-colors flex items-center gap-1.5 ${
              activeTab === 'analysis'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Analysis
          </button>
          <button
            onClick={() => setActiveTab('related')}
            className={`py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'related'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Similar Tasks (3)
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Quick Status Switcher */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Current Status
                </span>
                <div className="flex items-center gap-1">
                  {(['To Do', 'In Progress', 'Done'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(task.id, st)}
                      className={`px-3 py-1 text-xs rounded-xl font-medium transition-all ${
                        task.status === st
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task Details Metadata Table */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Task Metadata
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Due Time:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {task.dueTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Date:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {task.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Assigned:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {task.assignedTo || 'Princy'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>Workspace:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {task.workspace || 'Zidio Technologies'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Notes */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Notes & Details
                </h3>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {task.notes || 'No extra notes provided for this task item.'}
                </div>
              </div>

              {/* AI Summary Widget (Reference visual matching) */}
              <div className="p-4 bg-gradient-to-br from-brand-50/60 to-purple-50/40 dark:from-brand-950/40 dark:to-purple-950/20 rounded-2xl border border-brand-100 dark:border-brand-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    AI Productivity Summary
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                    {task.aiConfidence}% Confidence
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  High priority task aligned with Q3 goal completion. Completing this before 12:00 PM will improve your daily productivity score by 14%.
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                    <span>AI Execution Readiness</span>
                    <span>{task.aiConfidence}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
                      style={{ width: `${task.aiConfidence}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                    #{task.category}
                  </span>
                  <span className="text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                    #DeepWork
                  </span>
                  <span className="text-[10px] font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                    #HighImpact
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-brand-500" />
                  Effort & Priority Breakdown
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Based on your focus history, tasks in the <span className="font-semibold text-slate-800 dark:text-slate-200">{task.category}</span> category typically require an average of 45 minutes of uninterrupted focus.
                </p>
              </div>

              <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/40 space-y-2">
                <h4 className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Recommended Next Action
                </h4>
                <p className="text-xs text-purple-900 dark:text-purple-200">
                  Launch a 25-minute Pomodoro focus block right now to complete the core draft.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div className="space-y-3">
              {[
                'Review API endpoints for user permissions',
                'Update Q3 OKR tracking dashboard',
                'Schedule 1-on-1 design critique session',
              ].map((title, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-brand-300 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span className="truncate">{title}</span>
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between">
          <button
            onClick={() => onUpdatePriority(task.id, task.priority === 'High' ? 'Medium' : 'High')}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            Toggle Priority ({task.priority})
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};
