'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Zap, Wrench, Lock, PenTool, FileText, CheckCircle2, ShieldCheck, Star, LayoutGrid } from 'lucide-react';
import { getToolIcon } from '@/config/icons';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getAllTools, getToolsByCategory, getPopularTools } from '@/config/tools';
import { type Locale, visibleLocales } from '@/lib/i18n/config';
import { CATEGORY_COLORS } from '@/config/category-colors';

interface HomePageClientProps {
  locale: Locale;
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

export default function HomePageClient({ locale, localizedToolContent }: HomePageClientProps) {
  const t = useTranslations();
  const allTools = getAllTools();
  const popularTools = getPopularTools();

  // Feature highlights (same as before)
  const features = [
    {
      icon: ShieldCheck,
      titleKey: 'home.features.privacy.title',
      descriptionKey: 'home.features.privacy.description',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      icon: Zap,
      titleKey: 'home.features.free.title',
      descriptionKey: 'home.features.free.description',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
      icon: Wrench,
      titleKey: 'home.features.powerful.title',
      descriptionKey: 'home.features.powerful.description',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--color-background))]">
      <Header locale={locale} />

      <main id="main-content" className="flex-1 relative" tabIndex={-1}>
        {/* Hero Section */}
        <section
          className="relative overflow-hidden border-b border-[hsl(var(--color-border))] pt-14 pb-16 lg:pt-20 lg:pb-20"
          aria-labelledby="hero-title"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 -z-10 hero-grid pointer-events-none" aria-hidden="true" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
              <div className="text-center lg:text-left animate-fade-up">
                {/* Hero Title */}
                <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-8 text-[hsl(var(--color-foreground))]">
                  {t('home.hero.title')}{' '}
                  <span className="inline-block align-middle text-[0.55em] font-extrabold px-2.5 py-1 rounded-lg bg-[hsl(var(--color-primary))] text-white tracking-wide">
                    {t('home.hero.highlight')}
                  </span>
                </h1>

