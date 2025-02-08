/**
 * Container Component
 *
 * A responsive container component that centers content and maintains consistent
 * max-width and padding across different screen sizes. Built with accessibility
 * and responsive design in mind.
 *
 * @features
 * - Responsive padding
 * - Configurable max-width
 * - Center alignment
 * - Full-width option
 * - Semantic HTML structure
 *
 * @example
 * ```tsx
 * <Container size="medium">
 *   <h1>Page Content</h1>
 *   <p>Some content here...</p>
 * </Container>
 * ```
 */

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

// Types for component props
export type ContainerSize = "small" | "medium" | "large" | "full"

// Max width values in Tailwind classes
const sizeClasses: Record<ContainerSize, string> = {
  small: "max-w-3xl", // 768px
  medium: "max-w-5xl", // 1024px
  large: "max-w-7xl", // 1280px
  full: "max-w-full" // No max width
}

export interface ContainerProps {
  /** The content to be contained */
  children: ReactNode
  /** The maximum width of the container */
  size?: ContainerSize
  /** Optional className for custom styling */
  className?: string
  /** Optional HTML tag override */
  as?: keyof JSX.IntrinsicElements
  /** Optional ARIA label for accessibility */
  "aria-label"?: string
  /** Optional ARIA role override */
  role?: string
}

/**
 * Container component for consistent content width and padding
 * across different screen sizes.
 */
export const Container = ({
  children,
  size = "medium",
  className,
  as: Component = "div",
  "aria-label": ariaLabel,
  role,
  ...props
}: ContainerProps) => {
  return (
    <Component
      role={role}
      aria-label={ariaLabel}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

// Default export
export default Container
