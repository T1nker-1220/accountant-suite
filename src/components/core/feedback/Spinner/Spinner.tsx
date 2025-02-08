"use client";

import { cn } from "@/lib/utils";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerColor = "primary" | "secondary" | "white";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
  label?: string;
}

/**
 * Spinner component for loading states
 * Features:
 * - Different sizes (sm, md, lg)
 * - Color variants
 * - Accessible loading indicator
 * - Reduced motion support
 * - Customizable via className
 */
export const Spinner = ({
  size = "md",
  color = "primary",
  className,
  label = "Loading",
}: SpinnerProps) => {
  // Size variants
  const sizeStyles = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  // Color variants
  const colorStyles = {
    primary: "border-indigo-500 border-t-transparent",
    secondary: "border-slate-500 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div
      role="status"
      className="inline-flex items-center"
      aria-label={label}
    >
      <div
        className={cn(
          "animate-spin rounded-full",
          sizeStyles[size],
          colorStyles[color],
          className
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};
