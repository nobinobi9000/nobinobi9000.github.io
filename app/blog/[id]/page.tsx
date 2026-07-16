import type { Metadata } from 'next'
import Link from 'next/link'
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
    alternates: {
      canonical: `/blog/${id}`,
    },
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
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[800px] mx-auto px-6 pt-14 pb-10">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-[#2D6A4F] transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium truncate">{post.title}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-6">
          {post.publishedAt && (
            <span className="text-[13px] text-[#999999]">{formatDate(post.publishedAt)}</span>
          )}
          {post.category && (
            <span className="px-[10px] py-[3px] text-[11px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">
              {post.category}
            </span>
          )}
          {post.tags.map(tag => (
            <span key={tag} className="px-[10px] py-[3px] text-[11px] font-medium rounded-full text-[#444444] bg-[#F7F7F7] border border-[#EBEBEB]">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-extrabold tracking-[-0.02em] leading-[1.35]" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
          {post.title}
        </h1>
      </section>

      {/* BODY */}
      <article className="blog-post-content max-w-[800px] mx-auto px-6 pb-24">
        <NotionBlocks blocks={blocks} />
      </article>

    </div>
  )
}
