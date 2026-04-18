import type { InvestmentProfile, InvestmentScenario } from './types'

/**
 * 投資プロファイル一覧
 * ※ 利率は過去の実績に基づく目安。将来のリターンを保証するものではありません。
 * ※ 3ヶ月（1・4・7・10月）ごとに公式サイトで最新の実績を確認し、必要に応じて更新してください。
 */
export const INVESTMENT_PROFILES: readonly InvestmentProfile[] = [
  {
    id: 'sp500',
    name: '積極型',
    description: 'S&P500（米国500社）連動インデックス。過去の長期リターンは年平均7〜10%。高リターンを狙いたい方向け。',
    benchmark: 'S&P500',
    annualReturn: 0.07,
    icon: '🚀',
  },
  {
    id: 'all-country',
    name: '分散型',
    description: '全世界株式（オルカン）連動インデックス。先進国・新興国を幅広く分散。過去の長期リターンは年平均6%前後。',
    benchmark: '全世界株（オルカン）',
    annualReturn: 0.06,
    icon: '🌏',
  },
  {
    id: 'topix',
    name: '保守型',
    description: 'TOPIX連動インデックス。日本株市場全体への投資。為替リスクなし。過去の長期リターンは年平均4%前後。',
    benchmark: 'TOPIX',
    annualReturn: 0.04,
    icon: '🗾',
  },
  {
    id: 'gold',
    name: '安心型',
    description: '金（ゴールド）積立。インフレ・株式市場下落時のヘッジとして機能。過去の長期リターンは年平均3〜4%。',
    benchmark: '金積立',
    annualReturn: 0.03,
    icon: '🥇',
  },
] as const

export function getProfile(profileId: string): InvestmentProfile {
  return INVESTMENT_PROFILES.find((p) => p.id === profileId) ?? INVESTMENT_PROFILES[0]
}

/**
 * 積立将来価値（FV）
 * FV = PMT × [((1+r)^n - 1) / r]
 */
export function calcFutureValue(
  monthlyPayment: number,
  years: number,
  annualReturn: number,
): number {
  if (monthlyPayment <= 0 || years <= 0) return 0
  const n = years * 12
  const r = (1 + annualReturn) ** (1 / 12) - 1
  return Math.round(monthlyPayment * (((1 + r) ** n - 1) / r))
}

/** 10・20・30年シナリオを一括計算 */
export function calcScenarios(
  monthlySavings: number,
  annualReturn: number,
): InvestmentScenario[] {
  return ([10, 20, 30] as const).map((years) => ({
    years,
    monthlySavings,
    futureValue: calcFutureValue(monthlySavings, years, annualReturn),
  }))
}

/**
 * 過去の機会費用（解約済みサブスクで解約日から今日まで積み立てていたら）
 * @param cancelledAt 解約日 'YYYY-MM-DD'
 */
export function calcPastOpportunityCost(
  monthlyPayment: number,
  cancelledAt: string,
  annualReturn: number,
): number {
  const monthsElapsed = Math.max(
    0,
    Math.floor((Date.now() - new Date(cancelledAt).getTime()) / (30.44 * 86_400_000)),
  )
  if (monthsElapsed === 0) return 0
  const r = (1 + annualReturn) ** (1 / 12) - 1
  return Math.round(monthlyPayment * (((1 + r) ** monthsElapsed - 1) / r))
}

/**
 * 「もし最初から投資していたら」（契約開始日から今日まで）
 */
export function calcOpportunityCostSinceStart(
  monthlyPayment: number,
  startDate: string,
  annualReturn: number,
): number {
  return calcPastOpportunityCost(monthlyPayment, startDate, annualReturn)
}

export function formatYen(amount: number): string {
  if (amount >= 100_000_000) {
    const oku = amount / 100_000_000
    return `約${oku.toFixed(1)}億円`
  }
  const man = Math.round(amount / 10_000)
  return `約${man.toLocaleString()}万円`
}

/** 投資利率見直しが必要か（3ヶ月 = 90日 を目安に） */
export function needsRateReview(lastRateCheckDate: string | undefined): boolean {
  if (!lastRateCheckDate) return true
  const daysSince = (Date.now() - new Date(lastRateCheckDate).getTime()) / 86_400_000
  return daysSince >= 90
}

/** マスターリスト価格確認が必要か（30日ごと） */
export function needsPriceCheck(lastPriceCheckDate: string | undefined): boolean {
  if (!lastPriceCheckDate) return true
  const daysSince = (Date.now() - new Date(lastPriceCheckDate).getTime()) / 86_400_000
  return daysSince >= 30
}
