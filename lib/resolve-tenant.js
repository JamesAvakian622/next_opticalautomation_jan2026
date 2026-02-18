/**
 * Tenant Resolution Helper
 * Unifies subdomain + path-based + header-based tenant detection.
 *
 * Usage (middleware):
 *   const tenant = resolveTenant(request);
 *
 * Usage (API route):
 *   const tenant = resolveTenantFromHeaders(request.headers);
 */

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'opticalautomation.com';

/**
 * Resolves tenant information from a Next.js request object.
 *
 * Resolution order:
 * 1. Subdomain:  acme.opticalautomation.com → slug "acme"
 * 2. Path prefix: /org/acme/dashboard      → slug "acme"
 * 3. Header:     x-clerk-org-id            → orgId directly
 * 4. Query param: ?orgId=xxx               → orgId directly
 *
 * @param {Request} request - Next.js Request object
 * @returns {{ orgSlug?: string, orgId?: string, source: string } | null}
 */
export function resolveTenant(request) {
    const url = new URL(request.url);

    // 1. Subdomain detection
    const hostname = url.hostname;
    const subdomain = extractSubdomain(hostname);
    if (subdomain) {
        return { orgSlug: subdomain, orgId: null, source: 'subdomain' };
    }

    // 2. Path prefix detection:  /org/:slug/...
    const pathMatch = url.pathname.match(/^\/org\/([a-zA-Z0-9_-]+)(\/|$)/);
    if (pathMatch) {
        return { orgSlug: pathMatch[1], orgId: null, source: 'path' };
    }

    // 3. Clerk org header (set by Clerk middleware or custom headers)
    const clerkOrgId = request.headers.get('x-clerk-org-id');
    if (clerkOrgId) {
        return { orgSlug: null, orgId: clerkOrgId, source: 'header' };
    }

    // 4. Query parameter fallback (useful for API testing)
    const queryOrgId = url.searchParams.get('orgId');
    if (queryOrgId) {
        return { orgSlug: null, orgId: queryOrgId, source: 'query' };
    }

    return null;
}

/**
 * Resolve tenant from already-set headers (for use in API routes).
 * Expects middleware to have set x-tenant-slug and x-tenant-id.
 *
 * @param {Headers} headers
 * @returns {{ orgSlug?: string, orgId?: string } | null}
 */
export function resolveTenantFromHeaders(headers) {
    const slug = headers.get('x-tenant-slug');
    const id = headers.get('x-tenant-id');

    if (slug || id) {
        return { orgSlug: slug || null, orgId: id || null };
    }

    return null;
}

/**
 * Extract a subdomain from a hostname, ignoring www, localhost, and the root domain.
 *
 * @param {string} hostname
 * @returns {string | null}
 */
function extractSubdomain(hostname) {
    // Skip localhost and IP addresses
    if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.')
    ) {
        return null;
    }

    // Remove port if present (shouldn't be in hostname, but safe check)
    const cleanHost = hostname.split(':')[0];

    // Check if it's a subdomain of the root domain
    if (cleanHost.endsWith(`.${ROOT_DOMAIN}`)) {
        const sub = cleanHost.slice(0, -(ROOT_DOMAIN.length + 1));
        // Ignore 'www' as a tenant subdomain
        if (sub && sub !== 'www') {
            return sub;
        }
    }

    return null;
}

/**
 * Validate an org slug format.
 * @param {string} slug
 * @returns {boolean}
 */
export function isValidOrgSlug(slug) {
    return /^[a-zA-Z0-9][a-zA-Z0-9_-]{1,62}[a-zA-Z0-9]$/.test(slug);
}

/**
 * Slugify a name into a URL-safe org slug.
 * @param {string} name
 * @returns {string}
 */
export function slugifyOrgName(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 64);
}
