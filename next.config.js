/** @type {import('next').NextConfig} */
const nextConfig = {
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
    },
    async redirects() {
        return [
            { source: '/terms', destination: '/terms-of-use', permanent: true },
            { source: '/privacy', destination: '/privacy-policy', permanent: true }
        ];
    }
};

export default nextConfig;
