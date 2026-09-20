// 既存のアフィリエイトカード(affiliate-card)を改善する:
//   1. タイトルが「また次回に」等の挨拶文・星評価・箇条書きラベルのみで
//      何の商品か分からなくなっているものを補完し直す
//   2. Amazon系リンク(amzn.to / www.amazon.co.jp)は実URLを解決してASINを取得し、
//      商品画像(images-fe.ssl-images-amazon.com の旧来の直接画像URL)を試みる。
//      1x1のプレースホルダーGIFが返る場合は「画像なし」として絵文字アイコンのまま維持する
//      (bot対策で本体ページの取得自体は引き続きブロックされるが、この画像パスは
//      静的画像CDNのため取得できる。書籍・マンガ系ASINでの成功率が高い)
//   3. link.amazon ドメインは解決自体がブロックされるため対象外(記事タイトルへの
//      フォールバックのみ)
//
// 使い方:
//   node scripts/improve-affiliate-cards.mjs           # ドライラン（書き込みなし、差分表示のみ）
//   node scripts/improve-affiliate-cards.mjs --write   # 実際にファイルへ書き込む

import fs from 'node:fs'
import path from 'node:path'

const FILES = ['lib/note-archive-nobi1.json', 'lib/note-archive-nobi2.json']
const WRITE = process.argv.includes('--write')
const CONCURRENCY = 6

const FULL_CARD_RE = /<a href="([^"]+)" target="_blank" rel="noopener noreferrer nofollow sponsored" class="affiliate-card affiliate-card--(amazon|a8)"><span class="affiliate-card__icon">([^<]*)<\/span><span class="affiliate-card__body"><span class="affiliate-card__label">([^<]*)<\/span><span class="affiliate-card__title">([^<]*)<\/span><\/span><span class="affiliate-card__arrow">→<\/span><\/a>/g

function classifyJunk(title) {
  if (/また次回/.test(title)) return 'sign-off'
  if (/^★/.test(title)) return 'star'
  if (/^・/.test(title)) return 'bullet'
  return null
}

function extractMangaTitle(articleTitle) {
  const m = articleTitle.match(/『([^』]+)』/)
  return m ? m[1] : null
}

function truncate(text, max = 60) {
  return text.length > max ? text.slice(0, max) + '…' : text
}

// URLからASINと商品名スラッグ(あれば)を解決する。amzn.to/www.amazon.co.jpのみ対応。
async function resolveAmazon(url) {
  let host = ''
  try { host = new URL(url).hostname } catch { return null }
  if (!(host.includes('amzn.to') || host === 'www.amazon.co.jp')) return null

  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000) })
    const finalUrl = res.url
    const m = finalUrl.match(/amazon\.co\.jp\/(?:([^/]+)\/)?dp\/([A-Z0-9]{10})/)
    if (!m) return null
    const slug = m[1] ? decodeURIComponent(m[1]).replace(/-/g, ' ').trim() : null
    return { asin: m[2], slugTitle: slug || null }
  } catch {
    return null
  }
}

// ASINから旧来の直接画像URLを試す。1x1のプレースホルダーGIFは失敗扱い。
async function fetchProductImage(asin) {
  const url = `https://images-fe.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return null
    const buf = new Uint8Array(await res.arrayBuffer())
    if (buf.length < 500) return null // 1x1プレースホルダーGIF等
    const isJpeg = buf[0] === 0xff && buf[1] === 0xd8
    const isPng = buf[0] === 0x89 && buf[1] === 0x50
    if (!isJpeg && !isPng) return null
    return url
  } catch {
    return null
  }
}

// 簡易な同時実行数制限付きmap
async function pMap(items, fn, concurrency) {
  const results = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

async function run() {
  let totalCards = 0
  let titleFixed = 0
  let imagesAdded = 0
  const preview = []

  for (const relPath of FILES) {
    const filePath = path.join(process.cwd(), relPath)
    const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    for (const article of articles) {
      const matches = [...article.html.matchAll(FULL_CARD_RE)]
      if (matches.length === 0) continue

      const results = await pMap(matches, async (match) => {
        const [full, url, type, icon, label, oldTitle] = match
        totalCards++

        let resolved = null
        if (type === 'amazon') resolved = await resolveAmazon(url)

        let imageUrl = null
        if (resolved) imageUrl = await fetchProductImage(resolved.asin)

        const kind = classifyJunk(oldTitle)
        let newTitle = oldTitle
        if (kind) {
          const mangaTitle = extractMangaTitle(article.title)
          if (kind === 'star') {
            newTitle = mangaTitle ? `『${mangaTitle}』を見る` : (resolved?.slugTitle ? truncate(resolved.slugTitle) : truncate(article.title))
          } else if (kind === 'bullet') {
            const bLabel = oldTitle.replace(/^・/, '').replace(/&nbsp;/g, '').trim()
            newTitle = mangaTitle ? `『${mangaTitle}』${bLabel}` : `${truncate(article.title, 30)} - ${bLabel}`
          } else {
            // sign-off
            newTitle = resolved?.slugTitle ? truncate(resolved.slugTitle) : (mangaTitle ? `『${mangaTitle}』` : truncate(article.title))
          }
        }

        return { full, url, type, icon, label, oldTitle, newTitle, imageUrl }
      }, CONCURRENCY)

      for (const r of results) {
        let newFull = r.full
        if (r.newTitle !== r.oldTitle) {
          newFull = newFull.replace(
            `<span class="affiliate-card__title">${r.oldTitle}</span>`,
            `<span class="affiliate-card__title">${r.newTitle}</span>`
          )
          titleFixed++
        }
        if (r.imageUrl) {
          newFull = newFull.replace(
            `<span class="affiliate-card__icon">${r.icon}</span>`,
            `<span class="affiliate-card__icon affiliate-card__icon--photo"><img class="affiliate-card__thumb" src="${r.imageUrl}" alt="${r.newTitle}" loading="lazy" /></span>`
          )
          imagesAdded++
        }
        if (newFull !== r.full) {
          article.html = article.html.replace(r.full, newFull)
          preview.push({ article: article.title, url: r.url, oldTitle: r.oldTitle, newTitle: r.newTitle, hasImage: !!r.imageUrl })
        }
      }
    }

    if (WRITE) {
      fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8')
    }
  }

  console.log(`対象カード総数: ${totalCards}`)
  console.log(`タイトル修正: ${titleFixed}件`)
  console.log(`画像追加: ${imagesAdded}件`)
  console.log(WRITE ? '\n書き込みました。' : '\n--write を付けると実際に書き込みます。')

  console.log('\n--- 画像が付いたものの例（先頭20件） ---')
  preview.filter(p => p.hasImage).slice(0, 20).forEach(p => {
    console.log(`[${p.article}] ${JSON.stringify(p.newTitle)}`)
  })

  console.log('\n--- タイトルのみ修正（画像なし）の例（先頭15件） ---')
  preview.filter(p => !p.hasImage && p.newTitle !== p.oldTitle).slice(0, 15).forEach(p => {
    console.log(`[${p.article}] ${JSON.stringify(p.oldTitle)} -> ${JSON.stringify(p.newTitle)}`)
  })
}

run()
