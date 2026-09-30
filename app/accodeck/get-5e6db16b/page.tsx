import type { Metadata } from 'next'
import Link from 'next/link'

// このページはHP・アプリ一覧・紹介ページのどこからもリンクしていない「非公開ページ」です。
// note記事の購入者と、アプリ内のアップデート通知バナーからのみ、このURLへ直接アクセスする想定。
// 検索エンジンにも載せないよう noindex を設定しています。
export const metadata: Metadata = {
  title: 'AccoDeck ダウンロード',
  description: 'AccoDeckの最新版ダウンロードとセットアップ手順',
  robots: { index: false, follow: false },
}

const ACCENT = '#10b981'

// リリースのたびにここへ追記する（新しい行を先頭に）
const CHANGELOG = [
  { version: '1.0.1', date: '2026-10-01', notes: 'データ破損時の保護・多重起動防止・ログイン検知の精度改善・インストーラー対応' },
  { version: '1.0.0', date: '2026-09-30', notes: '初回リリース' },
]

const CURRENT_VERSION = CHANGELOG[0].version
const INSTALLER_URL = '/accodeck/AccoDeck-Setup-1.0.1.exe'

export default function AccoDeckDownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[720px] mx-auto px-6 pt-14 pb-24">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#10b981] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">AccoDeck ダウンロード</span>
        </div>

        <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full" style={{ color: ACCENT, background: '#ECFDF5' }}>
          最新版 v{CURRENT_VERSION}
        </span>
        <h1 className="mt-[18px] font-extrabold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)' }}>
          AccoDeck<br />ダウンロード・セットアップ
        </h1>
        <p className="mt-4 text-[15px] leading-[1.8] text-[#444444]">
          note記事をご購入いただいた方、またはアプリ内の更新通知からお越しの方向けのページです。Windows 10/11（64bit）対応。
        </p>

        <div className="mt-8">
          <a
            href={INSTALLER_URL}
            className="inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold rounded-[11px] text-white transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            ⬇ AccoDeck-Setup-{CURRENT_VERSION}.exe をダウンロード
          </a>
        </div>

        <section className="mt-14">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">SETUP — 初めての方のセットアップ手順</div>
          <ol className="mt-5 space-y-4">
            {[
              ['インストーラーを実行する', 'ダウンロードしたAccoDeck-Setup-1.0.1.exeを実行します。画面の指示に従うだけで、スタートメニューへの登録まで自動で行われます。'],
              ['警告が出た場合', '初回起動時に「Windowsによって PC が保護されました」と表示されることがあります。「詳細情報」→「実行」で進められます（未署名アプリのため表示される一般的な警告です）。'],
              ['サイトとアカウントを追加する', '左下の「＋ アカウント追加」からサイトを選んでアカウントを登録してください。使い方はアプリ右上の「？」からいつでも確認できます。'],
            ].map(([title, desc], i) => (
              <li key={title} className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold text-white" style={{ background: ACCENT }}>{i + 1}</div>
                <div>
                  <div className="font-bold text-[15px]">{title}</div>
                  <div className="mt-1 text-[14px] leading-[1.75] text-[#444444]">{desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">UPDATE — アップデートの方法</div>
          <div className="mt-5 p-5 rounded-xl border border-[#EBEBEB] bg-[#FAFAFA] text-[14px] leading-[1.9] text-[#444444]">
            新しいバージョンが出ると、アプリ起動時にサイドバー上部へ通知バナーが表示されます。「ダウンロード」を押すとこのページに戻ってくるので、上のボタンからインストーラーを実行してください。
            既存のインストール先に上書きインストールされ、保存したアカウント・サイト・ログイン情報もそのまま引き継がれます。
          </div>
        </section>

        <section className="mt-14">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">CHANGELOG — 更新履歴</div>
          <div className="mt-5 divide-y divide-[#EBEBEB] border border-[#EBEBEB] rounded-xl overflow-hidden">
            {CHANGELOG.map(c => (
              <div key={c.version} className="p-4 flex gap-4 items-baseline">
                <span className="text-[13px] font-extrabold flex-shrink-0" style={{ color: ACCENT }}>v{c.version}</span>
                <span className="text-[12px] text-[#999999] flex-shrink-0">{c.date}</span>
                <span className="text-[14px] text-[#444444]">{c.notes}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 p-5 rounded-xl border border-[#EBEBEB] bg-white text-[13px] leading-[1.9] text-[#999999]">
          このアプリをまだお持ちでない方は、<Link href="/accodeck" className="text-[#10b981] font-medium hover:underline">紹介ページ</Link>をご覧ください。
        </div>
      </section>
    </div>
  )
}
