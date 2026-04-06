'use client'
import { useState } from 'react'

type Article = {
  pageId: string
  title: string
  url: string
  category: string | null
  tags: string[]
  tweetText: string
  threadText: string
}

export default function AdminClient({ article }: { article: Article }) {
  const [step, setStep] = useState<'idle' | 'step1done' | 'done'>('idle')
  const [loading, setLoading] = useState(false)

  function openMainTweet() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.tweetText)}`
    window.open(url, '_blank', 'width=600,height=400')
    setStep('step1done')
  }

  function openThreadTweet() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.threadText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  async function markPosted() {
    setLoading(true)
    await fetch('/api/admin/mark-posted', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: article.pageId }),
    })
    setStep('done')
    setLoading(false)
  }

  if (step === 'done') {
    return (
      <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
        <p style={{ color: '#16a34a', fontSize: '0.9rem' }}>✅ 投稿済みにしました：{article.title}</p>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      {/* ヘッダー */}
      <div style={{ padding: '0.75rem 1rem', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#e5e7eb', padding: '2px 8px', borderRadius: '4px' }}>
          {article.category ?? 'カテゴリーなし'}
        </span>
        <p style={{ fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>{article.title}</p>
      </div>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* STEP 1 */}
        <div style={{ border: step === 'idle' ? '2px solid #000' : '1px solid #e5e7eb', borderRadius: '6px', padding: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 'bold', flexShrink: 0,
              background: step === 'step1done' ? '#16a34a' : '#000',
              color: '#fff',
            }}>
              {step === 'step1done' ? '✓' : '1'}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151' }}>本文を投稿（リンクなし）</span>
          </div>
          <pre style={{
            background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px',
            padding: '0.75rem', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            marginBottom: '0.5rem', color: '#374151',
          }}>
            {article.tweetText}
          </pre>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>文字数: {article.tweetText.length}</span>
            <button
              onClick={openMainTweet}
              style={{
                padding: '0.4rem 1rem', background: '#000', color: '#fff',
                border: 'none', borderRadius: '6px', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 'bold',
              }}
            >
              𝕏 で本文を投稿 →
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{
          border: step === 'step1done' ? '2px solid #000' : '1px solid #e5e7eb',
          borderRadius: '6px', padding: '0.75rem',
          opacity: step === 'idle' ? 0.4 : 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 'bold', flexShrink: 0,
              background: '#6b7280', color: '#fff',
            }}>2</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#374151' }}>スレッドにURLを返信する</span>
          </div>
          <pre style={{
            background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px',
            padding: '0.75rem', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            marginBottom: '0.5rem', color: '#374151',
          }}>
            {article.threadText}
          </pre>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>↑ 投稿①に返信する形で投稿してください</span>
            <button
              onClick={openThreadTweet}
              disabled={step === 'idle'}
              style={{
                padding: '0.4rem 1rem', background: step === 'idle' ? '#e5e7eb' : '#1d9bf0',
                color: step === 'idle' ? '#9ca3af' : '#fff',
                border: 'none', borderRadius: '6px',
                cursor: step === 'idle' ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem', fontWeight: 'bold',
              }}
            >
              𝕏 でURLを投稿 →
            </button>
          </div>
        </div>

        {/* 投稿済みにする */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={markPosted}
            disabled={loading || step === 'idle'}
            style={{
              padding: '0.4rem 1rem', background: '#fff',
              color: step === 'idle' ? '#9ca3af' : '#374151',
              border: `1px solid ${step === 'idle' ? '#e5e7eb' : '#d1d5db'}`,
              borderRadius: '6px',
              cursor: step === 'idle' || loading ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
            }}
          >
            {loading ? '処理中...' : '✓ 投稿済みにする'}
          </button>
        </div>
      </div>
    </div>
  )
}
