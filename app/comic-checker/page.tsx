import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'comic-checker | マンガ新刊チェッカー',
  description: 'マンガの新刊を自動チェック。発売14日前・7日前・当日にPush通知でお知らせ。無料・PWA対応。',
}

export default function ComicCheckerPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)' }}>comic-checker</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📚</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            マンガの新刊を<br /><em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>見逃さない。</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            登録したマンガシリーズの新刊を自動でチェック。<br />
            発売前にPush通知でお知らせするので、予約も買い忘れもなし。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['無料', 'PWA', 'Push通知', '登録制', '楽天連携', 'Amazon連携'].map((b, i) => (
              <span key={b} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${i < 3 ? 'var(--orange)' : '#2a2a2a'}`, color: i < 3 ? 'var(--orange)' : '#666' }}>{b}</span>
            ))}
          </div>
          <a href="https://comic.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
            今すぐ無料で使う →
          </a>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
          Features
          <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {[
            { num: '01', title: 'シリーズ一括登録', desc: '1巻を選ぶだけでシリーズ全巻を自動取得・登録。過去巻の所有チェックもまとめて管理できます。' },
            { num: '02', title: '新刊自動チェック', desc: '毎日自動でマイリストの最新刊情報を更新。新しい巻が発売予定になると新刊リストに追加されます。' },
            { num: '03', title: '3段階Push通知', desc: '発売14日前・7日前・当日の3回、ブラウザにPush通知が届きます。予約済みにした作品には送りません。' },
            { num: '04', title: '所有巻・完結フラグ管理', desc: 'シリーズ詳細ページで巻ごとに「所有済み」チェックが可能。完結した作品は完結フラグで区別できます。' },
            { num: '05', title: '楽天・Amazon連携', desc: '各巻から楽天ブックス・Amazonへワンタップで購入ページへ移動できます。' },
          ].map(f => (
            <div key={f.num} style={{ background: 'var(--panel)', padding: '28px 24px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0 20px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#383838', lineHeight: 1 }}>{f.num}</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, marginBottom: '8px', color: 'var(--orange)' }}>{f.title}</div>
                <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.8 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW TO USE */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            How to use
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { n: 1, title: 'アカウント登録（無料）', desc: 'メールアドレスとパスワードで登録。登録後すぐに使えます。' },
              { n: 2, title: 'マンガを検索して登録', desc: 'タイトルで検索して気になる作品を選ぶだけ。シリーズ全巻が自動でマイリストに追加されます。', note: '例：「SPY×FAMILY」→ 全巻一括登録' },
              { n: 3, title: '通知をONにする', desc: '設定画面から「通知をONにする」を押すだけ。ブラウザの通知許可を求めるダイアログが表示されます。' },
              { n: 4, title: 'あとは待つだけ', desc: '毎日自動で新刊チェックが走り、発売前に通知が届きます。新刊ページから予約・購入もできます。' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--panel)', padding: '24px', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 16px' }}>
                <div style={{ width: '28px', height: '28px', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: '#777', lineHeight: 1.7 }}>{s.desc}</div>
                  {s.note && <div style={{ fontSize: '11px', color: 'var(--orange)', background: 'rgba(249,115,22,0.08)', padding: '8px 12px', marginTop: '10px', borderLeft: '2px solid var(--orange)' }}>{s.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BOTTOM */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '12px' }}>
              新刊を<em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>見逃さない</em>生活へ。
            </h2>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '28px', lineHeight: 1.7 }}>
              登録は無料。マンガ好きのための新刊通知アプリ。<br />今すぐ使い始めてください。
            </p>
            <a href="https://comic.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              無料で始める →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
