import type { Metadata } from 'next'
import InstallGuide from '@/components/InstallGuide'

export const metadata: Metadata = {
  title: 'サブスクの断捨離 | 投資換算・断捨離スコアで固定費を見直す',
  description: '契約中のサブスクを登録して支出を可視化。解約した場合にS&P500へ積立投資したら将来いくらになるか計算します。断捨離スコアで優先的に見直すべきサブスクを自動提案。登録不要・完全無料。',
  openGraph: {
    title: 'サブスクの断捨離 | 投資換算・断捨離スコアで固定費を見直す',
    description: '契約中のサブスクを登録して支出を可視化。解約した場合にS&P500へ積立投資したら将来いくらになるか計算。断捨離スコアで優先的に見直すべきサブスクを自動提案。',
    url: 'https://nobi-labo.com/subshari',
    siteName: 'nobi-labo',
    type: 'website',
  },
}

const accent = '#f97316'

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
      {label}
      <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
    </div>
  )
}

function AppMock({ tab }: { tab: 'list' | 'dashboard' | 'invest' | 'danshari' }) {
  return (
    <div style={{
      width: '200px', background: '#111', borderRadius: '18px', padding: '16px 12px 14px',
      display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '340px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px' }}>✂️</span>
        <span style={{ fontSize: '9px', fontWeight: 900, color: '#efefef' }}>サブスクの断捨離</span>
      </div>

      {tab === 'list' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '7px', color: '#555' }}>月額合計</span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: accent }}>¥12,330</span>
          </div>
          {[
            { name: 'Netflix', price: 1490, color: '#f97316' },
            { name: 'Spotify', price: 1080, color: '#a855f7' },
            { name: 'chocoZAP', price: 2980, color: '#22c55e' },
          ].map((item) => (
            <div key={item.name} style={{ background: '#1a1a1a', borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: '8px', fontWeight: 700, color: '#efefef' }}>{item.name}</span>
              <span style={{ fontSize: '8px', color: accent }}>¥{item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'dashboard' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '8px' }}>
              <div style={{ fontSize: '6px', color: '#555', marginBottom: '3px' }}>月額</div>
              <div style={{ fontSize: '11px', fontWeight: 900, color: accent }}>¥12,330</div>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '8px' }}>
              <div style={{ fontSize: '6px', color: '#555', marginBottom: '3px' }}>年額</div>
              <div style={{ fontSize: '11px', fontWeight: 900, color: '#efefef' }}>¥147,960</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', borderRadius: '8px', padding: '10px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'conic-gradient(#f97316 0% 38%, #a855f7 38% 55%, #22c55e 55% 75%, #64748b 75% 100%)', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {[['動画', '#f97316'], ['音楽', '#a855f7'], ['フィット', '#22c55e'], ['ソフト', '#64748b']].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: c }} />
                  <span style={{ fontSize: '7px', color: '#666' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'invest' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '7px', color: '#555', fontWeight: 700 }}>解約したら…</div>
          {[
            { name: 'Netflix', price: 1490, checked: true },
            { name: 'chocoZAP', price: 2980, checked: true },
            { name: 'Spotify', price: 1080, checked: false },
          ].map((item) => (
            <div key={item.name} style={{ background: item.checked ? 'rgba(249,115,22,0.1)' : '#1a1a1a', borderRadius: '8px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.checked ? accent : '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.checked && <span style={{ fontSize: '8px', color: '#fff' }}>✓</span>}
              </div>
              <span style={{ flex: 1, fontSize: '8px', color: item.checked ? '#efefef' : '#555' }}>{item.name}</span>
              <span style={{ fontSize: '8px', color: item.checked ? accent : '#444' }}>¥{item.price.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ background: '#1a1a1a', borderRadius: '8px', padding: '8px 10px', marginTop: '4px' }}>
            <div style={{ fontSize: '6px', color: '#555', marginBottom: '4px' }}>20年後のS&P500運用額</div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: accent }}>約1,137万円</div>
          </div>
        </div>
      )}

      {tab === 'danshari' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ fontSize: '7px', color: '#555', fontWeight: 700, marginBottom: '2px' }}>断捨離スコア（低い順）</div>
          {[
            { name: 'chocoZAP', score: 18, rec: '解約候補', color: '#ef4444' },
            { name: 'WOWOW', score: 32, rec: '要見直し', color: '#eab308' },
            { name: 'Netflix', score: 71, rec: 'キープ', color: '#22c55e' },
          ].map((item) => (
            <div key={item.name} style={{ background: '#1a1a1a', borderRadius: '8px', padding: '7px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#efefef' }}>{item.name}</span>
                <span style={{ fontSize: '7px', fontWeight: 700, color: item.color, background: `${item.color}22`, padding: '1px 5px', borderRadius: '3px' }}>{item.rec}</span>
              </div>
              <div style={{ height: '3px', background: '#2a2a2a', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${item.score}%`, background: item.color, borderRadius: '2px' }} />
              </div>
              <div style={{ fontSize: '7px', color: '#555', marginTop: '2px', textAlign: 'right' }}>{item.score}点</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #1e1e1e', paddingTop: '8px', gap: '2px' }}>
        {[['📋', 'リスト', 'list'], ['📊', '支出', 'dashboard'], ['📈', '投資', 'invest'], ['✂️', '断捨離', 'danshari']].map(([icon, label, id]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '10px' }}>{icon}</span>
            <span style={{ fontSize: '5px', color: id === tab ? accent : '#333', fontWeight: 700 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SubshariPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: accent }}>サブスクの断捨離</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>✂️</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            そのサブスク、<br /><em style={{ fontStyle: 'normal', color: accent }}>解約したら何万円？</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            契約中のサブスクを登録して支出を可視化。解約してS&P500に積立投資したら将来いくらになるかを計算。
            断捨離スコアで「今すぐ見直すべきサブスク」を自動で提案します。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['無料', '登録不要', '投資換算', '断捨離スコア', 'LocalStorage'].map((b, i) => (
              <span key={b} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${i < 3 ? accent : '#2a2a2a'}`, color: i < 3 ? accent : '#666' }}>{b}</span>
            ))}
          </div>
          <a href="https://subshari.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: accent, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
            今すぐ無料で使う →
          </a>
        </div>
      </div>

      {/* ── HOW IT WORKS（4タブモック） ──────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeader label="How it works" />
          <p style={{ fontSize: '12px', color: '#555', marginBottom: '36px' }}>4つのタブでサブスクを徹底管理。登録→可視化→判断→断捨離まで一気通貫で行えます。</p>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', gap: '20px', width: 'max-content', padding: '4px 2px 16px' }}>
              {([
                { tab: 'list' as const, label: 'マイリスト' },
                { tab: 'dashboard' as const, label: 'ダッシュボード' },
                { tab: 'invest' as const, label: '投資換算' },
                { tab: 'danshari' as const, label: '断捨離モード' },
              ]).map(({ tab, label }) => (
                <div key={tab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <div style={{ width: '220px', background: '#1a1a1a', borderRadius: '36px', border: '2px solid #333', padding: '14px 10px', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
                    <div style={{ width: '60px', height: '6px', background: '#2a2a2a', borderRadius: '3px', margin: '0 auto 10px' }} />
                    <div style={{ borderRadius: '22px', overflow: 'hidden' }}>
                      <AppMock tab={tab} />
                    </div>
                    <div style={{ width: '40px', height: '4px', background: '#2a2a2a', borderRadius: '2px', margin: '10px auto 0' }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#555', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ─────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeader label="Features" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              {
                num: '01',
                title: '100種類以上のプランをワンタップで登録',
                desc: 'Netflix・Spotify・パ・リーグTV・radiko・スタディサプリなど日本で契約できる主要サービスをあらかじめ収録。スポーツ・学習・ビジネス・ヘルスケアなど13カテゴリ対応。選ぶだけで月額・カテゴリが自動入力されます。',
              },
              {
                num: '02',
                title: '支出をカテゴリ別ドーナツチャートで可視化',
                desc: '動画配信・音楽・フィットネス・ソフトウェアなど8カテゴリの内訳を純粋SVGのドーナツチャートで表示。「どこにいくら使っているか」が一目で把握できます。',
              },
              {
                num: '03',
                title: '機会費用をS&P500換算でリアルタイム計算',
                desc: '解約を検討しているサブスクを選ぶと、その節約額をS&P500（年利7%）・全世界株・TOPIX・金積立の4つの投資方針で10年後・20年後・30年後の運用額を即計算。「月1,500円の節約が20年で約1,000万円」という投資家的視点を提供します。',
              },
              {
                num: '04',
                title: '断捨離スコアで解約優先順位を自動判定',
                desc: '利用頻度（40%）・コスト効率（40%）・継続期間（20%）の3要素とトレンドペナルティから0〜100点で断捨離スコアを算出。スコアが低いサブスクを自動で「解約候補」「要見直し」「キープ」に分類します。',
              },
              {
                num: '05',
                title: '半年ごとの利用確認と更新前リマインダー',
                desc: '6ヶ月以上利用チェックが未実施のサブスク、または更新1ヶ月前のサブスクを自動検出してチェックを促します。頻度が下がっていると断捨離スコアに反映され、解約の意思決定をサポートします。',
              },
              {
                num: '06',
                title: '解約済みアーカイブで断捨離成果を記録',
                desc: '解約したサブスクは削除せずアーカイブとして保存。「解約後に投資していたら今いくらになっていたか」という過去の機会費用も表示し、断捨離の成果を実感できます。',
              },
            ].map((f) => (
              <div key={f.num} style={{ background: 'var(--panel)', padding: '28px 24px', display: 'grid', gridTemplateColumns: '48px 1fr', gap: '0 20px' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#383838', lineHeight: 1 }}>{f.num}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 900, marginBottom: '8px', color: accent }}>{f.title}</div>
                  <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.8 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 断捨離スコアとは ──────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeader label="断捨離スコアとは" />
          <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.8, marginBottom: '32px' }}>
            感覚ではなくデータで「解約すべきか」を判断するために、4つの要素からスコアを算出します。スコアが低いほど解約優先度が高いサブスクです。
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)', marginBottom: '24px' }}>
            {[
              { label: '利用頻度（40%）', icon: '📊', desc: '毎日＝100点・週数回＝65点・月数回＝30点・ほぼ使わない＝5点。実際の使用状況を正直に入力することでスコアの精度が上がります。' },
              { label: 'コスト効率（40%）', icon: '💰', desc: '同カテゴリのマスターリスト平均と比較して高い料金のサービスほど低スコア。「払っている額に対して使えているか」を数値化します。' },
              { label: '継続期間（20%）', icon: '📅', desc: '365日以上＝100点・30日未満＝20点。長く使っているほど生活に根づいていると判定します。' },
              { label: '利用傾向ペナルティ', icon: '📉', desc: '半年ごとの利用確認で頻度が下がっていると最大−30点のペナルティ。「以前よりも使わなくなっている」サービスを早期に検出します。' },
            ].map((item) => (
              <div key={item.label} style={{ background: 'var(--panel)', padding: '20px 24px', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 16px', alignItems: 'start' }}>
                <span style={{ fontSize: '20px', lineHeight: 1.4 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: accent, marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: '#777', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { range: 'スコア 0〜34', label: '解約候補', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
              { range: 'スコア 35〜59', label: '要見直し', color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
              { range: 'スコア 60〜100', label: 'キープ', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
            ].map((b) => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: b.bg, border: `1px solid ${b.color}33`, padding: '8px 14px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.color, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', color: '#555' }}>{b.range}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: b.color }}>→ {b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW TO USE ───────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeader label="How to use" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              {
                n: 1,
                title: 'サブスクをすべて登録する',
                desc: 'マイリストタブの「＋」ボタンから契約中のサービスを追加します。検索リストから選ぶと月額が自動入力されます。',
                note: 'コツ：クレジットカードや銀行の明細を見ながら入力すると漏れを防げます',
              },
              {
                n: 2,
                title: '利用頻度を正直に選ぶ',
                desc: '毎日・週数回・月数回・ほぼ使わない、の4段階で評価します。断捨離スコアに直結するため、実態に近い頻度を選ぶことが重要です。',
              },
              {
                n: 3,
                title: 'ダッシュボードで支出全体を把握する',
                desc: '月額・年額の合計とカテゴリ別の内訳チャートで、毎月サブスクにいくら使っているかを可視化します。同じカテゴリに複数契約している場合は警告も表示されます。',
              },
              {
                n: 4,
                title: '投資換算タブで機会費用を確認する',
                desc: '解約候補のサブスクにチェックを入れると、その節約額を選択した投資方針で運用した将来価値をリアルタイムで計算します。',
                note: '「月3,000円のジム代を解約してS&P500に20年投資したら約1,800万円」など',
              },
              {
                n: 5,
                title: '断捨離モードでスコアを確認し決断する',
                desc: 'スコアが低い順に並んだリストから解約候補を選択。「解約済みにする」を押すとアーカイブに移行し、断捨離の成果として記録されます。',
              },
            ].map((s) => (
              <div key={s.n} style={{ background: 'var(--panel)', padding: '24px', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 16px' }}>
                <div style={{ width: '28px', height: '28px', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: '#777', lineHeight: 1.7 }}>{s.desc}</div>
                  {s.note && <div style={{ fontSize: '11px', color: accent, background: 'rgba(249,115,22,0.08)', padding: '8px 12px', marginTop: '10px', borderLeft: `2px solid ${accent}` }}>{s.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ホーム画面への追加 ────────────────────────── */}
      <InstallGuide />

      {/* ── 投資計算について ──────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeader label="投資換算の計算方法" />
          <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.8, marginBottom: '24px' }}>
            投資換算は以下の積立将来価値（FV）計算式を使用しています。計算は透明性を重視し、仮定の根拠とともに表示します。
          </p>
          <div style={{ background: 'var(--panel)', border: `1px solid rgba(249,115,22,0.2)`, padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: accent, marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>計算式</div>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#efefef', background: '#0c0c0c', padding: '12px 16px', marginBottom: '12px', lineHeight: 1.8 }}>
              FV = PMT × [((1+r)^n - 1) / r]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                ['PMT', '月間節約額（解約するサブスクの月額合計）'],
                ['r', '月次利率 = (1 + 年利)^(1/12) - 1'],
                ['n', '積立期間（月数）= 年数 × 12'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                  <span style={{ color: accent, fontFamily: 'monospace', minWidth: '32px' }}>{k}</span>
                  <span style={{ color: '#777' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {[
              { name: '積極型（S&P500）', rate: '年7%', note: '米国株式市場の過去長期平均リターンの目安' },
              { name: '分散型（全世界株・オルカン）', rate: '年6%', note: '先進国・新興国を含む全世界株式の目安' },
              { name: '保守型（TOPIX）', rate: '年4%', note: '日本株市場全体の過去長期平均リターンの目安' },
              { name: '安心型（金積立）', rate: '年3%', note: 'ゴールドの過去長期平均リターンの目安' },
            ].map((p) => (
              <div key={p.name} style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ minWidth: '52px', fontSize: '13px', fontWeight: 900, color: accent }}>{p.rate}</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#efefef' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#444', lineHeight: 1.8, padding: '12px 16px', borderLeft: '2px solid #2a2a2a' }}>
            ※ 利率はすべて過去の実績を基にした目安であり、将来の運用成果を保証するものではありません。投資判断はご自身の責任のもとで行ってください。利率は四半期ごとに見直しています。
          </div>
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <SectionHeader label="FAQ" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              {
                q: 'アカウント登録は必要ですか？',
                a: '不要です。すべてのデータはお使いのブラウザのLocalStorageに保存されます。メールアドレスやパスワードの登録は一切不要で、外部サーバーへのデータ送信もありません。',
              },
              {
                q: 'リストにないサービスは追加できますか？',
                a: 'できます。「カスタムで追加」を選ぶと、サービス名・カテゴリ・月額を自由に入力できます。年払いの場合は年額を入力すると月換算額を自動計算します。',
              },
              {
                q: '断捨離スコアはどう計算されますか？',
                a: '利用頻度（40%）・コスト効率（40%）・継続期間（20%）の3要素から0〜100点で算出します。半年ごとの利用確認で頻度が下がっていると最大−30点のペナルティが加わります。スコアが35点未満で「解約候補」と判定されます。',
              },
              {
                q: 'S&P500の年利7%は正確ですか？',
                a: 'S&P500の過去長期平均リターン（インフレ調整前）の目安として7%を使用しています。将来のリターンを保証するものではありません。S&P500・全世界株・TOPIX・金積立の4つの投資方針から選択でき、利率は四半期ごとに見直しています。',
              },
              {
                q: '年払いのサブスクはどう登録しますか？',
                a: '料金入力欄で「年払い」を選択すると、入力した年額を自動で月換算（÷12）してマイリストに保存します。「投資換算」タブでは年払いサービスに「次回更新時から節約」と表示されます。',
              },
              {
                q: 'データのバックアップはできますか？',
                a: 'マイリストタブの「↓」ボタンからJSON形式でバックアップをダウンロードできます。ブラウザのデータを消去するとLocalStorageのデータが失われますので、定期的なバックアップをおすすめします。',
              },
              {
                q: 'スマホのホーム画面に追加できますか？',
                a: 'できます。subshari.nobi-labo.comをSafari（iPhone）またはChrome（Android）で開き、「ホーム画面に追加」を選択してください。アプリのようにアイコンから起動できます。',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--panel)', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: accent, marginBottom: '8px' }}>Q. {item.q}</div>
                <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.8 }}>A. {item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA BOTTOM ───────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>✂️</div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '12px' }}>
              サブスクを断捨離して、<em style={{ fontStyle: 'normal', color: accent }}>資産を育てよう。</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '28px', lineHeight: 1.7 }}>
              登録不要・完全無料。まずは今月のサブスクをすべて入力するところから。<br />
              「なんとなく払い続けている」固定費を、投資家の目線で見直しましょう。
            </p>
            <a href="https://subshari.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: accent, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              無料で断捨離をはじめる →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
