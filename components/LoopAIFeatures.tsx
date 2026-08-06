'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Bot, CalendarDays, CheckCircle2, ClipboardList, Clock3, Send, Sparkles, Target } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  plan?: string[];
};

const quickActions = [
  { label: 'Plan my day', prompt: 'Plan my day', icon: CalendarDays },
  { label: 'Set priorities', prompt: 'Recommend my priorities', icon: Target },
  { label: 'Focus schedule', prompt: 'Suggest a focus schedule', icon: Clock3 },
  { label: 'Next task', prompt: 'What should I work on next?', icon: CheckCircle2 },
];

const getCoachResponse = (prompt: string): Omit<Message, 'id' | 'sender'> => {
  const normalizedPrompt = prompt.toLowerCase();

  if (normalizedPrompt.includes('plan') || normalizedPrompt.includes('priorit')) {
    return {
      text: 'Here is a focused plan for today. Start with the work that needs your clearest thinking, then move into execution and collaboration.',
      plan: ['Start with Design Homepage UI.', 'Then complete Authentication.', 'Finally attend Team Meeting.'],
    };
  }

  if (normalizedPrompt.includes('focus')) {
    return { text: 'Block 9:00–10:30 AM for deep work on Design Homepage UI. Keep 11:00 AM for Authentication, and reserve the afternoon for your Team Meeting and follow-ups.' };
  }

  if (normalizedPrompt.includes('next')) {
    return { text: 'Start with Design Homepage UI. It is the highest-impact task and gives you a clear foundation before you move to Authentication.' };
  }

  if (normalizedPrompt.includes('workload') || normalizedPrompt.includes('summar')) {
    return { text: 'Your workload is manageable: two focused build tasks and one meeting. Complete the design task before lunch to protect your most productive hours.' };
  }

  return { text: 'I recommend starting with Design Homepage UI, then completing Authentication, and finishing with your Team Meeting. Want me to turn that into a time-blocked schedule?' };
};

export function LoopAIFeatures() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', sender: 'ai', text: 'Hi Dike!\n\nHow can I help today?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (prompt?: string) => {
    const message = (prompt ?? input).trim();
    if (!message) return;

    setMessages(current => [
      ...current,
      { id: `user-${Date.now()}`, sender: 'user', text: message },
      { id: `ai-${Date.now()}`, sender: 'ai', ...getCoachResponse(message) },
    ]);
    setInput('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_270px]">
    <section className="relative isolate flex min-h-[620px] flex-col overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/45 dark:border-white/[0.08] dark:bg-white/[0.015]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="ai-assistant-orb absolute -left-16 top-16 h-56 w-56 rounded-full bg-brand-400/15 blur-3xl" />
        <span className="ai-assistant-orb-delayed absolute bottom-0 right-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <span className="absolute inset-0 bg-[linear-gradient(rgba(108,76,253,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(108,76,253,0.035)_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-60" />
      </div>
      <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/40 px-5 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02] sm:px-6">
        <div className="flex items-center gap-3"><Image src="/loop icon.png" alt="LOOP AI" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover shadow-lg shadow-brand-500/20" priority/><div><h2 className="section-title">LOOP AI</h2><p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Your productivity coach</p></div></div>
        <span className="hidden rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 sm:inline-flex">AI assistant</span>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
        {messages.map(message => <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
          {message.sender === 'ai' && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10"><Bot size={16}/></span>}
          <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 backdrop-blur-sm ${message.sender === 'user' ? 'rounded-tr-sm bg-brand-500 text-white shadow-lg shadow-brand-500/15' : 'rounded-tl-sm border border-slate-200/70 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200'}`}>
            <p className="whitespace-pre-line">{message.text}</p>
            {message.plan && <ol className="mt-3 space-y-2 border-t border-slate-200/80 pt-3 text-[13px] dark:border-white/10">{message.plan.map((step, index) => <li key={step} className="flex items-start gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-600 dark:bg-brand-500/20 dark:text-brand-200">{index + 1}</span><span>{step}</span></li>)}</ol>}
          </div>
        </div>)}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-slate-200/70 bg-white/40 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02] sm:p-5"><div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1.5 shadow-sm transition focus-within:border-brand-400 dark:border-white/10 dark:bg-white/[0.06]"><input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask anything..." className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"/><button type="submit" aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/25 transition hover:bg-brand-600 active:scale-95"><Send size={17}/></button></div><p className="mt-2 px-2 text-[10px] text-slate-400">LOOP AI can help you plan, prioritize, and protect focus time.</p></form>
    </section>

    <aside className="space-y-5"><section className="px-1"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10"><Sparkles size={15}/></span><div><h2 className="section-title">Quick start</h2><p className="section-copy">What would you like to do?</p></div></div><div className="mt-4 space-y-2">{quickActions.map(action => { const Icon = action.icon; return <button key={action.label} onClick={() => sendMessage(action.prompt)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200/70 bg-white/45 p-3 text-left text-xs font-semibold text-slate-600 backdrop-blur-sm transition hover:border-brand-200 hover:bg-brand-50/70 hover:text-brand-600 dark:border-white/10 dark:bg-white/[0.025] dark:text-slate-300 dark:hover:border-brand-500/30 dark:hover:bg-brand-500/10"><Icon size={16} className="text-brand-500"/><span className="flex-1">{action.label}</span><ArrowUpRight size={14} className="text-slate-400"/></button>})}</div></section><section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 p-5 text-white shadow-lg shadow-brand-500/20"><span className="ai-assistant-orb absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl"/><ClipboardList size={19} className="relative text-white/80"/><p className="relative mt-4 text-sm font-bold">Today&apos;s focus</p><p className="relative mt-1 text-xs leading-5 text-white/75">You have 2 key tasks and 1 meeting. Ask LOOP AI to create a schedule.</p><button onClick={() => sendMessage('Plan my day')} className="relative mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-xs font-bold transition hover:bg-white/25">Create my plan <ArrowUpRight size={14}/></button></section></aside>
  </div>;
}
