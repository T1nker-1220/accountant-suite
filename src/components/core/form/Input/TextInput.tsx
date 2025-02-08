/**
 * TextInput.tsx
 * A reusable text input component with comprehensive accessibility features.
 * Supports validation states, error messages, and various input types.
 */

'use client';

import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  containerClassName?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      variant = 'default',
      required,
      disabled,
      className = '',
      containerClassName = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const inputId = providedId || `text-input-${uniqueId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Base styles
    const containerStyles = `
      relative flex flex-col gap-1
      ${fullWidth ? 'w-full' : 'w-auto'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${containerClassName}
    `;

    const inputWrapperStyles = `
      relative flex items-center
      ${variant === 'outlined' ? 'border rounded-md' : ''}
      ${variant === 'filled' ? 'bg-gray-100 rounded-md' : ''}
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${disabled ? 'bg-gray-50' : ''}
    `;

    const inputStyles = `
      w-full px-3 py-2 rounded-md
      text-gray-900 placeholder-gray-500
      ${startIcon ? 'pl-10' : ''}
      ${endIcon ? 'pr-10' : ''}
      ${variant === 'outlined' ? 'border-0' : 'border border-gray-300'}
      ${variant === 'filled' ? 'border-0 bg-transparent' : ''}
      ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'}
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-50 disabled:text-gray-500
      ${className}
    `;

    return (
      <ComponentErrorBoundary componentName="TextInput">
        <div className={containerStyles}>
          {/* Label */}
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {/* Input wrapper */}
          <div className={inputWrapperStyles}>
            {/* Start Icon */}
            {startIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {startIcon}
              </div>
            )}

            {/* Input */}
            <input
              ref={ref}
              id={inputId}
              aria-invalid={!!error}
              aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
              disabled={disabled}
              required={required}
              className={inputStyles}
              {...props}
            />

            {/* End Icon */}
            {endIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {endIcon}
              </div>
            )}
          </div>

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
      </ComponentErrorBoundary>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
