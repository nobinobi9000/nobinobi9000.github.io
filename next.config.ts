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
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nobi-labo.com' }],
        destination: 'https://nobi-labo.com/:path*',
        permanent: true,
      },
      { source: '/comic-checker.html', destination: '/comic-checker', permanent: true },
      { source: '/nekoojiisan-timer.html', destination: '/nekoojiisan-timer', permanent: true },
      { source: '/todo-manager', destination: '/task-manager', permanent: true },
      // 旧詳細ページURL → 新詳細ページURL（SEO維持）
      { source: '/tax-simulator', destination: '/tax-simulator-detail', permanent: true },
      { source: '/tax-simulator/', destination: '/tax-simulator-detail', permanent: true },
      { source: '/japan-stock-screener', destination: '/stock-screener', permanent: true },
      { source: '/japan-stock-screener.html', destination: '/stock-screener', permanent: true },
      // kabu-signal は公開前・終息予定のため非公開（再公開時は本行と lib/apps.ts・sitemap.ts を戻す。_hub/TODO.md #27）
      { source: '/kabu-signal', destination: '/kabu-note', permanent: false },
      // サービスURL（スラッシュあり・サブパス）→ screener.nobi-labo.com
      { source: '/japan-stock-screener/', destination: 'https://screener.nobi-labo.com', permanent: false },
      { source: '/japan-stock-screener/:path+', destination: 'https://screener.nobi-labo.com/:path+', permanent: false },
    ]
  },
  async rewrites() {
    return [
      // 静的HTMLアプリのリライト（vercel.json は使わず next.config.ts に集約）
      { source: '/meeting-timer', destination: '/meeting-timer/index.html' },
      { source: '/meeting-timer/', destination: '/meeting-timer/index.html' },
    ]
  },
}

export default config
