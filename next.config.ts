import type { NextConfig } from 'next'

const config: NextConfig = {
  async headers() {
    return [
      {
        // japan-stock-screener の静的ファイルを CORS 許可（プロキシ用）
        source: '/japan-stock-screener/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin',  value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/comic-checker.html', destination: '/comic-checker', permanent: true },
      { source: '/nekoojiisan-timer.html', destination: '/nekoojiisan-timer', permanent: true },
      { source: '/japan-stock-screener', destination: 'https://nobinobi9000.github.io/japan-stock-screener/', permanent: false },
      { source: '/japan-stock-screener/', destination: 'https://nobinobi9000.github.io/japan-stock-screener/', permanent: false },
      { source: '/japan-stock-screener/:path+', destination: 'https://nobinobi9000.github.io/japan-stock-screener/:path+', permanent: false },
    ]
  },
  async rewrites() {
    return [
      { source: '/meeting-timer', destination: '/meeting-timer/index.html' },
      { source: '/meeting-timer/', destination: '/meeting-timer/index.html' },
    ]
  },
}

export default config
