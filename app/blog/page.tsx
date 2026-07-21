import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/notion'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'nobi-laboのブログ。マンガ・アプリ・日常のお役立ち情報を発信。',
  alternates: { canonical: '/blog' },
}

export const revalidate = 3600

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-12">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Blog</span>
        </div>
        <h1 className="font-extrabold tracking-[-0.03em] leading-[1.1]"
          style={{ fontSize: 'clamp(40px, 5.5vw, 68px)' }}>
          Blog
        </h1>
        <div className="mt-[14px] flex items-center gap-3 flex-wrap">
          <p className="text-[16px] text-[#999999]">マンガ・アプリ・日常のお役立ち情報を発信</p>
          <a href="/blog/rss.xml" className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#2D6A4F] hover:text-[#21503b] transition-colors">
            RSS →
          </a>
        </div>
      </section>

      {/* ARTICLE LIST */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="border border-[#EBEBEB] rounded-[20px] overflow-hidden">
          {posts.length === 0 ? (
            <div className="px-6 py-12 text-center text-[#999999] text-[14px]">記事を準備中です</div>
          ) : posts.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`}
              className="flex items-center gap-5 px-6 py-[22px] border-b border-[#EBEBEB] last:border-0 hover:bg-[#F0F7F4] transition-colors">
              <span className="flex-none w-14 text-center py-[6px] text-[11px] font-bold rounded-lg text-[#2D6A4F] bg-[#F0F7F4]">
                Blog
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  {post.publishedAt && (
                    <span className="text-[12.5px] text-[#999999]">{formatDate(post.publishedAt)}</span>
                  )}
                  {post.category && (
                    <span className="px-[9px] py-[2px] text-[11px] font-bold rounded-full text-[#2563EB] bg-[#F0F5FF]">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="mt-[7px] text-[16px] font-bold tracking-[-0.01em] leading-[1.5] truncate">
                  {post.title}
                </div>
              </div>
              <span className="flex-none text-[#999999] text-[18px]">→</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
