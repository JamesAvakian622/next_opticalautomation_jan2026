import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.opticalautomation.app',
    appName: 'Optical Automation',
    webDir: 'out',
    server: {
        // Point to your deployed Next.js app
        url: process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' 
            : 'https://next-opticalautomation-jan2026.vercel.app',
        cleartext: true,
        androidScheme: 'https'
    },
    android: {
        buildOptions: {
            keystorePath: undefined,
            keystoreAlias: undefined
        }
    }
};

export default config;
