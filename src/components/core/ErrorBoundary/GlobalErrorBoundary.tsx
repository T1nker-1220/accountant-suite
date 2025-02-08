/**
 * GlobalErrorBoundary.tsx
 * A top-level error boundary component that catches and handles errors throughout the application.
 * Implements React's Error Boundary pattern with TypeScript and provides fallback UI.
 */

'use client';

import React from 'react';
import { ErrorFallback } from './ErrorFallback';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to your preferred error tracking service (e.g., Sentry)
    console.error('Global Error Boundary caught an error:', error, errorInfo);
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
      const FallbackComponent = CustomFallback || ErrorFallback;
      return <FallbackComponent error={error} reset={this.handleReset} />;
    }

    return children;
  }
}

export default GlobalErrorBoundary;
