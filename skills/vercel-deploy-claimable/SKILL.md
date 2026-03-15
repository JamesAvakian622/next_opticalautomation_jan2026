---
name: vercel-deploy-claimable
description: Deploy applications and websites to Vercel instantly. Use when asked to "Deploy my app", "Deploy this to production", "Push this live", or "Deploy and give me the link".
---

# Vercel Deploy (Claimable)

Deploy applications and websites to Vercel instantly. Deployments are "claimable" - users can transfer ownership to their own Vercel account.

## How It Works

1. Packages your project into a tarball (excludes node_modules, .git)
2. Auto-detects framework from package.json (40+ frameworks supported)
3. Uploads to deployment service
4. Returns preview URL (live site) and claim URL (transfer ownership)

## Supported Frameworks

Auto-detected from package.json:
- Next.js, Vite, Astro, SvelteKit, Nuxt, Remix
- Create React App, Vue, Angular, Svelte
- Gatsby, Eleventy, Hugo, Jekyll
- Static HTML (if no package.json found)

## Usage

```bash
bash /mnt/skills/user/vercel-deploy-claimable/scripts/deploy.sh [directory]
```

**Arguments:**
- `directory` - Project directory to deploy (defaults to current directory)

**Examples:**

Deploy current directory:
```bash
bash /mnt/skills/user/vercel-deploy-claimable/scripts/deploy.sh
```

Deploy specific project:
```bash
bash /mnt/skills/user/vercel-deploy-claimable/scripts/deploy.sh ./my-app
```

## Output

```json
{
  "success": true,
  "previewUrl": "https://skill-deploy-abc123.vercel.app",
  "claimUrl": "https://vercel.com/claim-deployment?code=xyz789",
  "framework": "nextjs",
  "buildTime": "45s"
}
```

## Present Results to User

```
Deployment successful! 🚀

Preview URL: https://skill-deploy-abc123.vercel.app
Claim URL:   https://vercel.com/claim-deployment?code=xyz789

Your site is live! Visit the preview URL to see it.

To transfer ownership to your Vercel account:
1. Visit the claim URL
2. Sign in to Vercel
3. Click "Claim Deployment"

The deployment will then appear in your Vercel dashboard.
```

## Troubleshooting

**"Failed to detect framework"**
- Ensure package.json exists with valid dependencies
- For static HTML, create empty package.json: `echo '{}' > package.json`

**"Build failed"**
- Check build logs in deployment output
- Verify build command in package.json scripts
- Ensure all dependencies are in package.json (not just devDependencies)

**"Upload timeout"**
- Large projects (>100MB) may timeout
- Add files to .gitignore to reduce size
- Ensure node_modules is excluded (automatic)

**"Network error"**
- Check internet connection
- Verify deployment service is accessible
- Try again in a few moments
