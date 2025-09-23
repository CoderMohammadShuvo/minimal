/** @type {import('next').NextConfig} */
const nextConfig = {
typescript: {
    // ❌ Ignore TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
