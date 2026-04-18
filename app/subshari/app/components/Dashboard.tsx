'use client'
import React from 'react'
import type { Subscription } from '../lib/types'
import CategoryDonut, { CATEGORY_COLORS } from './CategoryDonut'

interface Props {
  subscriptions: Subscription[]
}

export default function Dashboard({ subscriptions }: Props) {
  if (subscriptions.length === 0) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center', color: '#555' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>📊</div>
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#666' }}>サブスクを登録しよう</div>
        <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.7 }}>マイリストからサブスクを追加すると<br />支出の内訳が表示されます。</div>
      </div>
    )
  }

  const monthly = subscriptions.reduce((sum, s) => sum + s.monthlyPrice, 0)
  const annual = monthly * 12

  // カテゴリ別集計
  const categoryMap = new Map<string, number>()
  subscriptions.forEach((s) => {
    categoryMap.set(s.category, (categoryMap.get(s.category) ?? 0) + s.monthlyPrice)
  })
  const categoryData = Array.from(categoryMap.entries())
    .map(([label, value]) => ({ label, value, color: CATEGORY_COLORS[label] ?? '#6b7280' }))
    .sort((a, b) => b.value - a.value)

  return (
    <div style={{ padding: '0 0 80px' }}>
      {/* 合計カード */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '20px 16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>月額合計</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#f97316', letterSpacing: '-1px' }}>
              ¥{monthly.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: '#444', marginTop: '4px' }}>{subscriptions.length}件のサブスク</div>
          </div>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '20px 16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#555', marginBottom: '8px', textTransform: 'uppercase' }}>年額合計</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#efefef', letterSpacing: '-1px' }}>
              ¥{annual.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: '#444', marginTop: '4px' }}>月額×12ヶ月</div>
          </div>
        </div>
      </div>

      {/* ドーナツチャート */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '20px' }}>カテゴリ別内訳</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <CategoryDonut data={categoryData} size={160} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ fontSize: '11px', color: '#555' }}>合計</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#f97316' }}>¥{monthly.toLocaleString()}</div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categoryData.map((d) => (
              <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: '11px', color: '#aaa' }}>{d.label}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#efefef' }}>¥{d.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* カテゴリ別リスト */}
      <div style={{ padding: '24px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '16px' }}>カテゴリ別詳細</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {categoryData.map((cat) => {
            const catSubs = subscriptions.filter((s) => s.category === cat.label)
            const pct = Math.round((cat.value / monthly) * 100)
            return (
              <div key={cat.label} style={{ background: 'var(--panel)', padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.color }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, flex: 1 }}>{cat.label}</span>
                  <span style={{ fontSize: '12px', color: '#555' }}>{pct}%</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>¥{cat.value.toLocaleString()}</span>
                </div>
                {/* バー */}
                <div style={{ height: '3px', background: '#2a2a2a', borderRadius: '2px', marginBottom: '10px' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: '2px' }} />
                </div>
                {catSubs.map((s) => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#555', padding: '2px 0' }}>
                    <span>{s.name}</span>
                    <span>¥{s.monthlyPrice.toLocaleString()}/月</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
