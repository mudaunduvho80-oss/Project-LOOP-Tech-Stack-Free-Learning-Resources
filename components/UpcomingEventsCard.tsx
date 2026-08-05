'use client';

import React from 'react';
import { UpcomingEvent } from '@/lib/types';
import { Calendar, Video, AlertCircle, ChevronRight, Clock } from 'lucide-react';

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
  onViewCalendar: () => void;
}

export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  events,
  onViewCalendar,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 lg:p-6 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-500" />
          Upcoming Events & Deadlines
        </h3>
        <button
          onClick={onViewCalendar}
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-0.5"
        >
          <span>View Calendar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2.5">
        {events.map((evt) => {
          const isMeeting = evt.type === 'meeting';
          const isDeadline = evt.type === 'deadline';

          return (
            <div
              key={evt.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isMeeting
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                      : isDeadline
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                      : 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400'
                  }`}
                >
                  {isMeeting ? (
                    <Video className="w-4 h-4" />
                  ) : isDeadline ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {evt.time} • <span className="font-medium text-slate-600 dark:text-slate-400">{evt.category}</span>
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                {evt.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
