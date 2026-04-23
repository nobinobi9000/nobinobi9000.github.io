import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'nobi-labo | 日々の生活にちょっと便利をプラス', template: '%s | nobi-labo' },
  description: '日々の生活にちょっと便利をプラス。nobi-laboの個人開発Webアプリ一覧。',
  metadataBase: new URL('https://nobi-labo.com'),
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3281505059279597" crossOrigin="anonymous"></script>
      </head>
      <body>
        <header>
          <a href="/" className="logo">nobi<span>-labo</span></a>
        </header>
        {children}
        <Analytics />
        <footer>
          <div className="footer-inner">
            <a href="/" className="footer-logo">nobi<span>-labo</span></a>
            <div className="footer-links">
              <a href="/about">運営者情報</a>
              <a href="/privacy">プライバシーポリシー</a>
              <a href="/admin/login" style={{ color: '#555', fontSize: '11px' }}>管理</a>
            </div>
            <div className="footer-copy">© 2026 nobi-labo. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
