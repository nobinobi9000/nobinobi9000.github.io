import Link from 'next/link'
import { APPS, CAT_COLORS, type AppCategory } from '@/lib/apps'
import { getPosts } from '@/lib/notion'

export const revalidate = 3600

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const CATEGORY_ORDER: { key: AppCategory; jp: string }[] = [
  { key: 'Life',  jp: '暮らし' },
  { key: 'Money', jp: 'お金' },
  { key: 'Work',  jp: 'しごと' },
]

// APPS から動的生成することで、アプリ追加時に自動反映される
const CATEGORIES = CATEGORY_ORDER.map(({ key, jp }) => {
  const cat = CAT_COLORS[key]
  return {
    jp,
    en: cat.label,
    color: cat.color,
    bg: cat.bg,
    apps: APPS.filter(a => a.category === key).map(a => a.name),
  }
})

// comic-checker / QUESTLOG / Kabu Note / SoroSoro / 法律書類 / サブスク / 日本株スクリーナー / Note Deck
const PICKUP_NAMES = ['comic-checker', 'QUESTLOG', 'Kabu Note', 'SoroSoro', '法律書類ジェネレーター', 'サブスクの断捨離', '日本株スクリーナー', 'Note Deck']
const PICKUP_APPS = PICKUP_NAMES.map(n => APPS.find(a => a.name === n)!).filter(Boolean)

const MAGAZINES = [
  { title: 'AIを使ってプログラム作成', desc: '非エンジニアがAIと一緒にWebアプリを作る記録。アイデアの出し方から実装・リリースまで。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/macf88bf0d9c2' },
  { title: 'お金にまつわる話', desc: '税・住宅ローン・節約まで、暮らしとお金にまつわるあれこれ。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/mf9d1998d19f6' },
  { title: 'AIと競馬', desc: 'ChatGPT・Gemini・Claudeに競馬を予想させて検証する実験記録。', account: 'suzukidaichisan', color: '#00B899', url: 'https://note.com/suzukidaichisan/m/m6612353112a4' },
  { title: 'マンガ紹介', desc: '1,000冊以上読んできたマンガの中からおすすめ作品を紹介。ジャンル問わず。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/md861c15e5aae' },
  { title: '投資・ポイント投資', desc: '投資・ポイント活用・副業など、お金を増やすヒントをまとめています。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/m6872eee09d67' },
  { title: 'レトロゲーム', desc: 'ファミコン・スーファミ・PS時代の名作やカルト作品にまつわるコラム集。', account: 'nobi-nobi', color: '#E8384F', url: 'https://note.com/nobi9000nobi/m/m001bbe577cbb' },
]

const NOTE_ACCOUNTS = [
  { urlname: 'suzukidaichisan', src: 'nobi1', label: 'nobi¹', color: '#00B899', bg: '#E6F8F3' },
  { urlname: 'nobi9000nobi',   src: 'nobi2', label: 'nobi²', color: '#E8384F', bg: '#FDEEF0' },
]

type UnifiedPost = {
  id: string
  srcLabel: string
  srcColor: string
  srcBg: string
  date: string
  cat: string
  catColor: string
  catBg: string
  title: string
  href: string
  isExternal: boolean
}

async function fetchNoteTop(urlname: string, label: string, color: string, bg: string): Promise<UnifiedPost[]> {
  try {
    const res = await fetch(
      `https://note.com/api/v2/creators/${urlname}/contents?kind=note&page=1`,
      { next: { revalidate: 3600 }, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; nobi-labo/1.0)', 'Accept': 'application/json' } }
    )
    if (!res.ok) return []
    const json = await res.json()
    return ((json?.data?.contents ?? []) as { id: string; name: string; publishAt: string; noteUrl: string }[])
      .slice(0, 10)
      .map(a => ({
        id: `${urlname}-${a.id}`,
        srcLabel: label,
        srcColor: color,
        srcBg: bg,
        date: a.publishAt ? formatDate(a.publishAt) : '',
        cat: 'Life',
        catColor: '#2563EB',
        catBg: '#F0F5FF',
        title: a.name,
        href: a.noteUrl ?? `https://note.com/${urlname}`,
        isExternal: true,
      }))
  } catch { return [] }
}

