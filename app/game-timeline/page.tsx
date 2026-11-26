import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

const TITLE = '私のゲーム年表 | 1年に1本、思い出のベスト1で作る年表'
const DESCRIPTION = 'その年の思い出の一本を登録して、自分だけのゲーム年表を完成させよう。日本語タイトルで検索でき、年代ごとの年表画像を保存・シェア。登録不要・無料。'
const OG_IMAGE = {
  url: '/screenshots/game-timeline/share-kids.jpg',
  width: 1200,
  height: 630,
  alt: '私のゲーム年表の共有画像（10代以下のサンプル。パッケージは仮の表示）',
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/game-timeline' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/game-timeline',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

const APP_URL = 'https://game-timeline.nobi-labo.com'

// 掲載画面のパッケージは、画像を表示しない仮の状態で撮影したもの
const SLIDES = [
  { src: '/screenshots/game-timeline/sp-input.jpg', caption: 'はじめの入力' },
  { src: '/screenshots/game-timeline/sp-select.jpg', caption: '思い出の一本を選ぶ' },
  { src: '/screenshots/game-timeline/sp-timeline.jpg', caption: '巻物の年表' },
  { src: '/screenshots/game-timeline/sp-share.jpg', caption: '画像でシェア' },
]

export default function GameTimelinePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#f97316] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#f97316] transition-colors">Apps</Link>
          <span>›</span>
          <span className="font-medium" style={{ color: '#f97316' }}>私のゲーム年表</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">🎮 Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              その年の、<br />ベスト1を。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              1歳につき、思い出の一本だけ。初めてゲームに触れた年からいまの年齢まで、その年のベスト1を登録して、あなただけのゲーム年表を完成させましょう。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', '登録不要', '画像シェア', 'スマホ対応'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold text-white rounded-[11px] hover:opacity-90 transition-opacity"
              style={{ background: '#f97316' }}
            >
              自分の年表をつくる →
            </a>
          </div>

          <div className="min-w-0">
            <AppCarousel slides={SLIDES} accentColor="#f97316" bgColor="#FFF8F5" />
            <p className="mt-4 text-center text-[12px] text-[#999999]">※掲載画面のパッケージは仮の表示です</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — このアプリについて</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] pl-7" style={{ borderColor: '#f97316' }}>
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">その年の思い出の一本を選んで、自分だけのゲーム年表に。</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">「私のゲーム年表」は、初めてゲームに触れた年齢からいまの年齢まで、1歳につき1本ずつソフトを登録して年表にするWebアプリです。作品名を並べるだけでなく、「何歳のときに遊んだか」の順に並びます。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">TIMELINE — 年表のイメージ</div>
        <h2 className="mt-4 font-extrabold tracking-[-0.02em] leading-[1.3]" style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
          選んだ一本が、巻物になる
        </h2>
        <p className="mt-4 text-[15px] leading-[1.85] text-[#444444] max-w-[720px]">
          年齢の順に、パッケージが左から右へ並びます。年代ごとの年表画像は保存してSNSでシェアできます。
        </p>
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#EBEBEB]">
          <img src="/screenshots/game-timeline/timeline-wide.jpg" alt="巻物の形をしたゲーム年表の画面（パッケージは仮の表示）" width={1600} height={846} className="w-full h-auto block" />
        </div>
        <div className="mt-5 grid gap-5 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))' }}>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB]">
            <img src="/screenshots/game-timeline/share-kids.jpg" alt="10代以下の年表の共有画像（パッケージは仮の表示）" width={1200} height={630} className="w-full h-auto block" />
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB]">
            <img src="/screenshots/game-timeline/share-teens.jpg" alt="10代の年表の共有画像（パッケージは仮の表示）" width={1200} height={900} className="w-full h-auto block" />
          </div>
        </div>
        <p className="mt-5 text-[12px] leading-[1.9] text-[#999999]">
          画面は作成したサンプルです。掲載画像のパッケージは仮の表示です（アプリでは、画像の情報がある作品はパッケージ画像が表示されます）。ゲーム情報の提供:{' '}
          <a href="https://www.igdb.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f97316] transition-colors">IGDB.com</a>
          。各タイトル名の権利は各権利者に帰属します。当ページは各社の公認・提携ではありません。
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }}>
          {[
            { num: '01', title: '1歳につき1本', desc: 'その年のベスト1を選んで登録。空いている年齢を埋めるほど、年表が完成に近づきます。' },
            { num: '02', title: '日本語タイトルで検索', desc: 'タイトルの一部を入力して選ぶだけ。日本語で検索した場合、日本版の情報がある作品は、日本語名や日本版のパッケージ画像で表示します。' },
            { num: '03', title: '巻物の年表とコメント', desc: '年齢順の巻物で振り返り。年代ごとにコメントを書けて、ネタバレは隠せます。' },
            { num: '04', title: '画像で保存・シェア', desc: '年代ごとに年表画像（10本まで）やアイコン画像を作り、保存・シェアできます。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#f97316] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em]" style={{ color: '#f97316' }}>{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">HOW TO USE — 使い方</div>
          <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))' }}>
            {[
              { step: '1', title: 'はじめの一年を入力', desc: '初めてゲームに触れた西暦と、そのときの年齢を入れます。' },
              { step: '2', title: 'その年のベスト1を選ぶ', desc: '年代タブを切り替え、検索して追加。年齢は後から変えられます。' },
              { step: '3', title: '年表を眺める', desc: '巻物を左右に動かして、ゲーム歴を振り返ります。' },
              { step: '4', title: '画像でシェア', desc: '年代を選んで画像を保存、またはSNSへ。' },
            ].map(s => (
              <div key={s.step} className="bg-white border border-[#EBEBEB] rounded-2xl p-7">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-extrabold text-white" style={{ background: '#f97316' }}>{s.step}</div>
                <h3 className="mt-[14px] text-[16px] font-extrabold tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FAQ — よくある質問</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }}>
          {[
            { q: '無料ですか？登録は必要ですか？', a: '無料で、アカウント登録なしで使えます。' },
            { q: '入力した内容は保存されますか？', a: '保存されません。ページを閉じたり再読み込みしたりすると消えるので、完成した年表は画像で保存してください。' },
            { q: 'すべての年齢を埋めないといけませんか？', a: 'いいえ。覚えている年だけでも年表になります。' },
            { q: '見つからないソフトがあります。', a: 'ゲーム情報は IGDB.com のデータを利用しているため、登録がない作品や、日本語名・画像がない作品があります。別の表記や英語名でも検索してみてください（英語名で検索した場合、日本語名や日本版パッケージ画像への切り替えは行われません）。' },
          ].map(item => (
            <div key={item.q} className="border border-[#EBEBEB] rounded-2xl p-7">
              <h3 className="flex gap-3 text-[15px] font-extrabold leading-[1.7]">
                <span style={{ color: '#f97316' }}>Q.</span>
                <span>{item.q}</span>
              </h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-[#444444]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="rounded-[20px] px-6 py-16 text-center" style={{ background: '#FFF8F5' }}>
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>
            あなたの年表を、<span className="inline-block">完成させよう。</span>
          </h2>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white rounded-[12px] hover:opacity-90 transition-opacity"
            style={{ background: '#f97316' }}
          >
            自分の年表をつくる →
          </a>
        </div>
      </section>
    </div>
  )
}
