"use client"

import { useEffect, useState, useSyncExternalStore } from 'react';

interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
  prefersContrast: 'more' | 'less' | 'no-preference';
}

/**
 * Hook to detect user accessibility preferences
 */
const preferenceQueries = [
  '(prefers-reduced-motion: reduce)', '(prefers-color-scheme: dark)',
  '(prefers-color-scheme: light)', '(prefers-contrast: more)', '(prefers-contrast: less)',
];
function subscribePreferences(notify: () => void) {
  const queries = preferenceQueries.map(query => window.matchMedia(query));
  queries.forEach(query => query.addEventListener('change', notify));
  return () => queries.forEach(query => query.removeEventListener('change', notify));
}
function preferencesSnapshot() {
  return preferenceQueries.map(query => window.matchMedia(query).matches ? '1' : '0').join('');
}
export function useAccessibility(): AccessibilityPreferences {
  const snapshot = useSyncExternalStore(subscribePreferences, preferencesSnapshot, () => '00000');
  return {
    prefersReducedMotion: snapshot[0] === '1',
    prefersColorScheme: snapshot[1] === '1' ? 'dark' : snapshot[2] === '1' ? 'light' : 'no-preference',
    prefersContrast: snapshot[3] === '1' ? 'more' : snapshot[4] === '1' ? 'less' : 'no-preference',
  };
}

/**
 * Hook to manage focus trap for modals and dialogs
 */
export function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Trigger close event
        const closeButton = container.querySelector<HTMLElement>('[data-close]');
        closeButton?.click();
      }
    };

    container.addEventListener('keydown', handleTabKey);
    container.addEventListener('keydown', handleEscapeKey);

    // Focus first element when trap activates
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      container.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive, containerRef]);
}

/**
 * Hook to announce messages to screen readers
 */
export function useScreenReaderAnnouncement() {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (!announcement) return;

    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;

    document.body.appendChild(announcer);

    const timeout = setTimeout(() => {
      document.body.removeChild(announcer);
      setAnnouncement('');
    }, 1000);

    return () => {
      clearTimeout(timeout);
      if (document.body.contains(announcer)) {
        document.body.removeChild(announcer);
      }
    };
  }, [announcement]);

  return setAnnouncement;
}
