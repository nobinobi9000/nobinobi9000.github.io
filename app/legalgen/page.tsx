import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

const SLIDES = [
  { src: '/screenshots/legalgen.svg', caption: '書類生成フォーム' },
]

export const metadata: Metadata = {
  title: '法律書類ジェネレーター',
  description: '契約書・内容証明をAIが瞬時に生成。登録不要・無料3回。',
  alternates: { canonical: '/legalgen' },
}

export default function LegalgenPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB + HERO */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">法律書類ジェネレーター</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#6D28D9] bg-[#F5F1FC]">
              ⚖️ Work
            </span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              法律書類<br />ジェネレーター
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              契約書・内容証明・各種法律文書をAIが瞬時に生成。必要事項を入力するだけで、すぐに使える書類が完成します。登録不要・無料3回。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料3回', '登録不要', 'AI生成', 'ダウンロード可'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://legal.nobi-labo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors"
            >
              今すぐ使う →
            </a>
          </div>

          <AppCarousel slides={SLIDES} accentColor="#6D28D9" bgColor="#F5F1FC" />
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111] tracking-[-0.01em]">
                「フリーランスで仕事を始めたとき、契約書のひな形を探すのに半日かかった。」
              </p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">
              副業・フリーランス・個人間取引が増える中、法律書類の需要は高まっています。でも弁護士に頼むほどではない、そんな「ちょっとした書類」が一番困る。
            </p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#444444]">
              必要事項を入力するだけでAIが適切な書類を生成。業務委託契約書・秘密保持契約・内容証明など、よく使う書類をカバーしています。
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '豊富な書類テンプレート',
              desc: '業務委託契約書・秘密保持契約（NDA）・内容証明・賃貸借契約など主要書類に対応。' },
            { num: '02', title: 'AI が文章を生成',
              desc: '入力フォームに答えるだけで、状況に合った適切な文章をAIが自動生成します。' },
            { num: '03', title: '登録不要・無料3回',
              desc: 'アカウント登録なしで3回まで無料で生成できます。4回目以降はプランをご検討ください。' },
            { num: '04', title: 'ダウンロード・印刷対応',
              desc: '生成した書類はWord・PDF形式でダウンロード可能。そのまま印刷・送付できます。' },
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
        <div className="bg-[#F5F1FC] rounded-2xl p-7 border border-[#EBEBEB]">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#6D28D9]">免責事項</div>
          <p className="mt-3 text-[14px] leading-[1.8] text-[#444444]">
            本ツールが生成する書類はあくまでも参考用のひな形です。法的効力の保証はしておりません。重要な契約については弁護士等の専門家にご相談ください。
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
            書類作成、数分で完了。
          </h2>
          <p className="mt-4 text-[17px] leading-[1.8] text-[#444444] max-w-[480px] mx-auto">
            登録不要・無料3回。今すぐ試せます。
          </p>
          <a
            href="https://legal.nobi-labo.com"
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
