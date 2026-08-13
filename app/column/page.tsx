import type { Metadata } from 'next'
import Link from 'next/link'
import ColumnClient from './ColumnClient'
import { getAllArchiveArticles } from '@/lib/note-archive'

export const metadata: Metadata = {
  title: 'コラム',
  description: 'note からサイトに取り込んだコラム記事を一覧表示しています。',
  alternates: { canonical: '/column' },
  // 掲載記事はnote.comに原文がある複製コンテンツのため、検索エンジンにはインデックスさせない
  robots: { index: false, follow: true },
}

export const revalidate = 3600

type UnifiedPost = {
  id: string
  src: 'nobi1' | 'nobi2'
  srcLabel: string
  srcColor: string
  srcBg: string
  date: string
  title: string
  href: string
  account: string
  eyecatch?: string | null
}

function formatDate(str: string): string {
  const d = new Date(str)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const MAGAZINES = [
  { title: 'AIを使ってプログラム作成', desc: '非エンジニアがAIと一緒にWebアプリを作る記録。アイデアの出し方から実装・リリースまで。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/macf88bf0d9c2' },
  { title: 'お金にまつわる話', desc: '税・住宅ローン・節約まで、暮らしとお金にまつわるあれこれ。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/mf9d1998d19f6' },
  { title: 'AIと競馬', desc: 'ChatGPT・Gemini・Claudeに競馬を予想させて検証する実験記録。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/m6612353112a4' },
  { title: 'マンガ紹介', desc: '1,000冊以上読んできたマンガの中からおすすめ作品を紹介。ジャンル問わず。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/md861c15e5aae' },
  { title: '投資・ポイント投資', desc: '投資・ポイント活用・副業など、お金を増やすヒントをまとめています。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/m6872eee09d67' },
  { title: 'レトロゲーム', desc: 'ファミコン・スーファミ・PS時代の名作やカルト作品にまつわるコラム集。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/m001bbe577cbb' },
]

export default async function ColumnPage() {
  const archiveArticles = getAllArchiveArticles()

  // サイトに取り込んだアーカイブ記事のみを表示（本文込み・内部リンク）
  const posts: UnifiedPost[] = archiveArticles.map(a => ({
    id: `archive-${a.slug}`,
    src: a.account,
    srcLabel: a.accountLabel,
    srcColor: a.accountColor,
    srcBg: a.accountBg,
    date: a.publishedAt ? formatDate(a.publishedAt) : '',
    title: a.title,
    href: `/column/${a.slug}`,
    account: `note / ${a.accountUrlname}`,
    eyecatch: null,
  }))

  posts.sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-12">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">コラム</span>
        </div>
        <h1 className="font-extrabold tracking-[-0.03em] leading-[1.1]"
          style={{ fontSize: 'clamp(40px, 5.5vw, 68px)' }}>
          コラム
        </h1>
        <p className="mt-[14px] text-[16px] text-[#999999]">note 2アカウントの記事をまとめて表示</p>
      </section>

      <ColumnClient posts={posts} magazines={MAGAZINES} />

    </div>
  )
}
