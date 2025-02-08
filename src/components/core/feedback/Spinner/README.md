# Spinner Component

A customizable loading spinner component that provides visual feedback for loading states.

## Features

- 📏 Three sizes: small, medium, large
- 🎨 Multiple color variants
- ♿ Fully accessible with ARIA support
- 🌗 Reduced motion support
- 🎯 Customizable via className prop
- 📝 Custom loading label support

## Usage

```tsx
import { Spinner } from "@/components/core/feedback/Spinner";

// Basic usage
<Spinner />

// Different sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// Color variants
<Spinner color="primary" />
<Spinner color="secondary" />
<Spinner color="white" />

// Custom label
<Spinner label="Saving changes..." />

// Custom styling
<Spinner className="my-custom-class" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the spinner |
| color | 'primary' \| 'secondary' \| 'white' | 'primary' | Color variant |
| label | string | 'Loading' | Accessible label for screen readers |
| className | string | undefined | Additional CSS classes |

## Accessibility

- Uses `role="status"` for screen reader announcement
- Includes descriptive aria-label
- Provides screen reader text via sr-only
- Supports reduced motion preferences
- Follows WCAG 2.1 AA guidelines

## Styling

Default styling includes:
- Smooth animation
- Border-based design
- Responsive sizing
- Color customization
- Clean circular shape

## Best Practices

1. Use appropriate sizes for different contexts:
   - Small: Inline loading
   - Medium: Component loading
   - Large: Page or section loading

2. Choose colors that match your UI:
   - Primary: Main actions
   - Secondary: Background processes
   - White: Dark backgrounds

3. Provide meaningful labels
4. Consider reduced motion preferences
5. Use consistent sizing across similar contexts

## Examples

### Size Variants

```tsx
// Small spinner for inline loading
<Spinner
  size="sm"
  label="Loading results"
/>

// Medium spinner for component loading
<Spinner
  size="md"
  label="Loading dashboard"
/>

// Large spinner for page loading
<Spinner
  size="lg"
  label="Loading application"
/>
```

### Color Variants

```tsx
// Primary color for main actions
<Spinner
  color="primary"
  label="Saving changes"
/>

// Secondary color for background tasks
<Spinner
  color="secondary"
  label="Updating data"
/>

// White color for dark backgrounds
<div className="bg-slate-800 p-4">
  <Spinner
    color="white"
    label="Loading"
  />
</div>
```

### Loading States

```tsx
// Button with loading state
<button disabled={isLoading}>
  {isLoading ? (
    <>
      <Spinner size="sm" className="mr-2" />
      Saving...
    </>
  ) : (
    "Save Changes"
  )}
</button>

// Card with loading state
<div className="relative min-h-[200px]">
  {isLoading ? (
    <div className="absolute inset-0 flex items-center justify-center">
      <Spinner size="lg" label="Loading content" />
    </div>
  ) : (
    <div>Content here</div>
  )}
</div>
```

### With Custom Styling

```tsx
// Custom colors
<Spinner
  className="border-emerald-500 border-t-transparent"
  label="Processing"
/>

// Custom animation duration
<Spinner
  className="animate-[spin_2s_linear_infinite]"
  label="Syncing"
/>
```
