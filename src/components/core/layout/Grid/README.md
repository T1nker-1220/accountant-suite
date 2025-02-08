# Grid Component

A flexible and responsive grid system component that provides a powerful layout structure for organizing content in a grid format.

## Features

- 📱 Responsive grid with customizable columns per breakpoint
- 🎯 Gap control for both rows and columns
- 🔄 Auto-flow direction control
- 💫 Breakpoint-specific configurations
- ♿ Accessibility support for grid layout

## Installation

The Grid component is available as part of the core layout components:

```tsx
import { Grid } from '@/components/core/layout/Grid';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | undefined | Additional CSS classes to apply to the grid |
| columns | { xs?: GridColumns; sm?: GridColumns; md?: GridColumns; lg?: GridColumns; xl?: GridColumns; } | { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 } | Number of columns at different breakpoints |
| gap | 'none' \| 'small' \| 'medium' \| 'large' | 'medium' | Gap between grid items |
| flow | 'row' \| 'col' \| 'dense' \| 'row-dense' \| 'col-dense' | 'row' | Grid auto-flow direction |
| center | boolean | false | Whether to center items in the grid |

## Usage Examples

### Basic Grid

```tsx
<Grid>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>
```

### Responsive Grid with Custom Columns

```tsx
<Grid
  columns={{
    xs: 1,  // 1 column on mobile
    sm: 2,  // 2 columns on tablet
    md: 3,  // 3 columns on desktop
    lg: 4,  // 4 columns on large screens
  }}
  gap="medium"
>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Grid>
```

### Centered Grid with Custom Gap

```tsx
<Grid
  center
  gap="large"
  columns={{ xs: 1, md: 2 }}
>
  <div className="h-40 bg-gray-100">Card 1</div>
  <div className="h-40 bg-gray-100">Card 2</div>
</Grid>
```

### Dense Grid Layout

```tsx
<Grid
  flow="dense"
  columns={{ xs: 2, md: 4 }}
  gap="small"
>
  <div className="col-span-2">Wide Item</div>
  <div>Regular Item</div>
  <div>Regular Item</div>
</Grid>
```

## Accessibility

The Grid component follows accessibility best practices:

- Uses semantic HTML with appropriate ARIA roles
- Maintains proper content structure
- Ensures keyboard navigation works correctly
- Compatible with screen readers

## Best Practices

1. Use appropriate column counts for different screen sizes
2. Consider content size when setting gaps
3. Use consistent grid patterns across similar content
4. Implement responsive breakpoints thoughtfully
5. Test layouts across different screen sizes

## Examples in Context

### Product Grid

```tsx
<Grid
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap="medium"
  className="p-4"
>
  {products.map((product) => (
    <Card
      key={product.id}
      hoverable
      clickable
      onClick={() => handleProductClick(product.id)}
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2 text-primary-600">${product.price}</p>
      </div>
    </Card>
  ))}
</Grid>
```

### Dashboard Layout

```tsx
<Grid
  columns={{ xs: 1, md: 2, lg: 3 }}
  gap="large"
  className="p-6"
>
  <Card className="col-span-full">
    <h2>Overview</h2>
    {/* Overview content */}
  </Card>
  <Card>
    <h3>Statistics</h3>
    {/* Statistics content */}
  </Card>
  <Card>
    <h3>Recent Activity</h3>
    {/* Activity content */}
  </Card>
  <Card>
    <h3>Performance</h3>
    {/* Performance content */}
  </Card>
</Grid>
```

## Performance Considerations

- The Grid component uses CSS Grid Layout for optimal performance
- Responsive classes are generated only for specified breakpoints
- Minimal JavaScript overhead
- Efficient class generation for column configurations
