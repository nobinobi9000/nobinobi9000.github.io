import type { NextConfig } from 'next'

const config: NextConfig = {
  async redirects() {
    return [
      { source: '/comic-checker.html', destination: '/comic-checker', permanent: true },
      { source: '/nekoojiisan-timer.html', destination: '/nekoojiisan-timer', permanent: true },
      { source: '/japan-stock-screener', destination: 'https://nobinobi9000.github.io/japan-stock-screener/', permanent: false },
      { source: '/japan-stock-screener/', destination: 'https://nobinobi9000.github.io/japan-stock-screener/', permanent: false },
      { source: '/privacy', destination: '/privacy/', permanent: true },
    ]
  },
}

export default config
