/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imgur.com']
  },
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
