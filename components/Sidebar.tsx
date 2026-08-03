'use client';

import React from 'react';
import { ViewMode } from '@/lib/types';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Timer,
  Target,
  BarChart3,
  FileText,
  Sparkles,
  Layers,
  Settings,
  ChevronDown,
  Building2,
  X,
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  taskCount: number;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  taskCount,
  isOpen,
  onCloseMobile,
}) => {
  const navItems: { id: ViewMode; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: taskCount },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'focus', label: 'Focus Mode', icon: Timer, badge: 'POMO' },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'ask-loop', label: 'Ask LOOP', icon: Sparkles, badge: 'AI' },
    { id: 'integrations', label: 'Integrations', icon: Layers },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-[#0f172a] border-r border-slate-100 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* LOOP Infinity Logo Icon */}
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-purple-500 to-cyan-400 p-[2px] flex items-center justify-center shadow-md shadow-brand-500/20">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5 4.5 4.5 0 0 0 5.5 17c2.5 0 4.5-1.5 6.5-4.5z" />
                    <path d="M12 12c2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 18.5 7c-2.5 0-4.5 1.5-6.5 4.5z" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-brand-500 dark:from-white dark:to-brand-300 bg-clip-text text-transparent">
                  LOOP
                </span>
                <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest -mt-1">
                  AI Productivity
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 dark:shadow-brand-500/40'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badge === 'AI'
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Workspace Selector & User Profile */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
          {/* Workspace Pill */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-brand-200 dark:hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center text-xs font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Zidio Technologies
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Workspace</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 via-purple-500 to-cyan-400 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-sm text-brand-600 dark:text-brand-300">
                    P
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                  Princy Winciya
                </p>
                <span className="inline-block mt-0.5 text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-1.5 py-0.2 rounded border border-brand-100 dark:border-brand-900/50">
                  Premium Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
