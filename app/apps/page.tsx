'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { APPS, CAT_COLORS, type AppCategory } from '@/lib/apps'

type FilterKey = 'all' | AppCategory

export default function AppsPage() {
  const [active, setActive] = useState<FilterKey>('all')

  const visible = active === 'all' ? APPS : APPS.filter(a => a.category === active)

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all',   label: 'すべて' },
    { key: 'Life',  label: 'Life（暮らし）' },
    { key: 'Money', label: 'Money（お金）' },
    { key: 'Work',  label: 'Work（しごと）' },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-12">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Apps</span>
        </div>
        <h1 className="font-extrabold tracking-[-0.03em] leading-[1.1]"
          style={{ fontSize: 'clamp(40px, 5.5vw, 68px)' }}>
          Apps
        </h1>
        <p className="mt-4 text-[17px] text-[#444444] leading-[1.7] max-w-[560px]">
          AIと一緒に作った、暮らし・お金・しごとを楽にする{APPS.length}本のWebアプリ。
        </p>

        {/* Category Filter */}
        <div className="mt-9 flex gap-[10px] flex-wrap">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-[18px] py-[9px] text-[14px] font-semibold rounded-full border-[1.5px] transition-colors ${
                active === f.key
                  ? 'border-[#2D6A4F] bg-[#F0F7F4] text-[#2D6A4F]'
                  : 'border-[#EBEBEB] bg-white text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* APP LIST */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="flex flex-col border border-[#EBEBEB] rounded-[20px] overflow-hidden">
          {visible.map(app => {
            const cat = CAT_COLORS[app.category]
            // アプリ本体は別ページ扱いのため、常に新規タブで開く
            return (
              <div
                key={app.name}
                className="flex items-stretch bg-white border-b border-[#EBEBEB] last:border-0"
              >
                {/* Screenshot */}
                <div className="flex-none w-[140px] flex items-center justify-center p-[18px]"
                  style={{ background: app.tint }}>
                  {app.screenshot ? (
                    <img src={app.screenshot} alt={app.name} className="w-full h-auto object-contain rounded-lg" style={{ maxHeight: '120px' }} />
                  ) : (
                    <div className="w-full aspect-[9/16] border-[1.5px] border-dashed rounded-[10px]"
                      style={{ borderColor: cat.color }} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 py-[22px] px-6">
                  <div className="flex items-center gap-[10px] flex-wrap">
                    <span className="px-[11px] py-1 text-[11.5px] font-bold rounded-full"
                      style={{ color: cat.color, background: app.tint }}>
                      {cat.label}
                    </span>
                    <h2 className="text-[20px] font-extrabold tracking-[-0.02em]">{app.name}</h2>
                  </div>
                  <p className="mt-[10px] text-[14.5px] leading-[1.75] text-[#444444] max-w-[620px]">{app.desc}</p>
                  <div className="mt-[14px] flex gap-2 flex-wrap">
                    {app.tags.map(tag => (
                      <span key={tag} className="px-[11px] py-1 text-[12px] font-medium rounded-md text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex-none flex flex-col items-end justify-center gap-3 px-7 pl-4">
                  {app.ctaUrl ? (
                    <a
                      href={app.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap text-[13px] font-bold text-white bg-[#2D6A4F] px-4 py-2 rounded-lg hover:bg-[#21503b] transition-colors"
                    >
                      {app.ctaLabel ?? '今すぐ使う →'}
                    </a>
                  ) : (
                    <span className="whitespace-nowrap text-[13px] font-bold text-[#CCCCCC] bg-[#F7F7F7] px-4 py-2 rounded-lg cursor-not-allowed">
                      準備中
                    </span>
                  )}
                  <Link
                    href={app.detailUrl}
                    className="whitespace-nowrap text-[13px] font-semibold text-[#2D6A4F] border border-[#2D6A4F] px-4 py-2 rounded-lg hover:bg-[#F0F7F4] transition-colors"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
