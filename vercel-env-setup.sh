#!/bin/bash
# Script to add Clerk environment variables to Vercel

echo "Adding Clerk environment variables to Vercel..."

vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production preview development << EOF
pk_test_dmFsaWQtbWFsYW11dGUtODEuY2xlcmsuYWNjb3VudHMuZGV2JA
EOF

vercel env add CLERK_SECRET_KEY production preview development << EOF
sk_test_aUbMi8kgGMu0YUM40wpjAhOu8OCBjAQJAvrlEtc31c
EOF

vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production preview development << EOF
/login
EOF

vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production preview development << EOF
/register
EOF

vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL production preview development << EOF
/select-software
EOF

vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL production preview development << EOF
/select-software
EOF

echo "Done! Now redeploy with: vercel --prod"
