#!/bin/bash

# Create Android Emulator via Command Line
# Alternative to creating via Android Studio UI

set -e

echo "📱 Creating Android Emulator..."
echo ""

# Check if sdkmanager is available
if ! command -v sdkmanager &> /dev/null; then
    echo "❌ sdkmanager not found"
    echo "Make sure ANDROID_HOME is set and Android SDK is installed"
    exit 1
fi

# Check if avdmanager is available
if ! command -v avdmanager &> /dev/null; then
    echo "❌ avdmanager not found"
    echo "Make sure ANDROID_HOME is set and Android SDK is installed"
    exit 1
fi

# Configuration
DEVICE_NAME="Pixel_6_API_34"
SYSTEM_IMAGE="system-images;android-34;google_apis;arm64-v8a"
DEVICE_TYPE="pixel_6"

echo "Configuration:"
echo "  Device: Pixel 6"
echo "  API Level: 34 (Android 14)"
echo "  System Image: $SYSTEM_IMAGE"
echo ""

# Step 1: Check if system image is installed
echo "📦 Step 1: Checking system image..."
if sdkmanager --list | grep -q "$SYSTEM_IMAGE"; then
    echo "✅ System image available"
else
    echo "⚠ System image not installed. Installing..."
    yes | sdkmanager "$SYSTEM_IMAGE"
fi

echo ""

# Step 2: Check if AVD already exists
echo "🔍 Step 2: Checking for existing AVD..."
if avdmanager list avd | grep -q "$DEVICE_NAME"; then
    echo "⚠ AVD '$DEVICE_NAME' already exists"
    read -p "Delete and recreate? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        avdmanager delete avd -n "$DEVICE_NAME"
        echo "✅ Deleted existing AVD"
    else
        echo "Keeping existing AVD"
        exit 0
    fi
fi

echo ""

# Step 3: Create AVD
echo "🛠 Step 3: Creating AVD..."
echo "no" | avdmanager create avd \
    -n "$DEVICE_NAME" \
    -k "$SYSTEM_IMAGE" \
    -d "$DEVICE_TYPE" \
    --force

if [ $? -eq 0 ]; then
    echo "✅ AVD created successfully"
else
    echo "❌ Failed to create AVD"
    exit 1
fi

echo ""

# Step 4: Configure AVD (optional optimizations)
echo "⚙️ Step 4: Configuring AVD..."
AVD_CONFIG="$HOME/.android/avd/${DEVICE_NAME}.avd/config.ini"

if [ -f "$AVD_CONFIG" ]; then
    # Increase RAM
    sed -i '' 's/hw.ramSize=.*/hw.ramSize=4096/' "$AVD_CONFIG" 2>/dev/null || true
    
    # Enable hardware acceleration
    sed -i '' 's/hw.gpu.enabled=.*/hw.gpu.enabled=yes/' "$AVD_CONFIG" 2>/dev/null || true
    
    echo "✅ AVD configured"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Emulator created successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To start the emulator:"
echo "  emulator -avd $DEVICE_NAME &"
echo ""
echo "To list all AVDs:"
echo "  emulator -list-avds"
echo ""
echo "To run your app:"
echo "  ./scripts/run-android.sh"
echo ""
