/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: {
    reactCompiler: true,
    ppr: true,
  },
};

export default nextConfig;
