/**
 * Grid.tsx
 * A flexible and responsive grid system component that provides a powerful layout structure.
 * Features:
 * - Responsive grid with customizable columns
 * - Gap control for both rows and columns
 * - Auto-flow direction control
 * - Breakpoint-specific configurations
 * - Accessibility support for grid layout
 */

import { cn } from '@/lib/utils';
import React from 'react';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridGap = 'none' | 'small' | 'medium' | 'large';
type GridFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes to apply to the grid */
  className?: string;
  /** Number of columns at different breakpoints */
  columns?: {
    xs?: GridColumns;
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
    xl?: GridColumns;
  };
  /** Gap between grid items */
  gap?: GridGap;
  /** Grid auto-flow direction */
  flow?: GridFlow;
  /** Whether to center items in the grid */
  center?: boolean;
  /** The content of the grid */
  children: React.ReactNode;
}

/**
 * Grid component that provides a responsive grid layout system
 * @param props GridProps - The props for the Grid component
 * @returns JSX.Element - The rendered Grid component
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
      gap = 'medium',
      flow = 'row',
      center = false,
      children,
      ...props
    },
    ref
  ) => {
    // Define gap classes based on the gap prop
    const gapClasses = {
      none: 'gap-0',
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-6',
    };

    // Define column classes for different breakpoints
    const getColumnClass = (breakpoint: keyof typeof columns, cols?: GridColumns) => {
      if (!cols) return '';
      return {
        xs: `grid-cols-${cols}`,
        sm: `sm:grid-cols-${cols}`,
        md: `md:grid-cols-${cols}`,
        lg: `lg:grid-cols-${cols}`,
        xl: `xl:grid-cols-${cols}`,
      }[breakpoint];
    };

    // Generate responsive column classes
    const columnClasses = Object.entries(columns)
      .map(([breakpoint, cols]) => getColumnClass(breakpoint as keyof typeof columns, cols))
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          columnClasses,
          gapClasses[gap],
          flow && `grid-flow-${flow}`,
          center && 'place-items-center',
          className
        )}
        role="grid"
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Add display name for better debugging
Grid.displayName = 'Grid';

export default Grid;
