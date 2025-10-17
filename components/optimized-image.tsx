"use client"

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

/**
 * Optimized image component with loading states and error handling
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  showSkeleton = true,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      <Image
        src={currentSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          error && 'grayscale',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

/**
 * Lazy loaded image with intersection observer
 */
export function LazyImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [imgRef, setImgRef] = useState<HTMLDivElement | null>(null);

  useState(() => {
    if (!imgRef || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef);

    return () => observer.disconnect();
  });

  return (
    <div ref={setImgRef} className={className}>
      {isInView ? (
        <OptimizedImage src={src} alt={alt} className={className} {...props} />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
    </div>
  );
}
