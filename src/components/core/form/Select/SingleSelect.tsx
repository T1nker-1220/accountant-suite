/**
 * SingleSelect.tsx
 * A reusable single-select component with comprehensive accessibility features.
 * Supports search, custom rendering, and keyboard navigation.
 */

'use client';

import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SingleSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  searchable?: boolean;
  clearable?: boolean;
  containerClassName?: string;
  className?: string;
  id?: string;
}

const SingleSelect = React.forwardRef<HTMLDivElement, SingleSelectProps>(
  (
    {
      label,
      value,
      onChange,
      options,
      error,
      helperText,
      placeholder = 'Select an option',
      disabled = false,
      required = false,
      fullWidth = false,
      variant = 'default',
      searchable = false,
      clearable = false,
      containerClassName = '',
      className = '',
      id: providedId,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listboxRef = React.useRef<HTMLUListElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const uniqueId = React.useId();
    const selectId = providedId || `single-select-${uniqueId}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const listboxId = `${selectId}-listbox`;

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchQuery) return options;
      return options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery, searchable]);

    // Get selected option
    const selectedOption = React.useMemo(() => {
      return options.find(option => option.value === value);
    }, [options, value]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            setIsOpen(true);
            e.preventDefault();
          }
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          e.preventDefault();
          break;
        case 'ArrowUp':
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
          }
          e.preventDefault();
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'Tab':
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    };

    // Handle option selection
    const handleOptionSelect = (optionValue: string) => {
      if (disabled) return;
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onChange('');
      setSearchQuery('');
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Focus management
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Scroll highlighted option into view
    React.useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
        const highlightedOption = listboxRef.current.children[highlightedIndex] as HTMLElement;
        if (highlightedOption) {
          highlightedOption.scrollIntoView({
            block: 'nearest',
          });
        }
      }
    }, [isOpen, highlightedIndex]);

    // Base styles
    const containerStyles = `
      relative flex flex-col gap-1
      ${fullWidth ? 'w-full' : 'w-64'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${containerClassName}
    `;

    const triggerStyles = `
      relative flex items-center justify-between
      w-full px-3 py-2 rounded-md
      text-gray-900 bg-white
      ${variant === 'outlined' ? 'border border-gray-300' : ''}
      ${variant === 'filled' ? 'bg-gray-100' : ''}
      ${error ? 'border-red-500' : ''}
      ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
      ${className}
    `;

    const dropdownStyles = `
      absolute z-10 w-full mt-1
      bg-white rounded-md shadow-lg
      border border-gray-200
      max-h-60 overflow-auto
    `;

    return (
      <ComponentErrorBoundary componentName="SingleSelect">
        <div
          ref={mergeRefs(ref, containerRef)}
          className={containerStyles}
        >
          {/* Label */}
          <label
            id={`${selectId}-label`}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {/* Select Trigger */}
          <div
            role="combobox"
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={`${selectId}-label`}
            aria-invalid={!!error}
            aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`}
            tabIndex={disabled ? -1 : 0}
            className={triggerStyles}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div className="flex items-center gap-1">
              {clearable && value && (
                <button
                  type="button"
                  className="p-1 text-gray-400 hover:text-gray-600"
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div className={dropdownStyles}>
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-gray-200">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Options List */}
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-label={label}
                className="py-1"
              >
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    id={`${selectId}-option-${option.value}`}
                    role="option"
                    aria-selected={value === option.value}
                    aria-disabled={option.disabled}
                    className={`
                      px-3 py-2 cursor-pointer
                      ${value === option.value ? 'bg-primary-50 text-primary-900' : 'text-gray-900'}
                      ${highlightedIndex === index ? 'bg-gray-100' : ''}
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                    `}
                    onClick={() => !option.disabled && handleOptionSelect(option.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.label}
                  </li>
                ))}
                {filteredOptions.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    No options found
                  </li>
                )}
              </ul>
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

// Utility function to merge refs
const mergeRefs = <T extends any>(...refs: Array<React.Ref<T>>) => {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = instance;
      }
    });
  };
};

SingleSelect.displayName = 'SingleSelect';

export default SingleSelect;
