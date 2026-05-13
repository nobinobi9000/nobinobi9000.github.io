import { getPosts } from '@/lib/notion'
import AppsShowcase from './HomeWithTabs'

export const revalidate = 3600

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const INTERESTS = [
  {
    icon: '📚🎮',
    label: '日常・ライフ',
    desc: 'マンガの新刊管理・積みゲー整理など、日常の小さな不便を解消するアプリを作っています。',
    appsHref: '/apps?category=%E6%97%A5%E5%B8%B8%E3%83%BB%E3%83%A9%E3%82%A4%E3%83%95',
  },
  {
    icon: '💰',
    label: '投資・お金',
    desc: 'サブスク断捨離・株管理など、小さな節約と投資を習慣化するアプリを作っています。',
    appsHref: '/apps?category=%E3%81%8A%E9%87%91%E3%83%BB%E6%8A%95%E8%B3%87',
  },
]

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-label">nobi-labo</span>
          <h1>日々の生活に<br /><em>ちょっと便利</em>を<br />プラス。</h1>
          <p className="hero-sub">
            個人開発のWebアプリを作りながら、<br />
            マンガ・ゲーム・投資・お金について書く個人の場所。
          </p>
          <div className="hero-actions">
            <a href="/apps" className="hero-cta-primary">Apps を探す →</a>
            <a href="/blog" className="hero-cta-secondary">Blog を読む</a>
          </div>
        </div>
      </section>

      {/* NEWS BAR */}
      {posts.length > 0 && (
        <div className="news-bar">
          <div className="news-bar-inner">
            <span className="news-bar-label">NEW</span>
            <div className="news-bar-track">
              {posts.slice(0, 6).map(post => (
                <a key={post.id} href={`/blog/${post.id}`} className="news-item">
                  {post.publishedAt && (
                    <span className="news-item-date">{formatDate(post.publishedAt)}</span>
                  )}
                  <span className="news-item-sep">—</span>
                  <span className="news-item-title">{post.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* APPS SHOWCASE */}
      <AppsShowcase />

      {/* INTERESTS */}
      <div className="interests-section">
        <div className="interests-inner">
          <div className="section-header">
            <span className="section-label">Topics</span>
            <div className="section-line" />
          </div>
          <div className="interests-grid">
            {INTERESTS.map(item => (
              <div key={item.label} className="interest-card">
                <div className="interest-icon">{item.icon}</div>
                <div className="interest-label">{item.label}</div>
                <p className="interest-desc">{item.desc}</p>
                <a href={item.appsHref} className="interest-link">アプリを見る →</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG PREVIEW */}
      {posts.length > 0 && (
        <div className="home-blog">
          <div className="home-blog-inner">
            <div className="home-section-header">
              <div className="section-header">
                <span className="section-label">Recent Posts</span>
                <div className="section-line" />
              </div>
              <a href="/blog" className="home-section-all">すべての記事 →</a>
            </div>
            <div className="blog-list">
              {posts.slice(0, 3).map(post => (
                <a key={post.id} href={`/blog/${post.id}`} className="blog-card">
                  <div className="blog-card-meta">
                    {post.publishedAt && (
                      <span className="blog-date">{formatDate(post.publishedAt)}</span>
                    )}
                    {post.category && (
                      <span className="blog-category">{post.category}</span>
                    )}
                    {post.tags.map(tag => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="blog-title">{post.title}</div>
                  <span className="blog-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NOTE BANNER */}
      <div className="note-banner">
        <div className="note-banner-inner">
          <div>
            <div className="note-banner-label">note</div>
            <p className="note-banner-text">コラムや読書記録など、長めの文章はnoteで更新しています。</p>
          </div>
          <a
            href="https://note.com/suzukidaichisan"
            target="_blank"
            rel="noopener noreferrer"
            className="note-banner-cta"
          >
            noteを見る ↗
          </a>
        </div>
      </div>
    </>
  )
}
