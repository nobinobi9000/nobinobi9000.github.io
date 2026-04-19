export type BillingCycle = 'monthly' | 'annual'
export type UsageFrequency = 'daily' | 'weekly' | 'monthly' | 'rarely'
export type SubscriptionStatus = 'active' | 'cancelled'
export type SubscriptionCategory =
  | '動画配信'
  | '音楽'
  | '電子書籍'
  | 'フィットネス'
  | 'スポーツ'
  | '学習'
  | 'ソフトウェア'
  | 'ビジネス'
  | 'ゲーム'
  | 'ニュース'
  | 'ヘルスケア'
  | 'ショッピング'
  | 'その他'

/** 利用頻度の履歴レコード（半年ごとの確認結果） */
export interface UsageRecord {
  date: string // 'YYYY-MM-DD' 確認日
  frequency: UsageFrequency
}

export interface Subscription {
  id: string
  name: string
  category: SubscriptionCategory
  monthlyPrice: number
  billingCycle: BillingCycle
  status: SubscriptionStatus
  autoRenewal: boolean
  startDate: string      // 'YYYY-MM-DD' 契約開始日
  cancelledAt?: string   // 'YYYY-MM-DD' 解約日（解約済みのみ）
  renewalDate?: string   // 'YYYY-MM-DD' 次回更新日（任意）
  usageFrequency: UsageFrequency
  usageHistory: UsageRecord[]
  notes?: string
  isFromMaster: boolean
  masterId?: string
}

export interface MasterSubscription {
  id: string
  name: string
  category: SubscriptionCategory
  monthlyPrice: number
  icon: string
  note?: string
}

export interface SubshariStore {
  subscriptions: Subscription[]
  lastUpdated: string
  version: number
  investmentProfileId?: string
  /** 投資利率見直しリマインダー（6ヶ月ごと） */
  lastRateCheckDate?: string
  /** マスターリスト価格確認（スケジュールエージェントが6ヶ月ごとに自動更新） */
  lastPriceCheckDate?: string
  lastUsageCheck?: string
}

// ─── 投資プロファイル ───────────────────────────────

export interface InvestmentProfile {
  id: string
  name: string
  description: string
  benchmark: string
  annualReturn: number
  icon: string
}

export interface InvestmentScenario {
  years: 10 | 20 | 30
  monthlySavings: number
  futureValue: number
}

// ─── 断捨離スコア ────────────────────────────────────

export interface DanshariScore {
  subscriptionId: string
  score: number
  frequencyWeight: number
  trendPenalty: number
  recommendation: 'cancel' | 'review' | 'keep'
  usageTrend: 'declining' | 'stable' | 'improving' | 'unknown'
  hasDuplicateCategory: boolean
}
