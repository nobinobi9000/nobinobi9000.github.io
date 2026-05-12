import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/notion'

const BASE_URL = 'https://nobi-labo.com'

// 1時間キャッシュ（ブログ記事の追加に追従）
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // アプリ詳細ページ（Next.js routes）
    { url: `${BASE_URL}/comic-checker`,      changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sorosoro`,           changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/mebae`,              changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/questlog`,           changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/kabu-note`,          changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/nekoojiisan-timer`,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/subshari`,           changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/todo-manager`,       changeFrequency: 'monthly', priority: 0.8 },
    // アプリ詳細ページ（静的HTML）
    { url: `${BASE_URL}/tax-simulator/`,  changeFrequency: 'monthly', priority: 0.7 },
    // /japan-stock-screener/ は外部にリダイレクトされるためサイトマップから除外
    // その他
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/apps`,  changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // ブログ記事（Notionから動的取得）
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = await getPosts()
    blogPages = posts.map(post => ({
      url: `${BASE_URL}/blog/${post.id}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {
    // Notion APIエラー時はブログ記事なしで続行
  }

  return [...staticPages, ...blogPages]
}
