'use client'
import React, { useState } from 'react'
import type { Subscription } from '../lib/types'
import { sortByDanshariScore } from '../lib/danshariScore'
import { calcOpportunityCostSinceStart, formatYen, getProfile } from '../lib/investmentCalc'

interface Props {
  subscriptions: Subscription[]
  investmentProfileId: string
  onEdit: (sub: Subscription) => void
  onCancel: (id: string) => void
}

const FREQ_LABELS: Record<string, string> = {
  daily: '毎日',
  weekly: '週数回',
  monthly: '月数回',
  rarely: 'ほぼ使わない',
}

const REC_CONFIG = {
  cancel: { label: '解約候補', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  review: { label: '要見直し', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  keep: { label: 'キープ', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
}

const TREND_ICONS: Record<string, string> = {
  declining: '⬇️',
  improving: '⬆️',
  stable: '→',
  unknown: '',
}

export default function DanshariMode({ subscriptions, investmentProfileId, onEdit, onCancel }: Props) {
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null)

  if (subscriptions.filter((s) => s.status === 'active').length === 0) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center', color: '#555' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✂️</div>
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#666' }}>サブスクを登録しよう</div>
        <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.7 }}>マイリストからサブスクを追加すると<br />断捨離スコアが表示されます。</div>
      </div>
    )
  }

  const profile = getProfile(investmentProfileId)
  const scored = sortByDanshariScore(subscriptions)
  const cancelCandidates = scored.filter((s) => s.danshariScore.recommendation === 'cancel')
  const totalCancelSavings = cancelCandidates.reduce((sum, { subscription: s }) => sum + s.monthlyPrice, 0)

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* まず見直すべきサブスク */}
      {cancelCandidates.length > 0 && (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '10px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              🚨 まず見直すべきサブスク
            </div>
            {cancelCandidates.slice(0, 3).map(({ subscription: sub }) => (
              <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '13px' }}>
                <span style={{ color: '#aaa' }}>{sub.name}</span>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>¥{sub.monthlyPrice.toLocaleString()}/月</span>
              </div>
            ))}
            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(239,68,68,0.15)' }}>
              <div style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>
                全解約すると月¥{totalCancelSavings.toLocaleString()}節約 →
              </div>
              <div style={{ fontSize: '13px', color: '#ef4444', fontWeight: 700 }}>
                20年後: {formatYen(
                  cancelCandidates.slice(0, 3).reduce((sum, { subscription: s }) => {
                    const r = (1 + profile.annualReturn) ** (1 / 12) - 1
                    return sum + Math.round(s.monthlyPrice * (((1 + r) ** (20 * 12) - 1) / r))
                  }, 0)
                )}（{profile.benchmark}想定）
              </div>
            </div>
          </div>
        </div>
      )}

      {/* スコアリスト */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textTransform: 'uppercase', marginBottom: '4px' }}>
          断捨離スコア一覧（低いほど解約候補）
        </div>
        <div style={{ fontSize: '11px', color: '#333', marginBottom: '16px' }}>利用頻度・コスト効率・継続期間から算出</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {scored.map(({ subscription: sub, danshariScore: ds }) => {
            const rec = REC_CONFIG[ds.recommendation]
            const opportunityCost = calcOpportunityCostSinceStart(sub.monthlyPrice, sub.startDate, profile.annualReturn)
            const isConfirming = confirmCancelId === sub.id

            return (
              <div key={sub.id} style={{ background: 'var(--panel)', padding: '16px' }}>
                {isConfirming ? (
                  <div>
                    <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '10px' }}>「{sub.name}」を解約済みにしますか？</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => { onCancel(sub.id); setConfirmCancelId(null) }}
                        style={{ flex: 1, padding: '10px', background: '#f97316', color: '#fff', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                      >✂️ 解約済みにする</button>
                      <button
                        onClick={() => setConfirmCancelId(null)}
                        style={{ flex: 1, padding: '10px', background: 'none', color: '#555', fontSize: '12px', fontWeight: 700, border: '1px solid #2a2a2a', cursor: 'pointer' }}
                      >キャンセル</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      {/* スコア */}
                      <div style={{ flexShrink: 0, textAlign: 'center', minWidth: '40px' }}>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: ds.score < 35 ? '#ef4444' : ds.score < 60 ? '#eab308' : '#22c55e', lineHeight: 1 }}>
                          {ds.score}
                        </div>
                        <div style={{ fontSize: '8px', color: '#444', marginTop: '2px' }}>点</div>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#efefef' }}>{sub.name}</span>
                          <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', background: rec.bg, color: rec.color }}>{rec.label}</span>
                          {ds.hasDuplicateCategory && (
                            <span style={{ fontSize: '10px', padding: '2px 6px', background: 'rgba(234,179,8,0.1)', color: '#eab308' }}>同カテゴリ重複</span>
                          )}
                          {ds.usageTrend !== 'unknown' && (
                            <span style={{ fontSize: '10px', color: ds.usageTrend === 'declining' ? '#ef4444' : ds.usageTrend === 'improving' ? '#22c55e' : '#555' }}>
                              {TREND_ICONS[ds.usageTrend]}
                            </span>
                          )}
                        </div>
                        {/* スコアバー */}
                        <div style={{ height: '4px', background: '#1e1e1e', borderRadius: '2px', marginBottom: '8px' }}>
                          <div style={{ height: '100%', width: `${ds.score}%`, background: ds.score < 35 ? '#ef4444' : ds.score < 60 ? '#eab308' : '#22c55e', borderRadius: '2px' }} />
                        </div>
                        <div style={{ fontSize: '10px', color: '#444' }}>
                          ¥{sub.monthlyPrice.toLocaleString()}/月 · {FREQ_LABELS[sub.usageFrequency]}
                        </div>
                        {/* 機会費用（最初から投資していたら） */}
                        {opportunityCost > 0 && ds.recommendation !== 'keep' && (
                          <div style={{ marginTop: '6px', fontSize: '10px', color: '#555', background: '#181818', padding: '6px 8px' }}>
                            契約開始から積み立てていたら <span style={{ color: '#f97316', fontWeight: 700 }}>{formatYen(opportunityCost)}</span> になっていた
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                        <button onClick={() => onEdit(sub)} style={{ padding: '5px 8px', background: 'none', border: '1px solid #2a2a2a', color: '#555', fontSize: '11px', cursor: 'pointer' }}>編集</button>
                        {ds.recommendation !== 'keep' && (
                          <button
                            onClick={() => setConfirmCancelId(sub.id)}
                            style={{ padding: '5px 8px', background: 'none', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316', fontSize: '11px', cursor: 'pointer' }}
                          >解約</button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* スコア説明 */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ border: '1px solid var(--border)', padding: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#555', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>スコアの計算方法</div>
          {[
            { label: '利用頻度（40%）', desc: '毎日使うほど高スコア。使っていないなら解約を検討' },
            { label: 'コスト効率（40%）', desc: '同カテゴリ平均（マスターリスト基準）より高いと低スコア' },
            { label: '継続期間（20%）', desc: '長く使っているほど生活に根づいていると判定' },
            { label: '利用傾向ボーナス', desc: '半年ごとの確認で頻度が下がっていると最大−30点' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: '4px', background: '#f97316', flexShrink: 0, borderRadius: '2px', alignSelf: 'stretch' }} />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#aaa' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#444' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
