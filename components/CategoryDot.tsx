import { type CSSProperties } from 'react';

export function CategoryDot({ color }: { color: string }) {
  return <i className="h-2.5 w-2.5 rounded-full category-dot" style={{ '--dot-color': color } as CSSProperties} />;
}
