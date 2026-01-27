# Testing

## Current Status

**No testing infrastructure is configured.**

## Findings

### Test Files
- **Found**: 0 test files
- **Searched for**: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- **Result**: No test files exist in the codebase

### Test Frameworks
- **Jest**: Not configured
- **Vitest**: Not configured
- **React Testing Library**: Not installed
- **Cypress**: Not configured
- **Playwright**: Not configured

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

**No test script** configured.

### Dependencies
**Testing-related dependencies**: None

**Missing packages** that would typically be needed:
- `@testing-library/react` - Component testing
- `@testing-library/jest-dom` - DOM matchers
- `jest` or `vitest` - Test runner
- `@testing-library/user-event` - User interaction simulation
- `jest-environment-jsdom` - Browser environment for Jest
- `@types/jest` - TypeScript types

## CI/CD Testing

**No CI/CD pipeline configured**:
- No `.github/workflows/` directory
- No GitHub Actions
- No automated test runs on commit/PR
- No test coverage reporting

## Potential Test Structure

If tests were to be added, this structure would be recommended:

```
src/
├── app/
│   ├── api/
│   │   └── blog/
│   │       ├── route.ts
│   │       └── route.test.ts         # API route tests
│   └── page.test.tsx                 # Page tests
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx           # Component tests
│   └── sections/
│       ├── hero.tsx
│       └── hero.test.tsx             # Section tests
├── lib/
│   ├── utils.ts
│   ├── utils.test.ts                 # Utility tests
│   └── supabase/
│       ├── client.ts
│       └── client.test.ts            # Integration tests
└── __tests__/
    ├── e2e/
    │   ├── homepage.spec.ts          # E2E tests
    │   └── booking.spec.ts
    └── integration/
        └── blog-api.test.ts          # API integration tests
```

## Test Candidates

### Unit Tests (High Priority)

#### 1. Utility Functions
**File**: `src/lib/utils.ts`
```typescript
// Current implementation
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Potential test
describe("cn utility", () => {
  it("should merge Tailwind classes correctly", () => {
    expect(cn("px-4", "px-2")).toBe("px-2")
  })

  it("should handle conditional classes", () => {
    expect(cn("px-4", false && "py-2")).toBe("px-4")
  })
})
```

#### 2. Slug Generation
**File**: `src/app/api/blog/route.ts`
```typescript
// Current implementation
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Potential test
describe("generateSlug", () => {
  it("should convert title to slug", () => {
    expect(generateSlug("Hello World")).toBe("hello-world")
  })

  it("should remove special characters", () => {
    expect(generateSlug("Hello! World?")).toBe("hello-world")
  })

  it("should handle multiple spaces", () => {
    expect(generateSlug("Hello   World")).toBe("hello-world")
  })
})
```

#### 3. Metadata Generators
**File**: `src/lib/seo/metadata.ts`
```typescript
// Potential test
describe("generateMetadata", () => {
  it("should generate correct metadata object", () => {
    const result = generateMetadata({
      title: "Test Page",
      description: "Test description"
    })

    expect(result.title).toBe("Test Page | Vince Sports Massage")
    expect(result.description).toBe("Test description")
  })
})
```

### Integration Tests (Medium Priority)

#### 1. Blog API Endpoint
**File**: `src/app/api/blog/route.ts`
```typescript
// Potential test
describe("POST /api/blog", () => {
  it("should reject requests without webhook secret", async () => {
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ title: "Test", content: "Test" })
    })

    expect(response.status).toBe(401)
  })

  it("should create blog post with valid data", async () => {
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET
      },
      body: JSON.stringify({
        title: "Test Post",
        content: "<p>Test content</p>"
      })
    })

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.success).toBe(true)
  })
})
```

#### 2. Supabase Client
**File**: `src/lib/supabase/client.ts`
```typescript
// Potential test with mocked Supabase
describe("createClient", () => {
  it("should initialize Supabase client", () => {
    const client = createClient()
    expect(client).toBeDefined()
  })
})
```

