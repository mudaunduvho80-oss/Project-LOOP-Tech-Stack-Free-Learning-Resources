'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Timer } from 'lucide-react';

export const FocusTimer: React.FC = () => {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const initialTimes: Record<string, number> = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const handleModeChange = (newMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(initialTimes[newMode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTimes[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration = initialTimes[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 lg:p-6 border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none flex flex-col justify-between">
      {/* Header & Mode Selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-500 flex items-center justify-center">
            <Timer className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Focus Timer
          </span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          title={soundEnabled ? 'Mute ambient sound' : 'Unmute ambient sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
        </button>
      </div>

      {/* Timer Modes */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-4">
        <button
          onClick={() => handleModeChange('pomodoro')}
          className={`py-1.5 rounded-lg transition-all ${
            mode === 'pomodoro'
              ? 'bg-brand-500 text-white shadow-xs'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => handleModeChange('shortBreak')}
          className={`py-1.5 rounded-lg transition-all ${
            mode === 'shortBreak'
              ? 'bg-brand-500 text-white shadow-xs'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Short (5m)
        </button>
        <button
          onClick={() => handleModeChange('longBreak')}
          className={`py-1.5 rounded-lg transition-all ${
            mode === 'longBreak'
              ? 'bg-brand-500 text-white shadow-xs'
              : 'hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Long (15m)
        </button>
      </div>

      {/* Main Countdown Ring */}
      <div className="relative py-4 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100 dark:text-slate-800"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-brand-500 transition-all duration-300"
              strokeDasharray={`${progressPercent}, 100`}
              strokeWidth="3"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              {formattedTime}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
              {isRunning ? 'Session Active' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={resetTimer}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
            isRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
              : 'bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white shadow-brand-500/25'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause Focus</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white ml-0.5" />
              <span>Start Focus</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
