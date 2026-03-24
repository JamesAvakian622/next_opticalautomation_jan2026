# Cloudflare Zero Trust Access + Clerk (checklist)

Use this when putting **www.OpticalAutomation.com** (or another hostname) behind Cloudflare **in addition to** Clerk application auth. All steps are performed in the **Cloudflare dashboard** and your **DNS** provider unless noted.

## 2 — Human access (Access application)

1. In Cloudflare Zero Trust, create an **Access application** for the hostname that serves the Next.js app (e.g. `www.OpticalAutomation.com`).
2. Choose an **identity provider** (One-time PIN, Google Workspace, Okta, etc.) for who may pass Cloudflare’s gate.
3. Add an **Access policy** (e.g. allow emails ending in `@yourcompany.com`, or allow a named group). Decide whether **every** page is behind Access or only specific paths (path-based policies).
4. Confirm **SSL/TLS** mode is compatible with your origin (usually **Full (strict)** when the origin has a valid cert).
5. Orange-cloud (`proxied`) the DNS record for that hostname so traffic hits Cloudflare first.

## 2A — Installation verification (do not break Clerk)

Clerk uses redirects, cookies, and (optionally) paths like `/__clerk` if you enable Clerk’s **frontend API proxy**. Test the following **before** calling the rollout done.

- **OAuth / sign-in redirects**: Clerk redirects to `accounts.dev` / `clerk.*` hosts (or your custom domain). Cloudflare Access must **not** require a second login on those external URLs—only your **app hostname** is typically behind Access.
- **Cookies**: Ensure Access session cookies and Clerk session cookies can coexist (same-site issues are rare but watch for subdomain vs apex mismatches).
- **API routes**: Your app uses `proxy.js` with `auth.protect()` for most `/api` routes. Cloudflare should forward `Cookie` and standard headers unchanged.
- **Bypass for automation (optional)**: For CI or health checks, use a **service auth** rule, **WARP/device posture**, or a dedicated unauthenticated path—never weaken Clerk on user-facing routes.
- **Clerk frontend API proxy**: If you later set `frontendApiProxy` and `NEXT_PUBLIC_CLERK_PROXY_URL`, extend the proxy matcher to include `__clerk` per Clerk docs and add matching **Bypass** or **Skip** policies in Access only if Clerk documents require it.

## 2B — Post-deploy verification (smoke tests)

Run these after DNS and Access are live.

| Step | Action | Expected |
|------|--------|----------|
| 1 | Open the site in a **logged-out** browser | If Access protects the whole site: Cloudflare login appears. If only app auth: your Next.js page or Clerk sign-in. |
| 2 | Complete Cloudflare Access (if enabled) | Reach the Next.js app without infinite redirect loops. |
| 3 | **Sign in with Clerk** (`/sign-in`) | Successful session; dashboard or protected route loads. |
| 4 | **Sign up** (`/sign-up`) | Completes without CORS/cookie errors. |
| 5 | `forgot-password` / `reset-password` | Pages load when unauthenticated (they are on the public allowlist in `proxy.js`). |
| 6 | Authenticated **API** call (e.g. tenant-scoped endpoint) | `401` when logged out, `200` when logged in with correct org context. |

Document any hostname-specific exceptions (staging vs production) in your internal runbook.
