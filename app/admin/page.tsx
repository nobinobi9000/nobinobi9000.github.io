import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import AdminClient from './AdminClient'

const BASE_URL = 'https://nobi-labo.com'

type UnpostedArticle = {
  pageId: string
  title: string
  url: string
  category: string | null
  tags: string[]
  tweetText: string
}

function generateTweet(title: string, url: string, category: string | null, tags: string[]): string {
  const isComic =
    category === 'マンガ紹介' ||
    tags.some((t) => ['マンガ', '漫画', 'comic', 'comicchecker'].includes(t.toLowerCase()))

  const isAppDev =
    category === 'アプリ開発記' ||
    tags.some((t) => t.includes('AI') || t.includes('開発') || t.includes('vibe'))

  if (isComic) {
    return `📚 新記事を公開しました\n\n${title}\n\ncomic-checkerで新刊通知を設定するのがおすすめです📲\n\n👉 ${url}\n\n#マンガ #漫画好きと繋がりたい #comicchecker`
  }

  if (isAppDev) {
    return `📝 新記事を公開しました\n\n${title}\n\n非エンジニアがAIを使って実際にアプリを作った記録です。\n同じように開発に挑戦したい方の参考になれば！\n\n👉 ${url}\n\n#個人開発 #AIでアプリ開発 #ノーコード #vibecoding`
  }

  return `📣 新記事を公開しました\n\n${title}\n\n👉 ${url}\n\n#nobi_labo`
}

async function getUnpostedArticles(): Promise<UnpostedArticle[]> {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const today = new Date().toISOString().split('T')[0]

  const res = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_DB_ID!,
    filter: {
      and: [
        { property: 'ステータス', status: { equals: '公開済み' } },
        { property: '公開日', date: { on_or_before: today } },
        { property: 'X投稿済み', checkbox: { equals: false } },
      ],
    },
    sorts: [{ property: '公開日', direction: 'descending' }],
  })

  return res.results
    .filter((p): p is PageObjectResponse => p.object === 'page')
    .map((page) => {
      const props = page.properties
      const title =
        props['タイトル']?.type === 'title'
          ? props['タイトル'].title.map((t) => t.plain_text).join('')
          : ''
      const category =
        props['カテゴリー']?.type === 'select' ? props['カテゴリー'].select?.name ?? null : null
      const tags =
        props['タグ']?.type === 'multi_select' ? props['タグ'].multi_select.map((t) => t.name) : []
      const id = page.id.replace(/-/g, '')
      const url = `${BASE_URL}/blog/${id}`

      return {
        pageId: page.id,
        title,
        url,
        category,
        tags,
        tweetText: generateTweet(title, url, category, tags),
      }
    })
}

export default async function AdminPage() {
  const articles = await getUnpostedArticles()

  return (
    <main style={{ maxWidth: '720px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        管理 — X未投稿記事
      </h1>
      {articles.length === 0 ? (
        <p style={{ color: '#666' }}>未投稿の記事はありません。</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {articles.map((article) => (
            <AdminClient key={article.pageId} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}
