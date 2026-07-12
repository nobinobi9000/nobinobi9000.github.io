import type { Metadata } from 'next'
import Link from 'next/link'
import ColumnClient from './ColumnClient'

export const metadata: Metadata = {
  title: 'コラム',
  description: 'note で発信しているコラム記事を一覧表示しています。',
  alternates: { canonical: '/column' },
  // note.com への外部リンクのみのため、検索エンジンにはインデックスさせない
  // オリジナルコンテンツは /blog に集約する
  robots: { index: false, follow: true },
}

export const revalidate = 3600

type NoteArticle = {
  id: string
  name: string
  publishAt: string
  noteUrl: string
  key: string
  type: string
  eyecatch: string | null
}

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

const NOTE_ACCOUNTS = [
  { urlname: 'suzukidaichisan', src: 'nobi1' as const, label: 'nobi¹', color: '#00B899', bg: '#E6F8F3' },
  { urlname: 'nobi9000nobi',   src: 'nobi2' as const, label: 'nobi²', color: '#E8384F', bg: '#FDEEF0' },
]

const MAGAZINES = [
  { title: 'AIを使ってプログラム作成', desc: '非エンジニアがAIと一緒にWebアプリを作る記録。アイデアの出し方から実装・リリースまで。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/macf88bf0d9c2' },
  { title: 'お金にまつわる話', desc: '税・住宅ローン・節約まで、暮らしとお金にまつわるあれこれ。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/mf9d1998d19f6' },
  { title: 'AIと競馬', desc: 'ChatGPT・Gemini・Claudeに競馬を予想させて検証する実験記録。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/m6612353112a4' },
  { title: 'マンガ紹介', desc: '1,000冊以上読んできたマンガの中からおすすめ作品を紹介。ジャンル問わず。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/md861c15e5aae' },
  { title: '投資・ポイント投資', desc: '投資・ポイント活用・副業など、お金を増やすヒントをまとめています。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/m6872eee09d67' },
  { title: 'レトロゲーム', desc: 'ファミコン・スーファミ・PS時代の名作やカルト作品にまつわるコラム集。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/m001bbe577cbb' },
]

async function fetchNoteArticles(urlname: string): Promise<NoteArticle[]> {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; nobi-labo/1.0)',
    'Accept': 'application/json',
  }
  const articles: NoteArticle[] = []
  for (let page = 1; page <= 15; page++) {
    try {
      const res = await fetch(
        `https://note.com/api/v2/creators/${urlname}/contents?kind=note&page=${page}`,
        { next: { revalidate: 3600 }, headers }
      )
      if (!res.ok) break
      const json = await res.json()
      const items = (json?.data?.contents ?? []) as NoteArticle[]
      if (items.length === 0) break
      articles.push(...items)
    } catch {
      break
    }
  }
  return articles
}

export default async function ColumnPage() {
  const noteResults = await Promise.all(NOTE_ACCOUNTS.map(a => fetchNoteArticles(a.urlname)))

  const posts: UnifiedPost[] = []

  for (let i = 0; i < NOTE_ACCOUNTS.length; i++) {
    const acc = NOTE_ACCOUNTS[i]
    const articles = noteResults[i]
    for (const a of articles) {
      posts.push({
        id: `${acc.src}-${a.id}`,
        src: acc.src,
        srcLabel: acc.label,
        srcColor: acc.color,
        srcBg: acc.bg,
        date: a.publishAt ? formatDate(a.publishAt) : '',
        title: a.name,
        href: a.noteUrl ?? `https://note.com/${acc.urlname}`,
        account: `note / ${acc.urlname}`,
        eyecatch: a.eyecatch ?? null,
      })
    }
  }

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
