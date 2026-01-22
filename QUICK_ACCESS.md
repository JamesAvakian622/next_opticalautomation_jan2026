# Quick Access Guide - Software Selection System

## 🔗 Direct URLs

### For Testing Right Now:

1. **Registration Page**
   - URL: `http://localhost:3000/register`
   - Create a new account here
   - Auto-redirects to software selection after signup

2. **Software Selection Page** (Main Feature!)
   - URL: `http://localhost:3000/select-software`
   - Select apps with checkboxes
   - See price totals
   - Save selections to MongoDB

3. **Subscription Page** (Already exists)
   - URL: `http://localhost:3000/subscription`
   - Choose tier (Individual/Silver/Gold)

4. **Login Page** (If exists)
   - URL: `http://localhost:3000/login`
   - Login with existing account

## 📝 How to Test

### Step 1: Start the App
```bash
# Already running on port 3000
npm run dev
```

### Step 2: Set Up MongoDB
Add to `.env` file:
```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=optical_automation
JWT_SECRET=my-secret-key-123
```

### Step 3: Test the Flow
1. Go to `http://localhost:3000/register`
2. Create account (name, email, password)
3. Auto-redirects to `http://localhost:3000/select-software`
4. Select apps (up to your tier limit)
5. Click "Save Selections"
6. See price summary at bottom

## 🎯 Main Features Location

**Software Selection with Checkboxes:**
- File: `/app/select-software/SelectSoftwarePage.jsx`
- Access: `http://localhost:3000/select-software`

**40 Apps with Descriptions:**
- File: `/lib/softwareData.js`
- Displayed on selection page

**Price Totals:**
- Shown at bottom of selection page
- Shows: Tier, Selected apps count, Annual cost

## 🔧 Adding to Navigation (Optional)

To add links to the navigation menu, you can:
1. Add "Register" button to top nav
2. Add "My Software" link when logged in
3. Add "Dashboard" link

Would you like me to add these navigation links now?
