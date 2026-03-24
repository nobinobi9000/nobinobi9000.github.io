import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DB_ID = process.env.NOTION_BLOG_DB_ID!

export type Post = {
  id: string
  title: string
  publishedAt: string | null
  tags: string[]
  category: string | null
}

export async function getPosts(): Promise<Post[]> {
  const today = new Date().toISOString().split('T')[0]
  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: [
        { property: '公開日', date: { on_or_before: today } },
        { property: 'ステータス', status: { equals: '公開済み' } },
      ],
    },
    sorts: [{ property: '公開日', direction: 'descending' }],
  })

  return response.results
    .filter((p): p is PageObjectResponse => p.object === 'page')
    .map(pageToPost)
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const page = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse
    return pageToPost(page)
  } catch {
    return null
  }
}

export async function getBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(
      ...response.results.filter((b): b is BlockObjectResponse => b.object === 'block')
    )
    cursor = response.next_cursor ?? undefined
  } while (cursor)

  return blocks
}

function pageToPost(page: PageObjectResponse): Post {
  const props = page.properties

  const titleProp = props['タイトル']
  const title =
    titleProp?.type === 'title' ? titleProp.title.map((t) => t.plain_text).join('') : ''

  const dateProp = props['公開日']
  const publishedAt =
    dateProp?.type === 'date' ? (dateProp.date?.start ?? null) : null

  const tagsProp = props['タグ']
  const tags =
    tagsProp?.type === 'multi_select' ? tagsProp.multi_select.map((t) => t.name) : []

  const catProp = props['カテゴリー']
  const category =
    catProp?.type === 'select' ? (catProp.select?.name ?? null) : null

  return { id: page.id.replace(/-/g, ''), title, publishedAt, tags, category }
}

export function richTextToString(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join('')
}
