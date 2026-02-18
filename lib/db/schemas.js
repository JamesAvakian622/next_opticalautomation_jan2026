/**
 * MongoDB Document Shape Definitions & Validators
 * Multi-tenant SaaS — every document carries an orgId for tenant isolation.
 */

// ─── Organization ──────────────────────────────────────────────────────────────

export const OrganizationSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['clerkOrgId', 'slug', 'name', 'ownerId', 'plan', 'createdAt'],
      properties: {
        clerkOrgId: { bsonType: 'string', description: 'Clerk organization ID' },
        slug: { bsonType: 'string', description: 'URL-safe org slug (unique)' },
        name: { bsonType: 'string', description: 'Display name of the organization' },
        ownerId: { bsonType: 'string', description: 'Clerk user ID of the org owner' },
        plan: {
          bsonType: 'string',
          enum: ['free', 'silver', 'gold', 'enterprise'],
          description: 'Subscription plan tier',
        },
        settings: {
          bsonType: 'object',
          description: 'Org-level settings (logo, theme, etc.)',
          properties: {
            logoUrl: { bsonType: 'string' },
            primaryColor: { bsonType: 'string' },
            features: { bsonType: 'array', items: { bsonType: 'string' } },
          },
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
    },
  },
  indexes: [
    { key: { clerkOrgId: 1 }, options: { unique: true, name: 'idx_clerkOrgId' } },
    { key: { slug: 1 }, options: { unique: true, name: 'idx_slug' } },
    { key: { ownerId: 1 }, options: { name: 'idx_ownerId' } },
  ],
};

// ─── Org Users (membership) ────────────────────────────────────────────────────

export const OrgUserSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orgId', 'clerkUserId', 'email', 'role', 'joinedAt'],
      properties: {
        orgId: { bsonType: 'string', description: 'Organization _id reference' },
        clerkUserId: { bsonType: 'string', description: 'Clerk user ID' },
        email: { bsonType: 'string' },
        name: { bsonType: 'string' },
        role: {
          bsonType: 'string',
          enum: ['owner', 'admin', 'editor', 'viewer'],
          description: 'Role within the organization',
        },
        customRoleId: { bsonType: 'string', description: 'Optional custom role _id' },
        invitedBy: { bsonType: 'string', description: 'Clerk user ID of inviter' },
        joinedAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
    },
  },
  indexes: [
    { key: { orgId: 1, clerkUserId: 1 }, options: { unique: true, name: 'idx_org_user' } },
    { key: { orgId: 1, email: 1 }, options: { name: 'idx_org_email' } },
    { key: { clerkUserId: 1 }, options: { name: 'idx_clerkUserId' } },
  ],
};

// ─── Projects ──────────────────────────────────────────────────────────────────

export const ProjectSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orgId', 'name', 'status', 'createdAt'],
      properties: {
        orgId: { bsonType: 'string', description: 'Organization _id reference' },
        name: { bsonType: 'string' },
        description: { bsonType: 'string' },
        status: {
          bsonType: 'string',
          enum: ['active', 'archived', 'draft'],
        },
        ownerId: { bsonType: 'string', description: 'Clerk user ID of project owner' },
        tags: { bsonType: 'array', items: { bsonType: 'string' } },
        metadata: { bsonType: 'object' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
    },
  },
  indexes: [
    { key: { orgId: 1, status: 1 }, options: { name: 'idx_org_status' } },
    { key: { orgId: 1, name: 1 }, options: { unique: true, name: 'idx_org_name' } },
    { key: { orgId: 1, ownerId: 1 }, options: { name: 'idx_org_owner' } },
  ],
};

// ─── Billing ───────────────────────────────────────────────────────────────────

