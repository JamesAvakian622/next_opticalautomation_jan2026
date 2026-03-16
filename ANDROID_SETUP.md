# Android App Setup & Simulator Guide

## App Architecture

The Android app uses **Capacitor** to wrap your Next.js web app. Instead of static export, the app connects to your live deployment at `https://next-opticalautomation-jan2026.vercel.app`.

This means:
- ✅ Full API functionality (no static export limitations)
- ✅ Real-time updates (changes deploy automatically)
- ✅ Shared authentication with web (Clerk)
- ✅ Same MongoDB database
- ✅ Native Android features available

## Prerequisites

### 1. Install Android Studio
Download and install from: https://developer.android.com/studio

During installation, select:
- ✅ Android SDK
- ✅ Android SDK Platform (API 34 recommended)
- ✅ Android Virtual Device (AVD)
- ✅ Android SDK Build-Tools

### 2. Install Java Development Kit (JDK 17)
```bash
brew install openjdk@17

# Add to ~/.zshrc
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="$JAVA_HOME/bin:$PATH"

# Reload
source ~/.zshrc
```

### 3. Set Android Environment Variables
Add to `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Reload: `source ~/.zshrc`

### 4. Verify Installation
```bash
java --version          # Should show Java 17
echo $ANDROID_HOME      # Should show SDK path
which emulator          # Should find emulator command
```

## Quick Start (After Prerequisites)

### 1. Sync Android Project
```bash
npx cap sync android
```

### 2. Open in Android Studio
```bash
npx cap open android
```

### 3. Create Emulator (First Time Only)
In Android Studio:
1. Click **Device Manager** (phone icon in toolbar)
2. Click **Create Device**
3. Select **Pixel 6** or **Pixel 7**
4. Click **Next**
5. Select **API 34** (Android 14) - download if needed
6. Click **Next** → **Finish**

### 4. Run the App
1. Select your emulator from device dropdown
2. Click green **Run** button (▶️)
3. Wait for emulator to boot and app to install
4. App will load your live website in native wrapper

## Alternative: Command Line Launch

```bash
# List available emulators
emulator -list-avds

# Start emulator in background
emulator -avd Pixel_6_API_34 &

# Install and run app
cd android
./gradlew installDebug

# Launch app
adb shell am start -n com.opticalautomation.app/.MainActivity
```

## Development Modes

### Production Mode (Default)
App connects to: `https://next-opticalautomation-jan2026.vercel.app`
- Uses live production data
- Requires internet connection
- Best for testing deployed features

### Development Mode (Local Testing)
To test against local Next.js server:

1. Start Next.js dev server:
```bash
npm run dev
```

2. Update `capacitor.config.ts`:
```typescript
server: {
    url: 'http://localhost:3000',
    cleartext: true
}
```

3. Sync and rebuild:
```bash
npx cap sync android
npx cap open android
```

## App Configuration

**App ID:** `com.opticalautomation.app`  
**App Name:** Optical Automation  
**Live URL:** `https://next-opticalautomation-jan2026.vercel.app`  
**Min SDK:** API 22 (Android 5.1)  
**Target SDK:** API 34 (Android 14)

## Features

- ✅ Clerk Authentication (same as web)
- ✅ MongoDB Database (shared with web)
- ✅ Responsive UI (Android-optimized)
- ✅ Navigation & Deep Linking
- ✅ Push Notifications (ready to configure)
- ✅ Camera Access (via Capacitor plugins)
- ✅ Offline Detection
- ✅ Native Android UI elements

## Troubleshooting

### "SDK location not found"
```bash
# Check if ANDROID_HOME is set
echo $ANDROID_HOME

# If empty, add to ~/.zshrc:
export ANDROID_HOME=$HOME/Library/Android/sdk
source ~/.zshrc
```

### "Gradle sync failed"
1. Open Android Studio
2. **File** → **Invalidate Caches** → **Invalidate and Restart**
3. Wait for re-indexing
4. Try sync again

### "Emulator won't start"
```bash
# Check available system images
sdkmanager --list | grep system-images

# Install if missing
sdkmanager "system-images;android-34;google_apis;arm64-v8a"

# Create new AVD
avdmanager create avd -n Pixel_6_API_34 -k "system-images;android-34;google_apis;arm64-v8a" -d pixel_6
```

### "App shows white screen"
1. Check internet connection (app needs to reach Vercel)
2. Open Chrome DevTools for Android:
   - Chrome → `chrome://inspect`
   - Find your device/emulator
   - Click **inspect**
3. Check console for errors

### "Clerk authentication not working"
1. Verify Clerk keys are in Vercel environment variables
2. Check that app URL is whitelisted in Clerk dashboard
3. Add `com.opticalautomation.app` to allowed origins

### "Build errors in Android Studio"
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew build
```

## Adding Native Features

### Camera
```bash
npm install @capacitor/camera
npx cap sync android
```

### Push Notifications
```bash
npm install @capacitor/push-notifications
npx cap sync android
# Configure Firebase in android/app/google-services.json
```

### Geolocation
```bash
npm install @capacitor/geolocation
npx cap sync android
```

## Production Build (APK)

### Debug APK (for testing)
```bash
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution)
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

### Sign APK for Play Store
1. Generate keystore:
```bash
keytool -genkey -v -keystore optical-automation.keystore -alias optical-automation -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("optical-automation.keystore")
            storePassword "your-password"
            keyAlias "optical-automation"
            keyPassword "your-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. Build signed APK:
```bash
cd android
./gradlew assembleRelease
```

## Useful Commands

```bash
# Sync changes
npx cap sync android

# Open Android Studio
npx cap open android

# List connected devices
adb devices

# View logs
adb logcat | grep Capacitor

# Uninstall app
adb uninstall com.opticalautomation.app

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Take screenshot
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

## Resources

- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [Android Developer Guide](https://developer.android.com/guide)
- [Clerk Android Setup](https://clerk.com/docs/quickstarts/capacitor)
- [Next.js + Capacitor](https://capacitorjs.com/docs/guides/nextjs)
