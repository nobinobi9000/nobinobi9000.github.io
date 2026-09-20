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
const MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

function yearOf(dateStr: string): string { return dateStr.slice(0, 4) }
function monthOf(dateStr: string): number { return Number(dateStr.slice(5, 7)) }

// 有効な日付(YYYY.MM.DD)を持つ投稿だけを対象に、年→月ごとの件数を集計する
function buildYearMonthIndex(items: Post[]) {
  const years = new Map<string, Map<number, Post[]>>()
  for (const post of items) {
    if (post.date.length !== 10) continue
    const y = yearOf(post.date)
    const m = monthOf(post.date)
    if (!years.has(y)) years.set(y, new Map())
    const months = years.get(y)!
    if (!months.has(m)) months.set(m, [])
    months.get(m)!.push(post)
  }
  return years
}

export default function ColumnClient({ posts, magazines }: { posts: Post[]; magazines: Magazine[] }) {
  const [filter, setFilter] = useState<FilterKey>('all')

  const filtered = filter === 'all' ? posts : posts.filter(p => p.src === filter)
  const yearIndex = buildYearMonthIndex(filtered)
  const years = [...yearIndex.keys()].sort((a, b) => b.localeCompare(a))

  const latestYear = years[0] ?? null
  const [selectedYear, setSelectedYear] = useState<string | null>(latestYear)
  const activeYear = selectedYear && years.includes(selectedYear) ? selectedYear : latestYear

  const monthsForYear: Map<number, Post[]> = activeYear ? yearIndex.get(activeYear) ?? new Map() : new Map()
  const latestMonth = monthsForYear.size > 0 ? Math.max(...monthsForYear.keys()) : null
  const [selectedMonth, setSelectedMonth] = useState<number | null>(latestMonth)
  const activeMonth = selectedMonth && monthsForYear.has(selectedMonth) ? selectedMonth : latestMonth

  const visible = activeMonth ? monthsForYear.get(activeMonth) ?? [] : []

  const filters: { key: FilterKey; label: string; dot?: string }[] = [
    { key: 'all',   label: 'すべて' },
    { key: 'nobi1', label: 'note / suzukidaichisan', dot: '#00B899' },
    { key: 'nobi2', label: 'note / nobi-nobi',       dot: '#E8384F' },
  ]

  function changeFilter(key: FilterKey) {
    setFilter(key)
    // 年月選択は新しいフィルターの最新年月に合わせてリセットする
    setSelectedYear(null)
    setSelectedMonth(null)
  }

  function changeYear(y: string) {
    setSelectedYear(y)
    setSelectedMonth(null) // その年の最新月に自動で合わせる
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

      {/* YEAR TABS */}
      <section className="max-w-[1200px] mx-auto px-6 pb-4">
        <div className="flex gap-[8px] flex-wrap">
          {years.map(y => (
            <button
              key={y}
              onClick={() => changeYear(y)}
              className={`px-4 py-[7px] text-[14px] font-bold rounded-lg transition-colors ${
                activeYear === y
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F7F7F7] text-[#666666] hover:bg-[#EBEBEB]'
              }`}
            >
              {y}年
            </button>
          ))}
        </div>
      </section>

      {/* MONTH GRID */}
      <section className="max-w-[1200px] mx-auto px-6 pb-8">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-[8px]">
          {MONTH_LABELS.map((label, i) => {
            const m = i + 1
            const count = monthsForYear.get(m)?.length ?? 0
            const isActive = activeMonth === m
            const isEmpty = count === 0
            return (
              <button
                key={m}
                onClick={() => !isEmpty && setSelectedMonth(m)}
                disabled={isEmpty}
                className={`flex flex-col items-center justify-center gap-[2px] py-[10px] rounded-[10px] border-[1.5px] text-[13.5px] font-semibold transition-colors ${
                  isEmpty
                    ? 'border-[#F0F0F0] text-[#CCCCCC] cursor-not-allowed'
                    : isActive
                      ? 'border-[#2D6A4F] bg-[#F0F7F4] text-[#2D6A4F]'
                      : 'border-[#EBEBEB] bg-white text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
                }`}
              >
                {label}
                <span className="text-[10.5px] font-normal">{isEmpty ? '−' : `${count}件`}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ARTICLE LIST */}
      <section className="max-w-[1200px] mx-auto px-6 pb-[72px]">
        {activeYear && activeMonth && (
          <div className="mb-4 text-[13px] font-bold text-[#999999]">
            {activeYear}年{activeMonth}月の記事（{visible.length}件）
          </div>
        )}
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