export const BillingSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orgId', 'plan', 'createdAt'],
      properties: {
        orgId: { bsonType: 'string', description: 'Organization _id reference (unique)' },
        plan: {
          bsonType: 'string',
          enum: ['free', 'silver', 'gold', 'enterprise'],
        },
        stripeCustomerId: { bsonType: 'string' },
        stripeSubscriptionId: { bsonType: 'string' },
        seats: { bsonType: 'int', description: 'Number of paid seats' },
        currentPeriodEnd: { bsonType: 'date' },
        cancelAtPeriodEnd: { bsonType: 'bool' },
        invoiceHistory: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              invoiceId: { bsonType: 'string' },
              amount: { bsonType: 'int' },
              currency: { bsonType: 'string' },
              status: { bsonType: 'string' },
              date: { bsonType: 'date' },
            },
          },
        },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
    },
  },
  indexes: [
    { key: { orgId: 1 }, options: { unique: true, name: 'idx_billing_org' } },
    { key: { stripeCustomerId: 1 }, options: { sparse: true, name: 'idx_stripe_customer' } },
  ],
};

// ─── Roles (custom per-org) ────────────────────────────────────────────────────

export const RoleSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['orgId', 'name', 'permissions', 'createdAt'],
      properties: {
        orgId: { bsonType: 'string', description: 'Organization _id reference' },
        name: { bsonType: 'string', description: 'Role display name' },
        description: { bsonType: 'string' },
        permissions: {
          bsonType: 'array',
          items: { bsonType: 'string' },
          description: 'Permission keys, e.g. projects:write, billing:read',
        },
        isDefault: { bsonType: 'bool', description: 'Whether this is a default system role' },
        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
    },
  },
  indexes: [
    { key: { orgId: 1, name: 1 }, options: { unique: true, name: 'idx_role_org_name' } },
    { key: { orgId: 1, isDefault: 1 }, options: { name: 'idx_role_defaults' } },
  ],
};

// ─── Available Permissions ─────────────────────────────────────────────────────

export const PERMISSIONS = {
  PROJECTS_READ: 'projects:read',
  PROJECTS_WRITE: 'projects:write',
  PROJECTS_DELETE: 'projects:delete',
  USERS_READ: 'users:read',
  USERS_INVITE: 'users:invite',
  USERS_MANAGE: 'users:manage',
  BILLING_READ: 'billing:read',
  BILLING_MANAGE: 'billing:manage',
  ROLES_READ: 'roles:read',
  ROLES_MANAGE: 'roles:manage',
  ORG_SETTINGS: 'org:settings',
};

// ─── Default Roles seeded on org creation ──────────────────────────────────────

export const DEFAULT_ROLES = [
  {
    name: 'Admin',
    description: 'Full access to all organization resources',
    permissions: Object.values(PERMISSIONS),
    isDefault: true,
  },
  {
    name: 'Editor',
    description: 'Can manage projects and view billing',
    permissions: [
      PERMISSIONS.PROJECTS_READ,
      PERMISSIONS.PROJECTS_WRITE,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.BILLING_READ,
      PERMISSIONS.ROLES_READ,
    ],
    isDefault: true,
  },
  {
    name: 'Viewer',
    description: 'Read-only access to projects',
    permissions: [
      PERMISSIONS.PROJECTS_READ,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.ROLES_READ,
    ],
    isDefault: true,
  },
];

// ─── Collection names ──────────────────────────────────────────────────────────

export const COLLECTIONS = {
  ORGANIZATIONS: 'organizations',
  ORG_USERS: 'org_users',
  PROJECTS: 'projects',
  BILLING: 'billing',
  ROLES: 'roles',
};

// ─── Schema map for programmatic access ────────────────────────────────────────

export const SCHEMA_MAP = {
  [COLLECTIONS.ORGANIZATIONS]: OrganizationSchema,
  [COLLECTIONS.ORG_USERS]: OrgUserSchema,
  [COLLECTIONS.PROJECTS]: ProjectSchema,
  [COLLECTIONS.BILLING]: BillingSchema,
  [COLLECTIONS.ROLES]: RoleSchema,
};
