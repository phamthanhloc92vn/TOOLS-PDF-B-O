'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';

const QUICK_LOCALES: { value: Locale; label: string; title: string }[] = [
  { value: 'vi', label: 'VI', title: 'Tiếng Việt' },
  { value: 'en', label: 'EN', title: 'English' },
];

export interface QuickLanguageToggleProps {
  locale: Locale;
  className?: string;
}

/**
 * Compact VI / EN segmented switch for the header.
 * The full language list stays in the footer.
 */
export const QuickLanguageToggle: React.FC<QuickLanguageToggleProps> = ({ locale, className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    saveLanguagePreference(newLocale);
    router.push(getLocalizedPath(pathname, newLocale));
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center p-0.5 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted)/0.6)] ${className}`}
    >
      {QUICK_LOCALES.map((item) => {
        const isActive = item.value === locale;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => handleChange(item.value)}
            aria-pressed={isActive}
            title={item.title}
            lang={item.value}
            className={`px-2.5 h-7 text-xs font-semibold rounded-md transition-all duration-200 ${
              isActive
                ? 'bg-[hsl(var(--color-card))] text-[hsl(var(--color-foreground))] shadow-sm'
                : 'text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default QuickLanguageToggle;
