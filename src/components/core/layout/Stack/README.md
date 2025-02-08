# Stack Component

A flexible layout component that arranges its children in a vertical or horizontal stack with consistent spacing and alignment options. Built with accessibility and responsive design in mind.

## Features

- 🔄 Vertical or horizontal layout
- 📏 Configurable spacing (none, small, medium, large)
- 🎯 Flexible alignment options
- ♿ Full accessibility support
- 📱 Responsive design
- 🎨 Custom styling support

## Installation

The Stack component is part of the core layout components. No additional installation is required.

## Usage

```tsx
import { Stack } from '@/components/core/layout/Stack'

// Basic vertical stack
<Stack>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack with custom spacing
<Stack direction="horizontal" spacing="large">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</Stack>

// Stack with custom alignment
<Stack alignment="center" spacing="medium">
  <div>Centered Item 1</div>
  <div>Centered Item 2</div>
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | The elements to be stacked |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | The direction of the stack |
| `spacing` | `"none" \| "small" \| "medium" \| "large"` | `"medium"` | The spacing between stack items |
| `alignment` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | The alignment of items along the cross axis |
| `className` | `string` | `undefined` | Optional custom CSS classes |
| `aria-label` | `string` | `undefined` | Accessibility label for the stack |
| `role` | `string` | `"group"` | ARIA role for the stack container |

## Spacing Values

The spacing prop maps to the following Tailwind classes:
- `none`: `gap-0`
- `small`: `gap-2` (0.5rem, 8px)
- `medium`: `gap-4` (1rem, 16px)
- `large`: `gap-6` (1.5rem, 24px)

## Accessibility

The Stack component follows accessibility best practices:
- Uses semantic HTML structure
- Includes proper ARIA roles and labels
- Supports keyboard navigation
- Maintains proper spacing for readability

## Examples

### Form Layout
```tsx
<Stack spacing="medium">
  <input type="text" placeholder="Name" />
  <input type="email" placeholder="Email" />
  <button>Submit</button>
</Stack>
```

### Card Layout
```tsx
<Stack direction="horizontal" spacing="large" alignment="center">
  <Card>Product 1</Card>
  <Card>Product 2</Card>
  <Card>Product 3</Card>
</Stack>
```

### Mixed Content
```tsx
<Stack>
  <h2>Section Title</h2>
  <p>Description text</p>
  <Stack direction="horizontal" spacing="small">
    <button>Action 1</button>
    <button>Action 2</button>
  </Stack>
</Stack>
```

## Best Practices

1. Use semantic HTML elements as children
2. Provide aria-label for non-semantic content
3. Consider responsive behavior when choosing direction
4. Use consistent spacing throughout your application
5. Combine with other layout components (Grid, Card) for complex layouts

## Related Components

- Grid: For two-dimensional layouts
- Card: For contained content blocks
- Container: For page-level content wrapping
