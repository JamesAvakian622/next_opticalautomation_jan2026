/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
