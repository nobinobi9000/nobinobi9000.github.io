import type { Metadata } from 'next'
import InstallGuide from '@/components/InstallGuide'

export const metadata: Metadata = {
  title: 'SoroSoro | 日用品ストックトラッカー',
  description: '日用品の消費ペースを記録して、切れる前に通知。楽天・Amazonへのワンタップ購入リンク付き。スマホのホーム画面に追加して使えます。',
}

export default function SoroSoroPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--orange)' }}>SoroSoro</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🛒</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            切れる前に、<br /><em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>そろそろ買おう。</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            日用品の消費ペースを自動で記録。<br />
            在庫が少なくなると通知で知らせてくれる、生活ストックトラッカー。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['無料', 'ホーム追加OK', 'Push通知', '楽天連携', 'Amazon連携', 'バーコード対応'].map((b, i) => (
              <span key={b} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${i < 3 ? 'var(--orange)' : '#2a2a2a'}`, color: i < 3 ? 'var(--orange)' : '#666' }}>{b}</span>
            ))}
          </div>
          <a href="https://sorosoro.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
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
            { num: '01', title: '消費ペース自動記録', desc: '開封日・使い切り日を記録するだけで、消費ペースを自動計算。次の補充タイミングを残り日数で表示します。' },
            { num: '02', title: '在庫切れ前にPush通知', desc: '設定した日数前になると、まとめて1日1回のPush通知でお知らせ。通知疲れなく、買い忘れを防ぎます。' },
            { num: '03', title: '楽天・Amazonでワンタップ購入', desc: '各アイテムから楽天・Amazonの購入ページへ直接ジャンプ。アフィリエイト連携でいつも最短経路で買い物できます。' },
            { num: '04', title: 'バーコードで商品登録', desc: 'Chrome搭載のバーコードスキャン機能でJANコードを読み取り、楽天APIで商品を自動検索。商品名・画像・URLを一括取得できます。' },
            { num: '05', title: 'カテゴリ分類＆検索', desc: '日用品・洗剤・食品・スキンケアなどカテゴリで管理。検索・並び替えで目当てのアイテムをすぐに見つけられます。' },
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
              { n: 1, title: 'アイテムを登録する', desc: '商品名を手入力するか、バーコードスキャン・楽天検索・Amazon URLから商品情報を自動取得して登録。', note: '例：シャンプーのバーコードをスキャン → 商品名・画像・購入URLが自動入力' },
              { n: 2, title: '開封・使い切りを記録する', desc: '新しいものを開けたら「開封」、使い切ったら「使い切り」をタップ。これだけで消費ペースが記録されます。' },
              { n: 3, title: '通知をONにする', desc: '設定パネルから「通知を許可する」をタップ。在庫が少なくなると1日1回まとめてお知らせします。' },
              { n: 4, title: '通知が来たら購入する', desc: '通知が届いたらアプリを開いて残り日数を確認。楽天・Amazonボタンで即購入できます。' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--panel)', padding: '24px', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '0 16px' }}>
                <div style={{ width: '28px', height: '28px', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: '#777', lineHeight: 1.7 }}>{s.desc}</div>
                  {'note' in s && s.note && <div style={{ fontSize: '11px', color: 'var(--orange)', background: 'rgba(249,115,22,0.08)', padding: '8px 12px', marginTop: '10px', borderLeft: '2px solid var(--orange)' }}>{s.note}</div>}
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
                { src: '/screenshots/sorosoro/top.png', label: 'Top' },
                { src: '/screenshots/sorosoro/add.png', label: 'アイテム追加' },
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

      <InstallGuide />

      {/* FAQ */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            FAQ
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { q: 'アカウント登録は必要ですか？', a: '不要です。アプリを開くだけですぐに使えます。データはお使いの端末（ブラウザのLocalStorage）に保存されるため、メールアドレスやパスワードの登録は一切不要です。' },
              { q: 'バーコードスキャンはどのブラウザで使えますか？', a: 'バーコードスキャン機能はChrome（デスクトップ・Android）でのみ動作します。iOSのSafariやその他のブラウザでは利用できません。スキャンが使えない環境では、商品名を手入力するか楽天検索・Amazon URLからの登録をお使いください。' },
              { q: 'iPhoneで通知が届きません', a: 'iOSのPush通知はホーム画面に追加したSafariアプリでのみ動作します（iOS 16.4以降対応）。ホーム画面に追加してからアプリを開き、設定パネルの「通知を許可する」を押してください。通常のSafariブラウザからは通知を受け取れません。' },
              { q: '機種変更したらデータは引き継げますか？', a: 'データはお使いの端末のLocalStorageに保存されているため、現時点では機種変更時のデータ引き継ぎには対応していません。新しい端末では最初から登録し直す必要があります。' },
              { q: '楽天・Amazonリンクはアフィリエイトですか？', a: 'nobi-laboのアフィリエイトリンクを使用しています。リンク先での購入に追加費用は一切発生しません。アフィリエイト収益はアプリの維持・改善に充てています。' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--panel)', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--orange)', marginBottom: '8px' }}>Q. {item.q}</div>
                <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.8 }}>A. {item.a}</div>
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
              日用品を<em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>切らさない</em>生活へ。
            </h2>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '28px', lineHeight: 1.7 }}>
              登録不要・無料で使えます。<br />ホーム画面に追加してすぐ使い始めてください。
            </p>
            <a href="https://sorosoro.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              無料で始める →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
