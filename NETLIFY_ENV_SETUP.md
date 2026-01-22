# Netlify Environment Variables Setup Guide

## Quick Fix for "Internal Server Error" at Login

The login error is caused by missing MongoDB environment variables in your Netlify deployment.

## Steps to Fix

### 1. Go to Netlify Dashboard
Visit: https://app.netlify.com/

### 2. Select Your Site
Find and click on: **next_opticalautomation_jan2026**

### 3. Navigate to Environment Variables
- Click **Site settings** (in the top navigation)
- Scroll down and click **Environment variables** (in the left sidebar)

### 4. Add Each Variable

Click **Add a variable** and add these one by one:

| Variable Name | Value |
|--------------|-------|
| `MONGODB_URI` | Your MongoDB connection string from `.env` file |
| `MONGODB_DB` | `optical_automation` |
| `JWT_SECRET` | Your JWT secret from `.env` file |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | Your Gmail address |
| `SMTP_PASSWORD` | Your Gmail app password |
| `CONTACT_EMAIL` | Your contact email address |

> [!NOTE]
> Copy the actual values from your local `.env` file. Do NOT use placeholder text - use your real credentials in Netlify's dashboard.

### 5. Deploy Settings
- For each variable, set the scope to **All scopes** (or choose specific deploy contexts)
- Click **Save** after adding all variables

### 6. Trigger Redeploy
After adding all variables:
- Go to **Deploys** tab
- Click **Trigger deploy** → **Deploy site**

### 7. Wait for Deployment
The site will redeploy with the new environment variables. This takes about 1-2 minutes.

## Testing
Once redeployed, try logging in again. The error should be resolved!

## Note
If you're testing **locally** and getting this error:
- Make sure your `.env` file exists in the project root
- Verify it contains the `MONGODB_URI` variable
- Restart your dev server: `npm run dev`
