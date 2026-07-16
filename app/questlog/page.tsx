import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'QUESTLOG | ゲームバックログ管理',
  description: '積みゲーを冒険の地図として前向きに管理。Backlog→Playing→Clearedでプレイ状況を記録。Push通知で新作リリース情報もお届け。',
  alternates: { canonical: '/questlog' },
}

const SLIDES = [
  { src: '/screenshots/questlog/Top.png',    caption: 'ホーム' },
  { src: '/screenshots/questlog/tsumi.png',  caption: 'バックログ' },
  { src: '/screenshots/questlog/tusika.png', caption: 'ゲーム追加' },
  { src: '/screenshots/questlog/tokei.png',  caption: 'プレイ時間' },
  { src: '/screenshots/questlog/new.png',    caption: '新作情報' },
  { src: '/screenshots/questlog/dendo.png',  caption: '殿堂入り' },
]

export default function QuestlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">QUESTLOG</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">🗺️ Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              積みゲーを、<br />冒険の地図に。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              Backlog → Playing → Cleared の3ステータスでゲームを管理。罪悪感ではなく「まだ見ぬ冒険」として積みゲーを楽しく整理できます。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Push通知', 'ゲーム管理', 'ホーム追加OK'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://gamelog.nobi-labo.com" target="_blank" rel="noopener noreferrer"
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
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「積みゲーが増えすぎて、罪悪感ばかりが積み上がっていた。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">積みゲーは「やらなきゃいけないもの」ではなく「まだ楽しんでいないもの」のはず。罪悪感ではなく期待感を持って管理できるアプリが欲しくて作りました。満足度はまだ45点。作り続けています。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: '3ステータス管理', desc: 'Backlog（積み）→ Playing（プレイ中）→ Cleared（クリア済）でゲームの状態を整理。' },
            { num: '02', title: 'プレイ時間記録', desc: 'ゲームごとのプレイ時間を記録。どのゲームに何時間使ったか一目でわかります。' },
            { num: '03', title: '新作・発売情報通知', desc: '気になるタイトルを登録しておくと、発売日が近づいたときにPush通知でお知らせ。' },
            { num: '04', title: '殿堂入り機能', desc: 'クリアしたゲームに評価をつけて殿堂入りに登録。思い出のゲームを振り返れます。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">HOW TO USE — 使い方</div>
          <div className="mt-9 max-w-[600px] flex flex-col gap-0">
            {[
              { n: '1', title: '積みゲーを登録', desc: 'タイトルを検索するか手入力で追加。まずは今持っている「積み」を全部Backlogに放り込むところから。' },
              { n: '2', title: 'プレイ中に切り替え', desc: '実際に遊び始めたらPlayingへドラッグ。今どのゲームに手をつけているか一目でわかる。' },
              { n: '3', title: 'クリアしたらCleared', desc: 'クリアしたゲームはCleared行き。評価を付ければ殿堂入り候補として記録されます。' },
              { n: '4', title: '新作通知を受け取る', desc: '気になるタイトルを登録しておくと、発売が近づいた時にPush通知でお知らせします。' },
            ].map((step, i, arr) => (
              <div key={step.n} className="flex gap-5 pb-9">
                <div className="flex flex-col items-center gap-0 flex-none">
                  <div className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white text-[14px] font-extrabold flex items-center justify-center flex-none">{step.n}</div>
                  {i < arr.length - 1 && <div className="w-[1.5px] flex-1 bg-[#EBEBEB] mt-2" />}
                </div>
                <div className="pt-[6px]">
                  <div className="text-[17px] font-bold tracking-[-0.01em]">{step.title}</div>
                  <div className="mt-2 text-[14px] leading-[1.75] text-[#444444]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24 pt-[72px]">
        <div className="bg-[#F0F7F4] rounded-[20px] p-16 text-center">
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>積みゲーを、冒険に変えよう。</h2>
          <a href="https://gamelog.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>
    </div>
  )
}
