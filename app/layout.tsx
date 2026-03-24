import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'nobi-labo | 日々の生活にちょっと便利をプラス', template: '%s | nobi-labo' },
  description: '日々の生活にちょっと便利をプラス。nobi-laboの個人開発Webアプリ・PWA一覧。',
  metadataBase: new URL('https://nobi-labo.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header>
          <a href="/" className="logo">nobi<span>-labo</span></a>
          <nav className="header-nav">
            <a href="/blog">Blog</a>
          </nav>
        </header>
        {children}
        <footer>
          <div className="footer-inner">
            <a href="/" className="footer-logo">nobi<span>-labo</span></a>
            <div className="footer-links">
              <a href="/blog">ブログ</a>
              <a href="/privacy/">プライバシーポリシー</a>
            </div>
            <div className="footer-copy">© 2026 nobi-labo. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
