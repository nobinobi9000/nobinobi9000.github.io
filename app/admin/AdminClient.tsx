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
      <div style={{ background: 'var(--panel)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#10b981', fontSize: '16px' }}>✅</span>
        <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 700 }}>投稿済みにしました：{article.title}</span>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--panel)' }}>
      {/* ヘッダー */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {article.category && (
          <span style={{ fontSize: '10px', color: 'var(--orange)', background: 'rgba(249,115,22,0.1)', padding: '2px 8px', letterSpacing: '1px', fontWeight: 700, textTransform: 'uppercase' }}>
            {article.category}
          </span>
        )}
        <p style={{ fontWeight: 700, fontSize: '13px', margin: 0, color: 'var(--white)' }}>{article.title}</p>
      </div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* STEP 1 */}
        <div style={{ border: `1px solid ${step === 'idle' ? 'var(--orange)' : '#222'}`, padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 'bold', flexShrink: 0,
              background: step === 'step1done' ? '#10b981' : 'var(--orange)',
              color: '#fff',
            }}>
              {step === 'step1done' ? '✓' : '1'}
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase' }}>本文を投稿（リンクなし）</span>
          </div>
          <pre style={{
            background: '#111', border: '1px solid #1a1a1a',
            padding: '12px', fontSize: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            marginBottom: '10px', color: '#bbb', borderRadius: '2px',
          }}>
            {article.tweetText}
          </pre>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: '#444' }}>文字数: {article.tweetText.length}</span>
            <button
              onClick={openMainTweet}
              style={{
                padding: '6px 16px', background: '#000', color: '#fff',
                border: '1px solid #333', cursor: 'pointer',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
              }}
            >
              𝕏 で本文を投稿 →
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div style={{
          border: `1px solid ${step === 'step1done' ? 'var(--orange)' : '#1a1a1a'}`,
          padding: '14px',
          opacity: step === 'idle' ? 0.35 : 1,
          transition: 'opacity 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{
              width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 'bold', flexShrink: 0,
              background: '#333', color: '#aaa',
            }}>2</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase' }}>スレッドにURLを返信</span>
          </div>
          <pre style={{
            background: '#111', border: '1px solid #1a1a1a',
            padding: '12px', fontSize: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            marginBottom: '10px', color: '#bbb', borderRadius: '2px',
          }}>
            {article.threadText}
          </pre>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: '#444' }}>↑ 投稿①に返信する形で投稿してください</span>
            <button
              onClick={openThreadTweet}
              disabled={step === 'idle'}
              style={{
                padding: '6px 16px',
                background: step === 'step1done' ? '#1d9bf0' : '#111',
                color: step === 'step1done' ? '#fff' : '#444',
                border: `1px solid ${step === 'step1done' ? '#1d9bf0' : '#222'}`,
                cursor: step === 'idle' ? 'not-allowed' : 'pointer',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
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
              padding: '6px 16px',
              background: 'transparent',
              color: step === 'idle' ? '#333' : '#aaa',
              border: `1px solid ${step === 'idle' ? '#1a1a1a' : '#444'}`,
              cursor: step === 'idle' || loading ? 'not-allowed' : 'pointer',
              fontSize: '12px', letterSpacing: '0.5px',
            }}
          >
            {loading ? '処理中...' : '✓ 投稿済みにする'}
          </button>
        </div>
      </div>
    </div>
  )
}
