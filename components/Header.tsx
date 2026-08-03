'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  Menu,
  CheckCircle2,
  Sparkles,
  Clock,
  X,
} from 'lucide-react';
import { NotificationItem } from '@/lib/types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAddTask: () => void;
  onOpenMobileSidebar: () => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  taskCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAddTask,
  onOpenMobileSidebar,
  notifications,
  onMarkNotificationsRead,
  taskCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 px-4 lg:px-8 py-4 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu + Greetings */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Good Morning, Princy <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              You&apos;ve got <span className="font-semibold text-brand-600 dark:text-brand-400">{taskCount} tasks</span> today. Let&apos;s make it productive!
            </p>
          </div>
        </div>

        {/* Right Section: Search, Actions, Notifications, Dark Mode Toggle */}
        <div className="flex items-center gap-2.5 lg:gap-4">
          {/* Global Search Bar */}
          <div className="relative hidden md:block w-64 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, notes, AI insights..."
              className="w-full pl-10 pr-12 py-2 text-xs lg:text-sm bg-slate-100/80 dark:bg-slate-800/60 border border-transparent focus:border-brand-500 dark:focus:border-brand-500 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              <span>⌘</span>K
            </div>
          </div>

          {/* Quick "+ Add Task" Button */}
          <button
            onClick={onOpenAddTask}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white rounded-xl font-medium text-xs lg:text-sm shadow-md shadow-brand-500/20 hover:shadow-brand-500/35 transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications Icon + Popover */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) {
                  onMarkNotificationsRead();
                }
              }}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800 transition-colors"
            >
              <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 lg:w-90 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-brand-500" />
                    Notifications
                  </h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border text-xs transition-colors ${
                        notif.unread
                          ? 'bg-brand-50/50 dark:bg-brand-950/30 border-brand-100 dark:border-brand-900/40'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        <span className="flex items-center gap-1.5">
                          {notif.type === 'ai' ? (
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                          ) : notif.type === 'task' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                          )}
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{notif.time}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{notif.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 via-purple-500 to-cyan-400 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-xs text-brand-600 dark:text-brand-300">
                PW
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
