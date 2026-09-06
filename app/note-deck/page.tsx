import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Note Deck | note.comマルチアカウント切替',
  description: 'note.comのアカウントをデスクトップで瞬時に切り替え。Googleログインも完全対応。インストール不要のWindows用無料ツール。',
  alternates: { canonical: '/note-deck' },
}

const GITHUB_URL = 'https://github.com/nobinobi9000/note-multi-account'
const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`

export default function NoteDeckPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#f97316] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#f97316] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Note Deck</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full text-[#6D28D9] bg-[#F5F1FC]">🛠 Work</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              デスクトップで、<br />note をマルチに使う。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              note.comのアカウントを左サイドバーで瞬時に切り替え。Googleログインも完全対応。複数アカウントを使い分ける人のための、自作デスクトップツール。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['無料', 'Windows 10/11 64bit', 'デスクトップアプリ', '登録不要'].map(tag => (
                <span key={tag} className="px-3 py-[5px] text-[12.5px] font-medium rounded-lg text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">{tag}</span>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] text-[13px] leading-[1.9] text-[#555555]">
              <div className="font-bold text-[#111111] mb-2">対応OS</div>
              <div className="flex flex-col gap-1">
                <span>✅ Windows 10 / 11（64bit）— 配布バイナリあり</span>
                <span>🔧 Mac / Linux — ソースからビルドで動作可</span>
              </div>
            </div>

            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold text-white rounded-[11px] hover:opacity-90 transition-opacity"
              style={{ background: '#f97316' }}
            >
              ⬇ Windows版をダウンロード
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB]">
            <img src="/screenshots/note-deck.png" alt="Note Deck 画面" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">STORY — 開発の背景</div>
          <div className="mt-9 max-w-[720px]">
            <blockquote className="border-l-[3px] pl-7" style={{ borderColor: '#f97316' }}>
              <p className="text-[20px] font-semibold leading-[1.8] text-[#111111]">「複数のnoteアカウントを使い分けたいのに、ブラウザだと毎回ログインが面倒だった。」</p>
            </blockquote>
            <p className="mt-7 text-[16px] leading-[1.9] text-[#444444]">Chromeの拡張機能「Multi Note」を参考にしたが、個人情報を扱う可能性があるため自作することに。Electronで独立したブラウザセッションを実装することで、Googleアカウントでのログインも含め、完全に切り替えられるデスクトップアプリが完成した。</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">MENU — サイドバーの見方</div>
        <div className="mt-9 grid gap-10 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] w-full max-w-[280px]">
              <img src="/screenshots/note-deck-sidebar.png" alt="Note Deck メニューバー" className="w-full h-auto block" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { title: 'ナビゲーションボタン', desc: '← → で戻る・進む、⟳ で再読み込み。ブラウザと同じ感覚で操作できます。' },
              { title: 'URLをコピー', desc: '今開いているページのURLをワンクリックでコピー。記事のシェアや保存に便利です。' },
              { title: 'アカウント一覧', desc: 'クリックした瞬間にそのアカウントへ切り替わります。緑のバーが付いているのが現在選択中のアカウント。' },
              { title: 'アカウントを追加', desc: '下部のボタンから新しいnoteアカウントを何個でも追加できます。' },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-none w-2 h-2 rounded-full mt-2" style={{ background: '#f97316' }} />
                <div>
                  <div className="text-[15px] font-extrabold tracking-[-0.01em]">{item.title}</div>
                  <div className="mt-1 text-[14px] leading-[1.75] text-[#444444]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">FEATURES — 機能</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { num: '01', title: 'ワンクリックで切り替え', desc: '左サイドバーのアカウント名をクリックするだけ。ログインし直す必要なし。' },
            { num: '02', title: 'Googleログインも完全対応', desc: '各アカウントが独立したブラウザセッションを持つため、Google OAuth認証でも問題なく動作する。' },
            { num: '03', title: 'アカウント数無制限', desc: '使いたいアカウントを追加するだけ。ジャンル別・用途別に何個でも管理できる。' },
            { num: '04', title: 'ナビゲーション＆URLコピー', desc: '戻る・進む・再読み込みボタン付き。現在のページURLをワンクリックでコピー可能。' },
            { num: '05', title: '切り替え中も作業状態を保持', desc: '各アカウントの画面はメモリ上に保持されているため、記事を書きかけた状態でアカウントを切り替えても、戻ってきたときにそのまま続きから作業できます。' },
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
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">COMPARE — 他の方法と比べると</div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-[14px]" style={{ minWidth: '640px' }}>
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-[12px] font-bold text-[#999999] border-b border-[#EBEBEB] w-[180px]">比較項目</th>
                  {[
                    { label: 'ブラウザ切り替え', highlight: false },
                    { label: 'Chromeプロファイル', highlight: false },
                    { label: 'Multi Note拡張', highlight: false },
                    { label: 'Note Deck', highlight: true },
                  ].map(col => (
                    <th
                      key={col.label}
                      className="text-center py-3 px-4 text-[13px] font-extrabold border-b"
                      style={col.highlight
                        ? { color: '#f97316', borderColor: '#f97316', borderBottomWidth: '2px', background: '#FFF8F5' }
                        : { color: '#444444', borderColor: '#EBEBEB', background: 'white' }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: '切り替えの手間',
                    vals: ['❌ 毎回ログイン', '△ プロファイル切替', '△ 拡張メニュー'],
                    note: { text: '✅ ワンクリック', strong: true },
                  },
                  {
                    label: 'Googleログイン',
                    vals: ['❌ 対応困難', '✅ 対応', '△ 不安定な場合あり'],
                    note: { text: '✅ 完全対応', strong: true },
                  },
                  {
                    label: '切り替え中の編集状態',
                    vals: ['❌ 失われる', '❌ 失われる', '❌ 失われる'],
                    note: { text: '✅ メモリで保持', strong: true },
                  },
                  {
                    label: '外部への情報送信',
                    vals: ['—', '—', '⚠️ 可能性あり'],
                    note: { text: '✅ 完全ローカル', strong: true },
                  },
                  {
                    label: '無料',
                    vals: ['✅', '✅', '✅'],
                    note: { text: '✅', strong: false },
                  },
                ].map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                    <td className="py-3 px-4 text-[13px] font-semibold text-[#444444] border-b border-[#EBEBEB]">{row.label}</td>
                    {row.vals.map((v, vi) => (
                      <td key={vi} className="py-3 px-4 text-center text-[13px] text-[#666666] border-b border-[#EBEBEB]">{v}</td>
                    ))}
                    <td
                      className="py-3 px-4 text-center text-[13px] font-bold border-b"
                      style={row.note.strong
                        ? { color: '#f97316', borderColor: '#f97316', background: '#FFF8F5' }
                        : { color: '#f97316', borderColor: '#EBEBEB', background: '#FFF8F5' }}
                    >
                      {row.note.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">DOWNLOAD — ダウンロード</div>
          <div className="mt-8 flex flex-col gap-5 max-w-[640px]">
            <div className="border border-[#EBEBEB] bg-white rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="text-[40px] leading-none">💻</div>
                <div className="flex-1">
                  <div className="text-[18px] font-extrabold">Windows 10 / 11（64bit）</div>
                  <p className="mt-2 text-[14px] text-[#444444] leading-[1.75]">
                    ZIPを展開して <code className="bg-[#F7F7F7] px-1.5 py-0.5 rounded text-[13px] border border-[#EBEBEB]">note アカウント切替.exe</code> を実行するだけ。インストール不要。
                  </p>
                  <div className="mt-4 p-3 bg-[#FFF8F5] border border-[#f97316]/30 rounded-xl text-[13px] text-[#555555] leading-[1.8]">
                    ⚠️ 初回起動時に「WindowsによってPCが保護されました」と表示される場合があります。「詳細情報」→「実行」で起動できます。
                  </div>
                  <a
                    href={DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-6 py-3 text-[14px] font-bold text-white rounded-[10px] hover:opacity-90 transition-opacity"
                    style={{ background: '#f97316' }}
                  >
                    ⬇ GitHubからダウンロード
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-[#EBEBEB] bg-white rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="text-[40px] leading-none">🍎</div>
                <div className="flex-1">
                  <div className="text-[18px] font-extrabold">Mac / Linux</div>
                  <p className="mt-2 text-[14px] text-[#444444] leading-[1.75]">
                    現時点では配布バイナリはありません。GitHubのソースコードから <code className="bg-[#F7F7F7] px-1.5 py-0.5 rounded text-[13px] border border-[#EBEBEB]">npm install && npm start</code> でビルド・起動できます。
                  </p>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold rounded-[9px] border transition-colors hover:bg-[#FFF8F5]"
                    style={{ color: '#f97316', borderColor: '#f97316' }}
                  >
                    ソースコードを見る →
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
            note、もっと自由に使おう。
          </h2>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
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
