import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

const SLIDES = [
  { src: '/screenshots/japan-stock-screener.png', caption: 'スクリーナー画面' },
]

export const metadata: Metadata = {
  title: '日本株スクリーナー',
  description: 'テクニカル指標×AIスコアリングで3,700銘柄を毎日自動スキャン。上昇シグナル銘柄をDiscordへ毎日夕方配信。無料。',
  alternates: { canonical: '/stock-screener' },
}

export default function JapanStockScreenerPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB + HERO */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">日本株スクリーナー</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#92400E] bg-[#FBF4EC]">
              💰 Money
            </span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              日本株スクリーナー
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              テクニカル指標×AIスコアリングで東証3,700銘柄を毎日自動スキャン。上昇シグナルが出た銘柄をDiscordチャンネルへ毎日夕方に自動配信します。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Discord連携', 'テクニカル分析', '毎日夕方配信'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://screener.nobi-labo.com"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors"
            >
              今すぐ使う →
            </a>
          </div>

          <AppCarousel slides={SLIDES} accentColor="#92400E" bgColor="#FBF4EC" />
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111] tracking-[-0.01em]">
                「3,700銘柄を毎朝チェックするのは人間には無理だった。」
              </p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">
              日本株に興味を持ち始めたころ、どの銘柄に注目すればいいか全くわからなかった。証券会社のスクリーナーは使いにくく、テクニカル指標を自分で確認するには銘柄数が多すぎる。
            </p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#444444]">
              そこで、MACDやRSIなどのテクニカル指標とAIスコアリングを組み合わせて、毎日自動でスキャンするツールをAIと一緒に作りました。Discordに届く通知を見るだけで、その日のシグナル銘柄を把握できます。
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '3,700銘柄を毎日自動スキャン',
              desc: '東証プライム・スタンダード・グロース全銘柄を対象に、毎日マーケット終了後に自動でスキャンします。' },
            { num: '02', title: 'テクニカル指標×AIスコアリング',
              desc: 'MACD・RSI・ボリンジャーバンドなど複数指標を組み合わせ、AIがスコアリングして上昇シグナルを検出。' },
            { num: '03', title: 'Discord毎日配信',
              desc: 'シグナルが出た銘柄を毎日夕方にDiscordチャンネルへ自動投稿。スマホで通知を受け取れます。' },
            { num: '04', title: '完全無料',
              desc: '登録・課金なし。Discordサーバーに参加するだけで利用できます。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="max-w-[1200px] mx-auto px-6 pb-[72px]">
        <div className="bg-[#FBF4EC] rounded-2xl p-7 border border-[#EBEBEB]">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#92400E]">免責事項</div>
          <p className="mt-3 text-[14px] leading-[1.8] text-[#444444]">
            本ツールが提供する情報は参考情報であり、投資を推奨するものではありません。投資判断はご自身の責任で行ってください。株式投資には元本割れのリスクがあります。
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            毎日、シグナルが届く。
          </h2>
          <p className="mt-4 text-[17px] leading-[1.8] text-[#444444] max-w-[480px] mx-auto">
            3,700銘柄を自分でチェックする必要はありません。
          </p>
          <a
            href="https://screener.nobi-labo.com"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors"
          >
            今すぐ使う →
          </a>
        </div>
      </section>

    </div>
  )
}
