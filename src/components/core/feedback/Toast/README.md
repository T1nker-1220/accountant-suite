# Toast Component

A customizable toast notification component that displays temporary messages with different variants and smooth animations.

## Features

- 🎨 Four variants: success, error, warning, info
- ⌛ Auto-dismiss with configurable duration
- 🎭 Smooth animations using Framer Motion
- ♿ Fully accessible with ARIA support
- ⌨️ Keyboard navigation support
- 🎯 Customizable styles via className prop

## Usage

```tsx
import { Toast } from "@/components/core/feedback/Toast";

// Basic usage
<Toast
  id="unique-id"
  message="Operation successful!"
  variant="success"
  onClose={(id) => console.log(`Toast ${id} closed`)}
/>

// With custom duration
<Toast
  id="custom-duration"
  message="This will show for 10 seconds"
  variant="info"
  duration={10000}
  onClose={(id) => handleClose(id)}
/>

// With custom styling
<Toast
  id="custom-style"
  message="Custom styled toast"
  variant="warning"
  className="my-custom-class"
  onClose={(id) => handleClose(id)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Unique identifier for the toast |
| message | string | required | The message to display |
| variant | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | The visual style variant |
| duration | number | 5000 | Time in milliseconds before auto-dismiss |
| onClose | (id: string) => void | required | Callback when toast is closed |
| className | string | undefined | Additional CSS classes |

## Accessibility

- Uses `role="alert"` for screen reader announcement
- Implements `aria-live="polite"` for non-intrusive notifications
- Close button has descriptive aria-label
- Supports keyboard navigation
- Follows WCAG 2.1 AA guidelines

## Animation

The toast uses Framer Motion for smooth enter/exit animations:
- Slides up from bottom
- Fades in/out
- Scales for emphasis
- Smooth exit transition

## Styling

Default styling includes:
- Variant-specific colors for clear visual feedback
- Responsive design
- Hover and focus states for interactive elements
- Shadow for depth
- Rounded corners for modern look

## Best Practices

1. Keep messages concise and clear
2. Use appropriate variants for different message types
3. Avoid showing too many toasts simultaneously
4. Consider reducing motion for users with vestibular disorders
5. Test with screen readers and keyboard navigation

## Examples

### Different Variants

```tsx
// Success notification
<Toast
  id="success"
  message="Profile updated successfully!"
  variant="success"
  onClose={handleClose}
/>

// Error notification
<Toast
  id="error"
  message="Failed to save changes"
  variant="error"
  onClose={handleClose}
/>

// Warning notification
<Toast
  id="warning"
  message="Your session will expire soon"
  variant="warning"
  onClose={handleClose}
/>

// Info notification
<Toast
  id="info"
  message="New features available"
  variant="info"
  onClose={handleClose}
/>
```

### Custom Duration

```tsx
// Long duration toast
<Toast
  id="long"
  message="This is important!"
  duration={10000}
  variant="warning"
  onClose={handleClose}
/>

// Quick toast
<Toast
  id="quick"
  message="Copied to clipboard"
  duration={2000}
  variant="success"
  onClose={handleClose}
/>
```
