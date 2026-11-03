import type { ToolCategory } from '@/types/tool';

/**
 * Per-category color tokens (Tailwind classes) so each tool group
 * has its own recognizable tint across cards, badges and sections.
 */
export interface CategoryColor {
  /** Icon tile background */
  iconBg: string;
  /** Icon / accent text color */
  text: string;
  /** Small badge background + text */
  badge: string;
  /** Solid accent (top bar, dots) */
  bar: string;
  /** Soft section / card tint */
  soft: string;
  /** Hover border color */
  hoverBorder: string;
}

export const CATEGORY_COLORS: Record<ToolCategory, CategoryColor> = {
  'edit-annotate': {
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
    bar: 'bg-violet-500',
    soft: 'bg-violet-50/60 dark:bg-violet-500/5',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-500/40',
  },
  'convert-to-pdf': {
    iconBg: 'bg-sky-50 dark:bg-sky-500/10',
    text: 'text-sky-600 dark:text-sky-400',
    badge: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
    bar: 'bg-sky-500',
    soft: 'bg-sky-50/60 dark:bg-sky-500/5',
    hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-500/40',
  },
  'convert-from-pdf': {
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
    bar: 'bg-amber-500',
    soft: 'bg-amber-50/60 dark:bg-amber-500/5',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-500/40',
  },
  'organize-manage': {
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',
    bar: 'bg-blue-600',
    soft: 'bg-blue-50/60 dark:bg-blue-500/5',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-500/40',
  },
  'optimize-repair': {
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
    bar: 'bg-emerald-500',
    soft: 'bg-emerald-50/60 dark:bg-emerald-500/5',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-500/40',
  },
  'secure-pdf': {
    iconBg: 'bg-rose-50 dark:bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
    bar: 'bg-rose-500',
    soft: 'bg-rose-50/60 dark:bg-rose-500/5',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-500/40',
  },
};
