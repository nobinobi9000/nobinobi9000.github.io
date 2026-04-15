import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kabu Note（カブノート）- nobi-labo',
  description: '日本株ポートフォリオを一元管理するWebダッシュボード。複数証券会社の口座をまたいで資産・損益・配当を可視化。無料・メール登録のみ。',
}

export default function KabuNotePage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)' }}>kabu-note</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📒</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            複数口座の株を、<br /><em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>1画面で把握。</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#aaa', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            証券コード・株数・取得単価を登録するだけ。<br />
            平日16時に株価を自動取得し、損益・評価額・<br />
            配当をダッシュボードにまとめて表示します。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { label: '無料', hi: true },
              { label: '日本株', hi: true },
              { label: '複数口座対応', hi: false },
              { label: '損益管理', hi: false },
              { label: '自動更新', hi: false },
            ].map(b => (
              <span key={b.label} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${b.hi ? 'var(--orange)' : '#2a2a2a'}`, color: b.hi ? 'var(--orange)' : '#666' }}>{b.label}</span>
            ))}
          </div>
          <a href="https://kabu.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
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
            { num: '01', title: '複数証券会社を一元管理', desc: 'SBI・楽天・松井など複数の口座に分散した保有株を1つの画面で確認。証券会社ごとのフィルタで絞り込みもできます。' },
            { num: '02', title: '損益をひと目で把握', desc: '総評価額・トータル損益・損益率をカード形式で表示。各銘柄の現在株価・前日比・含み損益も一覧で確認できます。' },
            { num: '03', title: '資産推移グラフ', desc: '30日・90日・1年の期間を切り替えて、ポートフォリオ全体の評価額推移をグラフで確認。資産の増減が視覚的にわかります。' },
            { num: '04', title: 'セクター構成を可視化', desc: 'ドーナツグラフで業種別の配分を表示。どのセクターに偏っているかをひと目で把握し、リバランスの参考に。' },
            { num: '05', title: '配当カレンダー', desc: '月別の配当受取予測をバーグラフで表示。年間配当額の目安もまとめて確認できます。' },
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
              { n: 1, title: 'メールアドレスで無料登録', desc: 'メールアドレスとパスワードを入力して登録。確認メールのリンクをクリックするだけで使い始められます。', note: '証券口座の連携は不要です' },
              { n: 2, title: '保有銘柄を登録', desc: '証券コード（例：7203）・保有株数・取得単価を入力。証券会社名を追加すると口座ごとに絞り込みできます。' },
              { n: 3, title: '株価は平日16時に自動更新', desc: '毎営業日16時に最新株価を自動取得。手動で更新する必要はありません。' },
              { n: 4, title: 'ダッシュボードで資産を確認', desc: '総評価額・損益・セクター構成・配当をまとめてチェック。複数口座の資産がひとつの画面で把握できます。' },
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

      {/* SCREENSHOTS */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Screenshots
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', gap: '20px', width: 'max-content', padding: '4px 2px 16px' }}>
              {[
                { src: '/screenshots/kabu-note/Summary.png',  label: 'サマリー' },
                { src: '/screenshots/kabu-note/Stocks.png',   label: '個別銘柄' },
                { src: '/screenshots/kabu-note/Sector.png',   label: 'セクター' },
                { src: '/screenshots/kabu-note/Dividend.png', label: '配当' },
                { src: '/screenshots/kabu-note/Settings.png', label: '個別設定' },
                { src: '/screenshots/kabu-note/login.png',    label: 'ログイン' },
              ].map(({ src, label }) => (
                <div key={src} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <div style={{ width: '160px', background: '#1a1a1a', borderRadius: '32px', border: '2px solid #333', padding: '12px 8px', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
                    <div style={{ width: '48px', height: '5px', background: '#2a2a2a', borderRadius: '3px', margin: '0 auto 8px' }} />
                    <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                      <img src={src} alt={label} style={{ width: '100%', display: 'block' }} />
                    </div>
                    <div style={{ width: '32px', height: '4px', background: '#2a2a2a', borderRadius: '2px', margin: '8px auto 0' }} />
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#555', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SPEC */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Spec
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { label: '対象市場', value: '日本株（東証）' },
              { label: '株価更新', value: '平日16時（JST）自動更新' },
              { label: '登録方式', value: 'メールアドレス＋パスワード' },
              { label: '利用料金', value: '無料' },
              { label: 'デバイス', value: 'PC・タブレット・スマホ対応' },
            ].map(r => (
              <div key={r.label} style={{ background: 'var(--panel)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#555', fontWeight: 700, letterSpacing: '0.5px' }}>{r.label}</span>
                <span style={{ fontSize: '13px', color: '#ccc' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            FAQ
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { q: '証券口座との連携は必要ですか？', a: '不要です。証券コード・保有株数・取得単価を手動で入力するだけで使えます。証券会社のAPIや口座連携は一切不要です。' },
              { q: '株価はリアルタイムで更新されますか？', a: '毎営業日16時（JST）に自動更新されます。リアルタイムの株価ではありませんが、引け後の終値ベースで毎日更新されるため、日々の損益確認に十分な精度です。' },
              { q: '米国株や外国株には対応していますか？', a: '現在は日本株（東証上場銘柄）のみ対応しています。米国株対応は今後のバージョンで検討中です。' },
              { q: '登録した銘柄データは消えませんか？', a: 'データはクラウド（Supabase）に保存されているため、ブラウザのキャッシュを消去しても消えません。どのデバイスからでも同じアカウントでログインすればデータを確認できます。' },
              { q: '複数の証券会社を分けて管理できますか？', a: 'はい。銘柄登録時に「証券会社名」を入力しておくと、口座別に絞り込み表示ができます。SBI証券・楽天証券など複数口座をまとめて管理できます。' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--panel)', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--orange)', marginBottom: '8px' }}>Q. {item.q}</div>
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
              複数口座の株を、<br /><em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>1画面で管理しよう。</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '28px', lineHeight: 1.7 }}>
              無料・証券口座の連携不要。<br />
              メールアドレスで登録してすぐ使えます。
            </p>
            <a href="https://kabu.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              今すぐ無料で使う →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
