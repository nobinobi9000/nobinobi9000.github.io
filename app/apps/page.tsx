'use client'
import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { APPS, type App } from '@/lib/apps'

function AppStoryCard({ app }: { app: App }) {
  return (
    <div className="app-story-card">
      <div className="app-story-header">
        <div className="app-story-icon">{app.icon}</div>
        <span className="app-badge">Live</span>
      </div>
      <div>
        <div className="app-story-name">{app.name}</div>
        <div className="app-story-category">{app.category}</div>
      </div>
      {app.story && (
        <blockquote className="app-story-quote">
          「{app.story}」
        </blockquote>
      )}
      <div className="app-tags">
        {app.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="app-story-actions">
        <a href={app.ctaUrl} className="feature-cta" style={{ fontSize: '11px', padding: '10px 20px' }}>
          今すぐ使う
        </a>
        <a href={app.detailUrl} className="app-sub-link">詳細を見る</a>
      </div>
    </div>
  )
}

function AppHeroCard({ app, index }: { app: App; index: number }) {
  const reverse = index % 2 === 1
  return (
    <div className="app-hero-card">
      <div className={`app-hero-inner${reverse ? ' app-hero-reverse' : ''}`}>
        <div className="app-hero-content">
          <span className="feature-card-category">{app.category}</span>
          <div className="app-hero-name">{app.icon} {app.name}</div>
          <div className="app-hero-desc">
            {app.desc.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </div>
          {app.story && (
            <blockquote className="app-hero-quote">
              「{app.story}」
            </blockquote>
          )}
          <div className="app-tags" style={{ marginBottom: '24px' }}>
            {app.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="feature-card-actions">
            <a href={app.ctaUrl} className="feature-cta">今すぐ使う</a>
            <a href={app.detailUrl} className="app-sub-link">詳細を見る →</a>
          </div>
        </div>
        <div className="app-hero-visual">
          <div className="feature-phone" style={{ width: '160px', height: '320px' }}>
            <div className="feature-phone-notch" />
            {app.screenshot
              ? <img src={app.screenshot} alt={app.name} />
              : <div className="feature-phone-placeholder">{app.icon}</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function AppsContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('category')
  const validCats = ['日常・ライフ', 'お金・投資'] as const
  const initFilter = validCats.find(c => c === initialCat) ?? 'すべて'
  const [catFilter, setCatFilter] = useState<'すべて' | '日常・ライフ' | 'お金・投資'>(initFilter)
  const filtered = catFilter === 'すべて' ? APPS : APPS.filter(a => a.category === catFilter)
  const isFiltered = catFilter !== 'すべて'

  return (
    <>
      {/* HERO */}
      <div className="apps-page-hero">
        <div className="apps-page-hero-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <a href="/" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#555', textDecoration: 'none', textTransform: 'uppercase' }}>← nobi-labo</a>
          </div>
          <span style={{ display: 'inline-block', background: 'var(--orange)', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', padding: '4px 10px', marginBottom: '24px' }}>Apps</span>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '16px' }}>
            日常の不便を、<br /><em style={{ fontStyle: 'normal', color: 'var(--orange)' }}>アプリで解決する。</em>
          </h1>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.8, maxWidth: '480px' }}>
            「自分が使いたいから作る」をモットーに、生活の小さな不便を解消するWebアプリを個人開発しています。
            現在 {APPS.length} 本を公開中。
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="apps-page-body">
        {/* Filter */}
        <div className="apps-page-filter">
          {(['すべて', '日常・ライフ', 'お金・投資'] as const).map(cat => (
            <button
              key={cat}
              className={`apps-page-filter-btn${catFilter === cat ? ' active' : ''}`}
              onClick={() => setCatFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* すべて: グリッドサマリー */}
        {!isFiltered && (
          <div className="apps-grid">
            {filtered.map(app => (
              <AppStoryCard key={app.name} app={app} />
            ))}
            <div className="app-story-card" style={{ opacity: 0.4, alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔜</div>
              <div className="app-story-name" style={{ textAlign: 'center' }}>Next App</div>
              <div style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>次のアプリを開発中です。</div>
            </div>
          </div>
        )}

        {/* カテゴリ絞り込み: ヒーローリスト */}
        {isFiltered && (
          <div className="app-hero-list">
            {filtered.map((app, i) => (
              <AppHeroCard key={app.name} app={app} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function AppsPage() {
  return (
    <Suspense fallback={null}>
      <AppsContent />
    </Suspense>
  )
}
