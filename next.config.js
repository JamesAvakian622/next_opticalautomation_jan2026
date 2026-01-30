/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
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
