/**
 * Calendar.tsx
 * A calendar component for date selection with month navigation and date grid.
 * Supports keyboard navigation and accessibility features.
 */

'use client';

import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
  subMonths,
} from 'date-fns';
import React from 'react';
import { ComponentErrorBoundary } from '../../ErrorBoundary';

interface CalendarProps {
  value?: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(value || new Date());
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // Generate calendar grid
  const generateCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = startOfMonth(currentMonth);
    const startingDayIndex = getDay(firstDayOfMonth);
    const daysInMonth = getDaysInMonth(currentMonth);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      days.push(date);
    }

    return days;
  };

  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    if (!date) return true;
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;
    return disabledDates.some((disabledDate) => isSameDay(date, disabledDate));
  };

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isDateDisabled(date)) {
        onChange(date);
      }
    }
  };

  return (
    <ComponentErrorBoundary componentName="Calendar">
      <div
        ref={calendarRef}
        className="p-4"
        role="application"
        aria-label="Calendar"
      >
        {/* Header with month navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Previous month"
          >
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Next month"
          >
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Days of week header */}
        <div
          className="grid grid-cols-7 gap-1 mb-2"
          role="row"
        >
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500"
              role="columnheader"
              aria-label={day}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          className="grid grid-cols-7 gap-1"
          role="grid"
        >
          {generateCalendarDays().map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-10"
                  role="gridcell"
                />
              );
            }

            const isSelected = value ? isSameDay(date, value) : false;
            const isDisabled = isDateDisabled(date);
            const isTodayDate = isToday(date);

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => !isDisabled && onChange(date)}
                onKeyDown={(e) => handleKeyDown(e, date)}
                disabled={isDisabled}
                className={`
                  h-10 w-full rounded-full
                  flex items-center justify-center
                  text-sm focus:outline-none focus:ring-2 focus:ring-primary-500
                  ${isSelected
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : isDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${isTodayDate && !isSelected ? 'border border-primary-600' : ''}
                `}
                aria-label={format(date, 'PPPP')}
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                role="gridcell"
                tabIndex={0}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    </ComponentErrorBoundary>
  );
};
