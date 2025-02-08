/**
 * ErrorFallback.tsx
 * A user-friendly error display component with accessibility features.
 * Used as the default fallback UI for error boundaries.
 */

import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, reset }) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="min-h-[400px] w-full flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-red-100">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Error Icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900" tabIndex={0}>
              Something went wrong
            </h2>
            <p className="text-sm text-gray-600" tabIndex={0}>
              {error.message || 'An unexpected error occurred'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full pt-4">
            <button
              onClick={reset}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Try again"
              tabIndex={0}
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label="Refresh page"
              tabIndex={0}
            >
              Refresh page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
