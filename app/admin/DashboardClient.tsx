'use client'
import { useState, useEffect } from 'react'
import AdminClient from './AdminClient'

type AppStat = {
  id: string
  name: string
  emoji: string
  users: number | null
  appUrl: string
  supabaseUrl: string
  vercelUrl: string
}

type BlogStat = {
  total: number
  unposted: number
} | null

type StatsData = {
  apps: AppStat[]
  blog: BlogStat
  fetchedAt: string
}

type Article = {
  pageId: string
  title: string
  url: string
  category: string | null
  tags: string[]
  tweetText: string
  threadText: string
}

const QUICK_LINKS = [
  { label: 'おすすめ商品を追加', url: '/admin/picks' },
  { label: 'Vercel Analytics', url: 'https://vercel.com/nonobinoi9000s-projects/nobi-labo-site/analytics' },
  { label: 'Search Console', url: 'https://search.google.com/search-console?resource_id=https://nobi-labo.com/' },
  { label: 'Notion Blog', url: 'https://www.notion.so/32d14e1c154580319050d297ace3ae7b' },
  { label: 'AdSense', url: 'https://www.google.com/adsense/' },
]

function StatCard({ app, loading }: { app?: AppStat; loading: boolean }) {
  if (loading || !app) {
    return (
      <div style={{ background: 'var(--panel)', padding: '24px 20px' }}>
        <div style={{ width: '50%', height: '11px', background: '#1a1a1a', borderRadius: '2px', marginBottom: '14px' }} />
        <div style={{ width: '40%', height: '36px', background: '#1a1a1a', borderRadius: '2px', marginBottom: '8px' }} />
        <div style={{ width: '30%', height: '10px', background: '#1a1a1a', borderRadius: '2px', marginBottom: '20px' }} />
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(i => <div key={i} style={{ width: '52px', height: '22px', background: '#1a1a1a', borderRadius: '2px' }} />)}
        </div>
      </div>
    )
  }
  return (
    <div style={{ background: 'var(--panel)', padding: '24px 20px' }}>
      <div style={{ fontSize: '11px', color: '#666', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>{app.emoji}</span>
        <span style={{ textTransform: 'uppercase' }}>{app.name}</span>
      </div>
      <div style={{ fontSize: '40px', fontWeight: 900, color: app.users !== null ? 'var(--orange)' : '#333', letterSpacing: '-2px', lineHeight: 1, marginBottom: '4px' }}>
        {app.users !== null ? app.users.toLocaleString() : '—'}
      </div>
      <div style={{ fontSize: '10px', color: '#555', marginBottom: '18px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        登録ユーザー
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {[
          { label: 'App ↗', url: app.appUrl },
          { label: 'Supabase ↗', url: app.supabaseUrl },
          { label: 'Vercel ↗', url: app.vercelUrl },
        ].map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '10px', color: '#555', textDecoration: 'none',
              border: '1px solid #222', padding: '3px 8px', letterSpacing: '0.5px',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#555'; (e.currentTarget as HTMLElement).style.borderColor = '#222' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function DashboardClient({ articles }: { articles: Article[] }) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState(false)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data: StatsData) => {
        setStats(data)
        setLoadingStats(false)
      })
      .catch(() => {
        setStatsError(true)
        setLoadingStats(false)
      })
  }, [])

  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })
  const fetchedAt = stats?.fetchedAt
    ? new Date(stats.fetchedAt).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 80px' }}>

      {/* ヘッダー */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Admin
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-1px', margin: 0 }}>
            ダッシュボード
          </h1>
        </div>
        <div style={{ fontSize: '11px', color: '#444', textAlign: 'right', lineHeight: 1.6 }}>
          <div>{today}</div>
          {fetchedAt && <div style={{ color: '#333' }}>取得: {fetchedAt}</div>}
        </div>
      </div>

      {/* APP STATS */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          App Stats
          <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
        </div>
        {statsError ? (
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '24px', textAlign: 'center', color: '#555', fontSize: '13px' }}>
            統計の取得に失敗しました
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {loadingStats
              ? Array.from({ length: 3 }).map((_, i) => <StatCard key={i} loading={true} />)
              : stats?.apps.map(app => <StatCard key={app.id} app={app} loading={false} />)
            }
          </div>
        )}
      </section>

      {/* QUICK LINKS */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          Quick Links
          <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
        </div>
        <div style={{ display: 'flex', gap: '1px', background: 'var(--border)', flexWrap: 'wrap' }}>
          {QUICK_LINKS.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--panel)', padding: '14px 20px',
                fontSize: '12px', fontWeight: 700, color: '#666',
                textDecoration: 'none', letterSpacing: '0.5px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#666' }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '4px', color: 'var(--orange)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          Blog — X投稿キュー
          <span style={{ flex: 1, height: '1px', background: 'var(--border)', display: 'block' }} />
          {stats?.blog && (
            <span style={{ fontSize: '11px', color: '#444', letterSpacing: '0', textTransform: 'none', fontWeight: 400 }}>
              公開済み {stats.blog.total} 件
            </span>
          )}
        </div>

        {articles.length === 0 ? (
          <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>✅</div>
            <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>X未投稿の記事はありません</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {articles.map(article => (
              <AdminClient key={article.pageId} article={article} />
            ))}
          </div>
        )}
      </section>

    </main>
  )
}
