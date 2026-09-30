import type { Metadata } from 'next'
import Link from 'next/link'

// このページはHP・アプリ一覧・紹介ページのどこからもリンクしていない「非公開ページ」です。
// note記事の購入者と、アプリ内のアップデート通知バナーからのみ、このURLへ直接アクセスする想定。
// 検索エンジンにも載せないよう noindex を設定しています。
export const metadata: Metadata = {
  title: 'タブレット情報モニター ダウンロード',
  description: 'タブレット情報モニターの最新版ダウンロードとセットアップ手順',
  robots: { index: false, follow: false },
}

const ACCENT = '#10b981'

// リリースのたびにここへ追記する（新しい行を先頭に）
const CHANGELOG = [
  { version: '1.0.0', date: '2026-09-30', notes: '初回リリース' },
]

const CURRENT_VERSION = CHANGELOG[0].version
const ZIP_URL = '/tablet-dashboard/dashboard_v1.zip'

export default function TabletDashboardDownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[720px] mx-auto px-6 pt-14 pb-24">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#10b981] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">タブレット情報モニター ダウンロード</span>
        </div>

        <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full" style={{ color: ACCENT, background: '#ECFDF5' }}>
          最新版 v{CURRENT_VERSION}
        </span>
        <h1 className="mt-[18px] font-extrabold leading-[1.25] tracking-[-0.02em]" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)' }}>
          タブレット情報モニター<br />ダウンロード・セットアップ
        </h1>
        <p className="mt-4 text-[15px] leading-[1.8] text-[#444444]">
          note記事をご購入いただいた方、またはアプリ内の更新通知からお越しの方向けのページです。
        </p>

        <div className="mt-8">
          <a
            href={ZIP_URL}
            className="inline-flex items-center gap-2 px-7 py-4 text-[15px] font-bold rounded-[11px] text-white transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            ⬇ dashboard_v1.zip をダウンロード（v{CURRENT_VERSION}）
          </a>
        </div>

        <section className="mt-14">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">SETUP — 初めての方のセットアップ手順</div>
          <ol className="mt-5 space-y-4">
            {[
              ['ZIPを解凍する', 'ダウンロードしたdashboard_v1.zipを解凍すると、weather.html / news.html / finance.html / calendar.html / sports.html / settings.html の6つのHTMLファイルが出てきます。'],
              ['タブレットに転送する', '6つのファイルを、タブレットの「Download」フォルダに転送します（Google Drive経由でもUSBケーブルでも可）。'],
              ['Fully Kiosk Browserで開く', 'Fully Kiosk Browser（無料）の「Pick a File」から weather.html を選択すると、フルスクリーンで表示されます。'],
              ['設定する', '画面右下「⚙️ 設定」から、テーマ（ダーク/ライト/E-Paper）・天気の地域・ニュースのカテゴリ・Googleカレンダー連携を設定できます。'],
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
            上のボタンから最新のdashboard_v1.zipをダウンロードし、解凍した6つのファイルを<strong>タブレットの同じ場所・同じファイル名で上書き</strong>してください。
            設定（テーマ・天気の地域・ニュースのカテゴリ・Googleカレンダー連携など）はそのまま引き継がれます。
            <br />
            ※ 別のフォルダに置き直すと設定が引き継がれないのでご注意ください。
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
          このアプリをまだお持ちでない方は、<Link href="/tablet-dashboard" className="text-[#10b981] font-medium hover:underline">紹介ページ</Link>をご覧ください。
        </div>
      </section>
    </div>
  )
}
