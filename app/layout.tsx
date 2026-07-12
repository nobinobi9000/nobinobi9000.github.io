import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: { default: 'nobi-labo | 自分の「困った」をツールに変える場所', template: '%s | nobi-labo' },
  description: '会社員・非エンジニアがAIと一緒に作る個人開発の記録。暮らし・お金・しごとの小さな不便を、Webアプリで解決しています。',
  metadataBase: new URL('https://nobi-labo.com'),
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3281505059279597"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white text-ink">
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
