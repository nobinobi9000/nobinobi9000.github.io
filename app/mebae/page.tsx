import type { Metadata } from 'next'
import InstallGuide from '@/components/InstallGuide'

export const metadata: Metadata = {
  title: 'めばえ | 習慣スタックビルダー',
  description: '毎日の習慣に、ちいさな新習慣を積み上げよう。アンカー習慣の直後にスタック習慣を設定するだけ。継続を見える化するミニマルな習慣トラッカー。無料・スマホのホーム画面に追加して使えます。',
}

const accent = '#f97316'

// スマホモック内に表示するオンボーディング画面
function OnboardingMock({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div style={{
      width: '200px',
      background: step === 1 ? 'linear-gradient(160deg,#a7f3d0,#6ee7b7)' : step === 2 ? 'linear-gradient(160deg,#ede9fe,#ddd6fe)' : 'linear-gradient(160deg,#ccfbf1,#a7f3d0)',
      borderRadius: '18px',
      padding: '20px 14px 18px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      minHeight: '340px',
      justifyContent: 'space-between',
    }}>
      {/* スキップ */}
      <div style={{ width: '100%', textAlign: 'right', fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>スキップ</div>

      {/* イラスト */}
      {step === 1 && (
        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          {/* 土台 */}
          <div style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '8px', borderRadius: '50%', background: 'rgba(16,185,129,0.25)' }} />
          {/* 茎 */}
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '36px', borderRadius: '4px', background: '#059669' }} />
          {/* 左葉 */}
          <div style={{ position: 'absolute', bottom: '28px', left: '8px', width: '26px', height: '16px', borderRadius: '50%', background: '#34d399', transform: 'rotate(-25deg)' }} />
          {/* 右葉 */}
          <div style={{ position: 'absolute', bottom: '34px', right: '8px', width: '26px', height: '16px', borderRadius: '50%', background: '#34d399', transform: 'rotate(25deg)' }} />
          {/* 芽先 */}
          <div style={{ position: 'absolute', bottom: '44px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '16px', borderRadius: '50%', background: '#a7f3d0' }} />
          {/* キラキラ */}
          <div style={{ position: 'absolute', top: '6px', left: '4px', width: '5px', height: '5px', borderRadius: '50%', background: 'white', opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: '14px', right: '2px', width: '3px', height: '3px', borderRadius: '50%', background: 'white', opacity: 0.5 }} />
        </div>
      )}
      {step === 2 && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: 'white', borderRadius: '10px', padding: '8px 10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '7px', fontWeight: 700, color: '#10b981', marginBottom: '3px' }}>アンカー習慣</div>
            <div style={{ fontSize: '9px', color: '#374151' }}>☕ 朝コーヒーを飲む</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>↓ その直後に</div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '8px 10px', marginLeft: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '7px', fontWeight: 700, color: '#a78bfa', marginBottom: '3px' }}>スタック習慣</div>
            <div style={{ fontSize: '9px', color: '#374151' }}>📖 5分だけ本を読む</div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[
            { e: '⏱️', t: '2分でできること' },
            { e: '🔗', t: '1アンカーに最大3つ' },
            { e: '🌱', t: '毎日チェックするだけ' },
          ].map(({ e, t }) => (
            <div key={t} style={{ background: 'white', borderRadius: '10px', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '7px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <span style={{ fontSize: '14px' }}>{e}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#374151' }}>{t}</span>
            </div>
          ))}
        </div>
      )}

      {/* テキスト */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '11px', fontWeight: 900, color: step === 1 ? '#065f46' : step === 2 ? '#5b21b6' : '#065f46', marginBottom: '5px' }}>
          {step === 1 ? 'めばえへようこそ 🌱' : step === 2 ? '習慣スタックって何？' : 'コツは「小さく」始めること'}
        </div>
        <div style={{ fontSize: '8px', color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
          {step === 1 ? '小さな習慣を、毎日の生活に\nそっと積み上げるアプリです。' : step === 2 ? 'すでにやっている習慣の直後に\n新しい習慣をくっつける方法。' : '完璧じゃなくていい。\n続けることで芽が育ちます。'}
        </div>
      </div>

      {/* ステップドット */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            width: i === step ? '16px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: i === step ? '#10b981' : 'rgba(255,255,255,0.4)',
            transition: 'width 0.3s',
          }} />
        ))}
      </div>

      {/* ボタン */}
      <div style={{ width: '100%', background: '#10b981', borderRadius: '12px', padding: '8px', textAlign: 'center', fontSize: '9px', fontWeight: 700, color: 'white' }}>
        {step === 3 ? 'さっそくはじめる 🌱' : '次へ'}
      </div>
    </div>
  )
}

