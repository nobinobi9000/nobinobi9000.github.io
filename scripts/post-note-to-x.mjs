/**
 * post-note-to-x.mjs
 * note（suzukidaichisan）の新着記事をRSSで検知し、Xに自動投稿する
 * 投稿済み記事のURLは note-posted.json で管理する
 */

import { TwitterApi } from 'twitter-api-v2'
import Parser from 'rss-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// --- 設定 ---
const NOTE_RSS_URL = 'https://note.com/suzukidaichisan/rss'
const POSTED_FILE = path.join(__dirname, 'note-posted.json')

// --- X クライアント初期化 ---
const twitter = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
})

// --- 投稿済みURLリストの読み書き ---
function loadPosted() {
  try {
    return JSON.parse(fs.readFileSync(POSTED_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function savePosted(list) {
  fs.writeFileSync(POSTED_FILE, JSON.stringify(list, null, 2), 'utf-8')
}

// --- ツイート文生成 ---
function generateTweet(title, url) {
  // タイトルのキーワードからカテゴリを推定
  const isComic =
    title.includes('マンガ') || title.includes('漫画') || title.includes('コミック') ||
    title.includes('comic') || title.includes('新刊')

  const isAiDev =
    title.includes('AI') || title.includes('開発') || title.includes('アプリ') ||
    title.includes('Claude') || title.includes('vibe')

  if (isComic) {
    return [
      '📚 noteに新しい記事を書きました',
      '',
      `「${title}」`,
      '',
      '新刊チェックには comic-checker もぜひ📲',
      `👉 ${url}`,
      '',
      '#マンガ #漫画好きと繋がりたい #comicchecker',
    ].join('\n')
  }

  if (isAiDev) {
    return [
      '📝 noteに新しい記事を書きました',
      '',
      `「${title}」`,
      '',
      '非エンジニアがAIでアプリを作った記録です。',
      `👉 ${url}`,
      '',
      '#個人開発 #AIでアプリ開発 #vibecoding',
    ].join('\n')
  }

  // デフォルト
  return [
    '📝 noteに新しい記事を書きました',
    '',
    `「${title}」`,
    '',
    `👉 ${url}`,
    '',
    '#個人開発 #nobi_labo',
  ].join('\n')
}

// --- メイン処理 ---
async function run() {
  console.log(`[${new Date().toISOString()}] note RSS チェック開始...`)

  const parser = new Parser()
  let feed
  try {
    feed = await parser.parseURL(NOTE_RSS_URL)
  } catch (err) {
    console.error('RSS取得失敗:', err.message)
    process.exit(1)
  }

  console.log(`→ ${feed.items.length} 件の記事を取得`)

  const posted = loadPosted()
  const newItems = feed.items.filter((item) => !posted.includes(item.link))

  console.log(`→ 未投稿: ${newItems.length} 件`)

  if (newItems.length === 0) {
    console.log('新着記事なし。終了します。')
    return
  }

  // 古い順に投稿（ascendingで処理）
  const targets = [...newItems].reverse()

  for (const item of targets) {
    const title = item.title ?? '新記事'
    const url = item.link

    const tweet = generateTweet(title, url)

    console.log(`\n--- 投稿予定 ---`)
    console.log(`タイトル: ${title}`)
    console.log(`URL: ${url}`)
    console.log(`ツイート:\n${tweet}`)
    console.log(`文字数: ${tweet.length}`)

    try {
      const result = await twitter.v2.tweet(tweet)
      console.log(`✅ X投稿成功 (tweet_id: ${result.data.id})`)
      posted.push(url)
      savePosted(posted)
    } catch (err) {
      console.error(`❌ 投稿失敗: ${err.message}`)
      if (err.code) console.error(`  HTTPステータス: ${err.code}`)
      if (err.errors) console.error(`  APIエラー詳細: ${JSON.stringify(err.errors, null, 2)}`)
    }

    // レート制限対策
    await new Promise((r) => setTimeout(r, 2000))
  }

  console.log('\n全件処理完了')
}

run().catch((err) => {
  console.error('予期しないエラー:', err)
  process.exit(1)
})
