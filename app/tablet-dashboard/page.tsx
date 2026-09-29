import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'タブレット情報モニター | 古いAndroidタブレットを時計・天気・ニュースの常時表示に',
  description: '眠っている古いAndroidタブレットを、時計・天気・ニュース・株価・カレンダーを映し続ける情報モニターに。HTMLファイルを開くだけで動き、サーバーも月額料金も不要です。',
  alternates: { canonical: '/tablet-dashboard' },
}

const ACCENT = '#10b981'

const SCREENS = [
  {
    num: '01',
    title: '時刻・天気',
    desc: '大きな時計と、現在の天気・体感温度・湿度・風速。3日・5日・7日から選べる予報カードは、タップすると詳細が開きます。月カレンダーとニュースのPickupも同じ画面に。',
    img: '/screenshots/tablet-dashboard/weather.png',
    alt: '時刻・天気画面',
  },
  {
    num: '02',
    title: 'ニュース',
    desc: 'テクノロジー・経済・エンタメ/ガジェットをタブで切り替え。サムネイルと要約つきで、表示するカテゴリは設定でON/OFFできます。',
    img: '/screenshots/tablet-dashboard/news.png',
    alt: 'ニュース画面',
  },
  {
    num: '03',
    title: '金融',
    desc: '日経平均・TOPIX・ドル円・ユーロ円・ビットコインをTradingViewのウィジェットで表示。週末や祝日は前営業日の終値が出ます。',
    img: '/screenshots/tablet-dashboard/finance.png',
    alt: '金融画面',
  },
  {
    num: '04',
    title: 'カレンダー',
    desc: '壁掛けカレンダーのような月表示。日曜は赤、土曜は青、今日は丸、祝日は名前つき。Googleカレンダーを連携すると、予定がある日には件数バッジが付き、マス目をタップすると過去の日付も含めてその日の予定を見られます。',
    img: '/screenshots/tablet-dashboard/calendar.png',
    alt: 'カレンダー画面',
  },
  {
    num: '05',
    title: 'スポーツ',
    desc: '野球・サッカー・バスケ・その他をタグで切り替えて、スポーツニュースサイトの最新記事を一覧で表示します。',
    img: '/screenshots/tablet-dashboard/sports.png',
    alt: 'スポーツ画面',
  },
  {
    num: '06',
    title: '設定',
    desc: 'テーマ(ダーク・ライト・E-Paper)、天気の地域、ニュースのカテゴリ、Googleカレンダーの連携をここで変更。設定は自動で保存されます。',
    img: '/screenshots/tablet-dashboard/settings.png',
    alt: '設定画面',
  },
]

export default function TabletDashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-[72px]">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-10">
          <Link href="/" className="hover:text-[#10b981] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/apps" className="hover:text-[#10b981] transition-colors">Apps</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">タブレット情報モニター</span>
        </div>

        <div className="grid gap-16 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div>
            <span className="inline-block px-3 py-[5px] text-[12px] font-bold rounded-full" style={{ color: ACCENT, background: '#ECFDF5' }}>🏠 Life</span>
            <h1 className="mt-[22px] font-extrabold leading-[1.15] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              古いタブレットを、<br />情報モニターに。
            </h1>
            <p className="mt-[22px] text-[17px] leading-[1.85] text-[#444444] max-w-[480px]">
              使わなくなったAndroidタブレットを、時計・天気・ニュース・株価・カレンダーを映し続けるモニターに。HTMLファイルを開くだけで動き、サーバーも月額料金もいりません。
            </p>
            <div className="mt-6 flex gap-2 flex-wrap">
              {['準備中', 'Androidタブレット', 'サーバー不要', '月額不要'].map(tag => (
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
            <img src="/screenshots/tablet-dashboard/weather.png" alt="タブレット情報モニター 時刻・天気画面" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-[72px]">
        <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">SCREENS — 6つの画面</div>
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          {SCREENS.map(s => (
            <div key={s.num} className="border border-[#EBEBEB] rounded-2xl overflow-hidden hover:border-[#10b981] transition-colors">
              <img src={s.img} alt={s.alt} className="w-full h-auto block border-b border-[#EBEBEB]" />
              <div className="p-7">
                <div className="text-[13px] font-extrabold tracking-[0.04em]" style={{ color: ACCENT }}>{s.num}</div>
                <h3 className="mt-[14px] text-[18px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-[72px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[13px] font-bold tracking-[0.08em] text-[#999999]">HOW IT WORKS — 仕組みと動作環境</div>
          <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[
              {
                title: 'サーバー不要・月額不要',
                desc: '6つのHTMLファイルをタブレットに置いて開くだけ。専用のサーバーやアカウント登録はなく、設定はすべてタブレット本体に保存されます。',
              },
              {
                title: '無料のサービスで情報を取得',
                desc: '天気はOpen-Meteo、株価・為替はTradingView、祝日は公開API。ニュースとスポーツは各サイトのRSSを、Googleカレンダーは無料の中継サービス経由で取得します。',
              },
              {
                title: '取得できないときは前回分を表示',
                desc: '無料の中継サービスは一時的に使えなくなることがあります。そのときは、ニュース・スポーツ・カレンダーとも、前回取得した内容を表示し続けます。',
              },
              {
                title: '動作確認済みの環境',
                desc: 'Huawei MediaPad M3 Lite(Android 7〜8)で、ChromeとFully Kiosk Browser(無料版)を使って確認しています。Fully Kioskの「Pick a File」でweather.htmlを選ぶと、フルスクリーンで表示されます。',
              },
            ].map(f => (
              <div key={f.title} className="bg-white border border-[#EBEBEB] rounded-2xl p-7">
                <h3 className="text-[17px] font-extrabold tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl border border-[#EBEBEB] bg-white text-[14px] leading-[1.9] text-[#555555] max-w-[800px]">
            💡 Googleカレンダーを連携する場合、カレンダーのURLは中継サービスを経由して取得されます。連携しなくても、日本の祝日カレンダーは表示されます。
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="rounded-[20px] p-16 text-center" style={{ background: '#ECFDF5' }}>
          <h2 className="font-extrabold tracking-[-0.03em] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.8vw, 42px)' }}>
            眠っているタブレットに、もう一度仕事を。
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
