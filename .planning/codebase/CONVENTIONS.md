# Code Conventions

## TypeScript Configuration

**Mode**: Strict
**Target**: ES2017
**Module Resolution**: Bundler

**Key Settings** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Naming Conventions

### Files
- **Components**: `kebab-case.tsx` (e.g., `hero.tsx`, `services-preview.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **Page Components**: `name-page.tsx` (e.g., `blog-list-page.tsx`)
- **API Routes**: `route.ts` (Next.js convention)
- **Utilities**: `kebab-case.ts` (e.g., `utils.ts`, `constants.ts`)
- **Configuration**: `kebab-case.json` or `.config.ts`

### Variables & Functions
- **Functions**: `camelCase` (e.g., `generateSlug`, `getSupabaseClient`)
- **Components**: `PascalCase` (e.g., `Hero`, `Button`, `BlogListPage`)
- **Constants**: Object exports with `as const` (e.g., `siteConfig`, `pricing`)
- **Environment Variables**: `UPPER_SNAKE_CASE` (e.g., `NEXT_PUBLIC_SUPABASE_URL`)

### Types & Interfaces
- **Types**: `PascalCase` (e.g., `Database`, `PageMetadata`, `BlogPost`)
- **Type Parameters**: Single uppercase letter or `PascalCase` (e.g., `<T>`, `<TData>`)

**Example** (`src/lib/constants.ts`):
```typescript
export const siteConfig = {
  name: "Vince Sports Massage",
  url: "https://vincesportsmassage.com",
  // ...
} as const

export const navLinks = [
  { href: "/", label: "Home" },
  // ...
] as const
```

## Component Patterns

### Functional Components Only
**No class components**. All components use function syntax.

### Server vs Client Components

**Server Components** (default):
```typescript
// src/app/page.tsx
import { Hero, About } from "@/components/sections"

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
    </>
  )
}
```

**Client Components** (explicit directive):
```typescript
// src/components/layout/header.tsx
"use client"

import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (...)
}
```

**Rule**: Mark with `"use client"` only when needed:
- Using React hooks (useState, useEffect)
- Using browser APIs (window, document)
- Using event handlers (onClick, onChange)
- Using Framer Motion animations

### Component Export Pattern

**Named Exports** (preferred):
```typescript
export function Button({ children }: ButtonProps) {
  return <button>{children}</button>
}
```

**Default Exports** (only for pages):
```typescript
export default function HomePage() {
  return <main>...</main>
}
```

### Props Pattern

**Destructuring with Type Annotation**:
```typescript
type HeroProps = {
  title: string
  subtitle?: string
}

export function Hero({ title, subtitle }: HeroProps) {
  return <h1>{title}</h1>
}
```

**Readonly Props**:
```typescript
function Button({
  className,
  variant,
  ...props
}: Readonly<{
  className?: string
  variant?: "default" | "outline"
} & React.ComponentProps<"button">>) {
  return <button {...props} />
}
```

### Component Composition

**Prefer composition over prop drilling**:

```typescript
// ✅ Good - Composition
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
    </>
  )
}

