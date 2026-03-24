import type { Metadata } from 'next'
import { getPosts } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'nobi-laboのブログ。マンガ・アプリ・日常のお役立ち情報を発信。',
}

export const revalidate = 3600 // 1時間ごとに再生成

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <section className="hero" style={{ paddingBottom: '48px' }}>
        <div className="hero-inner">
          <span className="hero-label">Blog</span>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', marginBottom: '16px' }}>
            ノウハウ・<br /><em>お役立ち情報</em>
          </h1>
          <p className="hero-sub">
            マンガ・アプリ・日常の小ネタを<br />
            定期的に発信しています。
          </p>
        </div>
      </section>

      <div className="section">
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
              {posts.map((post) => (
                <a key={post.id} href={`/blog/${post.id}`} className="blog-card">
                  <div className="blog-card-meta">
                    {post.publishedAt && (
                      <span className="blog-date">{formatDate(post.publishedAt)}</span>
                    )}
                    {post.category && (
                      <span className="blog-category">{post.category}</span>
                    )}
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="blog-title">{post.title}</div>
                  <span className="blog-arrow">→</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
