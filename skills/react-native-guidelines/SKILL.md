---
name: react-native-guidelines
description: React Native best practices optimized for AI agents. Use when building React Native or Expo apps, optimizing mobile performance, or implementing animations and gestures.
---

# React Native Guidelines

React Native best practices for mobile app development. Contains 16 rules across 7 sections covering performance, architecture, and platform-specific patterns.

## How It Works

1. Reviews React Native code against mobile-specific best practices
2. Identifies performance bottlenecks and platform issues
3. Provides recommendations for animations, gestures, and native modules
4. Focuses on patterns that work well with Expo and bare React Native

## Rules

### Performance (Critical)

- Use `FlashList` instead of `FlatList` for lists (10x faster, better memory)
- Memoize list items with `React.memo()` to prevent unnecessary re-renders
- Move heavy computation to native modules or web workers
- Use `getItemLayout` on FlatList/FlashList for fixed-height items (skips measurement)
- Avoid `ScrollView` for long lists (renders all items upfront)
- Enable Hermes engine for faster startup and lower memory
- Use `removeClippedSubviews` on long lists (Android)

### Layout (High)

- Use `flex` for layouts, avoid absolute positioning where possible
- Handle safe areas with `react-native-safe-area-context`
- Use `KeyboardAvoidingView` or `react-native-keyboard-controller` for inputs
- Avoid nested `ScrollView` components (causes gesture conflicts)
- Use `contentContainerStyle` for ScrollView padding (not `style`)
- Test on multiple screen sizes (small phones, tablets, foldables)

### Animation (High)

- Use `react-native-reanimated` for 60fps animations (runs on UI thread)
- Avoid `Animated` API for complex animations (runs on JS thread)
- Use `useSharedValue` and `useAnimatedStyle` from Reanimated
- Implement gestures with `react-native-gesture-handler`
- Use `withTiming`, `withSpring`, `withDecay` for smooth animations
- Avoid animating layout properties (width/height) - use `transform` instead

### Images (Medium)

- Use `expo-image` for better performance and caching
- Specify `contentFit` prop (cover, contain, fill)
- Implement progressive loading with `placeholder` and `blurRadius`
- Use `priority` prop for above-fold images
- Lazy load images in lists (render placeholder until visible)
- Optimize image sizes for mobile (use responsive images)

### State Management (Medium)

- Use Zustand for global state (lightweight, no context re-render issues)
- Keep component state local when possible
- Use React Compiler (experimental) to auto-memoize components
- Avoid Redux unless you need time-travel debugging or complex middleware
- Use `useSyncExternalStore` for subscribing to native events

### Architecture (Medium)

- Organize by feature, not by type (`features/auth/` not `components/`, `screens/`)
- Use monorepo structure for shared code (Expo + Next.js web)
- Keep business logic separate from UI components
- Use absolute imports with path aliases (`@/components` not `../../components`)
- Implement error boundaries for crash recovery

### Platform (Medium)

- Use `Platform.select()` for platform-specific code
- Test on both iOS and Android (different layout engines)
- Handle platform-specific permissions (camera, location, notifications)
- Use `StatusBar` component to control status bar appearance
- Implement deep linking with Expo Router or React Navigation
- Test on physical devices, not just simulators (performance differs)

## Usage

Apply these guidelines when:
- Building new React Native or Expo apps
- Optimizing mobile app performance
- Implementing animations, gestures, or native features
- Reviewing mobile code for platform-specific issues

## Output Format

Report findings with priority and specific recommendations:

```text
## screens/ProductList.tsx

[Critical] Line 34: Using FlatList for long list
→ Replace with FlashList from @shopify/flash-list for better performance

[High] Line 67: Animating width property
→ Use transform: [{ scaleX }] instead for 60fps animation

[Medium] Line 89: Nested ScrollView detected
→ Refactor to single scrollable container or use SectionList
```

## Present Results to User

Group findings by priority (Critical → High → Medium). Include line numbers and actionable fixes.

## Troubleshooting

- Profile with React DevTools and Flipper
- Use `console.log` sparingly (impacts performance)
- Test on low-end Android devices (performance bottlenecks more visible)
- Enable "Show Perf Monitor" in dev menu to track FPS
