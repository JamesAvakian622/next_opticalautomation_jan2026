---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. Use when writing new React components, implementing data fetching, or optimizing bundle size and load times.
---

# React Best Practices

React and Next.js performance optimization guidelines. Contains 40+ rules across 8 categories, prioritized by impact.

## How It Works

1. Reviews code against performance best practices
2. Identifies waterfalls, bundle bloat, and re-render issues
3. Provides specific recommendations with priority levels
4. Focuses on high-impact optimizations first

## Categories

### Eliminating Waterfalls (Critical)

**Server Components (Next.js App Router):**
- Fetch data in parallel using `Promise.all()` or multiple awaits in same component
- Avoid sequential fetches across component tree
- Use `<Suspense>` boundaries to prevent blocking entire page
- Preload data in layouts for nested routes

**Client-Side:**
- Prefetch on hover/focus for navigation links
- Use `<link rel="preload">` for critical resources
- Avoid fetch-on-render patterns (fetch in effects)
- Consider React Query/SWR for automatic request deduplication

### Bundle Size Optimization (Critical)

- Use dynamic imports for large components: `const Heavy = dynamic(() => import('./Heavy'))`
- Lazy load below-fold content
- Check bundle analyzer for unexpected large dependencies
- Use `next/dynamic` with `ssr: false` for client-only components
- Prefer lighter alternatives (date-fns → day.js, moment → native Intl)
- Tree-shake lodash: `import debounce from 'lodash/debounce'` not `import { debounce } from 'lodash'`
- Remove unused dependencies from package.json

### Server-Side Performance (High)

- Use React Server Components by default (App Router)
- Keep Server Components async and fetch data directly
- Avoid `'use client'` unless component needs interactivity
- Cache expensive operations with `cache()` from React
- Use `unstable_cache` for data that changes infrequently
- Implement ISR (Incremental Static Regeneration) for semi-static pages
- Stream responses with `<Suspense>` for faster TTFB

### Client-Side Data Fetching (Medium-High)

- Use SWR or React Query for client fetching (built-in caching, deduplication)
- Implement optimistic updates for better perceived performance
- Prefetch data on route hover: `router.prefetch(href)`
- Use `keepPreviousData` to avoid loading states during pagination
- Debounce search inputs (300ms typical)
- Cancel in-flight requests on unmount

### Re-render Optimization (Medium)

- Memoize expensive calculations with `useMemo`
- Wrap callbacks passed to children with `useCallback`
- Use `React.memo()` for pure components that render often
- Split state to avoid unnecessary re-renders (don't colocate unrelated state)
- Move state down to smallest component that needs it
- Use context sparingly; consider Zustand/Jotai for global state
- Avoid inline object/array literals in props: `style={{}}` → extract constant

### Rendering Performance (Medium)

- Virtualize long lists (>50 items): use `@tanstack/react-virtual` or `react-window`
- Use `key` prop correctly (stable IDs, not array index for dynamic lists)
- Avoid layout thrashing (reading offsetHeight/scrollTop in render)
- Use CSS transforms for animations (not top/left)
- Implement pagination or infinite scroll for large datasets
- Defer non-critical renders with `startTransition` (React 18+)

### Image Optimization (High)

- Always use `next/image` (automatic optimization, lazy loading, sizing)
- Specify `width` and `height` to prevent CLS
- Use `priority` for above-fold images
- Use `loading="lazy"` for below-fold images (default in next/image)
- Serve modern formats (WebP, AVIF) via next/image
- Use `placeholder="blur"` with `blurDataURL` for better UX

### JavaScript Micro-optimizations (Low-Medium)

- Avoid premature optimization (profile first)
- Use `for` loops over `.map()` for very large arrays (>10k items)
- Prefer `??` over `||` for nullish checks
- Use `Object.hasOwn()` over `hasOwnProperty`
- Avoid try/catch in hot paths (V8 deoptimization)

## Usage

Apply these guidelines when:
- Writing new React components or Next.js pages
- Reviewing code for performance issues
- Investigating slow page loads or interactions
- Optimizing Core Web Vitals (LCP, FID, CLS)

## Output Format

Report findings with priority level and specific recommendation:

```text
## components/ProductList.tsx

[Critical] Line 45: Sequential data fetches creating waterfall
→ Use Promise.all() to fetch products and categories in parallel

[High] Line 78: Large dependency (moment.js) for simple date formatting
→ Replace with native Intl.DateTimeFormat or date-fns

[Medium] Line 120: Inline object in render causing re-renders
→ Extract style object outside component or use useMemo
```

## Present Results to User

Group findings by priority (Critical → High → Medium → Low). Include line numbers and specific fixes.

## Troubleshooting

- Focus on Critical and High priority items first
- Measure impact with Chrome DevTools Performance tab
- Use React DevTools Profiler to identify re-render issues
- Check bundle size with `next build` and analyze with `@next/bundle-analyzer`
