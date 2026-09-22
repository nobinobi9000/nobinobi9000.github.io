import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cat Timer | ねこ画像が表示されるデスクトップタイマー',
  description: 'カウントダウン中にねこ画像がランダム表示されるデスクトップタイマー。MAX 24時間。アラーム5種類。Windows用無料EXE。',
  alternates: { canonical: '/cat-timer' },
}

const DOWNLOAD_URL = 'https://github.com/nobinobi9000/cat-timer/releases/download/v1.0.0/CatTimer.exe'
const GITHUB_URL = 'https://github.com/nobinobi9000/cat-timer'

export default function CatTimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#f97316] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#f97316] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Cat Timer</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">🐱 Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              ねこと一緒に、<br />時間を刻む。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              カウントダウン中ずっとランダムなねこ画像が表示されるデスクトップタイマー。時間になったらアラームでお知らせ。シンプルで、かわいくて、ちゃんと使える。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Windows 10/11', 'デスクトップアプリ', '登録不要'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] text-[13px] leading-[1.9] text-[#555555]">
              <div className="font-bold text-[#111111] mb-2">対応OS</div>
              <div className="flex flex-col gap-1">
                <span>✅ Windows 10 / 11 — 配布EXEあり（インストール不要）</span>
                <span>🔧 Mac / Linux — Python 3 + Pillow でソースから実行可</span>
              </div>
            </div>

            <a
              href={DOWNLOAD_URL}
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold text-white rounded-[11px] hover:opacity-90 transition-opacity"
              style={{ background: '#f97316' }}
            >
              ⬇ Windows版をダウンロード
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB]">
            <img src="/screenshots/cat-timer.png" alt="Cat Timer 画面" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] pl-7" style={{ borderColor: '#f97316' }}>
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「タイマーをセットしている間、ずっとねこを見ていたい。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">WEB版ねこおじさんタイマーを使っているうちに、「デスクトップにずっとねこが居てほしい」と思うようになった。PCで作業しながら、画面の隅でねこがランダムに切り替わっていく。そんな時間の使い方を実現したくてPython製のデスクトップアプリとして作り直した。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: 'カウントダウン最大24時間', desc: 'H:M:Sを▲▼ボタンまたは直接キーボード入力で設定。0時間0分1秒〜24時間まで対応。' },
            { num: '02', title: 'ランダムねこ画像が常に表示', desc: 'カウントダウン中はねこ画像が8〜15秒ごとにランダム切替表示。作業しながらねこを眺められる。' },
            { num: '03', title: 'アラーム5種類から選択', desc: '設定画面でアラーム音を5種類から選択。試聴ボタンで確認してから決められる。' },
            { num: '04', title: '起動・終了画面', desc: '起動時はスタート画面、タイマー終了時は「お時間です。」メッセージとフィニッシュ画面＋アラーム音でお知らせ。' },
            { num: '05', title: '一時停止・再開', desc: 'カウントダウン中に一時停止・再開が可能。中断してもカウントはその時点を保持。' },
          ].map(f => (
            <div key={f.num} className="border border-[#EBEBEB] rounded-2xl p-7 hover:border-[#f97316] transition-colors">
              <div className="text-[13px] font-extrabold tracking-[0.04em]" style={{ color: '#f97316' }}>{f.num}</div>
              <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">CHARACTERS — ねこおじさん詳細設定</div>
        <p className="mt-4 text-[15px] leading-[1.85] text-[#444444] max-w-[640px]">
          タイマーに登場する4人のねこおじさんたち。アプリの設定画面から「ねこおじさんの詳細設定」を開くと、それぞれのキャラクタープロフィールと表情バリエーションを確認できます。
        </p>
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm">
          <img src="/screenshots/cat-timer-characters.png" alt="ねこおじさん キャラクター詳細" className="w-full h-auto block" />
        </div>
        <div className="mt-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {[
            { label: 'A', name: 'たまお（48歳）', type: 'まるっとタイプ', desc: 'みんなの癒し系リーダー。口癖は「まあ、いいか」。' },
            { label: 'B', name: 'すずき（45歳）', type: 'ちょいスマートタイプ', desc: 'できるけど、ちょっと不器用。口癖は「たぶん、大丈夫です」。' },
            { label: 'C', name: 'けんた（50歳）', type: 'くたびれタイプ', desc: '見た目はダメでも、仕事はする。口癖は「いや…まあ…」。' },
            { label: 'D', name: 'ひろし（47歳）', type: 'オフスタイル', desc: '家では、ただのおじさん猫。口癖は「まあええか」。' },
          ].map(c => (
            <div key={c.label} className="border border-[#EBEBEB] rounded-xl p-5 hover:border-[#f97316] transition-colors">
              <div className="text-[12px] font-extrabold tracking-[0.06em] mb-2" style={{ color: '#f97316' }}>{c.label} — {c.type}</div>
              <div className="text-[15px] font-extrabold">{c.name}</div>
              <p className="mt-2 text-[13px] leading-[1.7] text-[#555555]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-[72px] px-6 bg-[#F7F7F7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">DOWNLOAD — ダウンロード</div>
          <div className="mt-8 flex flex-col gap-5 max-w-[640px]">
            <div className="border border-[#EBEBEB] bg-white rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="text-[40px] leading-none">💻</div>
                <div className="flex-1">
                  <div className="text-[18px] font-extrabold">Windows 10 / 11</div>
                  <p className="mt-2 text-[14px] text-[#444444] leading-[1.75]">
                    <code className="bg-[#F7F7F7] px-1.5 py-0.5 rounded text-[13px] border border-[#EBEBEB]">CatTimer.exe</code> をダウンロードして起動するだけ。インストール不要・登録不要。
                  </p>
                  <div className="mt-4 p-3 bg-[#FFF8F5] border border-[#f97316]/30 rounded-xl text-[13px] text-[#555555] leading-[1.8]">
                    ⚠️ 初回起動時に「WindowsによってPCが保護されました」と表示される場合があります。「詳細情報」→「実行」で起動できます。
                  </div>
                  <a
                    href={DOWNLOAD_URL}
                    className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-[14px] font-bold text-white rounded-[10px] hover:opacity-90 transition-opacity"
                    style={{ background: '#f97316' }}
                  >
                    ⬇ CatTimer.exe をダウンロード
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-[#EBEBEB] bg-white rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="text-[40px] leading-none">🐍</div>
                <div className="flex-1">
                  <div className="text-[18px] font-extrabold">Mac / Linux（Python実行）</div>
                  <p className="mt-2 text-[14px] text-[#444444] leading-[1.75]">
                    配布EXEはWindows専用です。Mac / Linux では Python 3 + Pillow をインストールしてソースから実行できます。
                  </p>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold rounded-[9px] border transition-colors hover:bg-[#FFF8F5]"
                    style={{ color: '#f97316', borderColor: '#f97316' }}
                  >
                    ソースコードを見る (GitHub) →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="rounded-[20px] p-16 text-center" style={{ background: '#FFF8F5' }}>
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>
            ねこと一緒に、集中しよう。
          </h2>
          <a
            href={DOWNLOAD_URL}
            className="mt-8 inline-block px-9 py-4 text-[16px] font-bold text-white rounded-[12px] hover:opacity-90 transition-opacity"
            style={{ background: '#f97316' }}
          >
            ⬇ 無料ダウンロード（Windows）
          </a>
        </div>
      </section>
    </div>
  )
}
