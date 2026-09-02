// おすすめ商品(lib/affiliate-products.json)に1件追加する対話式CLI
// 使い方: node scripts/add-product.mjs
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PRODUCTS_PATH = path.join(ROOT, 'lib', 'affiliate-products.json')

const CATEGORIES = [
  { key: 'retro-game', label: 'レトロゲーム' },
  { key: 'money', label: '投資・お金' },
  { key: 'gadget', label: 'ガジェット' },
  { key: 'manga-set', label: 'マンガ全巻セット' },
]

function loadArchiveArticles() {
  const files = ['note-archive-nobi1.json', 'note-archive-nobi2.json']
  const articles = []
  for (const file of files) {
    const filePath = path.join(ROOT, 'lib', file)
    if (!fs.existsSync(filePath)) continue
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      articles.push(...data)
    } catch {
      // skip
    }
  }
  return articles
}

async function ask(rl, question) {
  const answer = await rl.question(question)
  return answer.trim()
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('\n=== おすすめ商品を追加 ===\n')

  // カテゴリ
  console.log('カテゴリを選んでください:')
  CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}. ${c.label}`))
  let categoryIndex = -1
  while (categoryIndex < 0 || categoryIndex >= CATEGORIES.length) {
    const input = await ask(rl, '番号 > ')
    categoryIndex = Number(input) - 1
  }
  const category = CATEGORIES[categoryIndex].key

  // 商品名
  let name = ''
  while (!name) {
    name = await ask(rl, '\n商品名 > ')
  }

  // コメント
  let comment = ''
  while (!comment) {
    comment = await ask(rl, 'ひとことコメント（なぜ良かったか） > ')
  }

  // タグ
  const tagsInput = await ask(rl, 'タグ（カンマ区切り、なければ空欄でEnter） > ')
  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)

  // 元記事リンク
  console.log('\n元記事リンク: URLをそのまま貼るか、コラム記事をキーワード検索できます。')
  let articleUrl = ''
  while (!articleUrl) {
    const input = await ask(rl, 'URL、またはコラム記事の検索キーワード > ')
    if (!input) continue
    if (input.startsWith('http') || input.startsWith('/')) {
      articleUrl = input
      break
    }
    const articles = loadArchiveArticles()
    const matches = articles.filter(a => a.title.includes(input)).slice(0, 15)
    if (matches.length === 0) {
      console.log('  該当するコラム記事が見つかりませんでした。別のキーワードか、URLを直接貼ってください。')
      continue
    }
    console.log('')
    matches.forEach((a, i) => console.log(`  ${i + 1}. ${a.title}`))
    const pick = await ask(rl, '番号を選択（該当なしはEnter） > ')
    const idx = Number(pick) - 1
    if (idx >= 0 && idx < matches.length) {
      articleUrl = `/column/${matches[idx].slug}`
    }
  }

  // AmazonURL
  let amazonUrl = ''
  while (!amazonUrl) {
    amazonUrl = await ask(rl, '\nAmazonアソシエイトURL > ')
  }

  // 画像URL
  const imageUrl = await ask(rl, '商品画像URL（なければ空欄でEnter） > ')

  rl.close()

  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, 'utf-8'))
  const newProduct = {
    id: `${category}-${Date.now()}`,
    category,
    tags,
    name,
    comment,
    articleUrl,
    amazonUrl,
    imageUrl,
    addedAt: new Date().toISOString().slice(0, 10),
  }
  products.push(newProduct)
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2) + '\n', 'utf-8')

  console.log('\n✅ 追加しました:')
  console.log(JSON.stringify(newProduct, null, 2))
  console.log(`\n現在の登録件数: ${products.length}件`)
  console.log('\n反映するには次を実行してください:')
  console.log('  git add lib/affiliate-products.json')
  console.log('  git commit -m "feat: おすすめ商品を追加"')
  console.log('  git push')
}

main()
