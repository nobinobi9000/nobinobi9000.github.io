import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'Kabu Note | 日本株ポートフォリオ管理',
  description: '複数証券口座の保有株を一元管理。損益・評価額を自動計算。平日16時に株価を自動更新。',
  alternates: { canonical: '/kabu-note' },
}

const SLIDES = [
  { src: '/screenshots/kabu-note/Stocks.png',   caption: '保有株一覧' },
  { src: '/screenshots/kabu-note/Summary.png',  caption: '総資産サマリー' },
  { src: '/screenshots/kabu-note/Sector.png',   caption: 'セクター分析' },
  { src: '/screenshots/kabu-note/Dividend.png', caption: '配当管理' },
  { src: '/screenshots/kabu-note/Settings.png', caption: '設定' },
]

export default function KabuNotePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Kabu Note</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#92400E] bg-[#FBF4EC]">📒 Money</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              複数口座の株を、<br />一画面で管理。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              複数の証券口座にまたがる保有株を一元管理。証券コード・株数・取得単価を登録するだけで損益・評価額を自動計算。平日16時に株価を自動更新します。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', '日本株', '複数口座対応', '損益管理'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://kabu.nobi-labo.com" target="_blank" rel="noopener noreferrer"
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
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「証券口座が3つになって、総資産がどうなっているのか把握できなくなった。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">持ち株会・NISA・一般口座がバラバラで、合計損益を出すだけでも手間がかかる。一目で全体を把握できるダッシュボードをAIと一緒に作りました。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '複数口座を一元管理', desc: '持ち株会・NISA・特定口座など複数の証券口座の保有株をまとめて登録・管理。' },
            { num: '02', title: '損益・評価額の自動計算', desc: '取得単価と現在株価から損益・評価額を自動計算。含み益/含み損が一目でわかります。' },
            { num: '03', title: '平日16時に自動更新', desc: '東証の取引終了後に株価を自動取得。毎日最新の評価額を確認できます。' },
            { num: '04', title: 'セクター・配当分析', desc: 'セクターごとの保有比率や配当収入の集計を自動表示。ポートフォリオのバランスを把握できます。' },
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
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>全口座の損益を、一画面で。</h2>
          <a href="https://kabu.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
