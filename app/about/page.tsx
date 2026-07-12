import type { Metadata } from 'next'
import Link from 'next/link'
import { APPS } from '@/lib/apps'

export const metadata: Metadata = {
  title: 'About',
  description: 'nobi-labo運営者・nobIのプロフィール。会社員（非エンジニア）が2026年1月からAIと一緒にアプリを作り始めた話。',
  alternates: { canonical: '/about' },
}

const STATS = [
  { value: '2026.01',        label: 'SINCE' },
  { value: String(APPS.length), label: 'APPS' },
  { value: '1,000+',         label: 'マンガ冊数' },
  { value: '∞',              label: '積みゲー' },
]

const INTERESTS = [
  { icon: '📚', title: 'マンガ',
    desc: '1,000冊以上所持。少年・青年・少女を問わず読みます。新刊チェックが追いつかなくなったのがcomic-checker開発のきっかけ。' },
  { icon: '🎮', title: 'ゲーム',
    desc: 'RPG・アドベンチャー・ローグライク好き。積みゲーが無限に増えるのでQUESTLOGを作りました。' },
  { icon: '💰', title: '投資',
    desc: 'インデックス積立がメイン。日本株もたしなみます。お金まわりのアプリが多いのはこのためです。' },
  { icon: '🎵', title: '音楽',
    desc: 'ジャパニーズレゲエ・スカ・レゲトン・ボカロ・ハードテクノ・ゲームサントラが好きです。ジャンルの幅だけは広い。' },
]

const TOOLS = [
  { name: 'Claude Code',
    desc: 'AIペアプログラミングの主力。設計の相談から実装・デバッグまで全工程をともに進めます。エンジニアでない自分がアプリを作れているのはこのツールのおかげです。' },
  { name: 'Next.js + Vercel',
    desc: 'フロントエンドはNext.js、デプロイはVercel。設定ほぼゼロで本番環境が立ち上がるので、開発スピードが全然違います。' },
  { name: 'Supabase',
    desc: 'バックエンド・データベース・認証を一手に担います。SQL不要のダッシュボードが直感的で、非エンジニアでも扱いやすい。' },
  { name: 'Notion',
    desc: 'アイデアメモからアプリ仕様書・リリースチェックリストまで、すべての思考をここに集約しています。' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        <div className="flex items-center gap-2 text-[13px] text-[#999999]">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">About</span>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-[72px]">
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <div className="text-[13px] font-bold tracking-[0.08em] text-[#2D6A4F]">ABOUT</div>
            <h1 className="mt-5 font-extrabold leading-[1.15] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(30px, 3.6vw, 48px)' }}>
              自分の「困った」を、<br />ツールに変える人。
            </h1>
            <p className="mt-6 text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              会社員として働きながら、AIを相棒に個人開発を続けています。エンジニアのスキルはゼロ。でも「自分が本当に欲しいもの」を作るという動機だけで、ここまで来ました。
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-[200px] h-[200px] rounded-[24px] bg-[#F0F7F4] border-[1.5px] border-[#EBEBEB] flex items-center justify-center text-[72px]">
              👋
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-t border-b border-[#EBEBEB]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label}
              className={`py-9 px-6 text-center ${i < STATS.length - 1 ? 'border-r border-[#EBEBEB]' : ''}`}>
              <div className="text-[32px] font-extrabold tracking-[-0.02em]">{s.value}</div>
              <div className="mt-[6px] text-[12.5px] font-semibold tracking-[0.05em] text-[#999999]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY</div>
        <div className="mt-9 max-w-[720px] flex flex-col gap-7">
          {[
            'エンジニアではありません。コードは書けません。でも「自分が使いたいアプリが世の中にない」という経験を何度も繰り返してきました。マンガの新刊通知、積みゲーの管理、サブスクの断捨離——どれも既存サービスでは痒いところに手が届かなかった。',
            '転機は2026年1月。AIと対話しながら設計・実装するという方法を知り、「これなら自分にもできる」と思い、最初のアプリ comic-checker を作りました。リリースから数日で思いのほか反響があり、そのまま続けることにしました。',
            'こだわりは「使い勝手」だけ。見た目がきれいでも、使いにくければ意味がない。自分自身がヘビーユーザーとして毎日使い続けられるかどうかを判断軸にしています。',
          ].map((p, i) => (
            <p key={i} className="text-[17px] leading-[1.9] text-[#444444]">{p}</p>
          ))}
        </div>
      </section>

      {/* INTERESTS */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">INTERESTS</div>
          <div className="mt-8 grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {INTERESTS.map(item => (
              <div key={item.title} className="border border-[#EBEBEB] rounded-2xl p-7 bg-white hover:border-[#2D6A4F] transition-colors">
                <div className="text-[36px]">{item.icon}</div>
                <h3 className="mt-[18px] text-[19px] font-extrabold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I BUILD */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">HOW I BUILD</div>
        <div className="mt-8 border border-[#EBEBEB] rounded-2xl overflow-hidden">
          {TOOLS.map((t, i) => (
            <div key={t.name} className={`flex items-start gap-6 p-7 ${i < TOOLS.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}>
              <div className="flex-none w-[140px] text-[15px] font-extrabold tracking-[-0.01em] pt-[2px]">{t.name}</div>
              <div className="flex-1 text-[15px] leading-[1.75] text-[#444444]">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-[#F0F7F4] rounded-[20px] p-12 flex items-center justify-between gap-8 flex-wrap">
          <div className="flex-1 min-w-[240px]">
            <div className="text-[13px] font-bold tracking-[0.08em] text-[#2D6A4F]">CONTACT</div>
            <p className="mt-[14px] text-[19px] font-semibold leading-[1.6] tracking-[-0.01em]">
              フィードバック・コラボのご相談など、<br />お気軽にどうぞ。
            </p>
          </div>
          <Link href="/contact"
            className="flex-none px-[26px] py-[14px] text-[15px] font-semibold text-white bg-[#2D6A4F] rounded-[10px] hover:bg-[#21503b] transition-colors">
            お問い合わせ →
          </Link>
        </div>
      </section>

    </div>
  )
}
