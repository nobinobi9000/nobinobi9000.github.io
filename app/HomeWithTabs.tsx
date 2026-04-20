'use client'
import React, { useState, useEffect } from 'react'

type Post = {
  id: string
  title: string
  publishedAt: string | null
  category: string | null
  tags: string[]
}

type App = {
  icon: string
  name: string
  desc: string
  tags: string[]
  ctaUrl: string
  detailUrl: string
  category: '日常・ライフ' | 'お金・投資'
  screenshot?: string
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const APPS: App[] = [
  {
    icon: '📚',
    name: 'comic-checker',
    desc: 'マンガの新刊を自動チェック。\n発売14日前・7日前・当日にPush通知でお知らせ。\nスマホのホーム画面に追加してすぐ使える。',
    tags: ['ホーム追加OK', '無料', 'Push通知', '楽天連携'],
    ctaUrl: 'https://comic.nobi-labo.com',
    detailUrl: '/comic-checker',
    category: '日常・ライフ',
    screenshot: '/screenshots/comic-mylist-grid.png',
  },
  {
    icon: '✂️',
    name: 'サブスクの断捨離',
    desc: 'サブスク支出を可視化して断捨離。\n解約してS&P500に投資したら将来いくらに？\n断捨離スコアで見直すべきサブスクを提案。',
    tags: ['無料', '登録不要', '投資換算', '断捨離スコア'],
    ctaUrl: 'https://subshari.nobi-labo.com',
    detailUrl: '/subshari',
    category: 'お金・投資',
  },
  {
    icon: '🧮',
    name: '確定申告・還付判定シミュレーター',
    desc: '所得税・住民税を簡単に計算。\n収入を入力するだけで手取り額・還付額をすぐ確認できる。',
    tags: ['無料', '登録不要', '令和7年版'],
    ctaUrl: '/tax-simulator/',
    detailUrl: '/tax-simulator.html',
    category: 'お金・投資',
    screenshot: '/screenshots/tax-simulator.png',
  },
  {
    icon: '🧊',
    name: 'ねこおじさんタイマー',
    desc: '会議を凍らせる、愛すべきおやじ。\nカウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。',
    tags: ['会議タイマー', 'おやじギャグ', 'AI生成', '無料'],
    ctaUrl: '/meeting-timer',
    detailUrl: '/nekoojiisan-timer',
    category: '日常・ライフ',
    screenshot: '/screenshots/nekoojiisan-timer.png',
  },
  {
    icon: '📊',
    name: '日本株スクリーナー',
    desc: 'テクニカル指標×AIスコアリングで3,700銘柄を毎日自動スキャン。\n上昇シグナル銘柄をDiscordへ毎日夕方配信。',
    tags: ['無料', 'Discord連携', 'テクニカル分析', '毎日夕方'],
    ctaUrl: '/japan-stock-screener/',
    detailUrl: '/japan-stock-screener.html',
    category: 'お金・投資',
    screenshot: '/screenshots/japan-stock-screener.png',
  },
  {
    icon: '🗺️',
    name: 'QUESTLOG',
    desc: '積みゲーを冒険の地図として前向きに管理するゲームバックログアプリ。\nBacklog→Playing→Clearedでプレイ状況を記録。\nPush通知で新作リリース情報もお届け。',
    tags: ['ホーム追加OK', '無料', 'Push通知', 'ゲーム管理'],
    ctaUrl: 'https://gamelog.nobi-labo.com',
    detailUrl: '/questlog',
    category: '日常・ライフ',
    screenshot: '/screenshots/questlog/Top.png',
  },
  {
    icon: '📒',
    name: 'Kabu Note（カブノート）',
    desc: '複数証券会社の保有株を一元管理するポートフォリオダッシュボード。\n証券コード・株数・取得単価を登録するだけで損益・評価額を自動計算。\n平日16時に株価を自動更新。',
    tags: ['無料', '日本株', '複数口座対応', '損益管理'],
    ctaUrl: 'https://kabu.nobi-labo.com',
    detailUrl: '/kabu-note',
    category: 'お金・投資',
    screenshot: '/screenshots/kabu-note.png',
  },
  {
    icon: '🌱',
    name: 'めばえ',
    desc: '毎日の習慣にちいさな新習慣を積み上げる。\nアンカー習慣の直後にスタック習慣を設定するだけ。\n継続を見える化するミニマルな習慣トラッカー。',
    tags: ['ホーム追加OK', '無料', 'Push通知', '習慣形成'],
    ctaUrl: 'https://mebae.nobi-labo.com',
    detailUrl: '/mebae',
    category: '日常・ライフ',
    screenshot: '/screenshots/mebae.png',
  },
  {
    icon: '📋',
    name: 'Task Manager',
    desc: '重要度×緊急度の2軸でタスクを自動分類。\nアイゼンハワーマトリクスで「すぐやる・後でやる・任せる・保留」に即振り分け。\n登録不要、データはブラウザに保存。',
    tags: ['無料', '登録不要', '優先度管理', 'ブラウザ保存'],
    ctaUrl: '/todo-manager-app/',
    detailUrl: '/todo-manager',
    category: '日常・ライフ',
  },
  {
    icon: '🛒',
    name: 'SoroSoro',
    desc: '日用品の消費ペースを記録して、切れる前に通知。\nバーコードスキャン・楽天検索で商品を簡単登録。\n楽天・Amazonへのワンタップ購入リンク付き。',
    tags: ['ホーム追加OK', '無料', 'Push通知', '楽天連携'],
    ctaUrl: 'https://sorosoro.nobi-labo.com',
    detailUrl: '/sorosoro',
    category: '日常・ライフ',
  },
]

const CATEGORIES = ['日常・ライフ', 'お金・投資'] as const

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

export default function HomeWithTabs({ posts }: { posts: Post[] }) {
  const [tab, setTab] = useState<'apps' | 'blog'>('apps')
  const [featuredIndex] = useState<number>(() => Math.floor(Math.random() * APPS.length))
  const [catFilter, setCatFilter] = useState<'すべて' | '日常・ライフ' | 'お金・投資'>('すべて')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('tab') === 'blog') setTab('blog')
  }, [])

  function handleTab(t: 'apps' | 'blog') {
    setTab(t)
    const url = new URL(window.location.href)
    if (t === 'blog') url.searchParams.set('tab', 'blog')
    else url.searchParams.delete('tab')
    window.history.replaceState({}, '', url.toString())
  }

  const featuredApp = APPS[featuredIndex]
  const mobileApps = catFilter === 'すべて' ? APPS : APPS.filter(a => a.category === catFilter)
  const groupedApps = CATEGORIES.map(cat => ({ label: cat, apps: APPS.filter(a => a.category === cat) }))

  return (
    <div className="section">
      {/* TAB NAV */}
      <div className="tab-nav">
        <button className={`tab-btn${tab === 'apps' ? ' active' : ''}`} onClick={() => handleTab('apps')}>Apps</button>
        <button className={`tab-btn${tab === 'blog' ? ' active' : ''}`} onClick={() => handleTab('blog')}>Blog</button>
      </div>

      {/* APPS */}
      {tab === 'apps' && (
        <div className="apps-root">

          {/* ── PC LAYOUT ── */}
          <div className="pc-layout">
            {/* Feature card */}
            <div className="feature-card">
              <div className="feature-card-body">
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
                {featuredApp.screenshot
                  ? <img src={featuredApp.screenshot} alt={featuredApp.name} />
                  : <div className="feature-phone-placeholder">{featuredApp.icon}</div>
                }
              </div>
            </div>

            {/* Carousel — カテゴリごとに独立した行 */}
            <div className="carousel-rows">
              {groupedApps.map(group => (
                <div key={group.label} className="carousel-row">
                  <div className="category-label">{group.label}</div>
                  <div className="carousel-row-track">
                    {group.apps.map(app => (
                      <div key={app.name} className="carousel-card">
                        <div className="carousel-card-top">
                          <span className="carousel-icon">{app.icon}</span>
                          <span className="app-badge">Live</span>
                        </div>
                        <div className="carousel-name">{app.name}</div>
                        <div className="app-tags" style={{ marginBottom: '12px' }}>
                          {app.tags.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: 'auto' }}>
                          <a href={app.ctaUrl} className="carousel-cta">使う →</a>
                          <a href={app.detailUrl} className="app-sub-link" style={{ fontSize: '9px' }}>詳細</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Next App — 最下段 */}
            <div className="next-app-row">
              <span className="next-app-icon">🔜</span>
              <div className="next-app-body">
                <div className="next-app-name">Next App</div>
                <div className="next-app-desc">次のアプリを開発中</div>
              </div>
              <span className="app-badge soon">Coming Soon</span>
            </div>
          </div>

          {/* ── MOBILE LAYOUT ── */}
          <div className="mobile-layout">
            {/* Category filter */}
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

            {/* App list */}
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
      )}

      {/* BLOG */}
      {tab === 'blog' && (
        <>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#555' }}>
              <p style={{ fontSize: '32px', marginBottom: '16px' }}>📝</p>
              <p style={{ fontSize: '14px' }}>記事を準備中です。しばらくお待ちください。</p>
            </div>
          ) : (
            <>
              <div className="section-header">
                <span className="section-label">Articles</span>
                <div className="section-line"></div>
                <span style={{ fontSize: '11px', color: '#555', whiteSpace: 'nowrap' }}>{posts.length}件</span>
              </div>
              <div className="blog-list">
                {posts.map(post => (
                  <a key={post.id} href={`/blog/${post.id}`} className="blog-card">
                    <div className="blog-card-meta">
                      {post.publishedAt && <span className="blog-date">{formatDate(post.publishedAt)}</span>}
                      {post.category && <span className="blog-category">{post.category}</span>}
                      {post.tags.map(tag => <span key={tag} className="blog-tag">{tag}</span>)}
                    </div>
                    <div className="blog-title">{post.title}</div>
                    <span className="blog-arrow">→</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