// ❌ Avoid - Prop drilling
export default function HomePage() {
  const config = getSiteConfig()
  return <Hero config={config} />
}
```

## Import/Export Patterns

### Import Order
1. React and third-party libraries
2. Next.js specific imports
3. Internal components (UI first, then sections)
4. Utilities and constants
5. Types

**Example**:
```typescript
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/lib/constants"
import type { Service } from "@/lib/types"
```

### Path Aliases
**Always use `@/*` alias**:

```typescript
// ✅ Good
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/constants"

// ❌ Avoid
import { Button } from "../../components/ui/button"
import { siteConfig } from "../../../lib/constants"
```

### Barrel Exports
**Use index files for clean imports**:

```typescript
// src/components/sections/index.ts
export { Hero } from "./hero"
export { About } from "./about"
export { Services } from "./services-preview"

// Usage
import { Hero, About, Services } from "@/components/sections"
```

## Styling Conventions

### Tailwind CSS
**Utility-first approach**:

```typescript
<div className="flex items-center gap-4 p-6 rounded-lg bg-white shadow-lg">
  <Button className="bg-primary text-white hover:bg-primary-dark">
    Click me
  </Button>
</div>
```

### Class Name Merging
**Use `cn()` utility for conditional classes**:

```typescript
import { cn } from "@/lib/utils"

<button
  className={cn(
    "px-4 py-2 rounded",
    variant === "primary" && "bg-blue-500",
    variant === "secondary" && "bg-gray-500",
    disabled && "opacity-50 cursor-not-allowed",
    className
  )}
>
  {children}
</button>
```

### Component Variants
**Use Class Variance Authority (CVA)**:

```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-primary text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = VariantProps<typeof buttonVariants>
```

## Async/Await Patterns

### Direct Await
**No promise chaining**:

```typescript
// ✅ Good
async function fetchData() {
  const response = await fetch("/api/data")
  const data = await response.json()
  return data
}

// ❌ Avoid
function fetchData() {
  return fetch("/api/data")
    .then(response => response.json())
    .then(data => data)
}
```

### Supabase Pattern
**Destructure data and error**:

```typescript
const { data, error } = await supabase
  .from("blog_posts")
  .select("*")
  .eq("status", "published")

if (error) {
  console.error("Database error:", error)
  return null
}

return data
```

### Error Handling

**Try-Catch for API Routes**:
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    // Database operation
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(body)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

**Graceful Fallbacks in UI**:
```typescript
{isLoading ? (
  <div>Loading...</div>
) : error ? (
  <div>Error: {error.message}</div>
) : (
  <div>{data}</div>
)}
```

## Comment Style

### Minimal Comments
**Code should be self-documenting**:

```typescript
// ✅ Good - Clear function names, no comment needed
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// ❌ Avoid - Unnecessary comment
// This function generates a slug from a title
function generateSlug(title: string): string { ... }
```

### Strategic Comments
**Comment for non-obvious logic**:

```typescript
// Lazy initialization to avoid multiple Supabase instances
let supabase: SupabaseClient | null = null

function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient(url, key)
  }
  return supabase
}
```

### JSX Comments
**Use standard comment syntax in JSX**:

```typescript
<div>
  {/* YouTube Video Background */}
  <iframe src="..." />

  {/* Optional: Local Video Background */}
  {/* Uncomment to use local video instead of YouTube */}
  {/*
  <video autoPlay muted loop>
    <source src="/videos/hero.mp4" />
  </video>
  */}
</div>
```

### Function Documentation
**No JSDoc for simple functions**:

```typescript
// ✅ Good - Type signature is documentation
function add(a: number, b: number): number {
  return a + b
}

// ❌ Avoid - Redundant JSDoc
/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
function add(a: number, b: number): number {
  return a + b
}
```

## Configuration Management

### Environment Variables
**Validation at usage**:

```typescript
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error("Supabase credentials not configured")
  }

  return createClient(url, key)
}
```

### Constants with Type Safety
**Use `as const` for readonly config**:

```typescript
export const siteConfig = {
  name: "Vince Sports Massage",
  description: "Professional sports massage in Northern Ireland",
  url: "https://vincesportsmassage.com",
  address: {
    street: "79 Woodgrange Rd",
    city: "Downpatrick",
    postcode: "BT30 8JH",
    region: "Northern Ireland",
  },
} as const

// Type is inferred: { readonly name: "Vince Sports Massage", ... }
```

## Animation Patterns

### Framer Motion
**Scroll-triggered animations**:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.div>
```

**Staggered animations**:

```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
    }}
  >
    {item.content}
  </motion.div>
))}
```

**Hover effects**:

```typescript
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.2 }}
>
  {children}
</motion.div>
```

## ESLint Configuration

**File**: `eslint.config.mjs`

```javascript
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
```

**Rules**:
- Core Web Vitals checks enabled
- TypeScript support enabled
- Next.js specific rules applied
- No custom rules configured

## Code Style Summary

| Aspect | Convention |
|--------|-----------|
| Components | PascalCase, functional only |
| Functions | camelCase |
| Constants | camelCase with `as const` |
| Files | kebab-case.tsx |
| Imports | Path aliases (`@/*`) |
| Exports | Named exports (components), default (pages) |
| TypeScript | Strict mode, explicit types for complex functions |
| Async | async/await, no promise chaining |
| Styling | Tailwind utility classes with `cn()` helper |
| Comments | Minimal, strategic only |
| Error Handling | Try-catch for APIs, graceful fallbacks for UI |
| Server/Client | Server by default, `"use client"` when needed |