export default function MebaePage() {
  return (
    <>
      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '72px 24px 64px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: accent }}>めばえ</span>
          </div>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🌱</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
            習慣の芽を、<br /><em style={{ fontStyle: 'normal', color: accent }}>毎日育てよう。</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.8, maxWidth: '480px', marginBottom: '32px' }}>
            すでにやっている習慣（アンカー）の直後に、<br />
            小さな新習慣を積み上げるだけ。意志力は必要ありません。
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['無料', 'ホーム追加OK', 'Push通知', '習慣形成', '登録不要'].map((b, i) => (
              <span key={b} style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', border: `1px solid ${i < 3 ? accent : '#2a2a2a'}`, color: i < 3 ? accent : '#666' }}>{b}</span>
            ))}
          </div>
          <a href="https://mebae.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: accent, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
            今すぐ無料で使う →
          </a>
        </div>
      </div>

      {/* ONBOARDING SCREENS */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            How it works
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <p style={{ fontSize: '12px', color: '#555', marginBottom: '36px' }}>はじめて開いたとき、3ステップのガイドが表示されます。</p>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', gap: '20px', width: 'max-content', padding: '4px 2px' }}>
              {([1, 2, 3] as const).map((step) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  {/* スマホフレーム */}
                  <div style={{ width: '220px', background: '#1a1a1a', borderRadius: '36px', border: '2px solid #333', padding: '14px 10px', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
                    {/* ノッチ */}
                    <div style={{ width: '60px', height: '6px', background: '#2a2a2a', borderRadius: '3px', margin: '0 auto 10px' }} />
                    <div style={{ borderRadius: '22px', overflow: 'hidden' }}>
                      <OnboardingMock step={step} />
                    </div>
                    {/* ホームバー */}
                    <div style={{ width: '40px', height: '4px', background: '#2a2a2a', borderRadius: '2px', margin: '10px auto 0' }} />
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#555', textTransform: 'uppercase' }}>
                    {step === 1 ? 'ようこそ' : step === 2 ? 'コンセプト' : 'はじめ方'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Features
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { num: '01', title: 'アンカー習慣に紐づける', desc: 'コーヒーを飲む・歯を磨く・シャワーを浴びるなど、すでに毎日やっていることをアンカーに設定。その直後にやる新習慣を最大3つまでスタックできます。' },
              { num: '02', title: '毎日チェックするだけ', desc: '今日やったらチェック。それだけです。チェックするたびに小さな達成感が積み上がっていきます。' },
              { num: '03', title: '今週の達成をドットで確認', desc: '月曜始まりの週間ドット表示で、今週どれだけできたかをひと目で確認。ストリーク継続のモチベーションになります。' },
              { num: '04', title: '統計で振り返る', desc: '習慣別ストリーク・週別達成率・曜日別達成率を自動集計。どの曜日が続きやすいかが一目でわかります。' },
              { num: '05', title: 'Push通知でリマインド', desc: 'アンカー習慣の時刻に合わせて通知を設定できます。スマホのホーム画面に追加するとより確実に受け取れます。' },
            ].map(f => (
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

      {/* HOW TO USE */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            How to use
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { n: 1, title: 'アプリを開く（登録不要）', desc: 'ホーム画面に追加するだけで使えます。アカウント登録は不要。データはすべてお使いの端末に保存されます。' },
              { n: 2, title: 'アンカー習慣を登録する', desc: '毎日すでにやっていることを1つ選びます。「朝コーヒーを飲む」「歯を磨く」など、小さくてOK。', note: 'コツ：すでに100%できていることを選ぼう' },
              { n: 3, title: 'スタック習慣を追加する', desc: 'アンカーの直後にやる新習慣を設定します。2分以内でできることから始めるのがポイント。', note: '例：コーヒーを飲んだら → 日記を1行書く' },
              { n: 4, title: '毎日チェックするだけ', desc: 'やったらチェック。1週間続けると統計に変化が出てきます。完璧じゃなくても大丈夫。' },
            ].map(s => (
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

      {/* SCREENSHOTS */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            Screenshots
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ display: 'flex', gap: '20px', width: 'max-content', padding: '4px 2px 16px' }}>
              {[
                { src: '/screenshots/mebae/top.png',        label: 'Top' },
                { src: '/screenshots/mebae/statistics.png', label: '統計' },
                { src: '/screenshots/mebae/stack.png',      label: 'スタック追加' },
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
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
            FAQ
            <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { q: 'アカウント登録は必要ですか？', a: '不要です。ホーム画面に追加するだけですぐに使えます。データはすべてお使いの端末（ブラウザのLocalStorage）に保存されます。メールアドレスやパスワードの登録は一切不要です。' },
              { q: 'アンカー習慣とは何ですか？', a: '「歯を磨く」「朝コーヒーを飲む」「シャワーを浴びる」など、すでに毎日100%できていることです。この習慣の直後に新しい習慣を積み上げることで、意志力に頼らず習慣を定着させやすくなります。' },
              { q: 'スタック習慣は何個まで登録できますか？', a: '1つのアンカー習慣に対して、スタック習慣を最大3つまで登録できます。まずは1つから始めて、慣れてきたら少しずつ追加するのがおすすめです。' },
              { q: 'Push通知はどうやって設定しますか？', a: '習慣の詳細画面から通知時刻を設定できます。iOSをお使いの場合は、ホーム画面に追加したアプリとして開いてから設定してください（iOS 16.4以降対応）。通常のSafariブラウザからは通知を受け取れません。' },
              { q: 'データのバックアップはできますか？', a: '現在はバックアップ・エクスポート機能に対応していません。データはお使いの端末のLocalStorageに保存されているため、ブラウザのデータを消去したりアプリを削除すると、登録した習慣データも削除されます。ご注意ください。' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--panel)', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: accent, marginBottom: '8px' }}>Q. {item.q}</div>
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
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🌱</div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '12px' }}>
              小さな芽が、<em style={{ fontStyle: 'normal', color: accent }}>大きな習慣</em>になる。
            </h2>
            <p style={{ fontSize: '13px', color: '#777', marginBottom: '28px', lineHeight: 1.7 }}>
              登録不要・完全無料。今日からすぐ始められます。<br />
              まずは1つのアンカーに、1つの習慣を積み上げるところから。
            </p>
            <a href="https://mebae.nobi-labo.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: accent, color: '#fff', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', padding: '14px 28px' }}>
              無料で始める →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
