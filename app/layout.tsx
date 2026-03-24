import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'nobi-labo | 日々の生活にちょっと便利をプラス', template: '%s | nobi-labo' },
  description: '日々の生活にちょっと便利をプラス。nobi-laboの個人開発Webアプリ・PWA一覧。',
  metadataBase: new URL('https://nobi-labo.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>
        <header>
          <a href="/" className="logo">nobi<span>-labo</span></a>
        </header>
        {children}
        <footer>
          <div className="footer-inner">
            <a href="/" className="footer-logo">nobi<span>-labo</span></a>
            <div className="footer-links">
              <a href="/privacy/">プライバシーポリシー</a>
            </div>
            <div className="footer-copy">© 2026 nobi-labo. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
