*In this lesson learned this will going to be, During you interaction with the user, if you find anything reusable in this project (e.g. version of a library, model name), especially about a fix to a mistake you made or a correction you received, you should take note in the `Lessons` section in the `.cursorrules` or `@lessons-learned.md` file so you will not make the same mistake again. You will only update this file if the user ask you to update the lesson learned. You should be wise to choose the lesson that is more important and reusable.*

# Lessons Learned

### Component Development
1. When using imported components, always verify the exported members and their types first to ensure compatibility.
2. When extending base components (like TextInput), check the prop types carefully to avoid type mismatches.
3. For date handling, use date-fns library as it provides better TypeScript support and more focused functionality.
4. Always implement proper accessibility features from the start, including ARIA labels and keyboard navigation.

### TypeScript Best Practices
1. When dealing with component variants, define the exact string literal types to prevent type mismatches.
2. Use proper type extensions (like Omit<>) when building upon existing HTML elements.
3. Always check prop type compatibility when composing components together.
4. Implement proper ref forwarding with TypeScript for reusable components.

### Error Handling
1. Address import errors by checking the actual exports in the source files.
2. Fix type mismatches by either adapting the component or updating the type definitions.
3. When encountering prop type errors, prefer removing incompatible props over forcing type assertions.
4. Document component interfaces thoroughly to prevent future type-related issues.

### Code Organization
1. Keep related components (like DatePicker and Calendar) in the same directory.
2. Use index files to manage exports and maintain clean import statements.
3. Implement shared utilities (like useClickOutside) in a dedicated hooks directory.
4. Maintain consistent file structure across similar components.
