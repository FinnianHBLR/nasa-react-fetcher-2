/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'epic.gsfc.nasa.gov',
        port: '',
        pathname: '/archive/enhanced/**',
      },
    ],
  },
}

module.exports = nextConfig
