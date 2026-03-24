import type { NextConfig } from 'next'

const config: NextConfig = {
  async redirects() {
    return [
      { source: '/comic-checker.html', destination: '/comic-checker', permanent: true },
      { source: '/nekoojiisan-timer.html', destination: '/nekoojiisan-timer', permanent: true },
      { source: '/privacy', destination: '/privacy/', permanent: true },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/japan-stock-screener/:path*',
        destination: 'https://nobinobi9000.github.io/japan-stock-screener/:path*',
      },
    ]
  },
}

export default config
