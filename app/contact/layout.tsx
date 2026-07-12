import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'nobi-laboへのお問い合わせはこちらから。アプリの不具合報告・機能のご要望・コラボレーションのご相談など、お気軽にどうぞ。',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
