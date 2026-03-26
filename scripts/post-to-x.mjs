/**
 * post-to-x.mjs
 * Notionで「公開済み」かつ「X投稿済み=false」の記事を検出し、Xに自動投稿する
 * 投稿後に Notion の「X投稿済み」チェックボックスを true に更新する
 */

import { Client } from '@notionhq/client'
import { TwitterApi } from 'twitter-api-v2'

// --- クライアント初期化 ---
const notion = new Client({ auth: process.env.NOTION_TOKEN })
const twitter = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
})

const DB_ID = process.env.NOTION_BLOG_DB_ID
const BASE_URL = 'https://nobi-labo.com'

// --- ツイート文生成 ---
function generateTweet(title, url, tags, category) {
  const isComic =
    category === 'マンガ紹介' ||
    tags.some((t) => ['マンガ', '漫画', 'comic', 'comicchecker'].includes(t.toLowerCase()))

  const isAiDev =
    category === 'AI開発記' ||
    tags.some((t) => t.includes('AI') || t.includes('開発') || t.includes('vibe'))

  if (isComic) {
    return [
      '📚 新記事を公開しました',
      '',
      title,
      '',
      'comic-checkerで新刊通知を設定するのがおすすめです📲',
      '',
      `👉 ${url}`,
      '',
      '#マンガ #漫画好きと繋がりたい #comicchecker',
    ].join('\n')
  }

  if (isAiDev) {
    return [
      '📝 新記事を公開しました',
      '',
      title,
      '',
      '非エンジニアがAIを使って実際にアプリを作った記録です。',
      '同じように開発に挑戦したい方の参考になれば！',
      '',
      `👉 ${url}`,
      '',
      '#個人開発 #AIでアプリ開発 #ノーコード #vibecoding',
    ].join('\n')
  }

  // デフォルト（カテゴリー未分類、または新カテゴリー追加時）
  const hashTags = tags
    .slice(0, 3)
    .map((t) => `#${t.replace(/\s+/g, '')}`)
    .join(' ')

  return [
    '📝 新記事を公開しました',
    '',
    title,
    '',
    `👉 ${url}`,
    '',
    `${hashTags} #個人開発 #nobi_labo`,
  ].join('\n')
}

// --- メイン処理 ---
async function run() {
  const today = new Date().toISOString().split('T')[0]

  console.log(`[${new Date().toISOString()}] 未投稿記事を検索中...`)

  const response = await notion.databases.query({
    database_id: DB_ID,
    filter: {
      and: [
        { property: 'ステータス', status: { equals: '公開済み' } },
        { property: 'X投稿済み', checkbox: { equals: false } },
        { property: '公開日', date: { on_or_before: today } },
      ],
    },
    sorts: [{ property: '公開日', direction: 'ascending' }],
  })

  const pages = response.results.filter((p) => p.object === 'page')
  console.log(`→ ${pages.length} 件の未投稿記事が見つかりました`)

  if (pages.length === 0) {
    console.log('投稿対象なし。終了します。')
    return
  }

  for (const page of pages) {
    const props = page.properties

    // プロパティ取得
    const title =
      props['タイトル']?.type === 'title'
        ? props['タイトル'].title.map((t) => t.plain_text).join('')
        : '新記事'

    const tags =
      props['タグ']?.type === 'multi_select'
        ? props['タグ'].multi_select.map((t) => t.name)
        : []

    const category =
      props['カテゴリー']?.type === 'select'
        ? (props['カテゴリー'].select?.name ?? '')
        : ''

    // nobi-labo.com のブログURL（lib/notion.ts と同じ形式）
    const pageId = page.id.replace(/-/g, '')
    const url = `${BASE_URL}/blog/${pageId}`

    const tweet = generateTweet(title, url, tags, category)

    console.log(`\n--- 投稿予定 ---`)
    console.log(`タイトル: ${title}`)
    console.log(`カテゴリー: ${category}`)
    console.log(`URL: ${url}`)
    console.log(`ツイート内容:\n${tweet}`)
    console.log(`文字数: ${tweet.length}`)

    try {
      // X へ投稿
      const result = await twitter.v2.tweet(tweet)
      console.log(`✅ X投稿成功 (tweet_id: ${result.data.id})`)

      // Notion の「X投稿済み」を true に更新
      await notion.pages.update({
        page_id: page.id,
        properties: {
          'X投稿済み': { checkbox: true },
        },
      })
      console.log(`✅ Notion更新完了`)
    } catch (err) {
      console.error(`❌ 投稿失敗: ${err.message}`)
      // 1件失敗しても次の記事は処理を続ける
    }

    // レート制限対策：記事間に2秒の間隔
    await new Promise((r) => setTimeout(r, 2000))
  }

  console.log('\n全件処理完了')
}

run().catch((err) => {
  console.error('予期しないエラー:', err)
  process.exit(1)
})
