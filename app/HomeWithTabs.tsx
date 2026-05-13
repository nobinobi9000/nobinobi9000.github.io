'use client'
import React, { useState, useEffect } from 'react'
import { APPS, CATEGORIES, type App } from '@/lib/apps'

function MobileAppCard({ app }: { app: App }) {
  return (
    <div className="app-card live" style={{ cursor: 'default' }}>
      <div className="app-card-top">
        <div className="app-icon">{app.icon}</div>
        <span className="app-badge">Live</span>
      </div>
      <div className="app-name">{app.name}</div>
      <div className="app-desc">
        {app.desc.split('\n').map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </div>
      <div className="app-tags">
        {app.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <a href={app.ctaUrl} className="app-cta">今すぐ使う</a>
        <a href={app.detailUrl} className="app-sub-link">詳細を見る</a>
      </div>
    </div>
  )
}

export default function AppsShowcase() {
  const [featuredIndex, setFeaturedIndex] = useState<number>(() => Math.floor(Math.random() * APPS.length))
  const [catFilter, setCatFilter] = useState<'すべて' | '日常・ライフ' | 'お金・投資'>('すべて')
  const [paused, setPaused] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const [restartSignal, setRestartSignal] = useState(0)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setFeaturedIndex(i => (i + 1) % APPS.length)
      setAnimKey(k => k + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [paused, restartSignal])

  function handleThumbClick(i: number) {
    setFeaturedIndex(i)
    setAnimKey(k => k + 1)
    setRestartSignal(s => s + 1)
  }

  const featuredApp = APPS[featuredIndex]
  const mobileApps = catFilter === 'すべて' ? APPS : APPS.filter(a => a.category === catFilter)

  return (
    <div className="section">
      {/* Section header */}
      <div className="section-header">
        <span className="section-label">Apps</span>
        <div className="section-line" />
      </div>

      <div className="apps-root">

        {/* ── PC LAYOUT ── */}
        <div className="pc-layout">

          {/* Spotlight */}
          <div
            className="spotlight-wrapper"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); setAnimKey(k => k + 1); setRestartSignal(s => s + 1) }}
          >
            <div className="feature-card">
              <div key={featuredIndex} className="feature-card-body spotlight-fade">
                <span className="feature-card-category">{featuredApp.category}</span>
                <div className="feature-card-name">{featuredApp.name}</div>
                <div className="feature-card-desc">
                  {featuredApp.desc.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </div>
                <div className="app-tags">
                  {featuredApp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="feature-card-actions">
                  <a href={featuredApp.ctaUrl} className="feature-cta">今すぐ使う</a>
                  <a href={featuredApp.detailUrl} className="app-sub-link">詳細を見る</a>
                </div>
              </div>
              <div className="feature-phone">
                <div className="feature-phone-notch" />
                <div key={`phone-${featuredIndex}`} className="spotlight-fade" style={{ width: '100%', height: '100%' }}>
                  {featuredApp.screenshot
                    ? <img src={featuredApp.screenshot} alt={featuredApp.name} />
                    : <div className="feature-phone-placeholder">{featuredApp.icon}</div>
                  }
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="spotlight-progress">
              <div
                key={animKey}
                className="spotlight-progress-bar"
                style={{ animationPlayState: paused ? 'paused' : 'running' }}
              />
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="thumb-strip">
            {APPS.map((app, i) => (
              <button
                key={app.name}
                className={`thumb-item${i === featuredIndex ? ' active' : ''}`}
                onClick={() => handleThumbClick(i)}
              >
                <span className="thumb-icon">{app.icon}</span>
                <span className="thumb-name">{app.name}</span>
              </button>
            ))}
            <div className="thumb-item thumb-coming">
              <span className="thumb-icon">🔜</span>
              <span className="thumb-name">Next App</span>
            </div>
          </div>

        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="mobile-layout">
          <div className="cat-filter-nav">
            {(['すべて', '日常・ライフ', 'お金・投資'] as const).map(cat => (
              <button
                key={cat}
                className={`cat-filter-btn${catFilter === cat ? ' active' : ''}`}
                onClick={() => setCatFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="apps">
            {catFilter === 'すべて' ? (
              CATEGORIES.map(cat => (
                <React.Fragment key={cat}>
                  <div className="mobile-category-header">{cat}</div>
                  {APPS.filter(a => a.category === cat).map(app => (
                    <MobileAppCard key={app.name} app={app} />
                  ))}
                </React.Fragment>
              ))
            ) : (
              mobileApps.map(app => <MobileAppCard key={app.name} app={app} />)
            )}
            <div className="app-card coming">
              <div className="app-card-top">
                <div className="app-icon">🔜</div>
                <span className="app-badge soon">Coming Soon</span>
              </div>
              <div className="app-name">Next App</div>
              <div className="app-desc">次のアプリを開発中です。</div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer link to all apps */}
      <div className="apps-footer" style={{ margin: '0 -24px' }}>
        <div className="apps-footer-inner">
          <span className="apps-footer-count">{APPS.length} apps</span>
          <a href="/apps" className="apps-footer-link">全アプリ一覧を見る →</a>
        </div>
      </div>

    </div>
  )
}
