'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SimpleCounter from './SimpleCounter';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minDuration?: number;
}

export function LoadingScreen({ onLoadingComplete, minDuration = 2000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  // Preload and optimize resources
  const preloadResources = useCallback(async () => {
    const tasks: Promise<void>[] = [];

    // 1. Preload fonts
    if (document.fonts) {
      tasks.push(document.fonts.ready.then(() => {}));
    }

    // 2. Preload critical images
    const criticalImages = document.querySelectorAll('img[loading="eager"], img:not([loading])');
    criticalImages.forEach((img) => {
      if (img instanceof HTMLImageElement && !img.complete) {
        tasks.push(
          new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
        );
      }
    });

    // 3. Wait for DOM to be fully interactive
    if (document.readyState !== 'complete') {
      tasks.push(
        new Promise((resolve) => {
          window.addEventListener('load', () => resolve(), { once: true });
        })
      );
    }

    // 4. Preload critical CSS and scripts
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
      if (link instanceof HTMLLinkElement) {
        tasks.push(
          new Promise((resolve) => {
            if (link.sheet) {
              resolve();
            } else {
              link.onload = () => resolve();
              link.onerror = () => resolve();
            }
          })
        );
      }
    });

    // 5. Initialize heavy components in background
    tasks.push(
      new Promise((resolve) => {
        requestIdleCallback(
          () => {
            // Force browser to parse and compile heavy scripts
            const scripts = document.querySelectorAll('script[type="module"]');
            scripts.forEach((script) => {
              if (script instanceof HTMLScriptElement) {
                // Trigger script evaluation
                void script.src;
              }
            });
            resolve();
          },
          { timeout: 1000 }
        );
      })
    );

    // 6. Warm up animations and transitions
    tasks.push(
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Double RAF ensures paint is complete
            resolve();
          });
        });
      })
    );

    // 7. Allow browser to settle and optimize
    tasks.push(
      new Promise((resolve) => {
        setTimeout(() => resolve(), 100);
      })
    );

    await Promise.all(tasks);
    
    // Final optimization: trigger garbage collection hint
    if ('gc' in window && typeof (window as any).gc === 'function') {
      try {
        (window as any).gc();
      } catch (e) {
        // GC not available, that's fine
      }
    }
    
    setResourcesLoaded(true);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    let isActive = true;

    // Start preloading resources
    preloadResources();

    const updateProgress = () => {
      if (!isActive) return;

      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / minDuration) * 100, 100);
      
      // Clamp progress to exactly 0-100
      const newProgress = Math.max(0, Math.min(Math.floor(timeProgress), 100));
      
      setProgress(newProgress);

      // Only complete when both time and resources are ready
      if (newProgress >= 100 && resourcesLoaded) {
        // Wait 0.5 seconds after reaching 100
        setTimeout(() => {
          if (isActive) {
            setIsComplete(true);
            onLoadingComplete?.();
          }
        }, 500);
      } else {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      isActive = false;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [minDuration, onLoadingComplete, resourcesLoaded, preloadResources]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Center loading bar */}
          <div className="absolute left-1/2 top-1/2 w-[400px] max-w-[80vw] -translate-x-1/2 -translate-y-1/2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-800">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Bottom left counter */}
          <div className="absolute bottom-8 left-8">
            <SimpleCounter
              value={progress}
              fontSize={80}
              textColor="white"
              fontWeight={900}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
