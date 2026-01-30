/** @type {import('next').NextConfig} */
const nextConfig = {
    // Note: 'output: export' removed - Server Actions not compatible with static export
    // For Android builds via Capacitor, Server Actions need to be refactored first
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'opticalautomation.com',
                pathname: '/**'
            }
        ],
        unoptimized: true
    }
};

export default nextConfig;
