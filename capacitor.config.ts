import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.opticalautomation.app',
    appName: 'Optical Automation',
    webDir: 'out',
    server: {
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
