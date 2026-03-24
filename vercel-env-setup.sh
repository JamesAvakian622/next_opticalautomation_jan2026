#!/bin/bash
# Safe Clerk env setup for Vercel.
# Requires:
#   CLERK_PROD_PUBLISHABLE_KEY=pk_live_...
#   CLERK_PROD_SECRET_KEY=sk_live_...

set -euo pipefail

if [[ -z "${CLERK_PROD_PUBLISHABLE_KEY:-}" || -z "${CLERK_PROD_SECRET_KEY:-}" ]]; then
  echo "Missing required env vars."
  echo "Set CLERK_PROD_PUBLISHABLE_KEY (pk_live_...) and CLERK_PROD_SECRET_KEY (sk_live_...)."
  exit 1
fi

if [[ "${CLERK_PROD_PUBLISHABLE_KEY}" != pk_live_* || "${CLERK_PROD_SECRET_KEY}" != sk_live_* ]]; then
  echo "Production keys must be live keys (pk_live_... / sk_live_...)."
  exit 1
fi

echo "Setting Clerk PRODUCTION env vars in Vercel..."

vercel env rm NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --yes >/dev/null 2>&1 || true
vercel env rm CLERK_SECRET_KEY production --yes >/dev/null 2>&1 || true

vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production <<< "${CLERK_PROD_PUBLISHABLE_KEY}"
vercel env add CLERK_SECRET_KEY production <<< "${CLERK_PROD_SECRET_KEY}"

vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production <<< "/sign-in"
vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production <<< "/sign-up"
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL production <<< "/"
vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL production <<< "/"

echo "Done. Deploy production with: vercel --prod"
