'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export interface ProcessingProgressProps {
  /** Current progress (0-100) */
  progress: number;
  /** Current processing status */
  status: ProcessingStatus;
  /** Current step message */
  message?: string;
  /** Estimated time remaining in seconds */
  estimatedTime?: number;
  /** Custom class name */
  className?: string;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Show estimated time */
  showEstimatedTime?: boolean;
  /** Callback when cancel is clicked */
  onCancel?: () => void;
}

/**
 * ProcessingProgress Component
 * Requirements: 5.3
 * 
 * Displays progress bar with current step and estimated time.
 */
export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  progress,
  status,
  message,
  estimatedTime,
  className = '',
  showPercentage = true,
  showEstimatedTime = true,
  onCancel,
}) => {
  const t = useTranslations('common');

  // Clamp progress between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  // Format estimated time
  const formattedTime = useMemo(() => {
    if (!estimatedTime || estimatedTime <= 0) return null;
    
    if (estimatedTime < 60) {
      return `${Math.ceil(estimatedTime)}s remaining`;
    }
    
    const minutes = Math.floor(estimatedTime / 60);
    const seconds = Math.ceil(estimatedTime % 60);
    
    if (minutes < 60) {
      return `${minutes}m ${seconds}s remaining`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m remaining`;
  }, [estimatedTime]);

  // Get status text
  const statusText = useMemo(() => {
    switch (status) {
      case 'idle':
        return t('status.idle');
      case 'uploading':
        return t('status.uploading');
      case 'processing':
        return t('status.processing');
      case 'complete':
        return t('status.complete');
      case 'error':
        return t('status.error');
      default:
        return '';
    }
  }, [status, t]);

  // Get progress bar color based on status
  const progressBarColor = useMemo(() => {
    switch (status) {
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'uploading':
      case 'processing':
        return 'bg-[hsl(var(--color-primary))]';
      default:
        return 'bg-[hsl(var(--color-muted))]';
    }
  }, [status]);

  // Determine if we should show the cancel button
  const showCancel = onCancel && (status === 'uploading' || status === 'processing');

  // Track previous status for announcements
  const prevStatusRef = useRef(status);
  const announcementRef = useRef<string>('');

  // Update announcement when status changes
  useEffect(() => {
    if (prevStatusRef.current !== status) {
      if (status === 'complete') {
        announcementRef.current = `${statusText}. ${message || ''}`;
      } else if (status === 'error') {
        announcementRef.current = `${statusText}. ${message || ''}`;
      } else if (status === 'processing' || status === 'uploading') {
        announcementRef.current = statusText;
      }
      prevStatusRef.current = status;
    }
  }, [status, statusText, message]);

  // Don't render if idle
  if (status === 'idle') {
    return null;
  }

  return (
    <div
      className={`w-full ${className}`.trim()}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${statusText}: ${clampedProgress}%`}
    >
      {/* Screen reader announcement for status changes */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcementRef.current}
      </div>
      {/* Status and percentage header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Status indicator */}
          {(status === 'uploading' || status === 'processing') && (
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[hsl(var(--color-primary)/0.1)] overflow-hidden" aria-hidden="true">
              <svg className="w-5 h-5 text-[hsl(var(--color-primary))] motion-safe:animate-page-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 3v5h5M9 13h6M9 17h4" />
              </svg>
              <div className="absolute inset-x-0 h-3 bg-gradient-to-b from-transparent via-[hsl(var(--color-primary)/0.35)] to-transparent motion-safe:animate-scan" />
            </div>
          )}
          {status === 'complete' && (
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-500/10 motion-safe:animate-pop-in" aria-hidden="true">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 motion-safe:animate-shake" aria-hidden="true">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}

          {/* Status text */}
          <span className="text-sm font-semibold text-[hsl(var(--color-foreground))]">
            {statusText}
          </span>
        </div>

        {/* Percentage */}
        {showPercentage && (
          <span className="text-sm font-semibold tabular-nums text-[hsl(var(--color-foreground))]">
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-2.5 bg-[hsl(var(--color-muted))] rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-300 ease-out rounded-full ${progressBarColor}`}
          style={{ width: `${clampedProgress}%` }}
        />
        
        {/* Animated shimmer for active states */}
        {(status === 'uploading' || status === 'processing') && clampedProgress < 100 && (
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[hsl(var(--color-primary-foreground)/0.3)] to-transparent motion-safe:animate-shimmer"
            style={{ width: `${clampedProgress}%` }}
          />
        )}

        {/* Indeterminate sweep while no measurable progress yet */}
        {(status === 'uploading' || status === 'processing') && clampedProgress === 0 && (
          <div className="absolute top-0 h-full w-2/5 rounded-full bg-[hsl(var(--color-primary)/0.6)] motion-safe:animate-indeterminate" />
        )}
      </div>

      {/* Message and estimated time */}
      <div className="flex items-center justify-between mt-2">
        {/* Current step message */}
        <p className="text-sm text-[hsl(var(--color-muted-foreground))] truncate flex-1">
          {message || ''}
        </p>

        {/* Estimated time */}
        {showEstimatedTime && formattedTime && (status === 'uploading' || status === 'processing') && (
          <span className="text-xs text-[hsl(var(--color-muted-foreground))] ml-4 whitespace-nowrap">
            {formattedTime}
          </span>
        )}
      </div>

      {/* Cancel button */}
      {showCancel && (
        <div className="mt-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] transition-colors"
            aria-label={t('buttons.cancel')}
          >
            {t('buttons.cancel')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessingProgress;
