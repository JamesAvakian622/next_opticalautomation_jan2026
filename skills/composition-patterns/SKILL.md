---
name: composition-patterns
description: React composition patterns that scale. Use when refactoring components with many boolean props, building reusable component libraries, or designing flexible APIs.
---

# Composition Patterns

React composition patterns that help avoid boolean prop proliferation through compound components, state lifting, and internal composition.

## How It Works

1. Identifies components with excessive boolean props
2. Suggests composition patterns to simplify APIs
3. Shows how to extract compound components
4. Demonstrates state lifting and internal composition

## Patterns

### Pattern 1: Extract Compound Components

**Problem:** Component with many boolean props controlling variants

```tsx
<Card 
  hasImage 
  hasFooter 
  hasHeader 
  isHighlighted 
  showBorder
/>
```

**Solution:** Compose from smaller components

```tsx
<Card>
  <Card.Header />
  <Card.Image />
  <Card.Body />
  <Card.Footer />
</Card>
```

**Benefits:**
- More flexible (can reorder, conditionally render)
- Clearer intent (explicit structure)
- Easier to extend (add new sections without props)

### Pattern 2: Lift State to Reduce Props

**Problem:** Parent passing many props to control child behavior

```tsx
<Tabs 
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={tabs}
  renderContent={renderContent}
/>
```

**Solution:** Let parent control state, child handles UI

```tsx
const [activeTab, setActiveTab] = useState(0)

<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab>Profile</Tabs.Tab>
    <Tabs.Tab>Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel>Profile content</Tabs.Panel>
  <Tabs.Panel>Settings content</Tabs.Panel>
</Tabs>
```

**Benefits:**
- Parent controls state (single source of truth)
- Child components handle presentation
- Easy to add custom behavior (keyboard nav, animations)

### Pattern 3: Compose Internals for Flexibility

**Problem:** Component tries to handle all use cases with props

```tsx
<Modal
  title="Delete Item"
  description="Are you sure?"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDelete}
  onCancel={handleCancel}
  variant="danger"
/>
```

**Solution:** Provide building blocks, let users compose

```tsx
<Modal>
  <Modal.Header>
    <Modal.Title>Delete Item</Modal.Title>
    <Modal.Close />
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this item?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </Modal.Footer>
</Modal>
```

**Benefits:**
- Users can customize layout and content
- No need to anticipate every use case
- Component stays simple and focused

### Pattern 4: Context for Implicit Prop Passing

**Problem:** Drilling props through multiple levels

```tsx
<Select value={value} onChange={onChange}>
  <SelectTrigger value={value} />
  <SelectContent>
    <SelectItem value="1" onChange={onChange} />
    <SelectItem value="2" onChange={onChange} />
  </SelectContent>
</Select>
```

**Solution:** Use context to share state implicitly

```tsx
// Internal context handles state
<Select value={value} onChange={onChange}>
  <SelectTrigger /> {/* Gets value from context */}
  <SelectContent>
    <SelectItem value="1" /> {/* Gets onChange from context */}
    <SelectItem value="2" />
  </SelectContent>
</Select>
```

**Benefits:**
- Cleaner API (no prop drilling)
- Components automatically connected
- Easy to add new child components

## When to Use Each Pattern

**Compound Components:** Component has multiple distinct sections (Card, Modal, Tabs)

**State Lifting:** Parent needs control over behavior (controlled inputs, custom validation)

**Internal Composition:** Component has many visual variants (Button, Badge, Alert)

**Context:** Deep component tree with shared state (Select, Accordion, RadioGroup)

## Anti-patterns to Avoid

- Too many boolean props (>3 suggests need for composition)
- Props that control multiple things (`size` affecting padding, font, and icon)
- Render props for simple cases (use children instead)
- Exposing internal state unnecessarily (keep it private if possible)

## Usage

Apply these patterns when:
- Component has >5 boolean props
- Adding new feature requires new prop
- Users request customization you didn't anticipate
- Component API feels rigid or limiting

## Output Format

Suggest specific refactoring with before/after code:

```text
## components/Card.tsx

[Refactor] Lines 15-45: Component has 8 boolean props
→ Extract compound components: Card.Header, Card.Body, Card.Footer

Before:
<Card hasHeader hasFooter showBorder isHighlighted />

After:
<Card highlighted border>
  <Card.Header />
  <Card.Body />
  <Card.Footer />
</Card>
```

## Present Results to User

Show concrete refactoring suggestions with code examples. Explain benefits of composition approach.

## Troubleshooting

- Start with one pattern, don't refactor everything at once
- Keep backward compatibility with deprecated props
- Document composition patterns in Storybook or docs
- Use TypeScript to enforce correct composition
