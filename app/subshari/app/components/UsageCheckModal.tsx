'use client'
import React, { useState } from 'react'
import type { Subscription, UsageFrequency } from '../lib/types'

interface Props {
  subscriptions: Subscription[]
  trigger: 'startup' | 'renewal'
  onRecord: (subscriptionId: string, frequency: UsageFrequency) => void
  onDismiss: () => void
}

const FREQ_OPTIONS: { value: UsageFrequency; label: string; sub: string; score: number }[] = [
  { value: 'daily', label: '毎日', sub: '今も欠かせない', score: 100 },
  { value: 'weekly', label: '週数回', sub: 'よく使っている', score: 65 },
  { value: 'monthly', label: '月数回', sub: 'たまに使う', score: 30 },
  { value: 'rarely', label: 'ほぼ使わない', sub: '最近あまり触っていない', score: 5 },
]

function getPrevFrequency(sub: Subscription): UsageFrequency | null {
  const history = sub.usageHistory ?? []
  if (history.length === 0) return null
  return [...history].sort((a, b) => b.date.localeCompare(a.date))[0].frequency
}

function getTrendInfo(prev: UsageFrequency | null, next: UsageFrequency): { label: string; color: string } | null {
  if (!prev) return null
  const prevScore = FREQ_OPTIONS.find((o) => o.value === prev)?.score ?? 50
  const nextScore = FREQ_OPTIONS.find((o) => o.value === next)?.score ?? 50
  if (nextScore < prevScore - 10) return { label: '⬇️ 利用頻度が下がっています。解約も検討してみてください。', color: '#ef4444' }
  if (nextScore > prevScore + 10) return { label: '⬆️ 利用頻度が上がっています！良い使い方ですね。', color: '#22c55e' }
  return { label: '→ 前回と変わらず安定しています。', color: '#64748b' }
}

export default function UsageCheckModal({ subscriptions, trigger, onRecord, onDismiss }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<UsageFrequency | null>(null)

  const current = subscriptions[index]
  if (!current) return null

  const total = subscriptions.length
  const isLast = index >= total - 1
  const prevFreq = getPrevFrequency(current)
  const trend = selected ? getTrendInfo(prevFreq, selected) : null
  const accent = '#f97316'

  function handleNext() {
    if (!selected) return
    onRecord(current.id, selected)
    if (isLast) {
      onDismiss()
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
    }
  }

  function handleSkip() {
    if (isLast) {
      onDismiss()
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.9)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div style={{
        width: '100%', maxWidth: '640px', background: '#111',
        borderRadius: '20px 20px 0 0', maxHeight: '85vh', display: 'flex', flexDirection: 'column',
      }}>
        {/* ヘッダー */}
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: accent, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {trigger === 'renewal' ? '🔔 更新1ヶ月前チェック' : '📋 半年ごとの利用確認'}
            </div>
            <div style={{ fontSize: '11px', color: '#555' }}>{index + 1} / {total}</div>
          </div>
          <div style={{ height: '3px', background: '#1e1e1e', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${((index + 1) / total) * 100}%`, background: accent, borderRadius: '2px', transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '20px' }}>
          {/* サービス情報 */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>{current.name}</div>
            <div style={{ fontSize: '12px', color: '#555' }}>
              ¥{current.monthlyPrice.toLocaleString()}/月 · {current.category}
              {trigger === 'renewal' && current.renewalDate && (
                <span style={{ color: '#eab308', marginLeft: '8px' }}>更新: {current.renewalDate}</span>
              )}
            </div>
            {prevFreq && (
              <div style={{ fontSize: '11px', color: '#444', marginTop: '6px' }}>
                前回: {FREQ_OPTIONS.find((o) => o.value === prevFreq)?.label}
              </div>
            )}
          </div>

          {/* 質問 */}
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>最近の利用頻度は？</div>

          {/* 選択肢 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {FREQ_OPTIONS.map((opt) => {
              const isSelected = selected === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setSelected(opt.value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                    border: `1px solid ${isSelected ? accent : '#2a2a2a'}`,
                    background: isSelected ? 'rgba(249,115,22,0.1)' : '#181818',
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isSelected ? accent : '#2a2a2a'}`,
                    background: isSelected ? accent : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isSelected && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#fff' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? accent : '#efefef' }}>{opt.label}</div>
                    <div style={{ fontSize: '11px', color: '#555' }}>{opt.sub}</div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* 選択後にインラインでトレンドを表示 */}
          {trend && (
            <div style={{ padding: '12px 14px', background: '#181818', borderLeft: `3px solid ${trend.color}`, fontSize: '12px', color: trend.color, lineHeight: 1.6 }}>
              {trend.label}
            </div>
          )}
        </div>

        {/* フッター */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: '8px' }}>
          <button
            onClick={handleSkip}
            style={{ flex: 1, padding: '12px', background: 'none', border: '1px solid #2a2a2a', color: '#555', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
          >スキップ</button>
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              flex: 2, padding: '12px',
              background: selected ? accent : '#1a1a1a',
              color: selected ? '#fff' : '#333',
              fontSize: '13px', fontWeight: 700,
              border: 'none', cursor: selected ? 'pointer' : 'default',
            }}
          >{isLast ? '完了' : '次へ →'}</button>
        </div>
      </div>
    </div>
  )
}
