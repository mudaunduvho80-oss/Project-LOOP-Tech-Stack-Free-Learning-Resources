'use client';

import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface AISuggestionCardProps {
  onOpenAskLoop: () => void;
}

export const AISuggestionCard: React.FC<AISuggestionCardProps> = ({ onOpenAskLoop }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-purple-600 to-indigo-700 rounded-2xl p-5 lg:p-6 text-white shadow-xl shadow-brand-500/20 flex flex-col justify-between">
      {/* Background Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            AI Insight
          </span>
          <span className="text-[10px] font-semibold text-cyan-200">
            Updated 5m ago
          </span>
        </div>

        <div>
          <h3 className="text-base lg:text-lg font-bold leading-snug flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-300 flex-shrink-0" />
            Optimal Focus Window Detected
          </h3>
          <p className="text-xs lg:text-sm text-purple-100/90 leading-relaxed mt-1.5">
            Your peak productivity hours are between <span className="font-semibold text-white">10:00 AM – 12:00 PM</span>. You have 2 High priority tasks remaining in this window.
          </p>
        </div>
      </div>

      <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/15 mt-3">
        <span className="text-xs text-purple-200 font-medium">
          +18% productivity boost expected
        </span>
        <button
          onClick={onOpenAskLoop}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-brand-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <span>See More Insights</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
