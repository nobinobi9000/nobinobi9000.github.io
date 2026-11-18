import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '日本株スクリーナー',
  description: '東証上場の約4,400銘柄（ETF等を含む）を営業日ごとに自動スキャンし、9つのテクニカル条件の成立状況をスコアで表示。厳選3銘柄と市場サマリーは無料で公開。',
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
              東証上場の約4,400銘柄（ETF等を含む）を営業日ごとに自動でスキャンし、9つのテクニカル条件が成立しているかをスコアで表示します。厳選3銘柄と市場サマリーは、ログインなしでWebサイトとDiscordの#daily-picksで見られます。全銘柄の分析ページはログイン後に利用できます。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料枠あり', 'Webアプリ', 'Discord配信（無料枠）', '営業日更新'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://screener.nobi-labo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors"
            >
              サービスサイトを開く →
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111] tracking-[-0.01em]">
                「4,000銘柄を超える東証の全銘柄を、毎日自分の目で確認するのは無理だった。」
              </p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">
              日本株に興味を持ち始めたころ、どの銘柄に注目すればいいか全くわからなかった。証券会社のスクリーナーは使いにくく、テクニカル指標を自分で確認するには銘柄数が多すぎる。
            </p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#444444]">
              そこで、移動平均・ボリンジャーバンド・一目均衡表・出来高などのテクニカル条件に固定の配点を付け、営業日ごとに自動でスキャンするツールをAIと一緒に作りました。条件が成立した銘柄を、スコアと一緒に一覧できます。
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '東証上場の約4,400銘柄を営業日にスキャン',
              desc: 'ETF・REIT等を含む東証の上場銘柄を対象に、取引終了後に自動でスキャンします。更新は処理の完了後で、遅れる場合があります。' },
            { num: '02', title: '9つの条件を固定配点でスコア化',
              desc: 'MA200・ゴールデンクロス・ボリンジャーバンド・一目均衡表・OBV・出来高・PBRなど9つの条件の成立状況を、合計100点のスコアで表示します。' },
            { num: '03', title: 'Discordの無料チャンネル',
              desc: '営業日の夕方以降、厳選3銘柄と市場サマリーをDiscordの#daily-picksに投稿します。条件成立の事実表示のみで、売買の判断は含みません。' },
            { num: '04', title: 'ログインして使う全銘柄分析',
              desc: '全銘柄の分析ページはログイン後に利用できます。プランと料金は、サービスサイトの表示を正としてご確認ください。' },
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
            本サービスは条件成立の事実表示のみを行い、投資助言は行いません。投資判断はご自身の責任でお願いします。株式投資には元本割れのリスクがあります。
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            営業日ごとの条件成立状況を、一覧で確認。
          </h2>
          <a
            href="https://screener.nobi-labo.com"
              target="_blank"
              rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors"
          >
            サービスサイトを開く →
          </a>
        </div>
      </section>

    </div>
  )
}
