import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Manager - nobi-labo',
  description: '重要度×緊急度の2軸でタスクを自動分類するToDo管理ツール。アイゼンハワーマトリクスで「すぐやる・後でやる・任せる・保留」に即振り分け。登録不要・無料。',
}

const FEATURES = [
  {
    icon: '🔢',
    title: '4象限マトリクス',
    desc: '重要度×緊急度で「すぐやる・後でやる・任せる・保留」に自動振り分け。追加した瞬間に正しい象限へ。',
  },
  {
    icon: '📊',
    title: 'モダンダッシュボード',
    desc: 'KPIタイル＋カテゴリ別バーチャート＋週次完了トレンドで、タスクの状況をひと目で把握。',
  },
  {
    icon: '🤝',
    title: '委任フロー',
    desc: '「任せる」象限のタスクは完了時に「委任して完了」か「自分でやった」を記録。実態に合わせた管理ができる。',
  },
  {
    icon: '💾',
    title: '登録不要・ブラウザ保存',
    desc: 'アカウント作成不要。データはブラウザのlocalStorageに自動保存されるので、次回もすぐ続きから使える。',
  },
]

export default function TaskManagerPage() {
  const orange = '#f97316'
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: orange }}>task-manager</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📋</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            優先順位を、<br />
            <em style={{ fontStyle: 'normal', color: orange }}>迷わず決める。</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#aaa', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            重要度×緊急度の2軸でタスクを自動分類。<br />
            アイゼンハワーマトリクスをそのまま使える<br />
            シンプルなToDo管理ツール。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['無料', '登録不要', '優先度管理', 'ブラウザ保存'].map((tag, i) => (
              <span key={tag} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${i < 2 ? orange : '#2a2a2a'}`, color: i < 2 ? orange : '#666' }}>{tag}</span>
            ))}
          </div>
          <a href="/todo-manager-app/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: orange, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
            今すぐ使う →
          </a>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: orange, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
          Features
          <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '28px', flexShrink: 0, width: '40px', textAlign: 'center' }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</div>
                <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MATRIX EXPLAINER */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--panel)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: orange, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Matrix
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'すぐやる', sub: '重要 × 緊急', bg: '#FCEBEB', fg: '#A32D2D', desc: '最優先で対応する' },
              { label: '後でやる', sub: '重要 × 非緊急', bg: '#E6F1FB', fg: '#185FA5', desc: '計画を立てて取り組む' },
              { label: '任せる',  sub: '非重要 × 緊急', bg: '#FAEEDA', fg: '#854F0B', desc: '委任して結果を記録' },
              { label: '保留',   sub: '非重要 × 非緊急', bg: '#F1EFE8', fg: '#5F5E5A', desc: '後回しでよいタスク' },
            ].map(q => (
              <div key={q.label} style={{ background: q.bg, padding: '16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: q.fg, marginBottom: '4px' }}>{q.label}</div>
                <div style={{ fontSize: '10px', color: q.fg, opacity: 0.8, marginBottom: '8px' }}>{q.sub}</div>
                <div style={{ fontSize: '12px', color: '#555' }}>{q.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '16px' }}>
          登録不要、すぐ使える。
        </div>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '32px' }}>
          ブラウザを閉じてもデータは残ります。
        </p>
        <a href="/todo-manager-app/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: orange, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
          Task Manager を使う →
        </a>
      </div>
    </>
  )
}
