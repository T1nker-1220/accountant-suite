# Container Component

A responsive container component that centers content and maintains consistent max-width and padding across different screen sizes. Built with accessibility and responsive design in mind.

## Features

- 📱 Responsive padding system
- 📏 Configurable max-width sizes
- 🎯 Automatic center alignment
- 🔄 Full-width option
- ♿ Accessibility support
- 🎨 Custom styling support

## Installation

The Container component is part of the core layout components. No additional installation is required.

## Usage

```tsx
import { Container } from '@/components/core/layout/Container'

// Basic usage with default size (medium)
<Container>
  <h1>Page Title</h1>
  <p>Content goes here...</p>
</Container>

// With specific size
<Container size="large">
  <div>Wide content area</div>
</Container>

// Full width container
<Container size="full">
  <div>Edge-to-edge content</div>
</Container>

// Custom HTML element
<Container as="section" aria-label="Main content">
  <div>Section content</div>
</Container>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | The content to be contained |
| `size` | `"small" \| "medium" \| "large" \| "full"` | `"medium"` | The maximum width of the container |
| `className` | `string` | `undefined` | Optional custom CSS classes |
| `as` | `keyof JSX.IntrinsicElements` | `"div"` | HTML element to render as |
| `aria-label` | `string` | `undefined` | Accessibility label |
| `role` | `string` | `undefined` | ARIA role |

## Size Values

The size prop maps to the following max-widths:
- `small`: `max-w-3xl` (768px)
- `medium`: `max-w-5xl` (1024px)
- `large`: `max-w-7xl` (1280px)
- `full`: `max-w-full` (no max-width)

## Responsive Behavior

The Container includes responsive padding:
- Mobile: `px-4` (1rem)
- Tablet: `px-6` (1.5rem)
- Desktop: `px-8` (2rem)

## Accessibility

The Container component follows accessibility best practices:
- Semantic HTML structure through the `as` prop
- ARIA role support
- Proper labeling with aria-label
- Maintains content readability with appropriate spacing

## Examples

### Page Layout
```tsx
<Container>
  <header>
    <h1>Welcome</h1>
  </header>
  <main>
    <p>Main content area</p>
  </main>
  <footer>
    <p>Footer content</p>
  </footer>
</Container>
```

### Section Layout
```tsx
<Container as="section" size="small" aria-label="Featured content">
  <h2>Featured Items</h2>
  <div>Featured content here...</div>
</Container>
```

### Full-Width Banner
```tsx
<Container size="full" className="bg-primary-500">
  <Container size="large">
    <h2>Announcement</h2>
    <p>Important message here...</p>
  </Container>
</Container>
```

## Best Practices

1. Choose appropriate size based on content type
2. Use semantic HTML elements with the `as` prop
3. Provide aria-label for non-semantic content
4. Maintain consistent container sizes across similar sections
5. Consider nesting containers for complex layouts

## Related Components

- Stack: For vertical/horizontal content arrangement
- Grid: For two-dimensional layouts
- Card: For contained content blocks
