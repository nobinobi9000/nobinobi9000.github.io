import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'ねこおじさんタイマー | 会議タイマー',
  description: 'カウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。無料。',
  alternates: { canonical: '/nekoojiisan-timer' },
}

const SLIDES = [
  { src: '/screenshots/nekoojiisan-timer.png', caption: 'タイマー画面' },
]

export default function NekoojiisanTimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">ねこおじさんタイマー</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">🧊 Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              会議を凍らせる、<br />愛すべきおやじ。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              カウントダウン終了後、ねこおじさんがAI生成おやじギャグで会議を締めます。シンプルな会議タイマーに、ちょっとしたユーモアを。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', '会議タイマー', 'AI生成', 'おやじギャグ'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://meeting.nobi-labo.com" target="_blank" rel="noopener noreferrer"
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
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「AIがおやじギャグで会議を終わらせる、という発想が面白いかなと思って作った。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">実際は外れだったかもしれません。でも、初期作品として恥ずかしいけど残しています。誰かの会議に笑いを届けられていたら嬉しい。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: 'カウントダウンタイマー', desc: '1分・10分・30分・60分のプリセット、またはカスタム時間でカウントダウン。' },
            { num: '02', title: 'ねこおじさん登場', desc: 'タイマー終了時にねこおじさんがAI生成のおやじギャグを披露して会議を締めます。' },
            { num: '03', title: 'シンプル操作', desc: '登録不要・ワンタップで起動。スマホでもPCでも使えます。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">こんな場面で使えます</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            { icon: '📅', title: '定例ミーティング', desc: '「今日は45分で終わらせる」と決めた会議に。時間になったらねこおじさんが締めてくれます。' },
            { icon: '🎯', title: '朝会・夕会', desc: '短時間で終わらせたいスタンドアップミーティングに。ダラダラ延長するのを防ぎます。' },
            { icon: '☕', title: '休憩・ポモドーロ', desc: '個人の作業時間の区切りにも。ちょっとした息抜きとしてタイマー終了を楽しめます。' },
          ].map(item => (
            <div key={item.title} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[28px]">{item.icon}</div>
              <h3 className="mt-[14px] text-[16px] font-extrabold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>次の会議、おやじで締めよう。</h2>
          <a href="https://meeting.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
