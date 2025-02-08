/**
 * CurrencyInput.tsx
 * A specialized input component for currency values with proper formatting and validation.
 * Supports multiple currency formats and locales.
 */

'use client';

import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
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
  currency?: string;
  locale?: string;
  allowNegative?: boolean;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
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
      currency = 'USD',
      locale = 'en-US',
      allowNegative = false,
      min,
      max,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const inputId = providedId || `currency-input-${uniqueId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Format currency for display
    const formatCurrency = React.useCallback(
      (amount: number) => {
        try {
          return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(amount);
        } catch (error) {
          console.error('Currency formatting error:', error);
          return amount.toFixed(2);
        }
      },
      [currency, locale]
    );

    // Parse currency string to number
    const parseCurrency = (value: string): number => {
      // Remove currency symbols, spaces, and commas
      const cleanValue = value.replace(/[^0-9.-]/g, '');
      return parseFloat(cleanValue);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      // Handle empty input
      if (!rawValue) {
        onChange('');
        return;
      }

      // Parse the value
      let parsedValue = parseCurrency(rawValue);

      // Handle invalid numbers
      if (isNaN(parsedValue)) {
        return;
      }

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

      // Round to 2 decimal places
      parsedValue = Number(parsedValue.toFixed(2));
      onChange(parsedValue);
    };

    // Format display value
    const displayValue = React.useMemo(() => {
      if (value === '') return '';
      if (typeof value !== 'number') return '';
      return formatCurrency(value);
    }, [value, formatCurrency]);

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
      <ComponentErrorBoundary componentName="CurrencyInput">
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

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
