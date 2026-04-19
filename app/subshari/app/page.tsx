'use client'
import React, { useState, useEffect, useRef } from 'react'
import type { Subscription } from './lib/types'
import { useSubscriptions } from './hooks/useSubscriptions'
import { getSubscriptionsNeedingUsageCheck, getSubscriptionsNearRenewal } from './lib/danshariScore'
import { needsRateReview } from './lib/investmentCalc'
import SubscriptionList from './components/SubscriptionList'
import Dashboard from './components/Dashboard'
import InvestmentCalculator from './components/InvestmentCalculator'
import DanshariMode from './components/DanshariMode'
import AddSubscriptionModal from './components/AddSubscriptionModal'
import UsageCheckModal from './components/UsageCheckModal'

type Tab = 'list' | 'dashboard' | 'invest' | 'danshari'
type UsageCheckTrigger = 'startup' | 'renewal'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'list', label: 'マイリスト', icon: '📋' },
  { id: 'dashboard', label: '支出', icon: '📊' },
  { id: 'invest', label: '投資換算', icon: '📈' },
  { id: 'danshari', label: '断捨離', icon: '✂️' },
]

export default function SubshariApp() {
  const {
    subscriptions,
    isLoaded,
    investmentProfileId,
    lastRateCheckDate,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    restoreSubscription,
    recordUsageCheck,
    setInvestmentProfile,
    markRateCheckSeen,
    exportToJson,
  } = useSubscriptions()

  const [activeTab, setActiveTab] = useState<Tab>('list')
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<Subscription | undefined>(undefined)

  // 利用頻度チェックモーダル
  const [usageCheckSubs, setUsageCheckSubs] = useState<Subscription[]>([])
  const [usageCheckTrigger, setUsageCheckTrigger] = useState<UsageCheckTrigger>('startup')
  const [showUsageCheck, setShowUsageCheck] = useState(false)

  // 投資利率見直しバナー
  const [showRateBanner, setShowRateBanner] = useState(false)

  // 起動時チェックは1セッションにつき1回のみ実行
  const startupCheckDone = useRef(false)

  useEffect(() => {
    if (!isLoaded || startupCheckDone.current) return
    startupCheckDone.current = true

    const active = subscriptions.filter((s) => s.status === 'active')
    if (active.length === 0) return

    // 1. 更新1ヶ月前チェック（優先度最高）
    const nearRenewal = getSubscriptionsNearRenewal(active)
    if (nearRenewal.length > 0) {
      setUsageCheckSubs(nearRenewal)
      setUsageCheckTrigger('renewal')
      setShowUsageCheck(true)
      return
    }

    // 2. 6ヶ月以上チェックしていないサブスク
    const needsCheck = getSubscriptionsNeedingUsageCheck(active)
    if (needsCheck.length > 0) {
      setUsageCheckSubs(needsCheck)
      setUsageCheckTrigger('startup')
      setShowUsageCheck(true)
      return
    }

    // 3. 投資利率見直しリマインダー（6ヶ月ごと）
    if (needsRateReview(lastRateCheckDate)) setShowRateBanner(true)
  // ロード完了後1回だけ実行するため依存配列は意図的にisLoadedのみ
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  function handleAdd() { setEditTarget(undefined); setShowModal(true) }
  function handleEdit(sub: Subscription) { setEditTarget(sub); setShowModal(true) }
  function handleSave(sub: Subscription) {
    editTarget ? updateSubscription(sub) : addSubscription(sub)
    setShowModal(false)
    setEditTarget(undefined)
  }
  function handleClose() { setShowModal(false); setEditTarget(undefined) }
  function handleUsageCheckDismiss() { setShowUsageCheck(false); setUsageCheckSubs([]) }

  const active = subscriptions.filter((s) => s.status === 'active')
  const monthly = active.reduce((sum, s) => sum + s.monthlyPrice, 0)

  return (
    <div style={{
      minHeight: '100svh', background: 'var(--black)',
      display: 'flex', flexDirection: 'column',
      maxWidth: '640px', margin: '0 auto',
    }}>
      {/* ── 通知バナー ─────────────────────────────── */}
      {showRateBanner && (
        <div style={{ background: 'rgba(249,115,22,0.1)', borderBottom: '1px solid rgba(249,115,22,0.2)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ fontSize: '11px', color: '#f97316', lineHeight: 1.5 }}>
            📈 投資利率の見直し時期です（6ヶ月ごと）。各ベンチマークの最新リターンを確認してください。
          </div>
          <button onClick={() => { markRateCheckSeen(); setShowRateBanner(false) }} style={{ background: 'none', border: 'none', color: '#555', fontSize: '16px', cursor: 'pointer', flexShrink: 0 }}>✕</button>
        </div>
      )}

      {/* ── ヘッダー ──────────────────────────────── */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'var(--black)', zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/subshari" style={{ fontSize: '10px', color: '#444', textDecoration: 'none', fontWeight: 700 }}>←</a>
          <span style={{ fontSize: '16px' }}>✂️</span>
          <span style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '-0.5px' }}>サブスクの断捨離</span>
        </div>
        {isLoaded && active.length > 0 && (
          <div style={{ fontSize: '11px', color: '#555' }}>月額 ¥{monthly.toLocaleString()}</div>
        )}
      </div>

      {/* ── コンテンツ ────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {!isLoaded ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: '#333', fontSize: '13px' }}>読み込み中...</div>
        ) : (
          <>
            {activeTab === 'list' && (
              <SubscriptionList
                subscriptions={subscriptions}
                investmentProfileId={investmentProfileId}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={deleteSubscription}
                onCancel={cancelSubscription}
                onRestore={restoreSubscription}
                onExport={exportToJson}
              />
            )}
            {activeTab === 'dashboard' && <Dashboard subscriptions={active} />}
            {activeTab === 'invest' && (
              <InvestmentCalculator
                subscriptions={subscriptions}
                profileId={investmentProfileId}
                onProfileChange={setInvestmentProfile}
              />
            )}
            {activeTab === 'danshari' && (
              <DanshariMode
                subscriptions={subscriptions}
                investmentProfileId={investmentProfileId}
                onEdit={handleEdit}
                onCancel={cancelSubscription}
              />
            )}
          </>
        )}
      </div>

      {/* ── ボトムタブ ────────────────────────────── */}
      <nav style={{
        position: 'sticky', bottom: 0,
        background: '#0c0c0c', borderTop: '1px solid var(--border)',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', zIndex: 50,
      }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '10px 4px 12px', background: 'none', border: 'none', cursor: 'pointer', gap: '3px',
                borderTop: `2px solid ${isActive ? '#f97316' : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: '18px', lineHeight: 1 }}>{tab.icon}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: isActive ? '#f97316' : '#444' }}>{tab.label}</span>
            </button>
          )
        })}
      </nav>

      {/* ── モーダル群 ────────────────────────────── */}
      {showModal && (
        <AddSubscriptionModal initial={editTarget} onSave={handleSave} onClose={handleClose} />
      )}
      {showUsageCheck && usageCheckSubs.length > 0 && (
        <UsageCheckModal
          subscriptions={usageCheckSubs}
          trigger={usageCheckTrigger}
          onRecord={recordUsageCheck}
          onDismiss={handleUsageCheckDismiss}
        />
      )}
    </div>
  )
}
