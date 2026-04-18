'use client'
import React, { useState } from 'react'
import type { Subscription } from '../lib/types'
import { calcScenarios, formatYen, INVESTMENT_PROFILES } from '../lib/investmentCalc'

interface Props {
  subscriptions: Subscription[]
  profileId: string
  onProfileChange: (id: string) => void
}

export default function InvestmentCalculator({ subscriptions, profileId, onProfileChange }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const active = subscriptions.filter((s) => s.status === 'active')
  const currentProfile = INVESTMENT_PROFILES.find((p) => p.id === profileId) ?? INVESTMENT_PROFILES[0]

  // 同カテゴリ重複チェック（カテゴリごとの件数）
  const categoryCount = active.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] ?? 0) + 1
    return acc
  }, {})
  const duplicateCategories = Object.entries(categoryCount)
    .filter(([, count]) => count >= 2)
    .map(([cat]) => cat)

  if (active.length === 0) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center', color: '#555' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>📈</div>
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#666' }}>サブスクを登録しよう</div>
        <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.7 }}>マイリストからサブスクを追加すると<br />投資換算を確認できます。</div>
      </div>
    )
  }

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleAll = () =>
    setSelected(selected.size === active.length ? new Set() : new Set(active.map((s) => s.id)))

  const monthlySavings = active.filter((s) => selected.has(s.id)).reduce((sum, s) => sum + s.monthlyPrice, 0)
  const scenarios = calcScenarios(monthlySavings, currentProfile.annualReturn)
  const yearColor: Record<number, string> = { 10: '#64748b', 20: '#f97316', 30: '#22c55e' }

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* 投資方針セレクター */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '12px' }}>
          投資方針を選ぶ
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
          {INVESTMENT_PROFILES.map((p) => {
            const isActive = p.id === profileId
            return (
              <button
                key={p.id}
                onClick={() => onProfileChange(p.id)}
                style={{
                  padding: '12px', border: `1px solid ${isActive ? '#f97316' : '#2a2a2a'}`,
                  background: isActive ? 'rgba(249,115,22,0.1)' : '#181818',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{p.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: isActive ? '#f97316' : '#efefef' }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{p.benchmark}</div>
                <div style={{ fontSize: '11px', color: isActive ? '#f97316' : '#444', marginTop: '4px', fontWeight: 700 }}>
                  年利 {(p.annualReturn * 100).toFixed(0)}%
                </div>
              </button>
            )
          })}
        </div>
        <div style={{ background: '#181818', padding: '12px 14px', marginBottom: '20px', fontSize: '11px', color: '#666', lineHeight: 1.7 }}>
          {currentProfile.description}
        </div>
      </div>

      {/* 重複カテゴリ警告 */}
      {duplicateCategories.length > 0 && (
        <div style={{ padding: '0 20px 0' }}>
          <div style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', padding: '12px 14px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: '#eab308', fontWeight: 700, marginBottom: '4px' }}>⚠️ 同カテゴリに複数契約しています</div>
            <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.6 }}>
              {duplicateCategories.join('・')} — 解約候補として断捨離モードを確認してください。
            </div>
          </div>
        </div>
      )}

      {/* 説明 */}
      <div style={{ padding: '0 20px 0' }}>
        <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', padding: '14px 16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#f97316', fontWeight: 700, marginBottom: '4px' }}>💡 使い方</div>
          <div style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.7 }}>
            解約を検討しているサブスクにチェックを入れると<br />
            {currentProfile.benchmark}（年利{(currentProfile.annualReturn * 100).toFixed(0)}%）で運用した将来価値を計算します。
          </div>
        </div>
      </div>

      {/* チェックリスト */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase' }}>解約候補を選ぶ</div>
          <button onClick={toggleAll} style={{ fontSize: '11px', color: '#f97316', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
            {selected.size === active.length ? 'すべて解除' : 'すべて選択'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {active.map((sub) => {
            const isChecked = selected.has(sub.id)
            const isAnnual = sub.billingCycle === 'annual'
            return (
              <button
                key={sub.id}
                onClick={() => toggle(sub.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  background: isChecked ? 'rgba(249,115,22,0.08)' : 'var(--panel)',
                  padding: '14px 16px', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
                  border: `2px solid ${isChecked ? '#f97316' : '#2a2a2a'}`,
                  background: isChecked ? '#f97316' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isChecked && <span style={{ color: '#fff', fontSize: '12px', fontWeight: 900 }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: isChecked ? '#f97316' : '#efefef' }}>{sub.name}</span>
                  {isAnnual && (
                    <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>年払い（次回更新時から節約）</div>
                  )}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: isChecked ? '#f97316' : '#555' }}>¥{sub.monthlyPrice.toLocaleString()}/月</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 結果 */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '8px' }}>月間節約額</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: monthlySavings > 0 ? '#f97316' : '#333' }}>
              ¥{monthlySavings.toLocaleString()}<span style={{ fontSize: '14px', fontWeight: 400, color: '#555' }}>/月</span>
            </div>
          </div>

          {monthlySavings > 0 ? (
            <>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '12px' }}>
                {currentProfile.benchmark}（年利{(currentProfile.annualReturn * 100).toFixed(0)}%）に積立投資したら
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {scenarios.map((s) => (
                  <div key={s.years} style={{
                    background: 'var(--panel)', border: `1px solid ${s.years === 20 ? 'rgba(249,115,22,0.3)' : 'var(--border)'}`,
                    padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>{s.years}年後</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: yearColor[s.years] }}>{formatYen(s.futureValue)}</div>
                    </div>
                    {s.years === 20 && (
                      <div style={{ fontSize: '10px', color: '#f97316', background: 'rgba(249,115,22,0.1)', padding: '4px 8px', fontWeight: 700 }}>おすすめ</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ padding: '32px 0', textAlign: 'center', color: '#333', fontSize: '13px' }}>
              解約候補を選ぶと将来価値が表示されます
            </div>
          )}
        </div>
      </div>

      {/* 免責事項 */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          ※ {currentProfile.benchmark}の過去平均リターン（年{(currentProfile.annualReturn * 100).toFixed(0)}%）を基に計算。将来の投資成果を保証するものではありません。投資は自己責任でお願いします。利率は四半期ごとに見直しています。
        </div>
      </div>
    </div>
  )
}
