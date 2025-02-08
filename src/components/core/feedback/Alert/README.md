# Alert Component

A versatile alert component for displaying important messages and notifications with different severity levels.

## Features

- 🎨 Four variants: success, error, warning, info
- 🔔 Optional dismissible functionality
- 📝 Support for title and content
- ♿ Fully accessible with ARIA support
- ⌨️ Keyboard navigation support
- 🎯 Customizable styles via className prop

## Usage

```tsx
import { Alert } from "@/components/core/feedback/Alert";

// Basic usage
<Alert variant="info">
  This is a simple alert message
</Alert>

// With title
<Alert
  title="Update Available"
  variant="info"
>
  A new version of the application is available.
</Alert>

// Dismissible alert
<Alert
  variant="warning"
  dismissible
  onDismiss={() => console.log("Alert dismissed")}
>
  Your session will expire soon
</Alert>

// With custom styling
<Alert
  variant="success"
  className="my-custom-class"
>
  Operation completed successfully
</Alert>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | undefined | Optional title for the alert |
| children | ReactNode | required | Content of the alert |
| variant | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | The visual style variant |
| dismissible | boolean | false | Whether the alert can be dismissed |
| onDismiss | () => void | undefined | Callback when alert is dismissed |
| className | string | undefined | Additional CSS classes |

## Accessibility

- Uses `role="alert"` for screen reader announcement
- Dismissible alerts have descriptive aria-label
- Supports keyboard navigation
- Follows WCAG 2.1 AA guidelines
- Proper heading hierarchy with optional title

## Styling

Default styling includes:
- Variant-specific colors for clear visual feedback
- Left border for emphasis
- Responsive design
- Hover and focus states for dismiss button
- Clean typography with proper spacing

## Best Practices

1. Use appropriate variants for different message types:
   - Success: Positive outcomes
   - Error: Problems or failures
   - Warning: Potential issues
   - Info: General information

2. Keep content concise and clear
3. Use titles for better context when needed
4. Consider placement in the UI hierarchy
5. Test with screen readers and keyboard navigation

## Examples

### Different Variants

```tsx
// Success alert
<Alert
  title="Profile Updated"
  variant="success"
>
  Your profile has been successfully updated.
</Alert>

// Error alert
<Alert
  title="Submission Failed"
  variant="error"
>
  Please check your input and try again.
</Alert>

// Warning alert
<Alert
  title="Low Storage"
  variant="warning"
  dismissible
  onDismiss={handleDismiss}
>
  You are running low on storage space.
</Alert>

// Info alert
<Alert
  title="Tip"
  variant="info"
>
  You can use keyboard shortcuts for quick navigation.
</Alert>
```

### With Rich Content

```tsx
<Alert
  title="Account Status"
  variant="warning"
  dismissible
  onDismiss={handleDismiss}
>
  <div className="space-y-2">
    <p>Your account requires attention:</p>
    <ul className="list-disc list-inside">
      <li>Email not verified</li>
      <li>Security questions not set</li>
    </ul>
  </div>
</Alert>
```
