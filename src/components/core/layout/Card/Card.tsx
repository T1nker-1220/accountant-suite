/**
 * Card.tsx
 * A flexible and accessible card component that serves as a container for content with optional header, footer, and hover effects.
 * Features:
 * - Fully accessible with ARIA roles and keyboard navigation
 * - Configurable padding, hover effects, and borders
 * - Optional clickable behavior with proper focus management
 * - Responsive design with customizable width
 */

import { cn } from '@/lib/utils';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Whether the card should have hover effects */
  hoverable?: boolean;
  /** Whether the card should be clickable */
  clickable?: boolean;
  /** Whether to show a border around the card */
  bordered?: boolean;
  /** Custom padding for the card content */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Whether to show a shadow effect */
  shadowed?: boolean;
  /** Optional click handler for clickable cards */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Optional keyboard handler for accessibility */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  /** The content of the card */
  children: React.ReactNode;
}

/**
 * Card component that wraps content in a styled container with optional interactivity
 * @param props CardProps - The props for the Card component
 * @returns JSX.Element - The rendered Card component
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverable = false,
      clickable = false,
      bordered = true,
      padding = 'medium',
      shadowed = true,
      onClick,
      onKeyDown,
      children,
      ...props
    },
    ref
  ) => {
    // Handle keyboard events for accessibility
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
      onKeyDown?.(event);
    };

    // Define padding classes based on the padding prop
    const paddingClasses = {
      none: 'p-0',
      small: 'p-2',
      medium: 'p-4',
      large: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-white dark:bg-gray-800',
          paddingClasses[padding],
          bordered && 'border border-gray-200 dark:border-gray-700',
          shadowed && 'shadow-sm',
          hoverable && 'transition-shadow duration-200 hover:shadow-md',
          clickable && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500',
          className
        )}
        role={clickable ? 'button' : 'article'}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        aria-disabled={!clickable && onClick !== undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Add display name for better debugging
Card.displayName = 'Card';

export default Card;