export default async function Home() {
  const [notionPosts, note1, note2] = await Promise.all([
    getPosts().catch(() => []),
    fetchNoteTop(NOTE_ACCOUNTS[0].urlname, NOTE_ACCOUNTS[0].label, NOTE_ACCOUNTS[0].color, NOTE_ACCOUNTS[0].bg),
    fetchNoteTop(NOTE_ACCOUNTS[1].urlname, NOTE_ACCOUNTS[1].label, NOTE_ACCOUNTS[1].color, NOTE_ACCOUNTS[1].bg),
  ])

  const blogPosts: UnifiedPost[] = notionPosts.map(p => ({
    id: p.id,
    srcLabel: 'Blog',
    srcColor: '#2D6A4F',
    srcBg: '#F0F7F4',
    date: p.publishedAt ? formatDate(p.publishedAt) : '',
    cat: p.category ?? 'Life',
    catColor: '#2563EB',
    catBg: '#F0F5FF',
    title: p.title,
    href: `/blog/${p.id}`,
    isExternal: false,
  })).slice(0, 5)

  const columnPosts = [...note1, ...note2]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-[72px]">
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          <div>
            <span className="inline-block px-[14px] py-[6px] text-[12.5px] font-semibold text-[#2D6A4F] bg-[#F0F7F4] rounded-full tracking-[0.01em]">
              Personal Lab — since 2026.01
            </span>
            <h1 className="mt-[26px] font-extrabold leading-[1.16] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(32px, 3.8vw, 52px)' }}>
              自分の「困った」を、<br />ツールに変える場所。
            </h1>
            <p className="mt-6 max-w-[480px] text-[17px] leading-[1.85] text-[#444444]">
              会社員・非エンジニアが、AIと一緒に作る個人開発の記録。暮らし・お金・しごとの小さな不便を、Webアプリで解決しています。
            </p>
            <div className="mt-10 flex gap-12 flex-wrap">
              <div>
                <div className="text-[34px] font-extrabold tracking-[-0.02em]">{APPS.length}</div>
                <div className="mt-1 text-[13px] font-medium text-[#999999] tracking-[0.04em]">APPS</div>
              </div>
              <div className="border-l border-[#EBEBEB] pl-12">
                <div className="text-[34px] font-extrabold tracking-[-0.02em]">3</div>
                <div className="mt-1 text-[13px] font-medium text-[#999999] tracking-[0.04em]">CATEGORIES</div>
              </div>
              <div className="border-l border-[#EBEBEB] pl-12">
                <div className="text-[34px] font-extrabold tracking-[-0.02em]">2026.01</div>
                <div className="mt-1 text-[13px] font-medium text-[#999999] tracking-[0.04em]">SINCE</div>
              </div>
            </div>
          </div>

          {/* Hero App Grid */}
          <div className="grid grid-cols-3 gap-[14px]">
            {PICKUP_APPS.map(app => (
              <Link key={app.name} href={app.detailUrl}
                className="aspect-[3/4.4] border border-[#EBEBEB] rounded-[14px] bg-white flex flex-col overflow-hidden hover:border-[#2D6A4F] transition-colors">
                <div className="flex-1 overflow-hidden" style={{ background: app.tint }}>
                  {app.screenshot ? (
                    <img src={app.screenshot} alt={app.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full" style={{ background: app.tint }} />
                  )}
                </div>
                <div className="px-[10px] py-3 text-[11px] font-semibold text-[#444444] text-center tracking-[-0.01em]">
                  {app.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="text-[30px] font-extrabold tracking-[-0.02em]">3つのカテゴリ</h2>
          <p className="text-[14px] text-[#999999]">暮らし・お金・しごとの不便を解決</p>
        </div>
        <div className="mt-9 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.en} className="border border-[#EBEBEB] rounded-2xl p-[30px] bg-white hover:border-[#2D6A4F] transition-colors">
              <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full"
                style={{ color: cat.color, background: cat.bg }}>
                {cat.en}
              </span>
              <h3 className="mt-[18px] text-[24px] font-extrabold tracking-[-0.02em]">{cat.jp}</h3>
              <p className="mt-[6px] text-[13px] text-[#999999] tracking-[0.02em]">{cat.en}</p>
              <ul className="mt-5 flex flex-col gap-[10px]">
                {cat.apps.map(a => (
                  <li key={a} className="flex items-center gap-[10px] text-[14px] text-[#444444]">
                    <span className="w-[5px] h-[5px] rounded-full flex-none" style={{ background: cat.color }} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* APPS PICKUP */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="text-[30px] font-extrabold tracking-[-0.02em]">Apps Pickup</h2>
          <p className="text-[14px] text-[#999999]">AIと一緒に作った{APPS.length}本から</p>
        </div>
        <div className="mt-9 grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {PICKUP_APPS.map(app => {
            const cat = CAT_COLORS[app.category]
            return (
              <Link key={app.name} href={app.detailUrl}
                className="block border border-[#EBEBEB] rounded-2xl overflow-hidden bg-white hover:border-[#2D6A4F] transition-colors">
                <div className="h-[200px] overflow-hidden" style={{ background: app.tint }}>
                  {app.screenshot
                    ? <img src={app.screenshot} alt={app.name} className="w-full h-full object-cover object-top" />
                    : <div className="w-full h-full" style={{ background: app.tint }} />
                  }
                </div>
                <div className="p-[22px] pb-6">
                  <span className="inline-block px-[11px] py-1 text-[11.5px] font-bold rounded-full"
                    style={{ color: cat.color, background: app.tint }}>
                    {cat.label}
                  </span>
                  <h3 className="mt-[14px] text-[19px] font-extrabold tracking-[-0.02em]">{app.name}</h3>
                  <p className="mt-[9px] text-[14px] leading-[1.7] text-[#444444]">{app.desc}</p>
                  <div className="mt-[18px] text-[14px] font-semibold text-[#2D6A4F]">詳細を見る →</div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/apps"
            className="inline-block px-7 py-[14px] text-[15px] font-semibold text-[#111111] border border-[#EBEBEB] rounded-[10px] hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors">
            すべてのアプリを見る（{APPS.length}本）→
          </Link>
        </div>
      </section>

      {/* BLOG */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="text-[30px] font-extrabold tracking-[-0.02em]">Blog</h2>
          <Link href="/blog" className="text-[14px] font-semibold text-[#2D6A4F] hover:text-[#21503b] transition-colors">
            すべての記事 →
          </Link>
        </div>

        <div className="mt-8 border border-[#EBEBEB] rounded-2xl overflow-hidden">
          {blogPosts.length > 0 ? blogPosts.map(post => (
            <a key={post.id} href={post.href}
              className="flex items-center gap-5 px-6 py-[22px] border-b border-[#EBEBEB] last:border-0 hover:bg-[#F0F7F4] transition-colors">
              <span className="flex-none w-14 text-center py-[6px] text-[11px] font-bold rounded-lg"
                style={{ color: post.srcColor, background: post.srcBg }}>
                {post.srcLabel}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[12.5px] text-[#999999]">{post.date}</span>
                  {post.cat && (
                    <span className="px-[9px] py-[2px] text-[11px] font-bold rounded-full"
                      style={{ color: post.catColor, background: post.catBg }}>
                      {post.cat}
                    </span>
                  )}
                </div>
                <div className="mt-[7px] text-[16px] font-bold tracking-[-0.01em] leading-[1.5] truncate">
                  {post.title}
                </div>
              </div>
              <span className="flex-none text-[#999999] text-[18px]">→</span>
            </a>
          )) : (
            <div className="px-6 py-12 text-center text-[#999999] text-[14px]">記事を準備中です</div>
          )}
        </div>
      </section>

      {/* COLUMN */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h2 className="text-[30px] font-extrabold tracking-[-0.02em]">コラム</h2>
          <Link href="/column" className="text-[14px] font-semibold text-[#2D6A4F] hover:text-[#21503b] transition-colors">
            すべての記事 →
          </Link>
        </div>

        <div className="mt-8 border border-[#EBEBEB] rounded-2xl overflow-hidden">
          {columnPosts.length > 0 ? columnPosts.map(post => (
            <a key={post.id} href={post.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 px-6 py-[22px] border-b border-[#EBEBEB] last:border-0 hover:bg-[#F0F7F4] transition-colors">
              <span className="flex-none w-14 text-center py-[6px] text-[11px] font-bold rounded-lg"
                style={{ color: post.srcColor, background: post.srcBg }}>
                {post.srcLabel}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[12.5px] text-[#999999]">{post.date}</span>
                <div className="mt-[7px] text-[16px] font-bold tracking-[-0.01em] leading-[1.5] truncate">
                  {post.title}
                </div>
              </div>
              <span className="flex-none text-[#999999] text-[18px]">→</span>
            </a>
          )) : (
            <div className="px-6 py-12 text-center text-[#999999] text-[14px]">記事を準備中です</div>
          )}
        </div>
      </section>

      {/* NOTE マガジン */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[30px] font-extrabold tracking-[-0.02em]">マガジン</div>
        <div className="mt-8 grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {MAGAZINES.map(mag => (
            <a key={mag.title} href={mag.url} target="_blank" rel="noopener noreferrer"
              className="block border border-[#EBEBEB] rounded-[14px] p-6 hover:border-[#00B899] transition-colors">
              <span className="inline-block w-[9px] h-[9px] rounded-full" style={{ background: mag.color }} />
              <h4 className="mt-[14px] text-[17px] font-extrabold tracking-[-0.02em]">{mag.title}</h4>
              <p className="mt-2 text-[13px] leading-[1.7] text-[#666666]">{mag.desc}</p>
              <div className="mt-2 text-[12px] text-[#999999]">{mag.account}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="bg-[#F0F7F4] rounded-[20px] p-12 flex items-center justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <div className="text-[13px] font-bold tracking-[0.08em] text-[#2D6A4F]">nobi について</div>
            <p className="mt-4 max-w-[620px] text-[19px] leading-[1.75] font-medium tracking-[-0.01em]">
              エンジニアではない会社員が、AIを相棒に「自分が本当に欲しいもの」だけを作っています。マンガ・ゲーム・投資が好きで、日々の小さな不便をツールに変えるのが趣味です。
            </p>
          </div>
          <Link href="/about"
            className="flex-none px-[26px] py-[14px] text-[15px] font-semibold text-white bg-[#2D6A4F] rounded-[10px] hover:bg-[#21503b] transition-colors">
            詳しく読む →
          </Link>
        </div>
      </section>

    </div>
  )
}
