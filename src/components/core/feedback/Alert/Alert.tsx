"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  title?: string;
  children: ReactNode;
  variant?: AlertVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

/**
 * Alert component for displaying important messages
 * Features:
 * - Different variants for different message types
 * - Optional dismissible functionality
 * - Accessible with proper ARIA roles
 * - Customizable via className
 * - Optional title for better context
 */
export const Alert = ({
  title,
  children,
  variant = "info",
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) => {
  // Variant-specific styles
  const variantStyles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-rose-50 border-rose-500 text-rose-800",
    warning: "bg-amber-50 border-amber-500 text-amber-800",
    info: "bg-indigo-50 border-indigo-500 text-indigo-800",
  };

  // Icon styles for focus ring
  const iconStyles = {
    success: "focus:ring-green-500",
    error: "focus:ring-rose-500",
    warning: "focus:ring-amber-500",
    info: "focus:ring-indigo-500",
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative rounded-lg border-l-4 p-4",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {title && (
            <h3 className="mb-1 font-semibold">
              {title}
            </h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              "rounded-full p-1 hover:bg-black/10 focus:outline-none focus:ring-2",
              iconStyles[variant]
            )}
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
