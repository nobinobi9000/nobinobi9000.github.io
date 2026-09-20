import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AccoDeck | アフィリエイト・ECサイトのマルチアカウント切替',
  description: '複数のアフィリエイト・ECサイトのアカウントを、ログイン状態を保持したまま切り替えられるデスクトップアプリ。Windows対応。',
  alternates: { canonical: '/accodeck' },
}

const ACCENT = '#10b981'

export default function AccoDeckPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#10b981] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#10b981] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">AccoDeck</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full" style={{ color: ACCENT, background: '#ECFDF5' }}>🛠 Work</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              アカウントを切り替えても、<br />ログアウトしない。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              複数のアフィリエイト・ECサイトのアカウントを、サイドバーから瞬時に切り替え。アカウントごとに完全に独立したセッションを持つので、他のアカウントのログイン状態はそのまま保持されます。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['有料', 'Windows対応', 'デスクトップアプリ', 'マルチアカウント'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>

            <span
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold rounded-[11px] cursor-not-allowed"
              style={{ color: '#999999', background: '#F7F7F7' }}
            >
              リリース準備中
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB]">
            <img src="/screenshots/accodeck.png" alt="AccoDeck 画面" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] pl-7" style={{ borderColor: ACCENT }}>
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「アフィリエイト用のアカウントを複数運用していると、ブラウザで切り替えるたびにログインし直しになるのが地味に手間だった。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">A8.net・SUZURI・Amazonアソシエイトなど、サイトごとにアカウントを使い分けていると、切り替えのたびに再ログインが必要になる。アカウントごとに完全に独立したブラウザセッションを持たせて、切り替えても一切ログアウトさせないデスクトップアプリを作った。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            {
              num: '01',
              title: '完全に独立したログインセッション',
              desc: 'アカウントごとに専用のセッションを持つため、切り替えてもログアウトしない。他のアカウントの作業状態もそのまま保持されます。',
            },
            {
              num: '02',
              title: 'サイトは自由に追加・削除',
              desc: 'A8.net・SUZURI・Amazonアソシエイトなど主要なASPをあらかじめ用意。それ以外のサイトも名前とURLを登録するだけで追加できます。',
            },
            {
              num: '03',
              title: '前回のページに自動で復帰',
              desc: 'アプリを再起動しても、各アカウントが最後に開いていたページにそのまま戻ります。毎回トップページからやり直す必要がありません。',
            },
            {
              num: '04',
              title: '誤操作を防ぐ2クリック削除',
              desc: 'アカウント・サイトの削除は2回クリックしないと確定しない方式。うっかり消してしまう事故を防ぎます。',
            },
            {
              num: '05',
              title: 'ログイン切れをバッジで通知',
              desc: 'ページ内にログインフォームが検出されると、そのアカウントに目印が付きます。気づかないまま放置してしまうのを防げます。',
            },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#10b981] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em]" style={{ color: ACCENT }}>{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] text-[14px] leading-[1.9] text-[#555555] max-w-[800px]">
          💡 アフィリエイト・ASP専用というわけではなく、ログインが必要なサイトであれば基本的に何にでも使えます(ネットバンキングなど強めのセキュリティ対策があるサイトは対象外)。
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="rounded-[20px] p-16 text-center" style={{ background: '#ECFDF5' }}>
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>
            アカウント管理、もっと楽に。
          </h2>
          <span
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold rounded-[12px] cursor-not-allowed"
            style={{ color: '#999999', background: 'white' }}
          >
            リリース準備中
          </span>
        </div>
      </section>
    </div>
  )
}
