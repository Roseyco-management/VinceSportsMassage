# Technology Stack

## Core Framework & Runtime

- **Framework**: Next.js 16.0.7 (App Router with Server Components)
- **React Version**: 19.2.0
- **Language**: TypeScript 5.x (strict mode enabled)
- **Target Environment**: ES2017
- **Package Manager**: npm

## Build Tools

- **Build System**: Next.js built-in build system
- **CSS Processor**: Tailwind CSS v4 with PostCSS
- **Linting**: ESLint 9 (flat config format)
- **TypeScript Compiler**: tsc (via Next.js build)

**Configuration Files**:
- `tsconfig.json` - TypeScript configuration with strict mode
- `postcss.config.mjs` - Tailwind CSS v4 integration
- `eslint.config.mjs` - ESLint 9 with Next.js rules
- `next.config.ts` - Minimal Next.js configuration

## UI & Styling

### CSS Framework
- **Tailwind CSS v4** - Utility-first CSS framework
- CSS variables for theme customization
- PostCSS for processing

### Component Library
**Radix UI Primitives** (11 packages):
- `@radix-ui/react-accordion` (^1.2.12)
- `@radix-ui/react-avatar` (^1.1.11)
- `@radix-ui/react-dialog` (^1.1.15)
- `@radix-ui/react-dropdown-menu` (^2.1.16)
- `@radix-ui/react-label` (^2.1.8)
- `@radix-ui/react-navigation-menu` (^1.2.14)
- `@radix-ui/react-scroll-area` (^1.2.10)
- `@radix-ui/react-separator` (^1.1.8)
- `@radix-ui/react-slot` (^1.2.4)

**Component System**: shadcn/ui (New York style)
- Location: `src/components/ui/`
- RSC-compatible components
- Customizable with Tailwind CSS

### Styling Utilities
- **clsx** (^2.1.1) - Conditional class concatenation
- **tailwind-merge** (^3.4.0) - Intelligent Tailwind class merging
- **class-variance-authority** (^0.7.1) - Component variant management

## Animation & Icons

- **Framer Motion** (^12.23.25) - Animation library for scroll-triggered animations
- **Lucide React** (^0.555.0) - SVG icon library

## Backend & Database

- **Supabase** (PostgreSQL)
  - `@supabase/supabase-js` (^2.86.0) - JavaScript client
  - `@supabase/ssr` (^0.8.0) - Server-side rendering support
- **Database**: PostgreSQL (via Supabase cloud)
- **ORM/Query Builder**: Supabase client (built-in)

## Key Dependencies Summary

**Production Dependencies (14)**:
```json
{
  "next": "16.0.7",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "@supabase/supabase-js": "^2.86.0",
  "@supabase/ssr": "^0.8.0",
  "framer-motion": "^12.23.25",
  "lucide-react": "^0.555.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0"
}
```

**Development Dependencies (6)**:
```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.0.7",
  "@tailwindcss/postcss": "^4.1.0"
}
```

## Path Aliases

Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

## Node.js Version

- **Target**: ES2017 (supports async/await natively)
- **Module System**: ESNext with bundler resolution

## Notable Absences

- No state management library (Redux, Zustand, MobX)
- No testing framework (Jest, Vitest, Cypress)
- No form library (React Hook Form, Formik)
- No data fetching library (React Query, SWR) - uses Supabase directly
- No CSS-in-JS (styled-components, emotion)
- No UI framework (MUI, Chakra) - uses Radix UI primitives instead
