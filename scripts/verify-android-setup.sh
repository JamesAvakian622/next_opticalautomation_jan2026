#!/bin/bash

# Android Setup Verification Script
# Run this after installing Android Studio to verify everything is configured correctly

set -e

echo "🔍 Verifying Android Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
ALL_GOOD=true

# Function to check command
check_command() {
    local cmd=$1
    local name=$2
    
    if command -v "$cmd" &> /dev/null; then
        echo -e "${GREEN}✅ $name found${NC}"
        return 0
    else
        echo -e "${RED}❌ $name not found${NC}"
        ALL_GOOD=false
        return 1
    fi
}

# Function to check environment variable
check_env_var() {
    local var_name=$1
    local var_value="${!var_name}"
    
    if [ -n "$var_value" ]; then
        echo -e "${GREEN}✅ $var_name is set${NC}"
        echo "   → $var_value"
        return 0
    else
        echo -e "${RED}❌ $var_name is not set${NC}"
        ALL_GOOD=false
        return 1
    fi
}

# Function to check directory
check_directory() {
    local dir=$1
    local name=$2
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $name exists${NC}"
        echo "   → $dir"
        return 0
    else
        echo -e "${RED}❌ $name not found${NC}"
        echo "   → Expected at: $dir"
        ALL_GOOD=false
        return 1
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Checking Java Installation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if check_command "java" "Java"; then
    JAVA_VERSION=$(java --version 2>&1 | head -n 1)
    echo "   → $JAVA_VERSION"
    
    if [[ $JAVA_VERSION == *"17"* ]]; then
        echo -e "${GREEN}   ✓ Java 17 detected${NC}"
    else
        echo -e "${YELLOW}   ⚠ Java 17 recommended, but found different version${NC}"
    fi
fi

check_env_var "JAVA_HOME"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Checking Android SDK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_env_var "ANDROID_HOME"
check_directory "$ANDROID_HOME" "Android SDK directory"

if [ -d "$ANDROID_HOME" ]; then
    # Check for specific SDK components
    if [ -d "$ANDROID_HOME/platform-tools" ]; then
        echo -e "${GREEN}✅ Platform tools installed${NC}"
    else
        echo -e "${RED}❌ Platform tools not found${NC}"
        ALL_GOOD=false
    fi
    
    if [ -d "$ANDROID_HOME/emulator" ]; then
        echo -e "${GREEN}✅ Emulator installed${NC}"
    else
        echo -e "${RED}❌ Emulator not found${NC}"
        ALL_GOOD=false
    fi
    
    # Check for platforms
    if [ -d "$ANDROID_HOME/platforms" ]; then
        PLATFORMS=$(ls "$ANDROID_HOME/platforms" 2>/dev/null | wc -l | tr -d ' ')
        if [ "$PLATFORMS" -gt 0 ]; then
            echo -e "${GREEN}✅ Android platforms installed ($PLATFORMS)${NC}"
            ls "$ANDROID_HOME/platforms" | sed 's/^/   → /'
        else
            echo -e "${YELLOW}⚠ No Android platforms installed${NC}"
        fi
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Checking Android Tools"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_command "adb" "Android Debug Bridge (adb)"
check_command "emulator" "Android Emulator"

if command -v emulator &> /dev/null; then
    echo ""
    echo "Available AVDs (Android Virtual Devices):"
    AVD_LIST=$(emulator -list-avds 2>/dev/null)
    if [ -n "$AVD_LIST" ]; then
        echo "$AVD_LIST" | sed 's/^/   → /'
    else
        echo -e "${YELLOW}   ⚠ No AVDs created yet${NC}"
        echo "   Create one in Android Studio: Tools → Device Manager → Create Device"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Checking Capacitor Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "capacitor.config.ts" ]; then
    echo -e "${GREEN}✅ capacitor.config.ts found${NC}"
else
    echo -e "${RED}❌ capacitor.config.ts not found${NC}"
    ALL_GOOD=false
fi

if [ -d "android" ]; then
    echo -e "${GREEN}✅ Android project directory exists${NC}"
else
    echo -e "${RED}❌ Android project directory not found${NC}"
    ALL_GOOD=false
fi

if [ -f "android/app/build.gradle" ]; then
    echo -e "${GREEN}✅ Android build.gradle found${NC}"
    
    # Check app ID
    APP_ID=$(grep "applicationId" android/app/build.gradle | sed 's/.*"\(.*\)".*/\1/')
    if [ -n "$APP_ID" ]; then
        echo "   → App ID: $APP_ID"
    fi
else
    echo -e "${RED}❌ Android build.gradle not found${NC}"
    ALL_GOOD=false
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Checking Node.js & Dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_command "node" "Node.js"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "   → $NODE_VERSION"
fi

check_command "npm" "npm"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "   → v$NPM_VERSION"
fi

if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json found${NC}"
    
    # Check for Capacitor dependencies
    if grep -q "@capacitor/android" package.json; then
        echo -e "${GREEN}✅ @capacitor/android installed${NC}"
    else
        echo -e "${YELLOW}⚠ @capacitor/android not found in package.json${NC}"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$ALL_GOOD" = true ]; then
    echo -e "${GREEN}✅ All checks passed! Your Android development environment is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npx cap sync android"
    echo "  2. Run: npx cap open android"
    echo "  3. In Android Studio, click the Run button (▶️)"
    echo ""
    echo "Or use the quick start script:"
    echo "  ./scripts/run-android.sh"
else
    echo -e "${RED}❌ Some checks failed. Please review the errors above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "  • Install Android Studio: https://developer.android.com/studio"
    echo "  • Reload shell config: source ~/.zshrc"
    echo "  • Install SDK components in Android Studio: Tools → SDK Manager"
    echo "  • Create an AVD: Tools → Device Manager → Create Device"
fi

echo ""
