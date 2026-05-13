import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - nobi',
  description: 'nobi-labo運営者・nobIのプロフィール。会社員（非エンジニア）が2026年1月からAIと一緒にアプリを作り始めた話。マンガ1000冊・積みゲー・投資・音楽好き。',
  alternates: {
    canonical: '/about',
  },
}

const STATS = [
  { num: '2026.01', label: '開発スタート月' },
  { num: '10+', label: '公開アプリ数' },
  { num: '1000+', label: '所持マンガ冊数' },
  { num: '∞', label: '積みゲー' },
]

const INTERESTS = [
  {
    icon: '📚',
    title: 'マンガ',
    body: '気づいたら1000冊を超えていた。ジャンル問わず読む。新刊の発売日を把握しきれなくなって comic-checker を作った。',
  },
  {
    icon: '🎮',
    title: 'ゲーム',
    body: '積みゲーが増え続けている。「いつか絶対やる」と思いながら積んでいる。それを前向きに管理したくて QUESTLOG を作った。',
  },
  {
    icon: '💰',
    title: '投資',
    body: 'お小遣い程度にコツコツ。証券口座が3つになって管理が面倒になり Kabu Note を作った。サブスクを見直したくてサブスク断捨離も作った。',
  },
  {
    icon: '🎵',
    title: '音楽',
    body: 'スカ・レゲエからテクノ・EDMまで幅広く聴く。DJがどうやってMixしているのかが最近気になっている。次に作るアプリはこのあたりかもしれない。',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '80px 24px 72px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)' }}>about</span>
          </div>

          <div style={{ fontSize: '56px', marginBottom: '24px', lineHeight: 1 }}>👋</div>

          <h1 style={{ fontSize: 'clamp(32px, 7vw, 52px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '20px' }}>
            nobi <em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>です。</em>
          </h1>

          <p style={{ fontSize: '15px', color: '#aaa', lineHeight: 1.9, maxWidth: '520px', marginBottom: '32px' }}>
            会社員（非エンジニア）です。<br />
            2026年1月、AIと遊びたくてアプリを作り始めました。<br />
            自分が困ったことを解決するツールを、自分のために作っています。
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border)', maxWidth: '480px' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: 'var(--panel)', padding: '20px 24px' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--orange)', letterSpacing: '-1px', lineHeight: 1, marginBottom: '6px' }}>{s.num}</div>
                <div style={{ fontSize: '11px', color: '#666', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            Story
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#bbb', lineHeight: 1.9 }}>
            <p>
              エンジニアではありません。コードは基本的に書けません。
              それでも2026年1月、Claude Codeと出会ってからアプリを作り始めました。
            </p>
            <p>
              きっかけは単純で、「自分が困っていることをAIに話したら、アプリができた」という体験です。
              マンガの新刊を買い逃す → comic-checker。
              積みゲーが罪悪感になる → QUESTLOG。
              サブスクがいくらかからなかった → サブスク断捨離。
              全部、自分の「困った」から始まっています。
            </p>
            <p>
              「作れる人間」ではなく「使いたい人間」として作っているので、
              使い勝手には人一倍こだわっています。
              余計な機能は入れない。登録不要で使える。スマホのホーム画面に追加できる。
              そのへんは妥協しないようにしています。
            </p>
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              「AI使えば誰でもアプリ作れる」という言葉をよく見かけますが、
              実際やってみると「誰でも」ではないとわかります。
              でも、やってみる価値はあります。
            </p>
          </div>
        </div>
      </div>

      {/* INTERESTS */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            Interests
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {INTERESTS.map(item => (
              <div key={item.title} style={{ background: 'var(--panel)', padding: '24px 28px', display: 'grid', gridTemplateColumns: '40px 1fr', gap: '0 16px', alignItems: 'start' }}>
                <div style={{ fontSize: '28px', lineHeight: 1.2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--white)', marginBottom: '8px' }}>{item.title}</div>
                  <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.8 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW I BUILD */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            How I Build
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { tool: 'Claude Code', desc: 'メインの開発環境。コードは基本AIに書いてもらっています。アイデアと仕様を言葉で渡すと、動くものができます。' },
              { tool: 'Supabase', desc: '認証・データベース。バックエンドの知識がなくても使えるのがありがたい。' },
              { tool: 'Next.js / Vercel', desc: 'このサイト（nobi-labo.com）の構築に使用。デプロイが1コマンドで済むのが気に入っています。' },
              { tool: 'Notion', desc: 'ブログ記事の管理。記事をNotionに書けば自動でサイトに反映される仕組みを作っています。' },
            ].map(t => (
              <div key={t.tool} style={{ background: 'var(--panel)', padding: '20px 24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--orange)', marginBottom: '6px' }}>{t.tool}</div>
                <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.7 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.8, marginBottom: '28px' }}>
            作ったアプリや、マンガ・ゲーム・投資のことを<br />
            ブログとnoteに書いています。
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/apps" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--orange)', color: '#fff', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '12px 24px' }}>
              Apps →
            </a>
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', color: '#aaa', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '12px 24px' }}>
              Blog →
            </a>
            <a href="https://note.com/suzukidaichisan" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', color: '#aaa', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '12px 24px' }}>
              Note ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
