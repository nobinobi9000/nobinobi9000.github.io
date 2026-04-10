export default function InstallGuide({ accentColor = 'var(--orange)' }: { accentColor?: string }) {
  const borderColor = accentColor === 'var(--orange)' ? 'rgba(249,115,22,0.15)' : 'rgba(16,185,129,0.15)'

  const steps = {
    iphone: [
      { n: 1, text: 'Safariでこのページを開く' },
      { n: 2, text: '画面下部の共有ボタン（□↑）をタップ' },
      { n: 3, text: '「ホーム画面に追加」をタップ' },
      { n: 4, text: '右上の「追加」をタップして完了' },
    ],
    android: [
      { n: 1, text: 'Chromeでこのページを開く' },
      { n: 2, text: '右上のメニュー（⋮）をタップ' },
      { n: 3, text: '「ホーム画面に追加」をタップ' },
      { n: 4, text: '「追加」をタップして完了' },
    ],
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: accentColor, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
          ホーム画面への追加方法
          <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
        </div>
        <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.8, marginBottom: '32px' }}>
          アプリのようにホーム画面から直接起動できます。インストール不要・無料でご利用いただけます。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* iPhone */}
          <div style={{ background: 'var(--panel)', border: `1px solid ${borderColor}`, borderRadius: '4px', padding: '24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px' }}>🍎</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--white)' }}>iPhone</span>
              <span style={{ fontSize: '10px', color: '#555' }}>Safari</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {steps.iphone.map(s => (
                <div key={s.n} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                  <span style={{ fontSize: '12px', color: '#888', lineHeight: 1.6, paddingTop: '2px' }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Android */}
          <div style={{ background: 'var(--panel)', border: `1px solid ${borderColor}`, borderRadius: '4px', padding: '24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--white)' }}>Android</span>
              <span style={{ fontSize: '10px', color: '#555' }}>Chrome</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {steps.android.map(s => (
                <div key={s.n} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, color: '#fff', flexShrink: 0 }}>{s.n}</div>
                  <span style={{ fontSize: '12px', color: '#888', lineHeight: 1.6, paddingTop: '2px' }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: '#555', marginTop: '16px' }}>
          ※ iPhone は Safari、Android は Chrome からのみ追加できます。
        </p>
      </div>
    </div>
  )
}
