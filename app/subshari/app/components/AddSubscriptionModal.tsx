'use client'
import React, { useState, useMemo } from 'react'
import type { Subscription, SubscriptionCategory, BillingCycle, UsageFrequency } from '../lib/types'
import { MASTER_SUBSCRIPTIONS, CATEGORY_ORDER, PRICE_AS_OF } from '../lib/masterList'

interface Props {
  initial?: Subscription
  onSave: (sub: Subscription) => void
  onClose: () => void
}

const FREQ_LABELS: Record<UsageFrequency, string> = {
  daily: '毎日',
  weekly: '週数回',
  monthly: '月数回',
  rarely: 'ほぼ使わない',
}

// カテゴリ一覧は masterList の CATEGORY_ORDER から自動取得（追加時に自動反映）
const CATEGORIES = CATEGORY_ORDER as unknown as SubscriptionCategory[]

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function AddSubscriptionModal({ initial, onSave, onClose }: Props) {
  const [step, setStep] = useState<'search' | 'form'>(initial ? 'form' : 'search')
  const [query, setQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState<string>('すべて')

  // フォーム状態
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<SubscriptionCategory>(initial?.category ?? '動画配信')
  const [monthlyPrice, setMonthlyPrice] = useState(String(initial?.monthlyPrice ?? ''))
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initial?.billingCycle ?? 'monthly')
  const [autoRenewal, setAutoRenewal] = useState(initial?.autoRenewal ?? true)
  const [startDate, setStartDate] = useState(initial?.startDate ?? today())
  const [renewalDate, setRenewalDate] = useState(initial?.renewalDate ?? '')
  const [usageFrequency, setUsageFrequency] = useState<UsageFrequency>(initial?.usageFrequency ?? 'weekly')
  const [masterId, setMasterId] = useState(initial?.masterId)
  const [isFromMaster, setIsFromMaster] = useState(initial?.isFromMaster ?? false)
  const [masterNote, setMasterNote] = useState('')

  const filtered = useMemo(() => {
    return MASTER_SUBSCRIPTIONS.filter((m) => {
      const matchCat = selectedCat === 'すべて' || m.category === selectedCat
      const matchQuery = m.name.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchQuery
    })
  }, [query, selectedCat])

  function selectMaster(id: string) {
    const m = MASTER_SUBSCRIPTIONS.find((x) => x.id === id)
    if (!m) return
    setName(m.name)
    setCategory(m.category)
    setMonthlyPrice(String(m.monthlyPrice))
    setMasterId(m.id)
    setIsFromMaster(true)
    setMasterNote(m.note ?? '')
    setStep('form')
  }

  function handleCustom() {
    setName('')
    setCategory('動画配信')
    setMonthlyPrice('')
    setMasterId(undefined)
    setIsFromMaster(false)
    setMasterNote('')
    setStep('form')
  }

  function handleSave() {
    const price = parseInt(monthlyPrice, 10)
    if (!name.trim() || isNaN(price) || price <= 0) return
    const sub: Subscription = {
      id: initial?.id ?? crypto.randomUUID(),
      name: name.trim(),
      category,
      monthlyPrice: billingCycle === 'annual' ? Math.round(price / 12) : price,
      billingCycle,
      status: initial?.status ?? 'active',
      autoRenewal,
      startDate,
      cancelledAt: initial?.cancelledAt,
      renewalDate: renewalDate || undefined,
      usageFrequency,
      usageHistory: initial?.usageHistory ?? [],
      isFromMaster,
      masterId,
    }
    onSave(sub)
  }

  const accent = '#f97316'
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#111',
    border: '1px solid #2a2a2a',
    color: '#efefef',
    fontSize: '14px',
    padding: '10px 12px',
    outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#555',
    textTransform: 'uppercase',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        width: '100%', maxWidth: '640px',
        background: '#111',
        borderRadius: '20px 20px 0 0',
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* ヘッダー */}
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {step === 'form' && !initial && (
              <button onClick={() => setStep('search')} style={{ background: 'none', border: 'none', color: '#555', fontSize: '18px', cursor: 'pointer', padding: '0 4px' }}>←</button>
            )}
            <span style={{ fontSize: '15px', fontWeight: 700 }}>
              {step === 'search' ? 'サブスクを追加' : initial ? 'サブスクを編集' : '詳細を入力'}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#555', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {step === 'search' ? (
            <div>
              {/* 価格基準日 */}
              <div style={{ padding: '12px 20px 0', fontSize: '10px', color: '#444', textAlign: 'right' }}>
                価格は{PRICE_AS_OF}時点
              </div>
              {/* 検索 */}
              <div style={{ padding: '12px 20px' }}>
                <input
                  style={{ ...inputStyle, borderRadius: '8px' }}
                  placeholder="サービス名で検索..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
              {/* カテゴリフィルター */}
              <div style={{ padding: '0 20px 12px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '6px', width: 'max-content' }}>
                  {['すべて', ...CATEGORY_ORDER].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      style={{
                        fontSize: '11px', fontWeight: 700, padding: '4px 10px',
                        border: `1px solid ${selectedCat === cat ? accent : '#2a2a2a'}`,
                        color: selectedCat === cat ? accent : '#555',
                        background: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >{cat}</button>
                  ))}
                </div>
              </div>
              {/* カスタム追加ボタン */}
              <div style={{ padding: '0 20px 8px' }}>
                <button onClick={handleCustom} style={{
                  width: '100%', padding: '12px', background: 'none',
                  border: `1px dashed #2a2a2a`, color: '#555', fontSize: '13px',
                  cursor: 'pointer', textAlign: 'left',
                }}>＋ カスタムで追加（リストにないサービス）</button>
              </div>
              {/* サービスリスト */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#0c0c0c', margin: '0 20px 20px' }}>
                {filtered.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => selectMaster(m.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: '#181818', padding: '12px 16px',
                      border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#efefef' }}>{m.name}</div>
                      <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>
                        {m.category}{m.note ? ` · ${m.note}` : ''}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>¥{m.monthlyPrice.toLocaleString()}/月</div>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#444', fontSize: '13px' }}>
                    サービスが見つかりません
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {masterNote && (
                <div style={{ fontSize: '11px', color: accent, background: 'rgba(249,115,22,0.08)', padding: '8px 12px', borderLeft: `2px solid ${accent}` }}>
                  {masterNote}
                </div>
              )}
              {/* 名前 */}
              <div>
                <label style={labelStyle}>サービス名 *</label>
                <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="例: Netflix" />
              </div>
              {/* カテゴリ */}
              <div>
                <label style={labelStyle}>カテゴリ</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={category} onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {/* 金額 */}
              <div>
                <label style={labelStyle}>料金 *</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '14px' }}>¥</span>
                    <input
                      style={{ ...inputStyle, paddingLeft: '28px' }}
                      type="number"
                      min="0"
                      value={monthlyPrice}
                      onChange={(e) => setMonthlyPrice(e.target.value)}
                      placeholder={billingCycle === 'annual' ? '年額を入力' : '月額を入力'}
                    />
                  </div>
                  <div style={{ display: 'flex', border: '1px solid #2a2a2a' }}>
                    {(['monthly', 'annual'] as BillingCycle[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setBillingCycle(c)}
                        style={{
                          padding: '0 14px', fontSize: '12px', fontWeight: 700,
                          background: billingCycle === c ? accent : 'none',
                          color: billingCycle === c ? '#fff' : '#555',
                          border: 'none', cursor: 'pointer',
                        }}
                      >{c === 'monthly' ? '月払い' : '年払い'}</button>
                    ))}
                  </div>
                </div>
                {billingCycle === 'annual' && monthlyPrice && !isNaN(parseInt(monthlyPrice)) && (
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '6px' }}>
                    月換算: ¥{Math.round(parseInt(monthlyPrice) / 12).toLocaleString()}/月
                  </div>
                )}
              </div>
              {/* 利用頻度 */}
              <div>
                <label style={labelStyle}>利用頻度（正直に！断捨離スコアに影響します）</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {(Object.entries(FREQ_LABELS) as [UsageFrequency, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setUsageFrequency(val)}
                      style={{
                        padding: '10px', fontSize: '12px', fontWeight: 700,
                        border: `1px solid ${usageFrequency === val ? accent : '#2a2a2a'}`,
                        color: usageFrequency === val ? accent : '#555',
                        background: usageFrequency === val ? 'rgba(249,115,22,0.1)' : 'none',
                        cursor: 'pointer',
                      }}
                    >{label}</button>
                  ))}
                </div>
              </div>
              {/* 開始日 */}
              <div>
                <label style={labelStyle}>契約開始日</label>
                <input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              {/* 更新日 */}
              <div>
                <label style={labelStyle}>次回更新日（任意）</label>
                <input
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  type="date"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  placeholder="空白でもOK"
                />
                <div style={{ fontSize: '10px', color: '#444', marginTop: '4px' }}>設定すると更新1ヶ月前に利用頻度チェックを促します</div>
              </div>
              {/* 自動更新 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>自動更新</label>
                <button
                  onClick={() => setAutoRenewal(!autoRenewal)}
                  style={{
                    width: '44px', height: '24px', borderRadius: '12px',
                    background: autoRenewal ? accent : '#2a2a2a',
                    border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '3px',
                    left: autoRenewal ? '23px' : '3px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#fff', transition: 'left 0.2s',
                  }} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 保存ボタン */}
        {step === 'form' && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #1e1e1e' }}>
            <button
              onClick={handleSave}
              disabled={!name.trim() || !monthlyPrice || isNaN(parseInt(monthlyPrice)) || parseInt(monthlyPrice) <= 0}
              style={{
                width: '100%', padding: '14px',
                background: accent, color: '#fff',
                fontSize: '14px', fontWeight: 700, letterSpacing: '1px',
                border: 'none', cursor: 'pointer',
                opacity: (!name.trim() || !monthlyPrice) ? 0.4 : 1,
              }}
            >{initial ? '更新する' : '追加する'}</button>
          </div>
        )}
      </div>
    </div>
  )
}
