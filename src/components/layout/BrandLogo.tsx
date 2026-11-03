import React from 'react';

export interface BrandLogoProps {
  /** Tailwind size classes for the tile, e.g. "h-9 w-9" */
  className?: string;
}

/**
 * PDF-EDIT-1CLICK mark: a page with a folded corner and a lightning bolt
 * (one-click processing) on a solid primary tile.
 */
export function BrandLogo({ className = 'h-9 w-9' }: BrandLogoProps) {
  return (
    <div
      className={`relative flex flex-shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--color-primary))] shadow-sm transition-transform group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <svg className="h-[60%] w-[60%] text-white" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8L14 2.5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M14 2.5V8h5.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12.6 10.5 9.5 15h3l-1.1 3.5 3.6-5h-3l.6-3z" fill="currentColor" />
      </svg>
    </div>
  );
}

export default BrandLogo;
