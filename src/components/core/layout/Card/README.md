# Card Component

A flexible and accessible card component that serves as a container for content with optional header, footer, and hover effects.

## Features

- 🎯 Fully accessible with ARIA roles and keyboard navigation
- 🎨 Configurable padding, hover effects, and borders
- 🖱️ Optional clickable behavior with proper focus management
- 📱 Responsive design with customizable width
- 🌙 Dark mode support out of the box

## Installation

The Card component is available as part of the core layout components:

```tsx
import { Card } from '@/components/core/layout/Card';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | undefined | Additional CSS classes to apply to the card |
| hoverable | boolean | false | Whether the card should have hover effects |
| clickable | boolean | false | Whether the card should be clickable |
| bordered | boolean | true | Whether to show a border around the card |
| padding | 'none' \| 'small' \| 'medium' \| 'large' | 'medium' | Custom padding for the card content |
| shadowed | boolean | true | Whether to show a shadow effect |
| onClick | (event: React.MouseEvent<HTMLDivElement>) => void | undefined | Optional click handler for clickable cards |
| onKeyDown | (event: React.KeyboardEvent<HTMLDivElement>) => void | undefined | Optional keyboard handler for accessibility |

## Usage Examples

### Basic Card

```tsx
<Card>
  <h2>Basic Card</h2>
  <p>This is a basic card with default styling.</p>
</Card>
```

### Clickable Card with Hover Effect

```tsx
<Card
  hoverable
  clickable
  onClick={() => console.log('Card clicked!')}
>
  <h2>Clickable Card</h2>
  <p>Click me or press Enter/Space when focused!</p>
</Card>
```

### Custom Styled Card

```tsx
<Card
  className="max-w-sm"
  padding="large"
  bordered={false}
  shadowed
>
  <h2>Custom Card</h2>
  <p>This card has custom styling applied.</p>
</Card>
```

### Card without Border or Shadow

```tsx
<Card
  bordered={false}
  shadowed={false}
  padding="small"
>
  <p>Clean and minimal card.</p>
</Card>
```

## Accessibility

The Card component follows accessibility best practices:

- Uses semantic HTML with appropriate ARIA roles
- Supports keyboard navigation when clickable
- Maintains proper focus management
- Provides clear visual feedback for interactive states
- Compatible with screen readers

## Best Practices

1. Use meaningful content hierarchy inside cards
2. Keep content concise and focused
3. Use appropriate padding based on content density
4. Enable hover effects only for interactive cards
5. Maintain consistent card usage patterns throughout the application

## Examples in Context

### Product Card

```tsx
<Card
  hoverable
  clickable
  className="max-w-sm"
  onClick={() => handleProductClick(productId)}
>
  <img src={productImage} alt={productName} className="w-full h-48 object-cover" />
  <div className="mt-4">
    <h3 className="text-lg font-semibold">{productName}</h3>
    <p className="text-gray-600">{productDescription}</p>
    <p className="mt-2 text-primary-600">${price}</p>
  </div>
</Card>
```

### Dashboard Widget

```tsx
<Card
  className="h-full"
  padding="large"
  shadowed
>
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Statistics</h3>
    <button className="text-primary-600">View All</button>
  </div>
  <div className="space-y-4">
    {stats.map((stat) => (
      <div key={stat.id} className="flex justify-between">
        <span>{stat.label}</span>
        <span className="font-medium">{stat.value}</span>
      </div>
    ))}
  </div>
</Card>
```
