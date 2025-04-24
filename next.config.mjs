/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatar.iran.liara.run",
                pathname: "/**",
            },
        ],
    },
    env: {
        host: "http://localhost:3000",
        SESSION_PASSWORD: "this-is-a-very-long-super-secret-password-123",
        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "this-is-a-very-long-super-secret-password-123",
        DB_PASSWORD: "root",
    },
    productionBrowserSourceMaps: true, // Enables source maps in production
    compiler: {
        removeConsole: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                mysql2: false,
            };
        }
        return config;
    },
    // experimental: {
    //     turbo: false,
    // },
};

export default nextConfig;
