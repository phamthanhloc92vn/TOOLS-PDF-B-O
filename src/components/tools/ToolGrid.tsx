'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Edit, FileImage, FileOutput, FolderOpen, Settings, ShieldCheck } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool';
import { CATEGORY_COLORS } from '@/config/category-colors';
import { ToolCard } from './ToolCard';

const categoryIcons: Record<ToolCategory, typeof Edit> = {
  'edit-annotate': Edit,
  'convert-to-pdf': FileImage,
  'convert-from-pdf': FileOutput,
  'organize-manage': FolderOpen,
  'optimize-repair': Settings,
  'secure-pdf': ShieldCheck,
};

export interface ToolGridProps {
  /** Array of tools to display */
  tools: Tool[];
  /** Current locale for URL generation */
  locale: string;
  /** Optional category filter */
  category?: ToolCategory;
  /** Optional search query to filter tools */
  searchQuery?: string;
  /** Whether to show category headers */
  showCategoryHeaders?: boolean;
  /** Optional additional CSS classes */
  className?: string;
  /** localized tool content */
  localizedToolContent?: Record<string, { title: string; description: string }>;
}

/**
 * ToolGrid component displays a responsive grid of tool cards.
 * Supports filtering by category and responsive layout (1-4 columns).
 * 
 * Requirements: 6.1 - Organize tools into 7 categories
 * Requirements: 6.4 - Responsive grid layout adapting to screen sizes
 */
export function ToolGrid({
  tools,
  locale,
  category,
  searchQuery,
  showCategoryHeaders = false,
  className = '',
  localizedToolContent,
}: ToolGridProps) {
  const t = useTranslations();

  const categoryTranslationKeys: Record<ToolCategory, string> = {
    'edit-annotate': 'editAnnotate',
    'convert-to-pdf': 'convertToPdf',
    'convert-from-pdf': 'convertFromPdf',
    'organize-manage': 'organizeManage',
    'optimize-repair': 'optimizeRepair',
    'secure-pdf': 'securePdf',
  };

  // Filter tools by category if specified
  const filteredTools = useMemo(() => {
    let result = tools;

    if (category) {
      result = result.filter(tool => tool.category === category);
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(tool => {
        // Search in localized content if available
        if (localizedToolContent && localizedToolContent[tool.id]) {
          const { title, description } = localizedToolContent[tool.id];
          if (title.toLowerCase().includes(query) || description.toLowerCase().includes(query)) {
            return true;
          }
        }

        const toolName = tool.id.replace(/-/g, ' ').toLowerCase();
        const features = tool.features.map(f => f.replace(/-/g, ' ').toLowerCase()).join(' ');
        return toolName.includes(query) || features.includes(query);
      });
    }

    return result;
  }, [tools, category, searchQuery, localizedToolContent]);

  // Group tools by category if showing headers
  const groupedTools = useMemo(() => {
    if (!showCategoryHeaders) {
      return null;
    }

    const groups: Record<ToolCategory, Tool[]> = {
      'edit-annotate': [],
      'convert-to-pdf': [],
      'convert-from-pdf': [],
      'organize-manage': [],
      'optimize-repair': [],
      'secure-pdf': [],
    };

    for (const tool of filteredTools) {
      groups[tool.category].push(tool);
    }

    return groups;
  }, [filteredTools, showCategoryHeaders]);

  if (filteredTools.length === 0) {
    return (
      <div
        className={`text-center py-12 ${className}`}
        data-testid="tool-grid-empty"
      >
        <p className="text-[hsl(var(--color-muted-foreground))]">
          No tools found
        </p>
      </div>
    );
  }

  // Render grouped by category
  if (showCategoryHeaders && groupedTools) {
    return (
      <div className={`space-y-8 ${className}`} data-testid="tool-grid">
        {Object.entries(groupedTools).map(([cat, categoryTools]) => {
          if (categoryTools.length === 0) return null;

          const categoryKey = categoryTranslationKeys[cat as ToolCategory];
          const categoryName = t(`home.categories.${categoryKey}`);
          const colors = CATEGORY_COLORS[cat as ToolCategory];
          const Icon = categoryIcons[cat as ToolCategory];

          return (
            <section
              key={cat}
              id={`category-${cat}`}
              className={`scroll-mt-40 rounded-2xl border border-[hsl(var(--color-border))] p-5 md:p-6 ${colors.soft}`}
              data-testid={`tool-grid-category-${cat}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`} aria-hidden="true">
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-[hsl(var(--color-foreground))] flex items-center gap-2">
                    {categoryName}
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${colors.badge}`}>
                      {categoryTools.length}
                    </span>
                  </h2>
                  <p className="text-sm text-[hsl(var(--color-muted-foreground))] truncate">
                    {t(`home.categoriesDescription.${categoryKey}`)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    locale={locale}
                    localizedContent={localizedToolContent?.[tool.id]}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  // Render flat grid
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
      data-testid="tool-grid"
    >
      {filteredTools.map(tool => (
        <ToolCard
          key={tool.id}
          tool={tool}
          locale={locale}
          localizedContent={localizedToolContent?.[tool.id]}
        />
      ))}
    </div>
  );
}

export default ToolGrid;
