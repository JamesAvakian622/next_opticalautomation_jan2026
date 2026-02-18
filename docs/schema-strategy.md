# MongoDB Multi-Tenant Schema Strategy

## Architecture: Shared Database, Per-Org Field

All tenants share a single MongoDB database (`optical_automation`). Every tenant-scoped document carries an `orgId` field that references the organization it belongs to. Compound indexes on `{ orgId, ... }` ensure query performance.

## Why This Approach

| Approach | Pros | Cons |
|---|---|---|
| **Separate DB per tenant** | Full isolation | Connection pool exhaustion, complex migrations |
| **Separate collection per tenant** | Moderate isolation | Hard to manage indexes at scale |
| **Shared DB + orgId field** ✅ | Simple ops, easy migrations, single connection pool | Requires discipline on scoping queries |

For a SaaS app at this stage (sub-1000 tenants), shared DB with orgId scoping is the standard choice. It can be migrated to sharded collections later if needed.

## Collections

### `organizations`
The root tenant record. Maps a Clerk org to a slug and plan.

```
{ clerkOrgId, slug (unique), name, ownerId, plan, settings, createdAt }
```

### `org_users`
Membership junction table. Links Clerk users to organizations with roles.

```
{ orgId, clerkUserId, email, name, role, customRoleId?, invitedBy, joinedAt }
```

### `projects`
Primary business entity. Every project belongs to one org.

```
{ orgId, name, description, status, ownerId, tags[], metadata{}, createdAt }
```

### `billing`
One record per org. Tracks Stripe subscription + invoice history.

```
{ orgId (unique), plan, stripeCustomerId?, stripeSubscriptionId?, seats, currentPeriodEnd, invoiceHistory[] }
```

### `roles`
Custom permission roles per org. Defaults seeded on org creation.

```
{ orgId, name, description, permissions[], isDefault, createdAt }
```

## Indexes

| Collection | Index | Type |
|---|---|---|
| organizations | `{ clerkOrgId: 1 }` | Unique |
| organizations | `{ slug: 1 }` | Unique |
| org_users | `{ orgId: 1, clerkUserId: 1 }` | Unique compound |
| org_users | `{ clerkUserId: 1 }` | Lookup |
| projects | `{ orgId: 1, status: 1 }` | Compound |
| projects | `{ orgId: 1, name: 1 }` | Unique compound |
| billing | `{ orgId: 1 }` | Unique |
| roles | `{ orgId: 1, name: 1 }` | Unique compound |

## Query Scoping

All service methods use `scopeToOrg(orgId, filter)` which prepends `{ orgId }` to every query. This is enforced at the service layer — API routes never query MongoDB directly.

## Setup

```bash
npm run setup-indexes
```

This creates all indexes and applies collection validators.