### Component Tests (Medium Priority)

#### 1. Button Component
**File**: `src/components/ui/button.tsx`
```typescript
// Potential test
describe("Button", () => {
  it("should render with default variant", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("should apply variant classes", () => {
    render(<Button variant="outline">Click me</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("border")
  })

  it("should handle click events", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### 2. Hero Section
**File**: `src/components/sections/hero.tsx`
```typescript
// Potential test
describe("Hero", () => {
  it("should render hero content", () => {
    render(<Hero />)
    expect(screen.getByText(/Move Better/i)).toBeInTheDocument()
    expect(screen.getByText(/Pain-Free/i)).toBeInTheDocument()
  })

  it("should render CTA buttons", () => {
    render(<Hero />)
    expect(screen.getByText("Book Your Session")).toBeInTheDocument()
    expect(screen.getByText("View Services")).toBeInTheDocument()
  })
})
```

### E2E Tests (Low Priority)

#### 1. Homepage Flow
```typescript
// Potential Playwright test
test("homepage displays all sections", async ({ page }) => {
  await page.goto("/")

  await expect(page.locator("h1")).toContainText("Move Better")
  await expect(page.locator("text=What I Offer")).toBeVisible()
  await expect(page.locator("text=Meet Vince McDowell")).toBeVisible()
})
```

#### 2. Blog Navigation
```typescript
test("can navigate to blog post", async ({ page }) => {
  await page.goto("/blog")
  await page.click("article:first-child a")
  await expect(page).toHaveURL(/\/blog\/.*/)
})
```

#### 3. Booking Flow
```typescript
test("booking page loads Calendly", async ({ page }) => {
  await page.goto("/booking")
  await expect(page.locator("iframe[src*='calendly']")).toBeVisible()
})
```

## Mocking Strategy

### Supabase Mocking
```typescript
// __mocks__/@supabase/supabase-js.ts
export const createClient = jest.fn(() => ({
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
  })),
}))
```

### Framer Motion Mocking
```typescript
// __mocks__/framer-motion.tsx
export const motion = {
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
  section: ({ children, ...props }) => <section {...props}>{children}</section>,
}
```

### Next.js Mocking
```typescript
// __mocks__/next/navigation.ts
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  pathname: "/",
  query: {},
}))
```

## Recommended Testing Setup

### 1. Install Dependencies
```bash
npm install -D \
  vitest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  @vitejs/plugin-react \
  jsdom
```

### 2. Create Vitest Config
**File**: `vitest.config.ts`
```typescript
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 3. Create Setup File
**File**: `vitest.setup.ts`
```typescript
import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

afterEach(() => {
  cleanup()
})
```

### 4. Add Test Script
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Test Coverage Goals

If tests were implemented, these would be reasonable targets:

| Category | Target Coverage |
|----------|----------------|
| Utilities | 90%+ |
| API Routes | 80%+ |
| Components | 70%+ |
| Pages | 50%+ |
| Overall | 70%+ |

## Critical Paths to Test First

1. **Blog API webhook** (`src/app/api/blog/route.ts`) - Security-critical
2. **Slug generation** - Prevents data corruption
3. **Webhook secret validation** - Prevents unauthorized access
4. **Supabase client initialization** - Catches configuration issues
5. **Button component** - Most used UI component

## Summary

| Aspect | Status |
|--------|--------|
| Test Framework | ❌ Not configured |
| Test Files | ❌ 0 tests |
| Unit Tests | ❌ None |
| Integration Tests | ❌ None |
| E2E Tests | ❌ None |
| CI/CD Testing | ❌ Not configured |
| Code Coverage | ❌ Not tracked |
| Test Utilities | ❌ Not installed |

**Recommendation**: Implement testing infrastructure starting with critical API routes, then utilities, then components.
