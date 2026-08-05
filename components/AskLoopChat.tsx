'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  User,
  Bot,
  BarChart2,
  CheckCircle2,
  MessageSquare,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const AskLoopChat: React.FC = () => {
  const [messages, setMessages] = useState<
    { id: string; sender: 'user' | 'ai'; text: string; dataPoints?: { label: string; percent: number }[] }[]
  >([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'What are customers and team members complaining about the most this week?',
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: 'Based on analysis from May 12–18, 2026, here are the top productivity bottlenecks and customer feedback themes:',
      dataPoints: [
        { label: '1. Shipping & Delivery Delays', percent: 32 },
        { label: '2. Pricing & Tier Concerns', percent: 24 },
        { label: '3. Customer Support Response Times', percent: 18 },
        { label: '4. Product Quality Bugs', percent: 14 },
        { label: '5. Returns & Refunds Process', percent: 9 },
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');

  const suggestedPrompts = [
    'What are customers complaining about the most?',
    'Summarize my top focus themes',
    'How can I improve my 7-day focus streak?',
    'Generate an executive weekly PDF summary',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const aiMsgId = `ai-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: 'user', text },
    ]);

    if (!textToSend) setInputText('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'ai',
          text: `Here is the AI analysis for "${text}": Your average focus score is 86%, up +14% compared to last week. Completing High Priority tasks before 1:00 PM yields the highest completion rate.`,
          dataPoints: [
            { label: 'High Priority Completion Rate', percent: 92 },
            { label: 'Focus Pomodoro Efficiency', percent: 84 },
            { label: 'Meeting Overlap Reduction', percent: 76 },
          ],
        },
      ]);
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-card-light dark:shadow-none p-5 lg:p-6 flex flex-col h-[650px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 via-purple-500 to-cyan-400 p-[2px] flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-500" />
            </div>
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Ask LOOP AI Assistant
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ask anything about customer feedback, task bottlenecks, or focus analytics
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900">
          GPT-4o Powered
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-brand-500 text-white'
                  : 'bg-gradient-to-tr from-brand-500 to-cyan-400 text-white'
              }`}
            >
              {msg.sender === 'user' ? 'P' : <Sparkles className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs lg:text-sm leading-relaxed space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-brand-500 text-white rounded-tr-none'
                  : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>

              {/* Data Points visualization inside AI bubble */}
              {msg.dataPoints && (
                <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  {msg.dataPoints.map((dp, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-300">
                        <span>{dp.label}</span>
                        <span>{dp.percent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
                          style={{ width: `${dp.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800">
        {suggestedPrompts.map((promptText, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(promptText)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-300 border border-slate-200/60 dark:border-slate-700 transition-colors"
          >
            {promptText}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask LOOP anything about your productivity..."
          className="flex-1 px-4 py-3 bg-slate-100/80 dark:bg-slate-800/60 border border-transparent focus:border-brand-500 rounded-2xl text-xs lg:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all"
        />
        <button
          type="submit"
          className="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl shadow-md shadow-brand-500/25 transition-all active:scale-95 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