                {/* Quick access: most used tools */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 max-w-xl mx-auto lg:mx-0">
                  {popularTools.slice(0, 4).map((tool) => {
                    const ToolIcon = getToolIcon(tool.icon);
                    const colors = CATEGORY_COLORS[tool.category];
                    return (
                      <Link
                        key={tool.id}
                        href={`/${locale}/tools/${tool.slug}`}
                        className={`group flex flex-col items-center gap-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] px-3 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] ${colors.hoverBorder}`}
                      >
                        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.iconBg}`}>
                          <ToolIcon className={`h-[18px] w-[18px] ${colors.text}`} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold text-[hsl(var(--color-foreground))] text-center leading-tight">
                          {localizedToolContent?.[tool.id]?.title ?? tool.id}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                  <Link href={`/${locale}/studio`}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="h-11 px-6 text-base shadow-sm transition-all hover:-translate-y-0.5 gap-2"
                    >
                      <PenTool className="h-4 w-4" aria-hidden="true" />
                      <span>{locale === 'zh' ? '进入 Studio 工作台' : 'Open PDF Studio'}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white leading-none">
                        NEW
                      </span>
                    </Button>
                  </Link>
                  <Link href={`/${locale}/tools`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-11 px-6 text-base transition-all hover:-translate-y-0.5 gap-2 bg-[hsl(var(--color-card))]"
                    >
                      <LayoutGrid className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" aria-hidden="true" />
                      <span>{t('home.hero.cta')}</span>
                    </Button>
                  </Link>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                  <Lock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  <span>{t('common.footer.privacyBadge')}</span>
                </div>
              </div>

              {/* Animated processing illustration */}
              <div className="hidden lg:block animate-fade-up [animation-delay:150ms]" aria-hidden="true">
                <div className="relative mx-auto max-w-md rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] p-6 shadow-[var(--shadow-lg)]">
                  <div className="flex items-center gap-1.5 mb-5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-end justify-center gap-3 mb-6">
                    {['bg-blue-500', 'bg-violet-500', 'bg-emerald-500'].map((c, i) => (
                      <div
                        key={c}
                        className="relative w-20 h-28 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] overflow-hidden animate-doc-float"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      >
                        <div className={`h-1.5 ${c}`} />
                        <div className="p-2 space-y-1.5">
                          <div className="h-1.5 w-10 rounded bg-[hsl(var(--color-border))]" />
                          <div className="h-1.5 w-14 rounded bg-[hsl(var(--color-border))]" />
                          <div className="h-1.5 w-8 rounded bg-[hsl(var(--color-border))]" />
                          <div className="h-1.5 w-12 rounded bg-[hsl(var(--color-border))]" />
                        </div>
                        <div
                          className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-blue-500/15 to-transparent animate-scan"
                          style={{ animationDelay: `${i * 0.4}s` }}
                        />
                        <FileText className="absolute bottom-2 right-2 w-4 h-4 text-[hsl(var(--color-muted-foreground))]" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'merge.pdf', anim: 'animate-progress-a', c: 'bg-blue-500' },
                      { label: 'compress.pdf', anim: 'animate-progress-b', c: 'bg-emerald-500' },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-medium text-[hsl(var(--color-foreground))]">{row.label}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--color-muted))] overflow-hidden">
                          <div className={`h-full rounded-full ${row.c} ${row.anim}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 relative z-20" aria-label="Features">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 flex items-start gap-4 text-left hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all duration-300" hover={false}>
                    <div className={`flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.bg}`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[hsl(var(--color-foreground))] mb-1">
                        {t(feature.titleKey)}
                      </h3>
                      <p className="text-sm text-[hsl(var(--color-muted-foreground))] leading-relaxed">
                        {t(feature.descriptionKey)}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-16 bg-[hsl(var(--color-muted)/0.6)] border-y border-[hsl(var(--color-border))]" aria-labelledby="popular-tools-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--color-primary))]">
                <Star className="h-4 w-4" aria-hidden="true" />
                <span>
                  {t('home.popularTools.badge')}
                </span>
              </div>
              <h2 id="popular-tools-heading" className="text-3xl font-bold text-[hsl(var(--color-foreground))] mb-3">
                {t('home.popularTools.title')}
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] max-w-2xl mx-auto text-base">
                {t('home.popularTools.description')}
              </p>
            </div>
            <ToolGrid
              tools={popularTools}
              locale={locale}
              localizedToolContent={localizedToolContent}
            />
          </div>
        </section>

        <section className={`py-16 ${CATEGORY_COLORS['organize-manage'].soft}`} aria-labelledby="featured-tools-heading">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div className="max-w-2xl">
                <h2 id="featured-tools-heading" className="flex items-center gap-3 text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                  <span className={`w-1 h-7 rounded-full ${CATEGORY_COLORS['organize-manage'].bar}`} aria-hidden="true" />
                  {t(`home.categories.organizeManage`)}
                </h2>
                <p className="text-[hsl(var(--color-muted-foreground))] text-base">
                  {t(`home.categoriesDescription.organizeManage`)}
                </p>
              </div>
              <Link href={`/${locale}/tools`}>
                <Button variant="outline" size="sm" className="group">
                  {t('common.navigation.tools')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </div>
            <ToolGrid
              tools={getToolsByCategory('organize-manage').slice(0, 8)}
              locale={locale}
              localizedToolContent={localizedToolContent}
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16" aria-label="Statistics">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[hsl(var(--color-border))]">
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-foreground))] tabular-nums mb-1">
                  {allTools.length}+
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.pdfTools')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-foreground))] tabular-nums mb-1">
                  100%
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.freeToUse')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-foreground))] tabular-nums mb-1">
                  {visibleLocales.length}
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.languages')}
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(var(--color-foreground))] tabular-nums mb-1">
                  0
                </div>
                <div className="text-xs font-medium text-[hsl(var(--color-muted-foreground))] uppercase tracking-wider">
                  {t('home.stats.filesUploaded')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
