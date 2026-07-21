import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArchiveArticle, getAllArchiveArticles } from '@/lib/note-archive'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArchiveArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArchiveArticle(slug)
  if (!article) return { title: '記事が見つかりません' }
  return {
    title: article.title,
    description: article.title,
    alternates: { canonical: `/column/${slug}` },
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export default async function ColumnArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArchiveArticle(slug)
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[800px] mx-auto px-6 pt-14 pb-10">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <Link href="/column" className="hover:text-[#2D6A4F] transition-colors">コラム</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium truncate">{article.title}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-6">
          {article.publishedAt && (
            <span className="text-[13px] text-[#999999]">{formatDate(article.publishedAt)}</span>
          )}
          <span className="px-[10px] py-[3px] text-[11px] font-bold rounded-full"
            style={{ color: article.accountColor, background: article.accountBg }}>
            {article.accountLabel}
          </span>
        </div>

        <h1 className="font-extrabold tracking-[-0.02em] leading-[1.35]" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
          {article.title}
        </h1>
      </section>

      {/* BODY */}
      <article
        className="blog-post-content max-w-[800px] mx-auto px-6 pb-12"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      {/* ORIGINAL LINK */}
      <section className="max-w-[800px] mx-auto px-6 pb-24">
        <div className="bg-[#F7F7F7] rounded-2xl px-8 py-7">
          <p className="text-[14px] leading-[1.8] text-[#444444]">
            この記事は note（{article.accountUrlname}）に投稿したものです。
            <a href={article.originalUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#2D6A4F] underline underline-offset-[3px] ml-1">
              noteで見る →
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
