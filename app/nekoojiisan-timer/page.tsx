import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ねこおじさんタイマー - nobi-labo',
  description: '会議を凍らせる、愛すべきおやじ。カウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。無料・登録不要。',
}

export default function NekoojiisanTimerPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)' }}>nekoojiisan-timer</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧊</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            会議を<em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>凍らせる、</em><br />愛すべきおやじ。
          </h1>
          <p style={{ fontSize: '15px', color: '#aaa', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            カウントダウンが終わると、ねこおじさんが<br />
            AI生成おやじギャグで会議を強制終了。<br />
            時々（9%）、いいことも言います。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { label: '無料', hi: true },
              { label: '登録不要', hi: true },
              { label: '会議タイマー', hi: false },
              { label: 'AI生成ギャグ', hi: false },
            ].map(b => (
              <span key={b.label} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${b.hi ? 'var(--orange)' : '#2a2a2a'}`, color: b.hi ? 'var(--orange)' : '#666' }}>{b.label}</span>
            ))}
          </div>
          <a href="https://absolute-zero-meeting.vercel.app" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
            会議を凍らせる →
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
            { num: '01', title: 'シンプルな会議タイマー', desc: '＋1分・＋10分・＋30分・＋60分ボタンで時間をセットしてスタート。カウントダウン中はねこおじさんが見守ります。' },
            { num: '02', title: 'AI生成おやじギャグで強制終了', desc: 'カウントダウンがゼロになると、ねこおじさんがAI生成のおやじギャグを披露。会議を強制的に締めてくれます。だらだら会議とはもうおさらば。' },
            { num: '03', title: '時々（9%）いいことも言う', desc: 'おやじギャグだけではありません。約9%の確率で、ねこおじさんがなぜかちょっとためになることを言ってきます。何が出るかはお楽しみ。' },
            { num: '04', title: '「今日の一言」で強制終了ボタン', desc: 'タイマーを待てないときは「今日の一言（強制終了）」ボタンでいつでも締められます。緊急脱出にどうぞ。' },
          ].map(f => (
            <div key={f.num} style={{ background: 'var(--panel)', padding: '28px 24px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0 20px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#383838', lineHeight: 1 }}>{f.num}</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, marginBottom: '8px', color: 'var(--orange)' }}>{f.title}</div>
                <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.8 }}>{f.desc}</div>
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
              { n: 1, title: '会議の前にアプリを開く', desc: '登録不要。ブラウザで開くだけでそのまま使えます。' },
              { n: 2, title: '時間をセットする', desc: '＋1分・＋10分・＋30分・＋60分のボタンで会議時間を設定します。', note: '例：30分会議なら「＋30分」を1回タップ' },
              { n: 3, title: 'スタートを押して会議開始', desc: 'カウントダウンが始まります。ねこおじさんが時間を見守ります。' },
              { n: 4, title: 'ゼロになったらおやじギャグで締め', desc: 'タイムアップと同時にねこおじさんが登場。AI生成のおやじギャグ（または9%の確率で知恵）で会議を凍結します。' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--panel)', padding: '24px', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 16px' }}>
                <div style={{ width: '28px', height: '28px', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.7 }}>{s.desc}</div>
                  {s.note && <div style={{ fontSize: '11px', color: 'var(--orange)', background: 'rgba(249,115,22,0.08)', padding: '8px 12px', marginTop: '10px', borderLeft: '2px solid var(--orange)' }}>{s.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9% SECTION */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            9%の奇跡
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ background: 'var(--panel)', borderLeft: '3px solid var(--orange)', padding: '24px' }}>
            <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.9 }}>
              ねこおじさんは基本的におやじギャグを言います。<br />
              しかし、<span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--orange)', marginRight: '4px', verticalAlign: 'middle' }}>9%</span>の確率で、なぜかちょっとためになることを言ってきます。<br /><br />
              何が出るかは会議が終わるまでわかりません。<br />
              おやじギャグを覚悟しつつ、密かに知恵を期待してください。
            </p>
          </div>
        </div>
      </div>

      {/* CTA BOTTOM */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '12px' }}>
              会議を<em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>凍らせよう。</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '28px', lineHeight: 1.7 }}>
              無料・登録不要。ブラウザで今すぐ使えます。<br />
              だらだら会議に、ねこおじさんという名の終止符を。
            </p>
            <a href="https://absolute-zero-meeting.vercel.app" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              会議を凍らせる →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
