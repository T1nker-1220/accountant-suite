"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
  className?: string;
}

/**
 * Toast component for displaying temporary notifications
 * Features:
 * - Accessible notifications using ARIA live region
 * - Auto-dismiss with configurable duration
 * - Different variants for different message types
 * - Smooth animations using Framer Motion
 * - Keyboard accessible close button
 */
export const Toast = ({
  id,
  message,
  variant = "info",
  duration = 5000,
  onClose,
  className,
}: ToastProps) => {
  // Auto-dismiss after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  // Variant-specific styles
  const variantStyles = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-rose-100 border-rose-500 text-rose-800",
    warning: "bg-amber-100 border-amber-500 text-amber-800",
    info: "bg-indigo-100 border-indigo-500 text-indigo-800",
  };

  // Animation variants
  const toastAnimation = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        role="alert"
        aria-live="polite"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={toastAnimation}
        className={cn(
          "fixed bottom-4 right-4 flex items-center gap-2 rounded-lg border p-4 shadow-lg",
          variantStyles[variant],
          className
        )}
      >
        <span className="flex-1">{message}</span>
        <button
          onClick={() => onClose(id)}
          className="rounded-full p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
