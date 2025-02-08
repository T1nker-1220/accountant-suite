/**
 * ComponentErrorBoundary.tsx
 * A component-level error boundary for isolating errors to specific components.
 * Provides customizable fallback UI and error recovery options.
 */

'use client';

import React from 'react';

interface ComponentErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ComponentErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  componentName?: string;
}

const DefaultFallback: React.FC<{ error: Error; reset: () => void }> = ({ reset }) => (
  <div
    role="alert"
    className="p-4 border border-red-100 rounded-md bg-red-50"
  >
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-red-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-sm text-red-700">
        Component error occurred
      </div>
      <button
        onClick={reset}
        className="ml-auto text-sm font-medium text-red-600 hover:text-red-500"
        aria-label="Retry component"
      >
        Retry
      </button>
    </div>
  </div>
);

class ComponentErrorBoundary extends React.Component<ComponentErrorBoundaryProps, ComponentErrorBoundaryState> {
  constructor(props: ComponentErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ComponentErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { onError, componentName } = this.props;

    // Log component-specific error
    console.error(
      `Error in ${componentName || 'component'}:`,
      error,
      errorInfo
    );

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback: CustomFallback } = this.props;

    if (hasError && error) {
      const FallbackComponent = CustomFallback || DefaultFallback;
      return <FallbackComponent error={error} reset={this.handleReset} />;
    }

    return children;
  }
}

export default ComponentErrorBoundary;
