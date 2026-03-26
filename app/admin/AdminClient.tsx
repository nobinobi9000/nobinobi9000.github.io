'use client'
import { useState } from 'react'

type Article = {
  pageId: string
  title: string
  url: string
  category: string | null
  tags: string[]
  tweetText: string
}

export default function AdminClient({ article }: { article: Article }) {
  const [posted, setPosted] = useState(false)
  const [loading, setLoading] = useState(false)

  function openTweet() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.tweetText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  async function markPosted() {
    setLoading(true)
    await fetch('/api/admin/mark-posted', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId: article.pageId }),
    })
    setPosted(true)
    setLoading(false)
  }

  if (posted) {
    return (
      <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
        <p style={{ color: '#16a34a', fontSize: '0.9rem' }}>✅ 投稿済みにしました：{article.title}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>
          {article.category ?? 'カテゴリーなし'}
        </span>
      </div>
      <p style={{ fontWeight: 'bold', marginBottom: '0.75rem' }}>{article.title}</p>
      <pre style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '0.75rem',
        fontSize: '0.8rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        marginBottom: '0.75rem',
        color: '#374151',
      }}>
        {article.tweetText}
      </pre>
      <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
        文字数: {article.tweetText.length}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={openTweet}
          style={{
            padding: '0.4rem 1rem',
            background: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold',
          }}
        >
          𝕏 に投稿する
        </button>
        <button
          onClick={markPosted}
          disabled={loading}
          style={{
            padding: '0.4rem 1rem',
            background: '#fff',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          {loading ? '処理中...' : '投稿済みにする'}
        </button>
      </div>
    </div>
  )
}
