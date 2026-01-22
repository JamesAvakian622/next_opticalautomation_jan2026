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
        unoptimized: false
    }
};

module.exports = nextConfig;
