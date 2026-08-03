'use client';

import React, { useState } from 'react';
import { TaskItem, TaskPriority, TaskStatus } from '@/lib/types';
import {
  Check,
  Plus,
  Clock,
  ChevronRight,
  Sparkles,
  Filter,
} from 'lucide-react';

interface TaskListProps {
  tasks: TaskItem[];
  onToggleTaskStatus: (id: string) => void;
  onOpenTaskDetail: (task: TaskItem) => void;
  onOpenAddTask: () => void;
  onViewAllTasks?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTaskStatus,
  onOpenTaskDetail,
  onOpenAddTask,
  onViewAllTasks,
}) => {
  const [filter, setFilter] = useState<'All' | 'To Do' | 'In Progress' | 'Done'>('All');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const getPriorityBadgeClass = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-900';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900';
      case 'Low':
        return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900';
      case 'In Progress':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-900';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 lg:p-6 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none space-y-4">
      {/* Top Bar: Title, Filters & Add Task */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Today&apos;s Tasks
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
              {filteredTasks.length} items
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Pills */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400">
            {(['All', 'To Do', 'In Progress', 'Done'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filter === tab
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAddTask}
            className="flex items-center gap-1 px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Task Rows List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
            No tasks found for &quot;{filter}&quot;. Create one to get started!
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'Done';

            return (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 hover:border-brand-200 dark:hover:border-slate-700 ${
                  isCompleted
                    ? 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/60 opacity-75'
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/80 shadow-xs'
                }`}
              >
                {/* Left: Checkbox + Title + Category */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-4">
                  {/* Interactive Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTaskStatus(task.id);
                    }}
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-brand-500 border-brand-500 text-white shadow-xs'
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-brand-500 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div
                    onClick={() => onOpenTaskDetail(task)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <p
                      className={`text-xs lg:text-sm font-semibold truncate transition-colors ${
                        isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {task.category}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.dueTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Badges & Details Drawer Action */}
                <div
                  onClick={() => onOpenTaskDetail(task)}
                  className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer"
                >
                  {/* AI Confidence Chip */}
                  <span className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/60 px-2 py-0.5 rounded-md border border-brand-100 dark:border-brand-900/50">
                    <Sparkles className="w-3 h-3 text-brand-500" />
                    {task.aiConfidence}%
                  </span>

                  {/* Priority Badge */}
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${getPriorityBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-500 transition-colors" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View All Link */}
      {onViewAllTasks && (
        <div className="pt-2 text-right">
          <button
            onClick={onViewAllTasks}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>View All Tasks & Detailed Grid</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
