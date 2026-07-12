import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'kabu-signal | 日本株エントリーシグナル通知',
  description: 'JVQMファクターで日本株をスコアリング。上方修正・自社株買いと重なった銘柄をPush通知でお届け。毎朝7時自動スキャン。',
  alternates: { canonical: '/kabu-signal' },
}

const SLIDES = [
  { src: '/screenshots/kabu-signal.svg', caption: 'シグナル一覧' },
]

export default function KabuSignalPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">kabu-signal</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#92400E] bg-[#FBF4EC]">📈 Money</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              毎朝7時に、<br />シグナルが届く。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              JVQMシステム（割安・収益性・モメンタム）で日本株をスコアリング。上方修正・自社株買いと重なった銘柄を毎朝7時にPush通知でお届け。スマホのホーム画面に追加するだけで使えます。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Push通知', '日本株', 'ホーム追加OK'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://signal.nobi-labo.com" target="_blank" rel="noopener noreferrer"
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
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「Kabu Noteで保有株を管理するうちに、どの銘柄を買えばいいかを統計的に判断したくなった。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">世界の学術論文100件以上を収集・検証し、バリュー×クオリティ×モメンタム×イベントの4ファクタープレミアムを重ねたJVQMシステムを設計。毎朝7時に自動でシグナルをスキャンして届けるPWAを作りました。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            {
              num: '01',
              title: 'JVQMスコアリング',
              desc: 'PBR・ROE・FCFイールド・低ボラティリティ・配当利回り・TSE改革対応の6指標で最大12点スコアリング。10点以上が候補銘柄。',
            },
            {
              num: '02',
              title: '適時開示との自動照合',
              desc: 'TDnetの適時開示情報と候補銘柄を毎朝照合。上方修正（修正幅10%以上）または自社株買い発表があった銘柄のみシグナル対象。',
            },
            {
              num: '03',
              title: '市場環境フィルター',
              desc: 'TOPIXが200日移動平均以上かどうか、11月〜4月（ハロウィン効果）の期間かどうかを、通知に注意ラベルとして表示。',
            },
            {
              num: '04',
              title: 'Push通知でお届け',
              desc: 'ホーム画面に追加してPWAとして使用。ご自身のウォッチリスト・保有銘柄に該当するシグナルが見つかった日の21時に通知が届く。通知には銘柄名・スコア・現在値を表示。',
            },
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
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>今朝の候補銘柄を、確認する。</h2>
          <a href="https://signal.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
