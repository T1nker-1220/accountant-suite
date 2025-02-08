# Progress Component

A versatile progress bar component for showing task completion and loading states.

## Features

- 📊 Determinate and indeterminate states
- 📏 Three sizes: small, medium, large
- 🎨 Multiple color variants
- 📝 Optional label and value display
- ♿ Fully accessible with ARIA support
- 🎯 Customizable via className prop

## Usage

```tsx
import { Progress } from "@/components/core/feedback/Progress";

// Basic usage
<Progress value={75} />

// With label and value display
<Progress
  value={60}
  label="Upload progress"
  showValue
/>

// Different sizes
<Progress size="sm" value={50} />
<Progress size="md" value={50} />
<Progress size="lg" value={50} />

// Color variants
<Progress variant="primary" value={80} />
<Progress variant="secondary" value={80} />

// Indeterminate state
<Progress />

// Custom max value
<Progress value={7} max={10} showValue />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | undefined | Current progress value |
| max | number | 100 | Maximum progress value |
| variant | 'primary' \| 'secondary' | 'primary' | Color variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the progress bar |
| label | string | undefined | Label text |
| showValue | boolean | false | Whether to show percentage |
| className | string | undefined | Additional CSS classes |

## Accessibility

- Uses `role="progressbar"` for screen reader announcement
- Includes proper ARIA attributes:
  - aria-valuemin
  - aria-valuemax
  - aria-valuenow
  - aria-label
- Follows WCAG 2.1 AA guidelines
- Clear visual indication of progress

## Styling

Default styling includes:
- Smooth transitions
- Rounded corners
- Responsive design
- Clear contrast ratios
- Size variations
- Color customization

## Best Practices

1. Use appropriate sizes for different contexts:
   - Small: Inline progress
   - Medium: Component progress
   - Large: Important processes

2. Choose variants that match your UI:
   - Primary: Main actions
   - Secondary: Background processes

3. Include clear labels for context
4. Show values when precision is important
5. Use indeterminate state for unknown duration

## Examples

### Progress States

```tsx
// Determinate progress
<Progress
  value={75}
  label="Download progress"
  showValue
/>

// Indeterminate progress
<Progress
  label="Loading..."
/>

// Complete progress
<Progress
  value={100}
  label="Installation complete"
  showValue
/>
```

### Size Variants

```tsx
// Small progress bar
<Progress
  size="sm"
  value={60}
  label="Uploading file"
/>

// Medium progress bar
<Progress
  size="md"
  value={60}
  label="Processing data"
  showValue
/>

// Large progress bar
<Progress
  size="lg"
  value={60}
  label="System update"
  showValue
/>
```

### With Custom Max Value

```tsx
// Steps progress
<Progress
  value={3}
  max={5}
  label="Step 3 of 5"
  showValue
/>

// Custom percentage calculation
<Progress
  value={750}
  max={1000}
  label="Storage used"
  showValue
/>
```

### In Components

```tsx
// File upload progress
<div className="space-y-4">
  <h3>Uploading files...</h3>
  <Progress
    value={75}
    label="document.pdf"
    showValue
  />
  <Progress
    value={30}
    label="image.jpg"
    showValue
  />
</div>

// Multi-step form
<div className="space-y-2">
  <Progress
    value={2}
    max={4}
    label="Form completion"
    showValue
  />
  <p className="text-sm text-slate-600">
    Step 2 of 4: Personal Information
  </p>
</div>
```
