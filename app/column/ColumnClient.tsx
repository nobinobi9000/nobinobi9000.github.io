'use client'
import { useState } from 'react'

type Post = {
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

type Magazine = {
  title: string
  desc: string
  account: string
  color: string
  url: string
}

type FilterKey = 'all' | 'nobi1' | 'nobi2'
const PER_PAGE = 10

export default function ColumnClient({ posts, magazines }: { posts: Post[]; magazines: Magazine[] }) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [page, setPage] = useState(1)

  const filtered = filter === 'all' ? posts : posts.filter(p => p.src === filter)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const filters: { key: FilterKey; label: string; dot?: string }[] = [
    { key: 'all',   label: 'すべて' },
    { key: 'nobi1', label: 'note / suzukidaichisan', dot: '#00B899' },
    { key: 'nobi2', label: 'note / nobi-nobi',       dot: '#E8384F' },
  ]

  function changeFilter(key: FilterKey) {
    setFilter(key)
    setPage(1)
  }

  return (
    <>
      {/* Filter chips */}
      <section className="max-w-[1200px] mx-auto px-6 pb-8">
        <div className="flex gap-[10px] flex-wrap">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => changeFilter(f.key)}
              className={`flex items-center gap-[7px] px-[18px] py-[9px] text-[14px] font-semibold rounded-full border-[1.5px] transition-colors ${
                filter === f.key
                  ? 'border-[#2D6A4F] bg-[#F0F7F4] text-[#2D6A4F]'
                  : 'border-[#EBEBEB] bg-white text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
              }`}
            >
              {f.dot && <span className="w-2 h-2 rounded-full flex-none" style={{ background: f.dot }} />}
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ARTICLE LIST */}
      <section className="max-w-[1200px] mx-auto px-6 pb-[72px]">
        <div className="border border-[#EBEBEB] rounded-[20px] overflow-hidden">
          {visible.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#999999] text-[14px]">記事がありません</div>
          ) : visible.map(post => (
            <a
              key={post.id}
              href={post.href}
              className="flex items-center gap-5 px-6 py-[22px] border-b border-[#EBEBEB] last:border-0 hover:bg-[#F0F7F4] transition-colors"
            >
              <span className="flex-none w-14 text-center py-[6px] px-1 text-[11px] font-bold rounded-lg leading-[1.3] whitespace-pre-line"
                style={{ color: post.srcColor, background: post.srcBg }}>
                {post.srcLabel}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[12.5px] text-[#999999]">{post.date}</span>
                <div className="mt-2 text-[16px] font-bold tracking-[-0.01em] leading-[1.5] truncate">
                  {post.title}
                </div>
                <div className="mt-[5px] text-[12.5px] text-[#999999]">{post.account}</div>
              </div>
              {post.eyecatch ? (
                <img
                  src={post.eyecatch}
                  alt=""
                  className="flex-none w-[80px] h-[52px] object-cover rounded-lg"
                />
              ) : (
                <span className="flex-none text-[#CCCCCC] text-[16px]">→</span>
              )}
            </a>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-[6px]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-10 h-10 rounded-[10px] border-[1.5px] text-[14px] font-semibold transition-colors ${
                  page === n
                    ? 'border-[#2D6A4F] bg-[#2D6A4F] text-white'
                    : 'border-[#EBEBEB] bg-white text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
                }`}
              >
                {n}
              </button>
            ))}
            {page < totalPages && (
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-[18px] h-10 rounded-[10px] border-[1.5px] border-[#EBEBEB] bg-white text-[#444444] text-[14px] font-semibold hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
              >
                次へ →
              </button>
            )}
          </div>
        )}
      </section>

      {/* NOTE MAGAZINES */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">NOTE マガジン</div>
          <div className="mt-6 grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {magazines.map(mag => (
              <a key={mag.title} href={mag.url} target="_blank" rel="noopener noreferrer"
                className="block border border-[#EBEBEB] rounded-2xl p-7 bg-white hover:border-[#00B899] transition-colors">
                <div className="flex items-center gap-[10px]">
                  <span className="w-[10px] h-[10px] rounded-full" style={{ background: mag.color }} />
                  <span className="text-[12px] font-bold" style={{ color: mag.color }}>{mag.account}</span>
                </div>
                <h3 className="mt-4 text-[18px] font-extrabold tracking-[-0.02em] leading-[1.4]">{mag.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#666666]">{mag.desc}</p>
                <div className="mt-4">
                  <span className="text-[13px] font-semibold text-[#2D6A4F]">読む →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
