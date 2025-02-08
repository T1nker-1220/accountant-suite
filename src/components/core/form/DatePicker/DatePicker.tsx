/**
 * DatePicker.tsx
 * A comprehensive date picker component with accessibility features.
 * Supports single date selection, range selection, and various display formats.
 */

'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { format, isValid, parse } from 'date-fns';
import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';
import { TextInput } from '../Input';
import { Calendar } from './Calendar';

interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showClearButton?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  className?: string;
  containerClassName?: string;
  popperClassName?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      helperText,
      disabled = false,
      required = false,
      placeholder = 'Select date',
      format: dateFormat = 'MM/dd/yyyy',
      minDate,
      maxDate,
      disabledDates = [],
      showClearButton = true,
      variant = 'default',
      className = '',
      containerClassName = '',
      popperClassName = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const uniqueId = React.useId();
    const inputId = `datepicker-${uniqueId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Close calendar when clicking outside
    useClickOutside(containerRef, () => setIsOpen(false));

    // Update input value when value prop changes
    React.useEffect(() => {
      if (value && isValid(value)) {
        setInputValue(format(value, dateFormat));
      } else {
        setInputValue('');
      }
    }, [value, dateFormat]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // Try to parse the input value
      const parsedDate = parse(newValue, dateFormat, new Date());
      if (isValid(parsedDate)) {
        onChange(parsedDate);
      }
    };

    // Handle date selection from calendar
    const handleDateSelect = (date: Date) => {
      onChange(date);
      setIsOpen(false);
    };

    // Handle clear button click
    const handleClear = () => {
      onChange(null);
      setInputValue('');
    };

    // Base styles
    const containerStyles = `
      relative
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${containerClassName}
    `;

    return (
      <ComponentErrorBoundary componentName="DatePicker">
        <div
          ref={containerRef}
          className={containerStyles}
        >
          {/* Label */}
          {label && (
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {/* Input Group */}
          <div className="relative">
            <TextInput
              id={inputId}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              error={error}
              label=""
              variant={variant}
              className={className}
              aria-invalid={!!error}
              aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
            />

            {/* Clear Button */}
            {showClearButton && inputValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear date"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Calendar Popper */}
          {isOpen && !disabled && (
            <div
              className={`
                absolute z-10 mt-1 w-72
                bg-white rounded-lg shadow-lg
                ${popperClassName}
              `}
            >
              <Calendar
                value={value}
                onChange={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
              />
            </div>
          )}

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

DatePicker.displayName = 'DatePicker';

export default DatePicker;
