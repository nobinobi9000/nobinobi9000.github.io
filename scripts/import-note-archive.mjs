// note.com WXR（WordPress export）を取り込み、/column アーカイブ用データを生成する一回限りのスクリプト。
// 実行: node scripts/import-note-archive.mjs <xmlパス> <アセットフォルダ> <アカウント種別 nobi1|nobi2>

import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import path from 'node:path'

const [, , xmlPathArg, assetsDirArg, accountArg] = process.argv

if (!xmlPathArg || !assetsDirArg || !accountArg) {
  console.error('Usage: node scripts/import-note-archive.mjs <xml> <assetsDir> <nobi1|nobi2>')
  process.exit(1)
}

const ACCOUNTS = {
  nobi1: { urlname: 'suzukidaichisan', label: 'suzukidaichisan', color: '#00B899', bg: '#E6F8F3' },
  nobi2: { urlname: 'nobi9000nobi',   label: 'nobi-nobi', color: '#E8384F', bg: '#FDEEF0' },
}
const account = ACCOUNTS[accountArg]
if (!account) {
  console.error('account must be nobi1 or nobi2')
  process.exit(1)
}

const xml = fs.readFileSync(xmlPathArg, 'utf-8')
const parser = new XMLParser({
  ignoreAttributes: false,
  cdataPropName: '__cdata',
  attributeNamePrefix: '@_',
})
const parsed = parser.parse(xml)

const items = parsed.rss.channel.item
const list = Array.isArray(items) ? items : [items]

const publicDir = path.join(process.cwd(), 'public', 'note-archive')
fs.mkdirSync(publicDir, { recursive: true })

function textOf(v) {
  if (v == null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'object' && '__cdata' in v) return v.__cdata
  return String(v)
}

const results = []
let copied = 0

for (const item of list) {
  const status = textOf(item['wp:status'])
  if (status !== 'publish') continue

  const title = textOf(item.title)
  const guid = textOf(item.guid && (item.guid['#text'] ?? item.guid))
  const link = textOf(item.link)
  const pubDate = textOf(item.pubDate)
  let html = textOf(item['content:encoded'])

  // 画像パスを /note-archive/<account>/<file> に書き換え、アセットをコピー
  html = html.replace(/src="\/assets\/([^"]+)"/g, (_m, filename) => {
    const src = path.join(assetsDirArg, filename)
    const destDir = path.join(publicDir, accountArg)
    fs.mkdirSync(destDir, { recursive: true })
    const dest = path.join(destDir, filename)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest)
      copied++
    }
    return `src="/note-archive/${accountArg}/${filename}"`
  })

  const slug = guid || link.split('/').pop()

  results.push({
    slug,
    title,
    originalUrl: link,
    publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
    account: accountArg,
    accountLabel: account.label,
    accountColor: account.color,
    accountBg: account.bg,
    accountUrlname: account.urlname,
    html,
  })
}

results.sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))

const outPath = path.join(process.cwd(), 'lib', `note-archive-${accountArg}.json`)
fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8')

console.log(`imported ${results.length} published articles -> ${outPath}`)
console.log(`copied ${copied} image assets -> ${publicDir}/${accountArg}/`)
