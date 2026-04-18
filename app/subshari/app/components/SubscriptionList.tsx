'use client'
import React, { useState } from 'react'
import type { Subscription } from '../lib/types'
import { CATEGORY_COLORS } from './CategoryDonut'
import { calcPastOpportunityCost, formatYen, getProfile } from '../lib/investmentCalc'

interface Props {
  subscriptions: Subscription[]
  investmentProfileId: string
  onAdd: () => void
  onEdit: (sub: Subscription) => void
  onDelete: (id: string) => void
  onCancel: (id: string) => void
  onRestore: (id: string) => void
  onExport: () => void
}

const FREQ_LABELS: Record<string, string> = {
  daily: '毎日',
  weekly: '週数回',
  monthly: '月数回',
  rarely: 'ほぼ使わない',
}

type ListTab = 'active' | 'cancelled'
type ConfirmAction = { type: 'delete' | 'cancel'; id: string } | null

export default function SubscriptionList({
  subscriptions,
  investmentProfileId,
  onAdd,
  onEdit,
  onDelete,
  onCancel,
  onRestore,
  onExport,
}: Props) {
  const [tab, setTab] = useState<ListTab>('active')
  const [confirm, setConfirm] = useState<ConfirmAction>(null)

  const active = subscriptions.filter((s) => s.status === 'active')
  const cancelled = subscriptions.filter((s) => s.status === 'cancelled')
  const monthly = active.reduce((sum, s) => sum + s.monthlyPrice, 0)
  const profile = getProfile(investmentProfileId)

  // 解約済みサブスクの累積節約額と機会費用
  const cancelledMonthlySavings = cancelled.reduce((sum, s) => sum + s.monthlyPrice, 0)
  const cancelledOpportunityCost = cancelled.reduce((sum, s) => {
    if (!s.cancelledAt) return sum
    return sum + calcPastOpportunityCost(s.monthlyPrice, s.cancelledAt, profile.annualReturn)
  }, 0)

  function handleAction(action: 'delete' | 'cancel', id: string) {
    setConfirm({ type: action, id })
  }

  function handleConfirm() {
    if (!confirm) return
    if (confirm.type === 'delete') onDelete(confirm.id)
    if (confirm.type === 'cancel') onCancel(confirm.id)
    setConfirm(null)
  }

  const accent = '#f97316'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* タブ + エクスポートボタン */}
      <div style={{ borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'stretch' }}>
        {(['active', 'cancelled'] as ListTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '12px 8px',
              fontSize: '12px', fontWeight: 700,
              background: 'none', border: 'none', cursor: 'pointer',
              color: tab === t ? accent : '#444',
              borderBottom: `2px solid ${tab === t ? accent : 'transparent'}`,
            }}
          >
            {t === 'active' ? `アクティブ（${active.length}）` : `解約済み（${cancelled.length}）`}
          </button>
        ))}
        <button
          onClick={onExport}
          title="JSONエクスポート"
          style={{ padding: '0 16px', background: 'none', border: 'none', borderLeft: '1px solid var(--border)', color: '#444', cursor: 'pointer', fontSize: '14px' }}
        >↓</button>
      </div>

      {tab === 'active' ? (
        <>
          {/* サマリーバー */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '24px', fontWeight: 900, color: accent }}>¥{monthly.toLocaleString()}</span>
              <span style={{ fontSize: '11px', color: '#555', marginLeft: '4px' }}>/月</span>
            </div>
            <div style={{ fontSize: '11px', color: '#555' }}>年間 ¥{(monthly * 12).toLocaleString()}</div>
          </div>

          {/* アクティブリスト */}
          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
            {active.length === 0 ? (
              <div style={{ padding: '64px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✂️</div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#666' }}>サブスクを登録しよう</div>
                <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.7, marginBottom: '24px' }}>
                  現在契約しているサービスを追加して<br />支出を可視化しましょう。
                </div>
                <button
                  onClick={onAdd}
                  style={{ padding: '12px 24px', background: accent, color: '#fff', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >＋ 最初のサブスクを追加</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {active.map((sub) => (
                  <div key={sub.id} style={{ background: 'var(--panel)', padding: '16px 20px' }}>
                    {confirm?.id === sub.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ fontSize: '13px', color: '#aaa' }}>
                          {confirm.type === 'cancel'
                            ? `「${sub.name}」を解約済みにしますか？（あとから復元できます）`
                            : `「${sub.name}」を完全に削除しますか？`}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={handleConfirm}
                            style={{ flex: 1, padding: '10px', background: confirm.type === 'cancel' ? accent : '#ef4444', color: '#fff', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                          >
                            {confirm.type === 'cancel' ? '✂️ 解約済みにする' : '削除する'}
                          </button>
                          <button
                            onClick={() => setConfirm(null)}
                            style={{ flex: 1, padding: '10px', background: 'none', color: '#555', fontSize: '12px', fontWeight: 700, border: '1px solid #2a2a2a', cursor: 'pointer' }}
                          >キャンセル</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: CATEGORY_COLORS[sub.category] ?? '#555', flexShrink: 0, marginTop: '5px' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#efefef', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub.name}</span>
                            <span style={{ fontSize: '15px', fontWeight: 900, color: accent, flexShrink: 0 }}>¥{sub.monthlyPrice.toLocaleString()}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '10px', color: '#555' }}>{sub.category}</span>
                            <span style={{ fontSize: '10px', color: '#444' }}>·</span>
                            <span style={{ fontSize: '10px', color: '#555' }}>{FREQ_LABELS[sub.usageFrequency]}</span>
                            {sub.billingCycle === 'annual' && (
                              <>
                                <span style={{ fontSize: '10px', color: '#444' }}>·</span>
                                <span style={{ fontSize: '10px', color: '#555' }}>年払い</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          <button onClick={() => onEdit(sub)} style={{ padding: '6px 10px', background: 'none', border: '1px solid #2a2a2a', color: '#555', fontSize: '11px', cursor: 'pointer' }}>編集</button>
                          <button onClick={() => handleAction('cancel', sub.id)} style={{ padding: '6px 10px', background: 'none', border: `1px solid rgba(249,115,22,0.3)`, color: accent, fontSize: '11px', cursor: 'pointer' }}>解約</button>
                          <button onClick={() => handleAction('delete', sub.id)} style={{ padding: '6px 8px', background: 'none', border: '1px solid #2a2a2a', color: '#444', fontSize: '11px', cursor: 'pointer' }}>×</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAB */}
          {active.length > 0 && (
            <button
              onClick={onAdd}
              style={{
                position: 'fixed', bottom: '80px', right: '24px',
                width: '52px', height: '52px', borderRadius: '50%',
                background: accent, color: '#fff', fontSize: '24px',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
              }}
            >＋</button>
          )}
        </>
      ) : (
        /* ── 解約済みタブ ─────────────────────── */
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
          {cancelled.length === 0 ? (
            <div style={{ padding: '64px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
              <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.7 }}>
                まだ解約したサブスクはありません。<br />
                断捨離モードで解約候補を見つけましょう。
              </div>
            </div>
          ) : (
            <>
              {/* 断捨離成果サマリー */}
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: accent, textTransform: 'uppercase', marginBottom: '12px' }}>
                  ✂️ 断捨離の成果
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '14px' }}>
                    <div style={{ fontSize: '9px', color: '#555', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>月間節約額</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: accent }}>¥{cancelledMonthlySavings.toLocaleString()}</div>
                  </div>
                  <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '14px' }}>
                    <div style={{ fontSize: '9px', color: '#555', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>年間節約額</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#efefef' }}>¥{(cancelledMonthlySavings * 12).toLocaleString()}</div>
                  </div>
                </div>
                {cancelledOpportunityCost > 0 && (
                  <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', padding: '14px' }}>
                    <div style={{ fontSize: '10px', color: accent, fontWeight: 700, marginBottom: '4px' }}>📈 解約後に{profile.benchmark}へ積み立てていたら</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: accent }}>{formatYen(cancelledOpportunityCost)}</div>
                    <div style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>になっていた可能性があります</div>
                  </div>
                )}
              </div>

              {/* 解約済みリスト */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {cancelled.map((sub) => {
                  const accValue = sub.cancelledAt
                    ? calcPastOpportunityCost(sub.monthlyPrice, sub.cancelledAt, profile.annualReturn)
                    : 0
                  return (
                    <div key={sub.id} style={{ background: 'var(--panel)', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#888' }}>{sub.name}</span>
                            <span style={{ fontSize: '9px', color: '#444', background: '#1a1a1a', padding: '2px 6px' }}>解約済み</span>
                          </div>
                          <div style={{ fontSize: '10px', color: '#444' }}>
                            ¥{sub.monthlyPrice.toLocaleString()}/月 · 解約日: {sub.cancelledAt ?? '不明'}
                          </div>
                          {accValue > 0 && (
                            <div style={{ fontSize: '10px', color: '#f97316', marginTop: '4px' }}>
                              積立換算: {formatYen(accValue)}
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                          <button
                            onClick={() => onRestore(sub.id)}
                            style={{ padding: '6px 10px', background: 'none', border: '1px solid #2a2a2a', color: '#555', fontSize: '11px', cursor: 'pointer' }}
                          >復元</button>
                          <button
                            onClick={() => onDelete(sub.id)}
                            style={{ padding: '6px 8px', background: 'none', border: '1px solid #2a2a2a', color: '#444', fontSize: '11px', cursor: 'pointer' }}
                          >×</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
