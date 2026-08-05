import { AIAssistant } from '@/components/AIAssistant';

export default function AIAssistantPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-500">Your productivity copilot</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">AI Assistant</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ask about your tasks, focus habits, goals, and workspace activity.</p>
      </section>
      <AIAssistant />
    </div>
  );
}
