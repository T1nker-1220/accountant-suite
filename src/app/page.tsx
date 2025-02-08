/**
 * Home Page
 *
 * Main landing page for the accounting suite.
 * Demonstrates our component library and theme.
 */

import { Button } from "@/components/core/Button"
import { Layout } from "@/components/core/Layout"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Your Accounting Suite
        </h1>

        <p className="text-lg text-text-muted text-center max-w-2xl">
          A professional financial management solution with accessibility and user experience at its core.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg">
            Get Started
          </Button>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>

        {/* Theme Color Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="accent">Accent Button</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="success">Success Button</Button>
            <Button variant="warning">Warning Button</Button>
            <Button variant="destructive">Error Button</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
