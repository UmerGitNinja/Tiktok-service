/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.scdn.co', 'p16-sign-va.tiktokcdn.com', 'p16-sign-sg.tiktokcdn.com', 'p77-sign-va-lite.tiktokcdn.com', 'p16-sign.tiktokcdn-us.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            pathname: '/image/**',
          },
          {
            protocol: 'https',
            hostname: 'p16-sign-va.tiktokcdn.com',
            pathname: '/tos-maliva-p-0068/**',
          },
          {
            protocol: 'https',
            hostname: 'p16-sign-sg.tiktokcdn.com',
            pathname: '/tos-alisg-p-0037/**',
          },
          {
            protocol: 'https',
            hostname: 'p77-sign-va-lite.tiktokcdn.com',
            pathname: '/tos-maliva-p-0068/**',
          },
          {
            protocol: 'https',
            hostname: 'p16-sign.tiktokcdn-us.com',
            pathname: '/tos-useast5-p-0068-tx/**',
          }
        ],
    },
}

module.exports = nextConfig