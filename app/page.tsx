export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-label">nobi-labo</span>
          <h1>日々の生活に<br /><em>ちょっと便利</em>を<br />プラス。</h1>
          <p className="hero-sub">
            日常の小さな不便を解消する、<br />
            個人開発のWebアプリ・PWAを公開しています。
          </p>
        </div>
      </section>

      <div className="section">
        <div className="section-header">
          <span className="section-label">Apps</span>
          <div className="section-line"></div>
        </div>

        <div className="apps">
          <div className="app-card live" style={{ cursor: 'default' }}>
            <div className="app-card-top">
              <div className="app-icon">📚</div>
              <span className="app-badge">Live</span>
            </div>
            <div className="app-name">comic-checker</div>
            <div className="app-desc">
              マンガの新刊を自動チェック。<br />
              発売14日前・7日前・当日にPush通知でお知らせ。<br />
              スマホのホーム画面に追加してすぐ使える。
            </div>
            <div className="app-tags">
              <span className="tag">PWA</span>
              <span className="tag">無料</span>
              <span className="tag">Push通知</span>
              <span className="tag">楽天連携</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://comic.nobi-labo.com" className="app-cta">今すぐ使う</a>
              <a href="/comic-checker" className="app-sub-link">詳細を見る</a>
            </div>
          </div>

          <div className="app-card live" style={{ cursor: 'default' }}>
            <div className="app-card-top">
              <div className="app-icon">🧮</div>
              <span className="app-badge">Live</span>
            </div>
            <div className="app-name">確定申告・還付判定シミュレーター</div>
            <div className="app-desc">
              所得税・住民税を簡単に計算。<br />
              収入を入力するだけで手取り額・還付額をすぐ確認できる。
            </div>
            <div className="app-tags">
              <span className="tag">無料</span>
              <span className="tag">登録不要</span>
              <span className="tag">令和7年版</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="/tax-simulator/" className="app-cta">今すぐ使う</a>
              <a href="/tax-simulator.html" className="app-sub-link">詳細を見る</a>
            </div>
          </div>

          <div className="app-card live" style={{ cursor: 'default' }}>
            <div className="app-card-top">
              <div className="app-icon">🧊</div>
              <span className="app-badge">Live</span>
            </div>
            <div className="app-name">ねこおじさんタイマー</div>
            <div className="app-desc">
              会議を凍らせる、愛すべきおやじ。<br />
              カウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。
            </div>
            <div className="app-tags">
              <span className="tag">会議タイマー</span>
              <span className="tag">おやじギャグ</span>
              <span className="tag">AI生成</span>
              <span className="tag">無料</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://absolute-zero-meeting.vercel.app" className="app-cta">今すぐ使う</a>
              <a href="/nekoojiisan-timer.html" className="app-sub-link">詳細を見る</a>
            </div>
          </div>

          <div className="app-card coming">
            <div className="app-card-top">
              <div className="app-icon">🔜</div>
              <span className="app-badge soon">Coming Soon</span>
            </div>
            <div className="app-name">Next App</div>
            <div className="app-desc">次のアプリを開発中です。</div>
          </div>
        </div>
      </div>
    </>
  )
}
