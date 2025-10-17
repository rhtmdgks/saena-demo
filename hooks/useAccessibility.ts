"use client"

import { useEffect, useState } from 'react';

interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
  prefersContrast: 'more' | 'less' | 'no-preference';
}

/**
 * Hook to detect user accessibility preferences
 */
export function useAccessibility(): AccessibilityPreferences {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersColorScheme: 'no-preference',
    prefersContrast: 'no-preference',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPreferences((prev) => ({
      ...prev,
      prefersReducedMotion: reducedMotionQuery.matches,
    }));

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPreferences((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }));
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Check color scheme preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    const updateColorScheme = () => {
      if (darkModeQuery.matches) {
        setPreferences((prev) => ({ ...prev, prefersColorScheme: 'dark' }));
      } else if (lightModeQuery.matches) {
        setPreferences((prev) => ({ ...prev, prefersColorScheme: 'light' }));
      } else {
        setPreferences((prev) => ({ ...prev, prefersColorScheme: 'no-preference' }));
      }
    };

    updateColorScheme();
    darkModeQuery.addEventListener('change', updateColorScheme);
    lightModeQuery.addEventListener('change', updateColorScheme);

    // Check contrast preference
    const moreContrastQuery = window.matchMedia('(prefers-contrast: more)');
    const lessContrastQuery = window.matchMedia('(prefers-contrast: less)');

    const updateContrast = () => {
      if (moreContrastQuery.matches) {
        setPreferences((prev) => ({ ...prev, prefersContrast: 'more' }));
      } else if (lessContrastQuery.matches) {
        setPreferences((prev) => ({ ...prev, prefersContrast: 'less' }));
      } else {
        setPreferences((prev) => ({ ...prev, prefersContrast: 'no-preference' }));
      }
    };

    updateContrast();
    moreContrastQuery.addEventListener('change', updateContrast);
    lessContrastQuery.addEventListener('change', updateContrast);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      darkModeQuery.removeEventListener('change', updateColorScheme);
      lightModeQuery.removeEventListener('change', updateColorScheme);
      moreContrastQuery.removeEventListener('change', updateContrast);
      lessContrastQuery.removeEventListener('change', updateContrast);
    };
  }, []);

  return preferences;
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
