/**
 * Layout Component
 *
 * Main layout wrapper for the application.
 * Provides consistent spacing, navigation, and structure.
 * Implements WCAG 2.1 AA accessibility standards.
 */

import { cn } from "@/lib/utils"
import * as React from "react"

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen bg-background text-text",
          className
        )}
        {...props}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>

        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {/* Header content will be added later */}
        </header>

        <main
          id="main-content"
          className="container mx-auto px-4 py-8 flex-1"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>

        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
            <p className="text-center text-sm leading-loose text-text-muted md:text-left">
              Built with accessibility in mind. © {new Date().getFullYear()} Your Company Name
            </p>
          </div>
        </footer>
      </div>
    )
  }
)

Layout.displayName = "Layout"

export { Layout }
