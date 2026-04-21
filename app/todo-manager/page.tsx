import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Manager - nobi-labo',
  description: '重要度×緊急度の2軸でタスクを自動分類するToDo管理ツール。アイゼンハワーマトリクスで「すぐやる・後でやる・任せる・保留」に即振り分け。登録不要・無料。',
}

const orange = '#f97316'

export default function TaskManagerPage() {
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
            {[
              { label: '無料', hi: true },
              { label: '登録不要', hi: true },
              { label: '優先度管理', hi: false },
              { label: 'ブラウザ保存', hi: false },
            ].map(b => (
              <span key={b.label} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${b.hi ? orange : '#2a2a2a'}`, color: b.hi ? orange : '#666' }}>{b.label}</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          {[
            {
              num: '01',
              title: '4象限マトリクスで即振り分け',
              desc: '重要度と緊急度の組み合わせでタスクを追加した瞬間に「すぐやる・後でやる・任せる・保留」の4象限へ自動配置。何から手をつけるべきか、考える時間ゼロ。',
            },
            {
              num: '02',
              title: 'モダンダッシュボードで全体を把握',
              desc: 'KPIタイル・カテゴリ別バーチャート・週次完了トレンド・象限別ドーナツグラフを1画面に集約。タスクの偏りや消化ペースをひと目で確認できる。',
            },
            {
              num: '03',
              title: '委任フローで「任せた」を記録',
              desc: '「任せる」象限のタスクは完了時に「委任して完了」または「自分でやった」を選んで記録。実態に即した進捗管理ができ、後から振り返りやすい。',
            },
            {
              num: '04',
              title: '登録不要・ブラウザに自動保存',
              desc: 'アカウント作成は一切不要。データはブラウザのlocalStorageに自動保存されるため、ページを閉じても次回そのまま続きから使える。',
            },
          ].map(f => (
            <div key={f.num} style={{ background: 'var(--panel)', padding: '28px 24px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0 20px' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#383838', lineHeight: 1 }}>{f.num}</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 900, marginBottom: '8px', color: orange }}>{f.title}</div>
                <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.8 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MATRIX EXPLAINER */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--panel)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: orange, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Eisenhower Matrix
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.8, marginBottom: '24px' }}>
            第34代アメリカ大統領ドワイト・D・アイゼンハワーが実践したとされる優先度管理の手法。「重要かどうか」と「緊急かどうか」の2軸で全タスクを4つに分類し、力を注ぐべき仕事を明確にします。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { label: 'すぐやる', sub: '重要 × 緊急', bg: '#FCEBEB', fg: '#A32D2D', desc: '最優先。今すぐ対応する。締め切りのある重要案件など。' },
              { label: '後でやる', sub: '重要 × 非緊急', bg: '#E6F1FB', fg: '#185FA5', desc: '計画を立てて取り組む。スキルアップや戦略など長期的に重要なもの。' },
              { label: '任せる',   sub: '非重要 × 緊急', bg: '#FAEEDA', fg: '#854F0B', desc: '委任が正解。自分でやる必要はないが、放置もできないもの。' },
              { label: '保留',    sub: '非重要 × 非緊急', bg: '#F1EFE8', fg: '#5F5E5A', desc: '後回しでOK。やらなくても実害がないタスク。定期的に見直して削除も検討。' },
            ].map(q => (
              <div key={q.label} style={{ background: q.bg, padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: q.fg, marginBottom: '4px' }}>{q.label}</div>
                <div style={{ fontSize: '10px', color: q.fg, opacity: 0.8, marginBottom: '10px', letterSpacing: '0.5px' }}>{q.sub}</div>
                <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.7 }}>{q.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW TO USE */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: orange, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            How to use
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              {
                n: 1,
                title: 'アプリを開く',
                desc: '登録不要。ブラウザで「今すぐ使う」ボタンを押すだけ。スマートフォン・PC両対応。',
              },
              {
                n: 2,
                title: 'タスク名・カテゴリ・期限を入力する',
                desc: '画面上部の入力フォームからタスクを追加。カテゴリは「仕事 / 個人 / 学習 / その他 / カスタム」から選択。',
                note: 'カスタムを選ぶと自由入力欄が出現。プロジェクト名など任意の名前を設定できます。',
              },
              {
                n: 3,
                title: '重要度・緊急度を選んで追加',
                desc: '「重要」「緊急」の2つのチェックボックスをON/OFFするだけ。追加した瞬間に正しい象限へ自動配置されます。',
              },
              {
                n: 4,
                title: 'タスクを完了させる',
                desc: '各タスクのチェックボックスをクリックで完了。「任せる」象限のタスクは「委任して完了」か「自分でやった」を選んで記録できます。',
              },
              {
                n: 5,
                title: 'ダッシュボードで進捗を確認',
                desc: '画面上部のタブで「ダッシュボード」に切り替えると、完了率・週次トレンド・カテゴリ別内訳を一覧表示。タスクの偏りをすぐに把握できます。',
              },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--panel)', padding: '24px', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 16px' }}>
                <div style={{ width: '28px', height: '28px', background: orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.7 }}>{s.desc}</div>
                  {s.note && <div style={{ fontSize: '11px', color: orange, background: 'rgba(249,115,22,0.08)', padding: '8px 12px', marginTop: '10px', borderLeft: `2px solid ${orange}` }}>{s.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DASHBOARD HIGHLIGHT */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--panel)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: orange, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Dashboard
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ borderLeft: `3px solid ${orange}`, padding: '24px', background: 'rgba(249,115,22,0.04)' }}>
            <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.9 }}>
              ダッシュボードには4種類の分析ビューが揃っています。
              <br /><br />
              <span style={{ color: '#eee', fontWeight: 700 }}>KPIタイル</span>——総タスク数・完了率・すぐやる数・期限超過数をひと目で把握。<br />
              <span style={{ color: '#eee', fontWeight: 700 }}>ドーナツグラフ</span>——4象限の内訳を割合で可視化。どの象限に偏っているかがわかる。<br />
              <span style={{ color: '#eee', fontWeight: 700 }}>カテゴリ別バーチャート</span>——カテゴリごとの未完了タスク数を棒グラフで表示。<br />
              <span style={{ color: '#eee', fontWeight: 700 }}>週次完了トレンド</span>——過去7日間の完了数の推移をエリアチャートで確認。
              <br /><br />
              すべてライブラリなし・インラインSVGで描画。外部依存ゼロで高速に動作します。
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: orange, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            FAQ
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              {
                q: 'アカウント登録は必要ですか？',
                a: '不要です。ブラウザでURLを開くだけで、登録なしにすぐ使えます。',
              },
              {
                q: 'データはどこに保存されますか？',
                a: 'ブラウザのlocalStorageに保存されます。サーバーには一切送信されません。データはブラウザを閉じても残りますが、ブラウザのデータをクリアすると削除されます。',
              },
              {
                q: 'スマートフォンで使えますか？',
                a: 'はい。スマートフォン・タブレット・PCのすべてに対応しています。スマホではタスクが上から「すぐやる→後でやる→任せる→保留」の順に縦並びで表示されます。',
              },
              {
                q: '複数デバイスで同期できますか？',
                a: 'localStorageはデバイス・ブラウザごとに独立しているため、現在はデバイス間の同期に対応していません。データのエクスポート/インポート機能は将来のバージョンで検討中です。',
              },
              {
                q: '「任せる」象限の委任記録は何に使いますか？',
                a: '「委任して完了」か「自分でやった」を記録することで、実態に即した進捗管理ができます。振り返り時に「本当に人に任せられているか」を確認するのに役立ちます。',
              },
              {
                q: 'カスタムカテゴリは何件作れますか？',
                a: 'タスクごとに1件のカスタムカテゴリを自由に設定できます。プロジェクト名やクライアント名など、固定カテゴリ（仕事・個人・学習・その他）に当てはまらないものに使ってください。',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--panel)', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: orange, marginBottom: '8px' }}>Q. {item.q}</div>
                <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.8 }}>A. {item.a}</div>
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
              優先順位を、<em style={{ fontStyle: 'normal', color: orange }}>迷わず決めよう。</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '28px', lineHeight: 1.7 }}>
              無料・登録不要。ブラウザで今すぐ使えます。<br />
              タスクが増えるほど、マトリクスの力を実感できます。
            </p>
            <a href="/todo-manager-app/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: orange, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              Task Manager を使う →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
