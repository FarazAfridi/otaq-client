/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'otaq-api.onrender.com'
      }
    ]
  }
}

module.exports = nextConfig
