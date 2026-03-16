#!/bin/bash

# Quick Android App Launch Script
# Syncs Capacitor and opens Android Studio

set -e

echo "🚀 Launching Android App..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if Android Studio is installed
if [ ! -d "/Applications/Android Studio.app" ]; then
    echo -e "${YELLOW}⚠ Android Studio not found in /Applications${NC}"
    echo "Please install Android Studio first: https://developer.android.com/studio"
    exit 1
fi

# Step 1: Sync Capacitor
echo "📦 Step 1: Syncing Capacitor..."
npx cap sync android

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Sync complete${NC}"
else
    echo "❌ Sync failed"
    exit 1
fi

echo ""

# Step 2: Open Android Studio
echo "🔧 Step 2: Opening Android Studio..."
npx cap open android

echo ""
echo -e "${GREEN}✅ Android Studio should now be opening${NC}"
echo ""
echo "Next steps in Android Studio:"
echo "  1. Wait for Gradle sync to complete"
echo "  2. Select an emulator from the device dropdown"
echo "  3. Click the green Run button (▶️)"
echo ""
echo "If you don't have an emulator:"
echo "  1. Click Device Manager (phone icon)"
echo "  2. Click Create Device"
echo "  3. Select Pixel 6 or 7"
echo "  4. Choose API 34 (Android 14)"
echo "  5. Click Finish"
echo ""
