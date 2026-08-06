'use client';

import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3, Bell, CalendarDays, CheckSquare, ChevronDown, ChevronsLeft, ChevronsRight, FileText, Flame,
  LayoutDashboard, LogOut, Menu, Moon, Search, Settings, Sparkles,
  Sun, Target, TimerReset, X, Zap,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: '6' },
  { name: 'Calendar', href: '/calendar', icon: CalendarDays },
  { name: 'Focus Mode', href: '/focus', icon: TimerReset },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Notes', href: '/notes', icon: FileText },
  { name: 'AI Assistant', href: '/ask', icon: Sparkles, badge: 'AI' },
  { name: 'Integrations', href: '/integrations', icon: Zap },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const savedTheme = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('loop-theme='))
      ?.split('=')[1];
    const useDarkTheme = savedTheme ? savedTheme === 'dark' : true;
    setDark(useDarkTheme);
    document.documentElement.classList.toggle('dark', useDarkTheme);
  }, []);

  const toggleTheme = () => {
    setDark((value) => {
      const nextTheme = !value;
      document.documentElement.classList.toggle('dark', nextTheme);
      document.cookie = `loop-theme=${nextTheme ? 'dark' : 'light'}; path=/; max-age=31536000; samesite=lax`;
      return nextTheme;
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#0b1020] dark:text-white">
      {menuOpen && <button aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-slate-200/80 bg-white px-4 py-5 transition-[transform,width,padding] duration-300 dark:border-white/10 dark:bg-[#11182b] lg:translate-x-0 ${sidebarCollapsed ? 'lg:w-[84px] lg:px-3' : 'lg:w-[264px]'} ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="absolute -right-4 top-8 z-10 hidden h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-brand-300 hover:text-brand-500 dark:border-white/10 dark:bg-[#1a2339] dark:text-slate-300 lg:grid">{sidebarCollapsed ? <ChevronsRight size={16}/> : <ChevronsLeft size={16}/>}</button>
        <div className={`mb-8 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-2`}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/loop icon.png" alt="LOOP logo" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover shadow-lg shadow-brand-500/25" priority />
            <span className={sidebarCollapsed ? 'hidden' : ''}><b className="block text-lg tracking-tight">LOOP</b><small className="block -mt-1 text-[9px] font-bold tracking-[.18em] text-slate-400">PRODUCTIVITY</small></span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="rounded-lg p-1.5 text-slate-400 lg:hidden"><X size={18} /></button>
        </div>

        <nav className="space-y-1">
          {navigation.map(({ name, href, icon: Icon, badge }) => {
            const active = pathname === href;
            return <Link key={name} href={href} title={sidebarCollapsed ? name : undefined} onClick={() => setMenuOpen(false)} className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${sidebarCollapsed ? 'lg:justify-center' : ''} ${active ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'}`}>
              <span className="flex items-center gap-3">{name === 'AI Assistant' ? <Image src="/loop icon.png" alt="" width={17} height={17} className="h-[17px] w-[17px] rounded object-cover"/> : <Icon size={17} className={active ? '' : 'text-slate-400 group-hover:text-brand-500'} />}<span className={sidebarCollapsed ? 'lg:hidden' : ''}>{name}</span></span>
              {badge && <span className={`${sidebarCollapsed ? 'lg:hidden' : ''} rounded-md px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20' : badge === 'AI' ? 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}>{badge}</span>}
            </Link>;
          })}
        </nav>

        <div className="relative mt-auto border-t border-slate-100 pt-4 dark:border-white/10">
          {profileOpen && <div className={`absolute bottom-full mb-3 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#1a2339] ${sidebarCollapsed ? 'left-0 w-48' : 'left-0 right-0'}`}>
            <button onClick={() => router.push('/login')} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"><LogOut size={15}/> Sign out</button>
          </div>}
          <button onClick={() => setProfileOpen(!profileOpen)} className={`flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-slate-50 dark:hover:bg-white/5 ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-brand-500 to-cyan-400 text-xs font-bold text-white">LD</span>
            <span className={`min-w-0 flex-1 ${sidebarCollapsed ? 'lg:hidden' : ''}`}><b className="block truncate text-xs">Lawrence Dike</b><small className="text-[10px] text-slate-400">Personal workspace</small></span><ChevronDown size={15} className={`text-slate-400 ${sidebarCollapsed ? 'lg:hidden' : ''}`} />
          </button>
        </div>
      </aside>

      <div className={`min-h-screen min-w-0 transition-[padding] duration-300 ${sidebarCollapsed ? 'lg:pl-[84px]' : 'lg:pl-[264px]'}`}>
        <header className="sticky top-0 z-30 flex h-[76px] items-center gap-3 border-b border-slate-200/80 bg-[#f7f8fc]/85 px-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1020]/85 sm:px-7">
          <button onClick={() => setMenuOpen(true)} className="rounded-xl p-2 text-slate-500 hover:bg-white dark:hover:bg-white/10 lg:hidden"><Menu size={20} /></button>
          <div className="min-w-0 flex-1"><h1 className="truncate text-base font-bold sm:text-xl">Good morning, Lawrence <span>👋</span></h1><p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">You&apos;re making great progress. Let&apos;s keep the momentum going.</p></div>
          <div className="relative hidden w-72 md:block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-brand-400 dark:border-white/10 dark:bg-white/5" placeholder="Search tasks, notes, insights..."/></div>
          <button aria-label="Toggle theme" onClick={toggleTheme} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">{dark ? <Sun size={17} className="text-amber-400"/> : <Moon size={17}/>}</button>
          <button aria-label="Notifications" className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"><Bell size={17}/><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#0b1020]"/></button>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-brand-500 to-cyan-400 text-xs font-bold text-white">LD</span>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 sm:p-7">{children}</main>
      </div>
    </div>
  );
}
