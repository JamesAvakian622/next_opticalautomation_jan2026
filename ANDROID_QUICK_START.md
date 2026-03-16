# Android Quick Start Guide

## Current Status ✅

- ✅ Java 17 installed and configured
- ✅ Environment variables set (.zshrc)
- ✅ Capacitor configured
- ✅ Android project ready
- ❌ Android Studio not installed yet

## Install Android Studio

1. **Download:** https://developer.android.com/studio
2. **Install:** Drag to Applications folder
3. **Launch:** Follow setup wizard
4. **Install components:**
   - Android SDK
   - Android SDK Platform (API 34)
   - Android Virtual Device (AVD)

## Verify Installation

After installing Android Studio, run:

```bash
./scripts/verify-android-setup.sh
```

This checks:
- Java installation
- Android SDK
- Environment variables
- Emulator availability
- Capacitor configuration

## Run Your App

### Quick Method
```bash
./scripts/run-android.sh
```

### Manual Method
```bash
# 1. Sync Capacitor
npx cap sync android

# 2. Open Android Studio
npx cap open android

# 3. In Android Studio:
#    - Wait for Gradle sync
#    - Select emulator
#    - Click Run (▶️)
```

## Create Emulator (Optional)

Via command line:
```bash
./scripts/create-android-emulator.sh
```

Or in Android Studio:
- Tools → Device Manager → Create Device
- Select Pixel 6 or 7
- Choose API 34 (Android 14)

## Troubleshooting

Run verification script:
```bash
./scripts/verify-android-setup.sh
```

Common issues:
- Reload shell: `source ~/.zshrc`
- Check SDK Manager in Android Studio
- Ensure virtualization is enabled

## App Details

- **App ID:** com.opticalautomation.app
- **Live URL:** https://next-opticalautomation-jan2026.vercel.app
- **Features:** Clerk auth, MongoDB, responsive UI
