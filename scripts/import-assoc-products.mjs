// assoc-tool（アソシエイトリンク管理ツール, http://192.168.50.116/assoc-tool/）の全商品を
// lib/affiliate-products.json に変換して書き出す（全体上書き）。
// 使い方: node scripts/import-assoc-products.mjs
//
// assoc-toolはまだカテゴリ構成などが変わる可能性があるため、
// PAGE_NAME_TO_CATEGORY のマッピングは今後の変更に合わせて調整すること。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUTPUT_PATH = path.join(ROOT, 'lib', 'affiliate-products.json')
const ASSOC_TOOL_URL = 'http://192.168.50.116/assoc-tool/data.php?action=load'

// assoc-toolの「pages」名 → nobi-labo.com /picks 側のカテゴリキー
const PAGE_NAME_TO_CATEGORY = {
  'ガジェット': 'gadget',
  'DIY': 'diy',
  'ホーム': 'home',
  'NAS': 'nas',
  'マンガ': 'manga',
  'ライセンス': 'license',
}

async function main() {
  const res = await fetch(ASSOC_TOOL_URL)
  if (!res.ok) {
    console.error(`assoc-toolへの接続に失敗しました (HTTP ${res.status})。同じネットワーク上でassoc-toolが起動しているか確認してください。`)
    process.exit(1)
  }
  const data = await res.json()

  const pageNameById = Object.fromEntries(data.pages.map(p => [p.id, p.name]))
  const tagNameById = Object.fromEntries(data.tags.map(t => [t.id, t.name]))

  const products = data.links.map(link => {
    const pageId = link.pages?.[0]
    const pageName = pageId ? pageNameById[pageId] : null
    const category = (pageName && PAGE_NAME_TO_CATEGORY[pageName]) || 'uncategorized'

    return {
      id: `${category}-${link.id}`,
      category,
      tags: (link.tags || []).map(id => tagNameById[id]).filter(Boolean),
      name: link.name,
      comment: link.memo || '',
      amazonUrl: link.url,
      imageUrl: link.image || '',
      addedAt: (link.createdAt || new Date().toISOString()).slice(0, 10),
    }
  })

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2) + '\n', 'utf-8')

  console.log(`✅ ${products.length}件を lib/affiliate-products.json に書き出しました。`)
  const byCategory = {}
  for (const p of products) byCategory[p.category] = (byCategory[p.category] || 0) + 1
  console.log(byCategory)
}

main()
