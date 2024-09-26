/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                port: '',
                pathname: '/mutno/**',
            },
        ],
    },
};

export default nextConfig;
