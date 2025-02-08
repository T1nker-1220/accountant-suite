/**
 * CheckboxGroup.tsx
 * A component for managing multiple checkboxes with shared state.
 * Supports vertical/horizontal layout, select all, and group validation.
 */

'use client';

import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';
import Checkbox from './Checkbox';

interface Option {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  layout?: 'vertical' | 'horizontal';
  showSelectAll?: boolean;
  selectAllLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered';
  className?: string;
  containerClassName?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  value = [],
  onChange,
  options,
  error,
  helperText,
  disabled = false,
  required = false,
  layout = 'vertical',
  showSelectAll = false,
  selectAllLabel = 'Select All',
  size = 'md',
  variant = 'default',
  className = '',
  containerClassName = '',
}) => {
  const uniqueId = React.useId();
  const groupId = `checkbox-group-${uniqueId}`;
  const errorId = `${groupId}-error`;
  const helperId = `${groupId}-helper`;

  // Calculate select all state
  const enabledOptions = options.filter(option => !option.disabled);
  const allEnabled = enabledOptions.length > 0;
  const allSelected = allEnabled && enabledOptions.every(option => value.includes(option.value));
  const someSelected = allEnabled && enabledOptions.some(option => value.includes(option.value));

  // Handle select all
  const handleSelectAll = () => {
    if (disabled) return;

    if (allSelected) {
      // Deselect all enabled options
      onChange(value.filter(v => !enabledOptions.find(opt => opt.value === v)));
    } else {
      // Select all enabled options
      const enabledValues = enabledOptions.map(opt => opt.value);
      const newValue = Array.from(new Set([...value, ...enabledValues]));
      onChange(newValue);
    }
  };

  // Handle individual checkbox change
  const handleChange = (optionValue: string, checked: boolean) => {
    if (disabled) return;

    const newValue = checked
      ? [...value, optionValue]
      : value.filter(v => v !== optionValue);
    onChange(newValue);
  };

  // Base styles
  const containerStyles = `
    flex flex-col gap-2
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${containerClassName}
  `;

  const groupStyles = `
    flex ${layout === 'vertical' ? 'flex-col' : 'flex-wrap'} gap-4
    ${className}
  `;

  return (
    <ComponentErrorBoundary componentName="CheckboxGroup">
      <div
        role="group"
        aria-labelledby={label ? groupId : undefined}
        aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
        className={containerStyles}
      >
        {/* Group Label */}
        {label && (
          <div
            id={groupId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>
        )}

        {/* Select All Checkbox */}
        {showSelectAll && allEnabled && (
          <Checkbox
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
            onChange={e => handleSelectAll()}
            label={selectAllLabel}
            disabled={disabled}
            size={size}
            variant={variant}
          />
        )}

        {/* Checkboxes Group */}
        <div className={groupStyles}>
          {options.map(option => (
            <Checkbox
              key={option.value}
              checked={value.includes(option.value)}
              onChange={e => handleChange(option.value, e.target.checked)}
              label={option.label}
              disabled={disabled || option.disabled}
              size={size}
              variant={variant}
            />
          ))}
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
};

export default CheckboxGroup;
