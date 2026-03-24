function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function isTestKey(value) {
    return typeof value === 'string' && (value.startsWith('pk_test_') || value.startsWith('sk_test_'));
}

export function validateClerkEnvForProduction() {
    if (process.env.NODE_ENV !== 'production') return;

    // `next build` sets NODE_ENV=production locally; allow test keys unless deploying to
    // Vercel Production or explicitly enforcing (self‑hosted prod should set CLERK_ENFORCE_LIVE_KEYS=1).
    const enforceLiveKeys =
        process.env.VERCEL_ENV === 'production' || process.env.CLERK_ENFORCE_LIVE_KEYS === '1';

    if (!enforceLiveKeys) return;

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;

    if (!isNonEmptyString(publishableKey) || !isNonEmptyString(secretKey)) {
        throw new Error('Clerk production keys are required: set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY.');
    }

    if (isTestKey(publishableKey) || isTestKey(secretKey)) {
        throw new Error('Clerk test keys are not allowed in production. Use pk_live_ and sk_live_ keys.');
    }
}

export function hasClerkPublishableKey() {
    return isNonEmptyString(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}
