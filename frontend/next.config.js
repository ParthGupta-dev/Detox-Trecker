/** @type {import('next').NextConfig} */
const nextConfig = {
  // We use a separate Express backend; this setting ensures Next.js doesn't
  // try to do anything special with API routes in this project.
  // Output mode can be set to "standalone" when deploying to Vercel for optimised builds.
};

module.exports = nextConfig;
