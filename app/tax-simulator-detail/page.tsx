import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

const SLIDES = [
  { src: '/screenshots/tax-simulator.png', caption: 'シミュレーター画面' },
]

export const metadata: Metadata = {
  title: '確定申告・還付判定シミュレーター',
  description: '収入・控除を入力するだけで手取り額・還付額をすぐ確認。令和7年版対応。登録不要・無料。',
  alternates: { canonical: '/tax-simulator-detail' },
}

export default function TaxSimulatorPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB + HERO */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">確定申告・還付判定シミュレーター</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#92400E] bg-[#FBF4EC]">
              💰 Money
            </span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(28px, 4vw, 46px)' }}>
              確定申告・<br />還付判定シミュレーター
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              給与収入や各種控除を入力するだけで、所得税・住民税の概算と還付額を即座に確認。令和7年度版に対応。登録不要・完全無料です。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', '登録不要', '令和7年版', 'ブラウザ完結'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="/tax-simulator/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors"
            >
              今すぐ使う（無料）→
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
                「副業収入が少しあるだけで、確定申告が必要か分からなかった。」
              </p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">
              毎年2〜3月になると「自分は確定申告が必要なのか？」「還付がいくらになるか？」という疑問が出てきます。税務署に聞くのはハードルが高く、税理士に頼むほどでもない。そういう「ちょっと知りたい」に応えるツールを作りました。
            </p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#444444]">
              難しい税務知識は不要です。給与収入・副業収入・各種控除を入力するだけで、還付の有無と概算額をすぐに確認できます。
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '給与・副業収入の入力',
              desc: '給与所得・事業所得・不動産所得など複数の収入源をまとめて入力できます。' },
            { num: '02', title: '各種控除の反映',
              desc: '社会保険料・生命保険料・医療費・住宅ローン控除など主要控除に対応。' },
            { num: '03', title: '還付額を即座に表示',
              desc: '入力した情報をもとに所得税・住民税の概算と還付見込み額を計算します。' },
            { num: '04', title: '令和7年度版対応',
              desc: '最新の税率・控除額に対応。毎年の税制改正に合わせて更新しています。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FAQ — よくある質問</div>
        <div className="mt-8 border border-[#EBEBEB] rounded-2xl overflow-hidden">
          {[
            { q: '無料で使えますか？',
              a: 'はい、すべての機能を無料でご利用いただけます。アカウント登録も不要です。' },
            { q: '計算結果は正確ですか？',
              a: '概算計算のため、実際の申告額と異なる場合があります。正確な申告には税理士へのご相談をおすすめします。あくまでも参考値としてご利用ください。' },
            { q: '入力したデータはどこかに保存されますか？',
              a: '入力したデータはブラウザ上のみで処理され、サーバーには送信されません。ページを閉じるとデータは消えます。' },
            { q: '令和7年版とは何ですか？',
              a: '令和7年（2025年）分の所得税申告（2026年2〜3月提出分）に対応した税率・控除額で計算しています。' },
          ].map((faq, i) => (
            <div key={i} className={`p-7 ${i < 3 ? 'border-b border-[#EBEBEB]' : ''}`}>
              <div className="flex gap-[14px] items-start">
                <span className="flex-none text-[18px] font-extrabold text-[#2D6A4F] leading-[1.3]">Q.</span>
                <div>
                  <div className="text-[16px] font-bold tracking-[-0.01em]">{faq.q}</div>
                  <div className="mt-3 text-[14.5px] leading-[1.8] text-[#444444]">{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            還付があるか、すぐに確認できます。
          </h2>
          <p className="mt-4 text-[17px] leading-[1.8] text-[#444444] max-w-[480px] mx-auto">
            登録不要・無料。ブラウザだけで完結します。
          </p>
          <a
            href="/tax-simulator/index.html"
              target="_blank"
              rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors"
          >
            今すぐ使う →
          </a>
        </div>
      </section>

    </div>
  )
}
