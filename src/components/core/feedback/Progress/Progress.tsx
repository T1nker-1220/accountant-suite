"use client";

import { cn } from "@/lib/utils";

export type ProgressVariant = "primary" | "secondary";
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  className?: string;
}

/**
 * Progress component for showing task completion
 * Features:
 * - Determinate and indeterminate states
 * - Different sizes and variants
 * - Accessible progress indicator
 * - Optional value display
 * - Customizable via className
 */
export const Progress = ({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  label,
  showValue = false,
  className,
}: ProgressProps) => {
  // Calculate percentage
  const percentage = value != null ? Math.round((value / max) * 100) : null;

  // Size variants
  const sizeStyles = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  // Color variants
  const variantStyles = {
    primary: "bg-indigo-500",
    secondary: "bg-slate-500",
  };

  // Background styles
  const bgStyles = {
    primary: "bg-indigo-100",
    secondary: "bg-slate-100",
  };

  return (
    <div className="w-full">
      {(label || (showValue && percentage != null)) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && <span>{label}</span>}
          {showValue && percentage != null && (
            <span>{percentage}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value ?? undefined}
        aria-label={label}
        className={cn(
          "overflow-hidden rounded-full",
          bgStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-300",
            variantStyles[variant],
            {
              "animate-indeterminate w-full": percentage == null,
              "w-0": percentage === 0,
            }
          )}
          style={{
            width: percentage != null ? `${percentage}%` : undefined,
          }}
        />
      </div>
    </div>
  );
};
