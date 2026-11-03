'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Shield, Lock, FileCheck, Globe, ChevronDown } from 'lucide-react';
import { type Locale, visibleLocales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';
import { BrandLogo } from './BrandLogo';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const footerLinks = [
    { href: `/${locale}/privacy`, label: t('navigation.privacy') },
  ];

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <footer
      className="w-full border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] pt-6 pb-8"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <details className="group/more mb-6">
          <summary className="flex items-center justify-center gap-2 py-2 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden text-sm font-medium text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] transition-colors">
            {locale === 'vi' ? 'Thông tin thêm' : 'More information'}
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open/more:rotate-180" aria-hidden="true" />
          </summary>

          <div className="pt-8 animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-2.5 text-xl font-bold text-[hsl(var(--color-foreground))]"
              aria-label={`${t('brand')} - ${t('navigation.home')}`}
            >
              <BrandLogo className="h-8 w-8" />
              <span className="whitespace-nowrap" data-testid="footer-brand-name">{t('brand')}</span>
            </Link>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed max-w-xs">
              {t('tagline') || 'Professional, secure, and free PDF tools for everyone. No installation required.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-6">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-primary))] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[hsl(var(--color-muted-foreground))] group-hover:bg-[hsl(var(--color-primary))] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Features */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-6">
              Security
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-[hsl(var(--color-success)/0.1)] text-[hsl(var(--color-success))]">
                  <Lock className="h-3 w-3" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">Client-side processing</span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">Files never leave your device</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-[hsl(var(--color-primary)/0.1)] text-[hsl(var(--color-primary))]">
                  <FileCheck className="h-3 w-3" />
                </div>
                <div>
                  <span className="block text-sm font-medium text-[hsl(var(--color-foreground))]">No file uploads</span>
                  <span className="text-xs text-[hsl(var(--color-muted-foreground))]">100% private & secure</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Privacy Badge Block */}
          <div className="flex flex-col justify-start">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[hsl(var(--color-foreground))] mb-6">
              Compliance
            </h3>
            <div
              className="flex items-center gap-3 p-4 bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] rounded-xl shadow-sm"
            >
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--color-success)/0.1)] flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-[hsl(var(--color-success))]" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-bold text-[hsl(var(--color-foreground))]">GDPR Compliant</div>
                <div className="text-xs text-[hsl(var(--color-muted-foreground))]">{t('footer.privacyBadge')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="py-6 border-t border-[hsl(var(--color-border))]">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
            <span className="text-sm font-medium text-[hsl(var(--color-foreground))]">
              {t('buttons.selectLanguage')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(visibleLocales.includes(locale) ? visibleLocales : [...visibleLocales, locale]).map((loc) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`
                    px-3 py-1.5 text-sm rounded-full transition-all
                    ${isActive
                      ? 'bg-[hsl(var(--color-primary))] text-white font-medium'
                      : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-primary)/0.1)] hover:text-[hsl(var(--color-primary))]'
                    }
                  `}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {config.nativeName}
                </button>
              );
            })}
          </div>
        </div>
          </div>
        </details>

        {/* Copyright */}
        <div className="pt-6 border-t border-[hsl(var(--color-border))] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
            &copy; {currentYear} {t('brand')}. {t('footer.copyright', { year: '' }).replace(/^\d{4}\s*/, '')}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/terms`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Terms</Link>
            <Link href={`/${locale}/privacy`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Privacy</Link>
            <Link href={`/${locale}/cookies`} className="text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

