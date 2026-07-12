import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'サブスクの断捨離 | サブスク支出管理',
  description: 'サブスク支出を可視化して断捨離。S&P500換算で将来額を表示。断捨離スコアで見直すべきサブスクを提案。',
  alternates: { canonical: '/subshari' },
}

const SLIDES = [
  { src: '/screenshots/subshari-list.png',      caption: 'サブスク一覧' },
  { src: '/screenshots/subshari-dashboard.png', caption: 'ダッシュボード' },
  { src: '/screenshots/subshari-invest.png',    caption: '投資換算' },
  { src: '/screenshots/subshari-danshari.png',  caption: '断捨離スコア' },
]

export default function SubshariPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">サブスクの断捨離</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#92400E] bg-[#FBF4EC]">✂️ Money</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              サブスクを整理して、<br />投資に変える。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              サブスク支出を可視化して断捨離。解約してS&P500に投資したら将来いくらになるか換算。断捨離スコアで見直すべきサブスクを提案します。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', '登録不要', '投資換算', '断捨離スコア'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://subshari.nobi-labo.com" target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors">
              今すぐ無料で使う →
            </a>
          </div>
          <AppCarousel slides={SLIDES} accentColor="#92400E" bgColor="#FBF4EC" />
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「自分のサブスクを全部書き出してみたら、月額が想像以上だった。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">「この金額を投資に回したらどうなるんだろう」という純粋な興味から、計算ツールとして作り始めました。S&P500の平均リターンで将来額を換算することで、サブスクの「機会費用」を可視化します。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: 'サブスク一覧管理', desc: '月額・年額どちらでも登録可能。月次支出の合計を自動計算して一覧表示。' },
            { num: '02', title: 'S&P500投資換算', desc: '解約した場合にS&P500へ投資すると、10年・20年・30年後にいくらになるかを試算。' },
            { num: '03', title: '断捨離スコア', desc: '使用頻度・費用対効果・代替手段の有無から「見直し優先度スコア」を自動算出。' },
            { num: '04', title: '登録不要', desc: 'アカウント登録なしで今すぐ使えます。データはブラウザに保存されます。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>使っていないサブスク、断捨離しよう。</h2>
          <a href="https://subshari.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
