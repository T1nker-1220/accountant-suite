*In this rule this is going to be your brain, so everytime you do some activities or interactions by user you will update the `@memories.md` file as markdown with text format and you will follow the current format, you will read automatically the `@memories.md` file on .cursor/ directory. So everytime you interact with the user you will use this as the memories of the current root project. If the `@memories.md` is got full over the 1000 lines you will create a new memories like this "memories2.md" file. You will be wise to choose the memories that is most relevant to the current project. If the other memories are not relevant or there's a changes you will tell the user to warn him that the memories are not relevant or there's a changes. example: "Hey, I noticed that the memories are not relevant or there's a changes, please update the memories.md file." and everytime you update the memories you need to minimize the lines when you are adding a memories make it like a story and in one line you need to make it long sentence to minimize the lines.*

# Memories

### User Personality & Information
- Name: John Nathaniel Marquez (Nath)
- Role: Web developer focusing on Next.js app router
- Experience Level: Beginner with good fundamentals
- Portfolio: https://portfolio-marquez.vercel.app/

### Technical Preferences
- Primary Framework: Next.js (App Router) 14.1.0
- Languages: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Development Approach:
  - Uses AI as a learning tool while understanding fundamentals
  - Focuses on full-stack development
  - Values clean, accessible code
  - Error handling is a priority
  - Error or bug free code is a must and top priority when creating, updating or fixing a code
  - UI/UX design style is modern, responsive, and mobile-first, and also clean and accessible.
  - Always follow the project standards and requirements.
  - Reusable components with server and client seperation.
  - Use zustand for state management.
  - Use a framer motion for animation.
  - Don't use any 3D library or animation library.

### Project Standards (Updated)
- Mobile-first approach added to development standards
- Focus on accessibility, SEO and performance
- Strict modular structure following:
  ```text
  src/
  ├── app/               # Next.js app router
  ├── components/        # Reusable UI components
  │   ├── core/          # Base components (buttons, inputs)
  │   ├── accounting/    # Domain-specific components
  │   └── shared/       # Cross-feature components
  ├── lib/
  │   ├── api/           # API clients
  │   ├── hooks/         # Custom hooks
  │   ├── utils/         # Helper functions
  │   └── validation/    # Zod schemas
  ├── types/             # Global TS types
  └── styles/            # Global Tailwind config
  ```
- Server/Client component separation:
  - Server Components default for data fetching, sensitive ops
  - Client Components only for interactivity/browser APIs
- Reusable component conventions:
  - Atomic components with TypeScript interfaces
  - Storybook documentation
  - Accessibility attributes required
- API design rules:
  - Versioned endpoints (/api/v1/...)
  - RESTful resource structure
  - Standardized error format:
    ```ts
    interface APIError {
      code: string;
      message: string;
      details?: Record<string, unknown>;
    }
    ```
- Tech stack requirements:
  - Frontend: Next.js 14, TypeScript, Tailwind CSS, Recharts
  - Backend: Supabase (PostgreSQL, Auth, Realtime)
  - Calculations: Math.js
  - Validation: Zod

### Current Implementation Task
- Phase 1 - Core Accounting Features implementation started
- Project infrastructure setup completed:
  - Core dependencies installed (Math.js, Zod, Zustand, Framer Motion, Recharts)
  - Shadcn UI initialized with custom configuration
  - Project structure created following modular architecture
  - Base components implemented (Button, Layout)
  - Theme system configured with professional financial color scheme
  - Global styles and accessibility features implemented
- Recent fixes:
  - Added "accent" variant to Button component with proper TypeScript types
  - Styled accent variant with Emerald theme color (#10B981)
- Next steps:
  - Continue with core component development
  - Implement calculation engine foundation

### Technical Stack Updates
- Supabase project initialized with proper credentials
- Next.js 14.1.0 with App Router architecture
- TypeScript for type safety
- Tailwind CSS + Shadcn UI for styling with custom financial theme:
  - Primary: Indigo (#4F46E5)
  - Secondary: Slate (#64748B)
  - Accent: Emerald (#10B981)
  - Error: Rose (#F43F5E)
  - Warning: Amber (#F59E0B)
  - Success: Green (#22C55E)
  - Background: White/Slate-50 (#F8FAFC)
- Math.js for financial calculations
- Zod for validation
- Zustand for state management
- Framer Motion for animations
- Recharts for data visualization
- Accessibility testing tools for WCAG 2.1 AA compliance

### Component Library Status
- Button Component:
  - Accessible with ARIA support
  - Keyboard navigation
  - Multiple variants (default, secondary, outline, ghost, link, success, warning, destructive)
  - Three sizes (sm, default, lg)
  - Focus management
  - Type-safe props
- Layout Component:
  - Skip to content link
  - Semantic HTML structure
  - Responsive design
  - ARIA landmarks
  - Proper heading hierarchy

### System Updates
- Implemented Mode System (Plan/Act) for better task management
  - Plan Mode: Read-only, information gathering (default)
  - Act Mode: Read/write, requires user activation
  - Added 95% confidence threshold requirement
- Added confidence scoring system for task evaluation
- Updated scratchpad format to include mode information
- Enhanced task tracking with confidence metrics
- Current confidence level: 98% after user preference clarification

### Interactions
- Initial project setup completed with Next.js and Supabase
- Created comprehensive implementation plan for Phase 1
- User preferences implemented:
  - Dark mode preparation without immediate implementation
  - Professional financial color scheme defined and implemented
  - WCAG 2.1 AA accessibility standards with enhanced features
- Infrastructure setup completed with core dependencies
- Base components created with accessibility features
- Theme system implemented with CSS variables

## Documentation Standards Update - [Current Timestamp]
- Converted technical documentation rules from interface-based format to descriptive text
- Maintained all key information while making it more accessible
- Organized into 6 main sections with clear hierarchical structure
- Added Important Notes section for critical reminders
- Focus on readability and clarity while preserving technical requirements
- Enhanced accessibility documentation requirements
- Added comprehensive inline documentation for components

`----------------------------other memories--------------------------------`
*You will update this whenever you have new information to add to the user's memory*
