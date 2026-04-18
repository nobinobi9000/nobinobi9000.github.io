import type { Subscription, DanshariScore, UsageFrequency } from './types'
import { MASTER_SUBSCRIPTIONS } from './masterList'

const FREQUENCY_SCORE: Record<UsageFrequency, number> = {
  daily: 100,
  weekly: 65,
  monthly: 30,
  rarely: 5,
}

/**
 * カテゴリの基準価格を取得
 * ユーザーのアクティブ登録が3件以上あればその平均を使用。
 * それ未満の場合はマスターリストの平均をフォールバックとして使用する。
 * これにより「カテゴリ1件だけ登録」でも costScore が固定50にならない。
 */
function getCategoryBaseline(category: string, activeSubs: Subscription[]): number {
  const sameCat = activeSubs.filter((s) => s.category === category)
  if (sameCat.length >= 3) {
    return sameCat.reduce((sum, s) => sum + s.monthlyPrice, 0) / sameCat.length
  }
  // マスターリスト平均をフォールバック
  const masterCat = MASTER_SUBSCRIPTIONS.filter((m) => m.category === category)
  if (masterCat.length > 0) {
    return masterCat.reduce((sum, m) => sum + m.monthlyPrice, 0) / masterCat.length
  }
  return sameCat[0]?.monthlyPrice ?? 1000
}

/**
 * 利用頻度の傾向を分析（直近3回の履歴から）
 */
function analyzeUsageTrend(sub: Subscription): {
  trend: DanshariScore['usageTrend']
  trendPenalty: number
} {
  const history = sub.usageHistory ?? []
  if (history.length < 2) return { trend: 'unknown', trendPenalty: 0 }

  const recent = [...history].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  const scores = recent.map((r) => FREQUENCY_SCORE[r.frequency])

  const latest = scores[0]
  const oldest = scores[scores.length - 1]
  const diff = latest - oldest

  if (diff <= -20) {
    return { trend: 'declining', trendPenalty: Math.min(30, Math.abs(diff) / 2) }
  } else if (diff >= 20) {
    return { trend: 'improving', trendPenalty: 0 }
  }
  return { trend: 'stable', trendPenalty: 0 }
}

export function calcDanshariScore(sub: Subscription, allSubs: Subscription[]): DanshariScore {
  const activeSubs = allSubs.filter((s) => s.status === 'active')
  const freqScore = FREQUENCY_SCORE[sub.usageFrequency]

  // カテゴリ基準価格（マスターリストフォールバック付き）
  const catAvg = getCategoryBaseline(sub.category, activeSubs)
  // 平均より安いほど高スコア（上限100、下限0）
  const rawCostScore = (catAvg / sub.monthlyPrice) * 50
  const costScore = Math.min(100, Math.max(0, Math.round(rawCostScore)))

  // 継続期間：365日以上=100、30日未満=20
  const daysSinceStart = (Date.now() - new Date(sub.startDate).getTime()) / 86_400_000
  const recencyScore = Math.min(100, Math.max(20, Math.round((daysSinceStart / 365) * 100)))

  const { trend, trendPenalty } = analyzeUsageTrend(sub)
  const baseScore = Math.round(freqScore * 0.4 + costScore * 0.4 + recencyScore * 0.2)
  const totalScore = Math.max(0, baseScore - trendPenalty)

  // 同カテゴリに複数のアクティブなサブスクがあるか（重複チェック）
  const sameCatCount = activeSubs.filter((s) => s.category === sub.category).length
  const hasDuplicateCategory = sameCatCount >= 2

  return {
    subscriptionId: sub.id,
    score: totalScore,
    frequencyWeight: freqScore,
    trendPenalty,
    recommendation: totalScore < 35 ? 'cancel' : totalScore < 60 ? 'review' : 'keep',
    usageTrend: trend,
    hasDuplicateCategory,
  }
}

export function sortByDanshariScore(
  subs: Subscription[],
): { subscription: Subscription; danshariScore: DanshariScore }[] {
  const active = subs.filter((s) => s.status === 'active')
  return active
    .map((sub) => ({ subscription: sub, danshariScore: calcDanshariScore(sub, active) }))
    .sort((a, b) => a.danshariScore.score - b.danshariScore.score)
}

/** 利用頻度の確認が必要なサブスク（6ヶ月以上未確認、またはチェック未実施） */
export function getSubscriptionsNeedingUsageCheck(subs: Subscription[]): Subscription[] {
  const sixMonthsAgo = Date.now() - 180 * 86_400_000
  return subs.filter((s) => {
    if (s.status !== 'active') return false
    const history = s.usageHistory ?? []
    if (history.length === 0) return true
    const lastCheck = Math.max(...history.map((r) => new Date(r.date).getTime()))
    return lastCheck < sixMonthsAgo
  })
}

/** 更新1ヶ月以内のサブスク */
export function getSubscriptionsNearRenewal(subs: Subscription[]): Subscription[] {
  const oneMonthFromNow = Date.now() + 31 * 86_400_000
  const today = Date.now()
  return subs.filter((s) => {
    if (s.status !== 'active' || !s.renewalDate) return false
    const renewal = new Date(s.renewalDate).getTime()
    return renewal > today && renewal <= oneMonthFromNow
  })
}
