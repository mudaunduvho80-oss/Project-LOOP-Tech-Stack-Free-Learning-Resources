'use client';

import React, { useState, useEffect } from 'react';
import { ViewMode, TaskItem, TaskPriority, NotificationItem } from '@/lib/types';
import {
  initialTasks,
  upcomingEvents,
  initialNotifications,
} from '@/lib/mockData';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { KPICards } from '@/components/KPICards';
import { TaskList } from '@/components/TaskList';
import { TaskDetailDrawer } from '@/components/TaskDetailDrawer';
import { AddTaskModal } from '@/components/AddTaskModal';
import { FocusTimer } from '@/components/FocusTimer';
import { AISuggestionCard } from '@/components/AISuggestionCard';
import { UpcomingEventsCard } from '@/components/UpcomingEventsCard';
import { ProductivityCharts } from '@/components/ProductivityCharts';
import { LoopAIFeatures } from '@/components/LoopAIFeatures';
import {
  FullTasksView,
  CalendarView,
  GoalsView,
  SettingsView,
} from '@/components/Views';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<TaskItem | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus = t.status === 'Done' ? 'To Do' : 'Done';
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
    if (selectedTaskDetail && selectedTaskDetail.id === id) {
      setSelectedTaskDetail((prev) =>
        prev ? { ...prev, status: prev.status === 'Done' ? 'To Do' : 'Done' } : null
      );
    }
  };

  const handleUpdateTaskStatus = (id: string, newStatus: 'To Do' | 'In Progress' | 'Done') => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    if (selectedTaskDetail && selectedTaskDetail.id === id) {
      setSelectedTaskDetail((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleUpdateTaskPriority = (id: string, newPriority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: newPriority } : t))
    );
    if (selectedTaskDetail && selectedTaskDetail.id === id) {
      setSelectedTaskDetail((prev) => (prev ? { ...prev, priority: newPriority } : null));
    }
  };

  const handleAddTask = (newTaskData: Omit<TaskItem, 'id' | 'aiConfidence'>) => {
    const newTask: TaskItem = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      aiConfidence: Math.floor(Math.random() * 15) + 85, // 85%-99%
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-800 dark:text-slate-100 flex transition-colors duration-200">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        taskCount={tasks.filter((t) => t.status !== 'Done').length}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenAddTask={() => setIsAddTaskOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          notifications={notifications}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          taskCount={tasks.filter((t) => t.status !== 'Done').length}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* 1. Summary KPI Metric Cards */}
              <KPICards tasks={tasks} />

              {/* 2. Main Dashboard Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Columns: Task Manager & Analytics */}
                <div className="lg:col-span-2 space-y-6">
                  <TaskList
                    tasks={tasks}
                    onToggleTaskStatus={handleToggleTaskStatus}
                    onOpenTaskDetail={setSelectedTaskDetail}
                    onOpenAddTask={() => setIsAddTaskOpen(true)}
                    onViewAllTasks={() => setCurrentView('tasks')}
                  />
                  <ProductivityCharts />
                </div>

                {/* Right 1 Column: Focus Timer, AI Suggestion & Events */}
                <div className="space-y-6">
                  <FocusTimer />
                  <AISuggestionCard onOpenAskLoop={() => setCurrentView('ask-loop')} />
                  <UpcomingEventsCard
                    events={upcomingEvents}
                    onViewCalendar={() => setCurrentView('calendar')}
                  />
                </div>
              </div>
            </div>
          )}

          {currentView === 'tasks' && (
            <div className="animate-in fade-in duration-300">
              <FullTasksView
                tasks={tasks}
                onToggleTaskStatus={handleToggleTaskStatus}
                onOpenTaskDetail={setSelectedTaskDetail}
                onOpenAddTask={() => setIsAddTaskOpen(true)}
              />
            </div>
          )}

          {currentView === 'calendar' && (
            <div className="animate-in fade-in duration-300">
              <CalendarView />
            </div>
          )}

          {currentView === 'focus' && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
              <FocusTimer />
              <AISuggestionCard onOpenAskLoop={() => setCurrentView('ask-loop')} />
            </div>
          )}

          {currentView === 'goals' && (
            <div className="animate-in fade-in duration-300">
              <GoalsView />
            </div>
          )}

          {currentView === 'analytics' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <ProductivityCharts />
            </div>
          )}

          {currentView === 'ask-loop' && (
            <div className="animate-in fade-in duration-300">
              <LoopAIFeatures />
            </div>
          )}

          {currentView === 'settings' && (
            <div className="animate-in fade-in duration-300">
              <SettingsView darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
            </div>
          )}

          {(currentView === 'notes' || currentView === 'integrations') && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                {currentView} Workspace
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Connect your note tools and 3rd party integrations seamlessly with LOOP AI.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Task Detail Slide-over Drawer */}
      <TaskDetailDrawer
        task={selectedTaskDetail}
        onClose={() => setSelectedTaskDetail(null)}
        onUpdateStatus={handleUpdateTaskStatus}
        onUpdatePriority={handleUpdateTaskPriority}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
