/**
 * Stack Component
 *
 * A flexible layout component that arranges its children in a vertical or horizontal stack
 * with consistent spacing and alignment options. Built with accessibility and responsive
 * design in mind.
 *
 * @features
 * - Vertical or horizontal layout
 * - Configurable spacing
 * - Responsive gap control
 * - Flexible alignment options
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Stack direction="vertical" spacing="medium">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 * ```
 */

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

// Types for component props
export type StackDirection = "vertical" | "horizontal"
export type StackSpacing = "none" | "small" | "medium" | "large"
export type StackAlignment = "start" | "center" | "end" | "stretch"

// Spacing values in Tailwind classes
const spacingClasses: Record<StackSpacing, string> = {
  none: "gap-0",
  small: "gap-2",
  medium: "gap-4",
  large: "gap-6"
}

// Direction-specific classes
const directionClasses: Record<StackDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row"
}

// Alignment classes
const alignmentClasses: Record<StackAlignment, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
}

export interface StackProps {
  /** The children elements to be stacked */
  children: ReactNode
  /** The direction of the stack - vertical or horizontal */
  direction?: StackDirection
  /** The spacing between stack items */
  spacing?: StackSpacing
  /** The alignment of items along the cross axis */
  alignment?: StackAlignment
  /** Optional className for custom styling */
  className?: string
  /** Optional ARIA label for accessibility */
  "aria-label"?: string
  /** Optional ARIA role override */
  role?: string
}

/**
 * Stack component for arranging elements vertically or horizontally
 * with consistent spacing and alignment.
 */
export const Stack = ({
  children,
  direction = "vertical",
  spacing = "medium",
  alignment = "stretch",
  className,
  "aria-label": ariaLabel,
  role = "group",
  ...props
}: StackProps) => {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={cn(
        "flex w-full",
        directionClasses[direction],
        spacingClasses[spacing],
        alignmentClasses[alignment],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Default export
export default Stack
