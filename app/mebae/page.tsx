import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'めばえ | 習慣スタックトラッカー',
  description: 'アンカー習慣の直後に新習慣を積み上げるミニマルな習慣トラッカー。継続を見える化。',
  alternates: { canonical: '/mebae' },
}

const SLIDES = [
  { src: '/screenshots/mebae/top.png',        caption: 'ホーム' },
  { src: '/screenshots/mebae/stack.png',       caption: '習慣スタック' },
  { src: '/screenshots/mebae/statistics.png',  caption: '継続グラフ' },
]

export default function MebaePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">めばえ</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">🌱 Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              小さな習慣を、<br />毎日に積み上げる。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              アンカー習慣（既存の習慣）の直後に新習慣をスタック。意志力に頼らない「習慣スタック」メソッドで、無理なく継続できます。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Push通知', '習慣形成', 'ホーム追加OK'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://mebae.nobi-labo.com" target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors">
              今すぐ無料で使う →
            </a>
          </div>
          <AppCarousel slides={SLIDES} accentColor="#2563EB" bgColor="#F0F5FF" />
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「毎年4月に『今年こそ習慣を作ろう』と思うが、続いたためしがない。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">意志力に頼る習慣作りはいつか必ず折れる。「習慣スタック」という手法——既存の習慣の直後に新習慣を紐付ける——に出会い、それを実践するシンプルなアプリを作りました。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '習慣スタック設定', desc: '「〇〇の後に△△をする」という形式でアンカー習慣と新習慣をセットで登録。' },
            { num: '02', title: 'チェックイン', desc: '毎日ワンタップでチェックイン。シンプルな操作で継続を記録できます。' },
            { num: '03', title: '継続グラフ', desc: '何日続いているかをグラフで可視化。継続の「見える化」がモチベーションを維持します。' },
            { num: '04', title: 'Push通知リマインダー', desc: '設定した時間にリマインド通知。うっかり忘れを防ぎます。' },
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
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>小さな一歩を、毎日続けよう。</h2>
          <a href="https://mebae.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
