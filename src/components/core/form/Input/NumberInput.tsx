/**
 * NumberInput.tsx
 * A specialized input component for numeric values with validation and formatting.
 * Supports decimal places, min/max values, and step controls.
 */

'use client';

import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  containerClassName?: string;
  decimalPlaces?: number;
  allowNegative?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  showControls?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      value,
      onChange,
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
      min,
      max,
      step = 1,
      decimalPlaces = 0,
      allowNegative = true,
      formatOptions,
      showControls = false,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const inputId = providedId || `number-input-${uniqueId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Handle numeric input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      // Handle empty input
      if (!rawValue) {
        onChange('');
        return;
      }

      // Remove non-numeric characters except decimal point and minus sign
      const numericValue = rawValue.replace(/[^\d.-]/g, '');

      // Parse the numeric value
      let parsedValue = parseFloat(numericValue);

      // Apply constraints
      if (!allowNegative) {
        parsedValue = Math.max(0, parsedValue);
      }
      if (typeof min === 'number') {
        parsedValue = Math.max(min, parsedValue);
      }
      if (typeof max === 'number') {
        parsedValue = Math.min(max, parsedValue);
      }

      // Round to specified decimal places
      if (!isNaN(parsedValue)) {
        parsedValue = Number(parsedValue.toFixed(decimalPlaces));
        onChange(parsedValue);
      }
    };

    // Handle increment/decrement
    const handleStep = (direction: 'up' | 'down') => {
      if (typeof value !== 'number') return;

      const stepValue = typeof step === 'number' ? step : parseFloat(step);
      const increment = direction === 'up' ? stepValue : -stepValue;
      let newValue = value + increment;

      // Apply constraints
      if (!allowNegative) {
        newValue = Math.max(0, newValue);
      }
      if (typeof min === 'number') {
        newValue = Math.max(min, newValue);
      }
      if (typeof max === 'number') {
        newValue = Math.min(max, newValue);
      }

      // Round to specified decimal places
      newValue = Number(newValue.toFixed(decimalPlaces));
      onChange(newValue);
    };

    // Format display value
    const displayValue = React.useMemo(() => {
      if (value === '') return '';
      if (typeof value !== 'number') return '';

      if (formatOptions) {
        return new Intl.NumberFormat(undefined, formatOptions).format(value);
      }

      return value.toFixed(decimalPlaces);
    }, [value, decimalPlaces, formatOptions]);

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
      ${endIcon || showControls ? 'pr-10' : ''}
      ${variant === 'outlined' ? 'border-0' : 'border border-gray-300'}
      ${variant === 'filled' ? 'border-0 bg-transparent' : ''}
      ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'}
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-50 disabled:text-gray-500
      ${className}
    `;

    return (
      <ComponentErrorBoundary componentName="NumberInput">
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
              type="text"
              inputMode="decimal"
              id={inputId}
              value={displayValue}
              onChange={handleChange}
              aria-invalid={!!error}
              aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
              disabled={disabled}
              required={required}
              min={min}
              max={max}
              step={step}
              className={inputStyles}
              {...props}
            />

            {/* Step Controls */}
            {showControls && !disabled && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleStep('up')}
                  className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Increment value"
                  tabIndex={-1}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleStep('down')}
                  className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Decrement value"
                  tabIndex={-1}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}

            {/* End Icon (when no controls) */}
            {endIcon && !showControls && (
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

NumberInput.displayName = 'NumberInput';

export default NumberInput;
