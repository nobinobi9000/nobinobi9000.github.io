'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Subscription, SubshariStore, UsageFrequency } from '../lib/types'

const STORAGE_KEY = 'subshari_v1'
const CURRENT_VERSION = 1

function makeDefaultStore(): SubshariStore {
  return {
    subscriptions: [],
    lastUpdated: new Date().toISOString(),
    version: CURRENT_VERSION,
    investmentProfileId: 'sp500',
  }
}

function loadStore(): SubshariStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return makeDefaultStore()
    const parsed = JSON.parse(raw) as SubshariStore
    return {
      ...makeDefaultStore(),
      ...parsed,
      subscriptions: (parsed.subscriptions ?? []).map((s) => ({
        ...s,
        status: s.status ?? 'active',
        usageHistory: s.usageHistory ?? [],
      })),
    }
  } catch {
    return makeDefaultStore()
  }
}

function persist(store: SubshariStore): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...store, lastUpdated: new Date().toISOString() }),
    )
  } catch {
    // localStorage が使えない場合は無視
  }
}

export function useSubscriptions() {
  const [store, setStore] = useState<SubshariStore>(makeDefaultStore)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setStore(loadStore())
    setIsLoaded(true)
  }, [])

  const updateStore = useCallback((updater: (prev: SubshariStore) => SubshariStore) => {
    setStore((prev) => {
      const next = updater(prev)
      persist(next)
      return next
    })
  }, [])

  // ── CRUD ──────────────────────────────────────────────

  const addSubscription = useCallback(
    (sub: Subscription) =>
      updateStore((prev) => ({ ...prev, subscriptions: [...prev.subscriptions, sub] })),
    [updateStore],
  )

  const updateSubscription = useCallback(
    (updated: Subscription) =>
      updateStore((prev) => ({
        ...prev,
        subscriptions: prev.subscriptions.map((s) => (s.id === updated.id ? updated : s)),
      })),
    [updateStore],
  )

  const deleteSubscription = useCallback(
    (id: string) =>
      updateStore((prev) => ({
        ...prev,
        subscriptions: prev.subscriptions.filter((s) => s.id !== id),
      })),
    [updateStore],
  )

  /** 解約済みにする（アーカイブ） */
  const cancelSubscription = useCallback(
    (id: string) =>
      updateStore((prev) => ({
        ...prev,
        subscriptions: prev.subscriptions.map((s) =>
          s.id === id
            ? { ...s, status: 'cancelled' as const, cancelledAt: new Date().toISOString().slice(0, 10) }
            : s,
        ),
      })),
    [updateStore],
  )

  /** 解約済みを復元（アクティブに戻す） */
  const restoreSubscription = useCallback(
    (id: string) =>
      updateStore((prev) => ({
        ...prev,
        subscriptions: prev.subscriptions.map((s) =>
          s.id === id ? { ...s, status: 'active' as const, cancelledAt: undefined } : s,
        ),
      })),
    [updateStore],
  )

  // ── 利用頻度チェック ──────────────────────────────────

  const recordUsageCheck = useCallback(
    (subscriptionId: string, frequency: UsageFrequency) =>
      updateStore((prev) => ({
        ...prev,
        subscriptions: prev.subscriptions.map((s) => {
          if (s.id !== subscriptionId) return s
          const newRecord = { date: new Date().toISOString().slice(0, 10), frequency }
          return {
            ...s,
            usageFrequency: frequency,
            usageHistory: [...(s.usageHistory ?? []), newRecord],
          }
        }),
        lastUsageCheck: new Date().toISOString(),
      })),
    [updateStore],
  )

  // ── 投資設定 ─────────────────────────────────────────

  const setInvestmentProfile = useCallback(
    (profileId: string) =>
      updateStore((prev) => ({ ...prev, investmentProfileId: profileId })),
    [updateStore],
  )

  const markRateCheckSeen = useCallback(
    () => updateStore((prev) => ({ ...prev, lastRateCheckDate: new Date().toISOString() })),
    [updateStore],
  )

  const markPriceCheckSeen = useCallback(
    () => updateStore((prev) => ({ ...prev, lastPriceCheckDate: new Date().toISOString() })),
    [updateStore],
  )

  // ── エクスポート / インポート ────────────────────────

  const exportToJson = useCallback(() => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: CURRENT_VERSION,
      subscriptions: store.subscriptions,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subshari-backup-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [store.subscriptions])

  return {
    subscriptions: store.subscriptions,
    isLoaded,
    investmentProfileId: store.investmentProfileId ?? 'sp500',
    lastRateCheckDate: store.lastRateCheckDate,
    lastPriceCheckDate: store.lastPriceCheckDate,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    cancelSubscription,
    restoreSubscription,
    recordUsageCheck,
    setInvestmentProfile,
    markRateCheckSeen,
    markPriceCheckSeen,
    exportToJson,
  }
}
