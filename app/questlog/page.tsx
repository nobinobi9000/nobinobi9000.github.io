import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QUESTLOG | 積みゲー冒険ログ',
  description: '積みゲーを冒険の地図として管理するゲームバックログアプリ。新作・予約情報、冒険統計、ステータス管理。無料・PWA対応。',
}

const SCREENSHOTS = [
  { src: '/screenshots/questlog/Top.png',    label: '冒険の地図' },
  { src: '/screenshots/questlog/Tsumi.png',  label: '積みゲー一覧' },
  { src: '/screenshots/questlog/new.png',    label: '新作・予約情報' },
  { src: '/screenshots/questlog/tokei.png',  label: '冒険統計' },
  { src: '/screenshots/questlog/dendo.png',  label: '殿堂' },
  { src: '/screenshots/questlog/tusika.png', label: 'ゲームを追加' },
]

const FEATURES = [
  {
    num: '01',
    title: '冒険の地図（ダッシュボード）',
    desc: '積みゲーの総資産・制覇率・残り冒険時間をワンページで確認。NEW PICKで最新ゲーム情報、今週の注目クエストでランダムにゲームをピックアップ。',
  },
  {
    num: '02',
    title: 'ゲーム検索・一発登録',
    desc: '日本語・英語どちらでもOK。楽天ブックス・Steam・RAWGの3ソースから正確なゲーム情報とパッケージ画像を自動取得。ジャンル・プラットフォームを確認してから登録できる。',
  },
  {
    num: '03',
    title: 'ステータス管理',
    desc: 'Backlog → Playing → Cleared の3ステップでプレイ進捗を管理。予想クリア時間・実際のクリア時間・感想メモも記録できる。気分タグで「ほっこり」「燃える」などの分類も可能。',
  },
  {
    num: '04',
    title: '新作・予約情報',
    desc: 'ファミ通・4Gamer・Steamから最新ゲーム情報を自動取得。近日発売タイトルはAmazon・楽天の予約リンクつき。気になるタイトルはワンタップで積む予定リストに追加。',
  },
  {
    num: '05',
    title: '冒険統計',
    desc: 'ジャンル別・プラットフォーム別の積みゲー内訳をグラフで確認。制覇済みタイトルの分析も。プレイ傾向が一目でわかる。',
  },
  {
    num: '06',
    title: 'PWA対応',
    desc: 'スマホのホーム画面に追加してアプリとして使える。インストール不要でいつでも起動。Push通知で新作情報もお届け。',
  },
]

const STEPS = [
  {
    n: 1,
    title: 'アカウント登録（無料）',
    desc: 'メールアドレスとパスワードで登録。登録後すぐに使えます。',
  },
  {
    n: 2,
    title: 'ゲームを検索して追加',
    desc: '「追加」タブでタイトルを検索。日本語・英語どちらでもOK。見つかったら「本棚に追加」を押すだけ。',
    note: '例：「龍が如く8」「Elden Ring」',
  },
  {
    n: 3,
    title: 'ステータスを更新しながら遊ぶ',
    desc: 'ゲームをタップして詳細画面を開き「プレイ開始」→「クリア！」とステータスを進めていく。クリア時間や感想も記録できる。',
  },
  {
    n: 4,
    title: 'ホーム画面に追加してPWAとして使う',
    desc: 'ブラウザの「ホーム画面に追加」でアプリとしてインストール。通知もONにすれば新作・予約情報が届く。',
  },
]

export default function QuestlogPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)' }}>QUESTLOG</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            積みゲーは<br /><em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>冒険の地図。</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            「積みゲー」を罪悪感ではなく、まだ見ぬ冒険への期待として管理するゲームバックログアプリ。<br />
            Backlog → Playing → Cleared で自分だけの冒険記録を残そう。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['無料', 'PWA', 'Push通知', 'ゲーム管理', '新作情報', '予約リンク'].map((b, i) => (
              <span key={b} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${i < 3 ? 'var(--orange)' : '#2a2a2a'}`, color: i < 3 ? 'var(--orange)' : '#666' }}>{b}</span>
            ))}
          </div>
          <a href="https://gamelog.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
            冒険を始める →
          </a>
        </div>
      </div>

      {/* SCREENSHOTS */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Screenshots
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', gap: '20px', width: 'max-content', padding: '4px 2px' }}>
              {SCREENSHOTS.map(s => (
                <div key={s.src} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <div style={{ width: '200px', background: '#1a1a1a', borderRadius: '32px', border: '2px solid #333', padding: '14px 8px', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
                    <div style={{ width: '60px', height: '6px', background: '#2a2a2a', borderRadius: '3px', margin: '0 auto 10px' }} />
                    <div style={{ width: '100%', borderRadius: '18px', overflow: 'hidden' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.src} alt={s.label} style={{ width: '100%', display: 'block' }} />
                    </div>
                    <div style={{ width: '40px', height: '4px', background: '#2a2a2a', borderRadius: '2px', margin: '10px auto 0' }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#666', textAlign: 'center', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONCEPT */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Concept
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { icon: '📦', status: 'Backlog', color: '#94a3b8', desc: 'まだ踏み入れていない未踏の地。積んでいるゲームは「罪」じゃない。いつか訪れる冒険先リスト。' },
              { icon: '⚔️', status: 'Playing', color: '#f97316', desc: '今まさに探索中。プレイ中のゲームは冒険の真っ只中。クリアまでの道のりを記録しよう。' },
              { icon: '🏆', status: 'Cleared', color: '#f1c40f', desc: '攻略済みの伝説。クリアしたゲームは殿堂入りとして永遠に記録される。' },
            ].map(s => (
              <div key={s.status} style={{ background: 'var(--panel)', padding: '28px 24px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0 20px', alignItems: 'start' }}>
                <div style={{ fontSize: '28px', lineHeight: 1 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 900, marginBottom: '8px', color: s.color }}>{s.status}</div>
                  <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.8 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Features
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {FEATURES.map(f => (
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
      </div>

      {/* HOW TO USE */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            How to use
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {STEPS.map(s => (
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
              積みゲーを<em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>冒険の記録</em>へ。
            </h2>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '28px', lineHeight: 1.7 }}>
              登録は無料。ゲーマーのためのバックログ管理アプリ。<br />
              今すぐ冒険の地図を開こう。
            </p>
            <a href="https://gamelog.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              冒険を始める →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
