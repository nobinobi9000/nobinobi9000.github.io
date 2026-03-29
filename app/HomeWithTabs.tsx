'use client'
import { useState, useEffect } from 'react'

type Post = {
  id: string
  title: string
  publishedAt: string | null
  category: string | null
  tags: string[]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const APPS = [
  {
    icon: '📚',
    name: 'comic-checker',
    desc: 'マンガの新刊を自動チェック。\n発売14日前・7日前・当日にPush通知でお知らせ。\nスマホのホーム画面に追加してすぐ使える。',
    tags: ['PWA', '無料', 'Push通知', '楽天連携'],
    ctaUrl: 'https://comic.nobi-labo.com',
    detailUrl: '/comic-checker',
  },
  {
    icon: '🧮',
    name: '確定申告・還付判定シミュレーター',
    desc: '所得税・住民税を簡単に計算。\n収入を入力するだけで手取り額・還付額をすぐ確認できる。',
    tags: ['無料', '登録不要', '令和7年版'],
    ctaUrl: '/tax-simulator/',
    detailUrl: '/tax-simulator.html',
  },
  {
    icon: '🧊',
    name: 'ねこおじさんタイマー',
    desc: '会議を凍らせる、愛すべきおやじ。\nカウントダウン終了後、ねこおじさんがAI生成おやじギャグで締める会議タイマー。',
    tags: ['会議タイマー', 'おやじギャグ', 'AI生成', '無料'],
    ctaUrl: 'https://absolute-zero-meeting.vercel.app',
    detailUrl: '/nekoojiisan-timer',
  },
  {
    icon: '📊',
    name: '日本株スクリーナー',
    desc: 'テクニカル指標×AIスコアリングで3,700銘柄を毎日自動スキャン。\n上昇シグナル銘柄をDiscordへ毎日夕方配信。',
    tags: ['無料', 'Discord連携', 'テクニカル分析', '毎日夕方'],
    ctaUrl: '/japan-stock-screener/',
    detailUrl: '/japan-stock-screener.html',
  },
  {
    icon: '📒',
    name: 'Kabu Note（カブノート）',
    desc: '複数証券会社の保有株を一元管理するポートフォリオダッシュボード。\n証券コード・株数・取得単価を登録するだけで損益・評価額を自動計算。\n平日16時に株価を自動更新。',
    tags: ['無料', '日本株', '複数口座対応', '損益管理'],
    ctaUrl: 'https://kabu.nobi-labo.com',
    detailUrl: '/kabu-note',
  },
]

export default function HomeWithTabs({ posts }: { posts: Post[] }) {
  const [tab, setTab] = useState<'apps' | 'blog'>('apps')

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

  return (
    <div className="section">
      {/* TAB NAV */}
      <div className="tab-nav">
        <button className={`tab-btn${tab === 'apps' ? ' active' : ''}`} onClick={() => handleTab('apps')}>Apps</button>
        <button className={`tab-btn${tab === 'blog' ? ' active' : ''}`} onClick={() => handleTab('blog')}>Blog</button>
      </div>

      {/* APPS */}
      {tab === 'apps' && (
        <div className="apps">
          {APPS.map(app => (
            <div key={app.name} className="app-card live" style={{ cursor: 'default' }}>
              <div className="app-card-top">
                <div className="app-icon">{app.icon}</div>
                <span className="app-badge">Live</span>
              </div>
              <div className="app-name">{app.name}</div>
              <div className="app-desc">{app.desc.split('\n').map((line, i) => (
                <span key={i}>{line}{i < app.desc.split('\n').length - 1 && <br />}</span>
              ))}</div>
              <div className="app-tags">
                {app.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href={app.ctaUrl} className="app-cta">今すぐ使う</a>
                <a href={app.detailUrl} className="app-sub-link">詳細を見る</a>
              </div>
            </div>
          ))}
          <div className="app-card coming">
            <div className="app-card-top">
              <div className="app-icon">🔜</div>
              <span className="app-badge soon">Coming Soon</span>
            </div>
            <div className="app-name">Next App</div>
            <div className="app-desc">次のアプリを開発中です。</div>
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
