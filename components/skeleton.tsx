import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

/**
 * Skeleton component for loading states
 */
export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: 'rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-800",
        variantClasses[variant],
        className
      )}
      style={style}
      {...props}
    />
  )
}

/**
 * Card skeleton for loading card layouts
 */
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-3">
          <Skeleton height={20} width="60%" />
          <Skeleton height={16} width="40%" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton height={12} width="100%" />
        <Skeleton height={12} width="90%" />
        <Skeleton height={12} width="80%" />
      </div>
    </div>
  );
}

/**
 * Table skeleton for loading table layouts
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton width={40} height={40} variant="circular" />
          <div className="flex-1 space-y-2">
            <Skeleton height={16} width="30%" />
            <Skeleton height={12} width="50%" />
          </div>
          <Skeleton width={80} height={32} />
        </div>
      ))}
    </div>
  );
}

/**
 * Text skeleton for loading text content
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? "70%" : "100%"}
        />
      ))}
    </div>
  );
}
