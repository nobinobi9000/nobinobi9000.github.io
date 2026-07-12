import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apps',
  description: 'AIと一緒に作った、暮らし・お金・しごとを楽にするWebアプリ一覧。すべて無料で利用できます。',
  alternates: { canonical: '/apps' },
}

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return children
}
