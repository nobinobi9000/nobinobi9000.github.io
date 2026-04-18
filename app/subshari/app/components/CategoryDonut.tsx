'use client'
import React from 'react'

interface DonutSegment {
  label: string
  value: number
  color: string
}

interface CategoryDonutProps {
  data: DonutSegment[]
  size?: number
}

export const CATEGORY_COLORS: Record<string, string> = {
  '動画配信': '#f97316',
  '音楽': '#a855f7',
  '電子書籍': '#3b82f6',
  'フィットネス': '#22c55e',
  'ソフトウェア': '#64748b',
  'ゲーム': '#ec4899',
  'ニュース': '#eab308',
  'その他': '#6b7280',
}

export default function CategoryDonut({ data, size = 160 }: CategoryDonutProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  if (total === 0) return null

  const r = 56
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r

  let offset = 0
  const segments = data.map((d) => {
    const fraction = d.value / total
    const dashArray = fraction * circumference
    const dashOffset = circumference - offset
    offset += dashArray
    return { ...d, dashArray, dashOffset }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      {/* 背景リング */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2a2a2a" strokeWidth={22} />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={22}
          strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
          strokeDashoffset={seg.dashOffset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  )
}
