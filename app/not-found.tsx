import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <div style={{
          fontSize: '96px',
          fontWeight: 900,
          color: 'var(--border)',
          letterSpacing: '-4px',
          lineHeight: 1,
          marginBottom: '24px',
        }}>
          404
        </div>

        <h1 style={{
          fontSize: 'clamp(20px, 5vw, 28px)',
          fontWeight: 900,
          letterSpacing: '-0.5px',
          marginBottom: '16px',
          color: 'var(--white)',
        }}>
          ページが見つかりません
        </h1>

        <p style={{
          fontSize: '14px',
          color: 'var(--muted)',
          lineHeight: 1.8,
          marginBottom: '40px',
        }}>
          お探しのページは削除されたか、<br />
          URLが変更された可能性があります。
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--orange)',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '14px 28px',
          }}
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  )
}
