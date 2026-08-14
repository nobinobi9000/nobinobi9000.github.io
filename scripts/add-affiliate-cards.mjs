// アーカイブ記事内の Amazon/A8 単体リンク段落を、本文の文脈テキストをタイトルにした
// カード表示に変換する一回限りのスクリプト。
// 実行: node scripts/add-affiliate-cards.mjs

import fs from 'node:fs'
import path from 'node:path'

const FILES = ['lib/note-archive-nobi1.json', 'lib/note-archive-nobi2.json']

// 単体リンク段落（<p ...><a href="URL">URL</a></p>）を検出
const LINK_PARA_RE = /<p[^>]*><a href="(https?:\/\/[^"]+)">\1<\/a><\/p>/g

// アフィリエイト対象ドメイン判定
function classify(url) {
  let host = ''
  try { host = new URL(url).hostname } catch { return null }
  if (host.includes('amzn.to') || host.includes('amazon.co.jp') || host.includes('link.amazon')) {
    return { type: 'amazon', label: 'Amazon', icon: '🛒' }
  }
  if (host.includes('a8.net')) {
    return { type: 'a8', label: 'PR', icon: '🏷️' }
  }
  return null
}

// 上位ブロック要素（p, h1-h4, blockquote）を出現順に抽出
const BLOCK_RE = /<(p|h1|h2|h3|h4|blockquote)[^>]*>[\s\S]*?<\/\1>/g

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function isLinkOnlyBlock(block) {
  return /^<p[^>]*><a href="https?:\/\/[^"]+">https?:\/\/[^"]+<\/a><\/p>$/.test(block)
}

function buildCard(url, info, title) {
  const safeTitle = title || (info.type === 'amazon' ? 'Amazonで商品を見る' : '商品ページを見る')
  return `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="affiliate-card affiliate-card--${info.type}">` +
    `<span class="affiliate-card__icon">${info.icon}</span>` +
    `<span class="affiliate-card__body">` +
      `<span class="affiliate-card__label">${info.label}</span>` +
      `<span class="affiliate-card__title">${safeTitle}</span>` +
    `</span>` +
    `<span class="affiliate-card__arrow">→</span>` +
  `</a>`
}

let totalConverted = 0

for (const relPath of FILES) {
  const filePath = path.join(process.cwd(), relPath)
  const articles = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  let fileConverted = 0

  for (const article of articles) {
    const blocks = article.html.match(BLOCK_RE)
    if (!blocks) continue

    // 各ブロックの前方にある「直近の非リンク段落テキスト」をあらかじめ計算
    let lastText = null
    const titleForBlock = new Map()
    for (const block of blocks) {
      if (isLinkOnlyBlock(block)) {
        titleForBlock.set(block, lastText)
      } else {
        const text = stripTags(block)
        if (text) lastText = text.length > 50 ? text.slice(0, 50) + '…' : text
      }
    }

    article.html = article.html.replace(LINK_PARA_RE, (full, url) => {
      const info = classify(url)
      if (!info) return full
      const title = titleForBlock.get(full) ?? null
      fileConverted++
      totalConverted++
      return buildCard(url, info, title)
    })
  }

  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8')
  console.log(`${relPath}: ${fileConverted}件をカード化`)
}

console.log(`合計 ${totalConverted}件をカード化しました`)
