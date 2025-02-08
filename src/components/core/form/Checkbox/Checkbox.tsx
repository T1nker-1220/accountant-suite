/**
 * Checkbox.tsx
 * A reusable checkbox component with comprehensive accessibility features.
 * Supports indeterminate state, custom labels, and error states.
 */

'use client';

import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';

type BaseCheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>;

interface CheckboxProps extends BaseCheckboxProps {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
  variant?: 'default' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  labelClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      indeterminate = false,
      variant = 'default',
      size = 'md',
      disabled = false,
      required = false,
      className = '',
      containerClassName = '',
      labelClassName = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const checkboxId = providedId || `checkbox-${uniqueId}`;
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    // Handle indeterminate state
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Merge external and internal refs using the utility function
    const mergedRef = mergeRefs(internalRef, ref);

    // Size styles
    const sizeStyles = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const labelSizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    // Base styles
    const containerStyles = `
      relative flex items-start
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${variant === 'bordered' ? 'p-4 border rounded-lg' : ''}
      ${error ? 'border-red-500' : variant === 'bordered' ? 'border-gray-200' : ''}
      ${containerClassName}
    `;

    const checkboxStyles = `
      ${sizeStyles[size]}
      rounded
      border-gray-300
      text-primary-600
      focus:ring-primary-500
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${error ? 'border-red-500' : ''}
      ${className}
    `;

    const labelStyles = `
      ml-3 ${labelSizeStyles[size]}
      ${disabled ? 'text-gray-400' : 'text-gray-700'}
      ${labelClassName}
    `;

    return (
      <ComponentErrorBoundary componentName="Checkbox">
        <div className={containerStyles}>
          <div className="flex items-center h-5">
            <input
              ref={mergedRef}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              required={required}
              aria-invalid={!!error}
              aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
              className={checkboxStyles}
              {...props}
            />
          </div>
          {label && (
            <div className="ml-3">
              <label
                htmlFor={checkboxId}
                className={labelStyles}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {/* Error Message */}
              {error && (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {error}
                </p>
              )}

              {/* Helper Text */}
              {helperText && !error && (
                <p
                  id={helperId}
                  className="mt-1 text-sm text-gray-500"
                >
                  {helperText}
                </p>
              )}
            </div>
          )}
        </div>
      </ComponentErrorBoundary>
    );
  }
);

// Utility function to merge refs
const mergeRefs = <T extends any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | null>
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
