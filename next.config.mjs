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
        NEXTAUTH_SECRET: "this-is-a-very-long-super-secret-password-123",
        DB_PASSWORD: "root",
    },
};

export default nextConfig;
