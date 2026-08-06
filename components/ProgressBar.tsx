import { type CSSProperties } from 'react';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 progress-fill" style={{ '--progress': `${progress}%` } as CSSProperties} />
  );
}
