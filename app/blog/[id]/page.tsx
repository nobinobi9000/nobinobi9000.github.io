import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, getBlocks } from '@/lib/notion'
import NotionBlocks from '@/components/NotionBlocks'

export const revalidate = 3600

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return { title: '記事が見つかりません' }
  return {
    title: post.title,
    description: `${post.category ?? 'nobi-labo'} | ${post.tags.join(', ')}`,
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params
  const [post, blocks] = await Promise.all([getPost(id), getBlocks(id)])

  if (!post) notFound()

  return (
    <>
      <div className="post-hero">
        <div className="post-hero-inner">
          <a href="/blog" className="post-back">← Blog</a>
          <div className="post-meta">
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
          <h1 className="post-title">{post.title}</h1>
        </div>
      </div>

      <article className="prose">
        <NotionBlocks blocks={blocks} />
      </article>
    </>
  )
}
