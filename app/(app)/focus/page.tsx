'use client';

import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Check,
  Expand,
  Focus,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { PageTitle } from '@/components/FeaturePageLayout';

const sessions = {
  pomodoro: {
    label: 'Pomodoro',
    seconds: 25 * 60,
    caption: 'Deep work window',
    accent: 'bg-brand-50 text-brand-600',
  },
  shortBreak: {
    label: 'Short Break',
    seconds: 5 * 60,
    caption: 'Quick reset',
    accent: 'bg-slate-100 text-slate-700',
  },
  longBreak: {
    label: 'Long Break',
    seconds: 15 * 60,
    caption: 'Recharge fully',
    accent: 'bg-cyan-50 text-cyan-600',
  },
} as const;

type SessionType = keyof typeof sessions;

type HistoryEntry = {
  id: string;
  type: SessionType;
  duration: number;
  completedAt: string;
};

const ambientOptions = ['Rain', 'Café', 'White noise'];

export default function FocusPage() {
  const [activeTab, setActiveTab] = useState<SessionType>('pomodoro');
  const [remainingSeconds, setRemainingSeconds] = useState(sessions.pomodoro.seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [ambient, setAmbient] = useState(ambientOptions[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to focus');

  const currentSession = sessions[activeTab];
  const progress = Math.round(((currentSession.seconds - remainingSeconds) / currentSession.seconds) * 100);

  const displayTime = useMemo(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [remainingSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, activeTab]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleSessionComplete = () => {
    const completedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistory((current) => [
      { id: String(Date.now()), type: activeTab, duration: currentSession.seconds, completedAt },
      ...current,
    ].slice(0, 5));

    if (activeTab === 'pomodoro') {
      setCompletedPomodoros((count) => {
        const nextType = (count + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
        setActiveTab(nextType);
        setRemainingSeconds(sessions[nextType].seconds);
        setStatusMessage(`Auto started ${sessions[nextType].label}`);
        setIsRunning(true);
        return count + 1;
      });
    } else {
      setActiveTab('pomodoro');
      setRemainingSeconds(sessions.pomodoro.seconds);
      setIsRunning(false);
      setStatusMessage('Break complete. Ready for another Pomodoro.');
    }
  };

  const handleSelectTab = (tab: SessionType) => {
    setActiveTab(tab);
    setRemainingSeconds(sessions[tab].seconds);
    setIsRunning(false);
    setStatusMessage(`${sessions[tab].label} selected`);
  };

  const handleReset = () => {
    setRemainingSeconds(currentSession.seconds);
    setIsRunning(false);
    setStatusMessage('Session reset');
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  };

  const totalFocusMinutes = history.filter((item) => item.type === 'pomodoro').reduce((sum, item) => sum + item.duration / 60, 0);
  const sessionsCompleted = history.filter((item) => item.type === 'pomodoro').length;
  const streak = Math.min(sessionsCompleted, 5);

  return (
    <PageTitle
      eyebrow="Protect your attention"
      title="Focus Mode"
      description="Stay in a Pomodoro rhythm with automatic breaks, session history, and ambient controls."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="card overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid place-items-center text-center">
              <div
                className="relative mx-auto grid h-[330px] w-[330px] place-items-center rounded-full timer-ring"
                style={{ '--ring-progress': `${progress}%` } as CSSProperties}
              >
                <div className="grid h-[260px] w-[260px] place-items-center rounded-full bg-slate-950/5 dark:bg-slate-900/80">
                  <div className="grid h-[220px] w-[220px] place-items-center rounded-full bg-white/90 text-center shadow-xl dark:bg-slate-950/70">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[.2em] text-brand-600">
                      <Focus size={14} />
                      {currentSession.label}
                    </span>
                    <b className="mt-6 block text-6xl tracking-tight text-slate-900 dark:text-slate-100">{displayTime}</b>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{currentSession.caption}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setIsRunning(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25"
                  disabled={isRunning}
                >
                  <Play size={16} />
                  Start Focus
                </button>
                <button
                  onClick={() => setIsRunning(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  disabled={!isRunning}
                >
                  <Pause size={16} />
                  Pause
                </button>
                <button
                  onClick={() => setIsRunning(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  disabled={isRunning || remainingSeconds === currentSession.seconds}
                >
                  <Play size={16} />
                  Resume
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-slate-400">Session state</p>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{statusMessage}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-slate-500">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-600">{completedPomodoros} Pomodoros</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{progress}% complete</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Current cycle</p>
                    <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">{currentSession.label}</h2>
                  </div>
                  <span className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-600">{activeTab === 'pomodoro' ? 'Work' : 'Break'}</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {(['pomodoro', 'shortBreak', 'longBreak'] as SessionType[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleSelectTab(tab)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        activeTab === tab
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="block text-xs uppercase tracking-[.2em] text-slate-400">{sessions[tab].label}</span>
                      <span className="mt-2 block text-lg">{Math.floor(sessions[tab].seconds / 60)} min</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Ambient controls</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setSoundOn((current) => !current)}
                    className={`inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      soundOn ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Volume2 size={16} />
                      Sound
                    </span>
                    <span>{soundOn ? 'On' : 'Off'}</span>
                  </button>
                  <button
                    onClick={() => setAmbient((current) => {
                      const index = ambientOptions.indexOf(current);
                      return ambientOptions[(index + 1) % ambientOptions.length];
                    })}
                    className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-slate-300"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Music2 size={16} />
                      Ambient
                    </span>
                    <span>{ambient}</span>
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={toggleFullscreen}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-slate-300"
                  >
                    <Expand size={16} />
                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:border-slate-300">
                    <BarChart3 size={16} />
                    Statistics
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Focus statistics</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(totalFocusMinutes)}</p>
                    <p className="mt-1 text-xs text-slate-400">Minutes focused</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{sessionsCompleted}</p>
                    <p className="mt-1 text-xs text-slate-400">Sessions complete</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{streak}</p>
                    <p className="mt-1 text-xs text-slate-400">Daily streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Session history</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Recent work</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Latest</span>
            </div>
            <div className="mt-5 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-slate-500">No sessions completed yet. Start your first Pomodoro.</p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-950/60">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{sessions[entry.type].label}</span>
                      <span className="text-xs text-slate-400">{entry.completedAt}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{Math.round(entry.duration / 60)} min session</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card rounded-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-400">Quick actions</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Stay on track</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <button className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300">
                <span className="inline-flex items-center gap-2"><Music2 size={16} /> Set ambient music</span>
                <span className="text-slate-500">{ambient}</span>
              </button>
              <button className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300">
                <span className="inline-flex items-center gap-2"><Check size={16} /> Track progress</span>
                <span className="text-slate-500">{sessionsCompleted} sessions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTitle>
  );
}
