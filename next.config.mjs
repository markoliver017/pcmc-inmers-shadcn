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
        customKey: 'my-value',
        SESSION_PASSWORD: 'this-is-a-very-long-super-secret-password-123',
        NEXTAUTH_SECRET: 'this-is-a-very-long-super-secret-password-123'
    },
};

export default nextConfig;
