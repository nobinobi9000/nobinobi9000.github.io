import type { Metadata } from 'next'
import Link from 'next/link'
import AppCarousel from '@/components/AppCarousel'

export const metadata: Metadata = {
  title: 'comic-checker | マンガ新刊チェッカー',
  description: 'マンガの新刊を自動チェック。発売14日前・7日前・当日にPush通知でお知らせ。無料・スマホのホーム画面に追加して使えます。',
  alternates: { canonical: '/comic-checker' },
}

const SLIDES = [
  { src: '/screenshots/comic-mylist-list.png', caption: 'マイリスト・リスト' },
  { src: '/screenshots/comic-mylist-grid.png', caption: 'マイリスト・グリッド' },
  { src: '/screenshots/comic-newrelease.png',  caption: '新刊情報' },
  { src: '/screenshots/comic-calendar.png',    caption: '新刊カレンダー' },
  { src: '/screenshots/comic-search.png',      caption: '検索' },
]

export default function ComicCheckerPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB + HERO */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#2D6A4F] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">comic-checker</span>
        </div>
        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">📚 Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(32px, 4.5vw, 54px)' }}>
              マンガの新刊を<br />見逃さない。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              好きなシリーズを登録するだけ。発売14日前・7日前・当日に自動でPush通知。楽天ブックスとの連携でそのままワンタップ購入できます。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Push通知', '楽天連携', 'ホーム追加OK'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>
            <a href="https://comic.nobi-labo.com" target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-block px-7 py-4 text-[15px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors">
              今すぐ無料で使う →
            </a>
          </div>
          <AppCarousel slides={SLIDES} accentColor="#2563EB" bgColor="#F0F5FF" />
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] border-[#2D6A4F] pl-7">
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111] tracking-[-0.01em]">「好きなマンガの新刊を何度も買い逃したのがきっかけ。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">何十冊ものシリーズを追っていると、どうしても発売日を忘れてしまいます。メモしても管理が続かず、気づいたら2巻分まとめて買うことも。「自動で教えてくれるアプリがあれば」と思い、自分で作ることにしました。</p>
            <p className="mt-4 text-[16px] leading-[1.9] text-[#444444]">エンジニアではない自分がAIと一緒に設計・実装。データは出版社の公式情報をベースに毎日更新。楽天ブックスと連携して、通知からそのまま購入できる動線にこだわりました。</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: 'シリーズ一括登録', desc: '巻数・著者名・出版社で検索してワンタップ登録。複数の続刊をまとめて管理できます。' },
            { num: '02', title: '新刊自動チェック', desc: '毎日データを自動更新。発売スケジュールが変わっても自動で追従します。' },
            { num: '03', title: '3段階Push通知', desc: '発売14日前・7日前・当日に通知。受け取るタイミングはお好みで設定可能です。' },
            { num: '04', title: '所有巻・完結フラグ管理', desc: '持っている巻を記録して「どこまで読んだか」を管理。完結済みシリーズにはフラグを立てられます。' },
            { num: '05', title: '楽天・Amazon連携', desc: '新刊通知から楽天ブックス・Amazonへワンタップで遷移。そのまま購入できます。※アフィリエイトリンクを含みます' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#2D6A4F] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em] text-[#2D6A4F]">{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">HOW TO USE — 使い方</div>
          <div className="mt-9 max-w-[600px] flex flex-col gap-0">
            {[
              { n: '1', title: 'アカウント登録', desc: 'メールアドレスまたはGoogleアカウントで無料登録。30秒で完了します。' },
              { n: '2', title: 'マンガを検索して登録', desc: 'タイトルや著者名で検索し、追いかけたいシリーズをマイリストに追加。' },
              { n: '3', title: '通知をON', desc: 'ブラウザまたはホーム画面追加後にPush通知を許可するだけ。' },
              { n: '4', title: 'あとは待つだけ', desc: '発売日が近づくと自動でお知らせ。通知から楽天ブックスへそのまま購入できます。' },
            ].map(step => (
              <div key={step.n} className="flex gap-5 pb-9">
                <div className="flex flex-col items-center gap-0 flex-none">
                  <div className="w-9 h-9 rounded-full bg-[#2D6A4F] text-white text-[14px] font-extrabold flex items-center justify-center flex-none">{step.n}</div>
                  <div className="w-[1.5px] flex-1 bg-[#EBEBEB] mt-2" />
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

      {/* FAQ */}
      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FAQ — よくある質問</div>
        <div className="mt-8 border border-[#EBEBEB] rounded-2xl overflow-hidden">
          {[
            { q: '登録・利用は無料ですか？', a: 'はい、すべての機能を無料でご利用いただけます。課金プランはありません。' },
            { q: 'iPhoneでPush通知が届きません。', a: 'iOS 16.4以降のSafariでホーム画面に追加するとPush通知が利用できます。設定アプリ → 通知 → comic-checker で通知が許可されているかご確認ください。' },
            { q: '新刊情報はどのくらいの頻度で更新されますか？', a: '毎日自動更新しています。発売日の変更や新刊情報の追加も自動で反映されます。' },
            { q: '楽天・AmazonリンクはアフィリエイトLinksですか？', a: 'はい、楽天アフィリエイトおよびAmazonアソシエイトのリンクを含みます。リンク経由での購入時に一定の手数料が発生する場合がありますが、購入者のお支払い金額に変わりはありません。' },
          ].map((faq, i, arr) => (
            <div key={i} className={`p-7 ${i < arr.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}>
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
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>
            新刊を見逃さない生活へ。
          </h2>
          <p className="mt-4 text-[17px] leading-[1.8] text-[#444444] max-w-[480px] mx-auto">登録は無料。シリーズを追加するだけで、あとは自動でお知らせします。</p>
          <a href="https://comic.nobi-labo.com" target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[12px] hover:bg-[#21503b] transition-colors">
            今すぐ無料で使う →
          </a>
        </div>
      </section>

    </div>
  )
}
