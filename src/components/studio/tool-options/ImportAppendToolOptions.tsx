'use client';

import React from 'react';
import {
  FileText,
  FileCode,
  Mail,
  BookOpen,
  Image,
  Palette,
} from 'lucide-react';

interface ImportAppendToolOptionsProps {
  toolId: string;
  options: Record<string, any>;
  onChange: (key: string, value: any) => void;
  locale?: string;
}

export function ImportAppendToolOptions({
  toolId,
  options,
  onChange,
  locale = 'en',
}: ImportAppendToolOptionsProps) {
  const validLocale = (locale as string) || 'en';
  const isZh = validLocale.toLowerCase().startsWith('zh');

  switch (toolId) {
    case 'json-to-pdf': {
      const pageSize = options.pageSize || 'A4';
      const fontSize = options.fontSize ?? 11;
      const indentSpaces = options.indentSpaces ?? 2;
      const showLineNumbers = options.showLineNumbers ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {isZh ? 'JSON 结构体转 PDF 参数' : 'JSON to PDF Settings'}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '字号 (pt)' : 'Font Size'}</label>
                <input
                  type="number"
                  min="8"
                  max="18"
                  value={fontSize}
                  onChange={(e) => onChange('fontSize', parseInt(e.target.value) || 11)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '缩进空格数' : 'Indent Spaces'}</label>
                <select
                  value={indentSpaces}
                  onChange={(e) => onChange('indentSpaces', parseInt(e.target.value) || 2)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={2}>{isZh ? '2 空格' : '2 Spaces'}</option>
                  <option value={4}>{isZh ? '4 空格' : '4 Spaces'}</option>
                </select>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span>{isZh ? '在左侧显示行号' : 'Show Line Numbers'}</span>
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => onChange('showLineNumbers', e.target.checked)}
                className="w-4 h-4 rounded text-primary"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'txt-to-pdf': {
      const fontSize = options.fontSize ?? 12;
      const lineHeight = options.lineHeight ?? 1.5;
      const fontId = options.fontId || 'helvetica';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {isZh ? '纯文本 TXT 排版参数' : 'Text to PDF Settings'}
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '字号 (pt)' : 'Font Size'}</label>
                <input
                  type="number"
                  min="9"
                  max="20"
                  value={fontSize}
                  onChange={(e) => onChange('fontSize', parseInt(e.target.value) || 12)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '行间距倍率' : 'Line Height'}</label>
                <select
                  value={lineHeight}
                  onChange={(e) => onChange('lineHeight', parseFloat(e.target.value) || 1.5)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                >
                  <option value={1.2}>{isZh ? '1.2 倍紧凑' : '1.2x Compact'}</option>
                  <option value={1.5}>{isZh ? '1.5 倍标准' : '1.5x Normal'}</option>
                  <option value={1.8}>{isZh ? '1.8 倍宽松' : '1.8x Relaxed'}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'psd-to-pdf': {
      const margin = options.margin ?? 36;
      const centerImage = options.centerImage ?? true;
      const scaleToFit = options.scaleToFit ?? true;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {isZh ? 'Photoshop PSD 转 PDF' : 'PSD to PDF Settings'}
            </label>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>{isZh ? '页边距留白' : 'Margin'}</span>
                <span className="font-semibold text-primary">{margin} pt</span>
              </div>
              <input
                type="range"
                min="0"
                max="72"
                value={margin}
                onChange={(e) => onChange('margin', parseInt(e.target.value) || 0)}
                className="w-full accent-primary"
              />
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{isZh ? '画板内容居中对齐' : 'Center Image'}</span>
                <input
                  type="checkbox"
                  checked={centerImage}
                  onChange={(e) => onChange('centerImage', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{isZh ? '自动缩放适应纸张大小' : 'Scale to Fit'}</span>
                <input
                  type="checkbox"
                  checked={scaleToFit}
                  onChange={(e) => onChange('scaleToFit', e.target.checked)}
                  className="w-4 h-4 rounded text-primary"
                />
              </label>
            </div>
          </div>
        </div>
      );
    }

    case 'add-attachments': {
      const attachmentLevel = options.attachmentLevel || 'document';
      const targetPage = options.targetPage ?? 1;
      const description = options.description || '';

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {isZh ? '添加附件嵌入参数' : 'Add Attachments Settings'}
            </label>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '嵌入层级' : 'Attachment Level'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'document', label: isZh ? '整篇文档级附件' : 'Document-Level' },
                    { id: 'page', label: isZh ? '特定页面关联附件' : 'Page-Level' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => onChange('attachmentLevel', l.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                        attachmentLevel === l.id
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {attachmentLevel === 'page' && (
                <div>
                  <label className="text-muted-foreground block mb-1">{isZh ? '绑定目标页码' : 'Target Page Number'}</label>
                  <input
                    type="number"
                    min="1"
                    value={targetPage}
                    onChange={(e) => onChange('targetPage', parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                  />
                </div>
              )}

              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '附件说明备注 (可选)' : 'Description (Optional)'}</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => onChange('description', e.target.value)}
                  placeholder={isZh ? '如 附件证明资料、原始数据表' : 'e.g. Supporting documents, raw spreadsheet'}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'edit-attachments': {
      const action = options.action || 'view-delete';
      const removeAll = options.removeAll ?? false;

      return (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              {isZh ? '管理与编辑附件选项' : 'Manage Attachments Settings'}
            </label>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-muted-foreground block mb-1">{isZh ? '操作类型' : 'Action Type'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'view-delete', label: isZh ? '查看并按需删除' : 'View & Delete' },
                    { id: 'purge-all', label: isZh ? '一键清空全部附件' : 'Purge All' },
                  ].map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        onChange('action', a.id);
                        if (a.id === 'purge-all') onChange('removeAll', true);
                      }}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                        action === a.id
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {action === 'view-delete' && (
                <label className="flex items-center justify-between p-2 rounded-lg border border-border/50 hover:bg-muted/40 cursor-pointer pt-1">
                  <span>{isZh ? '彻底抹除所有已内嵌附件' : 'Purge All Embedded Attachments'}</span>
                  <input
                    type="checkbox"
                    checked={removeAll}
                    onChange={(e) => onChange('removeAll', e.target.checked)}
                    className="rounded text-primary accent-primary"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
