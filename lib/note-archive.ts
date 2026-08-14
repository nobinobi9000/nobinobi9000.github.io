import fs from 'node:fs'
import path from 'node:path'

export type ArchiveArticle = {
  slug: string
  title: string
  originalUrl: string
  publishedAt: string | null
  account: 'nobi1' | 'nobi2'
  accountLabel: string
  accountColor: string
  accountBg: string
  accountUrlname: string
  html: string
}

function loadArchive(account: 'nobi1' | 'nobi2'): ArchiveArticle[] {
  const filePath = path.join(process.cwd(), 'lib', `note-archive-${account}.json`)
  if (!fs.existsSync(filePath)) return []
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as ArchiveArticle[]
  } catch {
    return []
  }
}

export function getAllArchiveArticles(): ArchiveArticle[] {
  return [...loadArchive('nobi1'), ...loadArchive('nobi2')]
}

export function getArchiveArticle(slug: string): ArchiveArticle | null {
  const all = getAllArchiveArticles()
  return all.find(a => a.slug === slug) ?? null
}

// note-podcastツール（音声化・ポッドキャスト配信ツール）が記事アップロードのたびに
// slug→音声URLのマッピングを書き込む。note-archive-*.json（記事本体）とは別ファイルにして、
// note記事の再インポート（scripts/import-note-archive.mjs、JSON全体を上書き）で
// 音声URLが消えないようにしている。
function loadAudioMap(): Record<string, string> {
  const filePath = path.join(process.cwd(), 'lib', 'note-audio-map.json')
  if (!fs.existsSync(filePath)) return {}
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Record<string, string>
  } catch {
    return {}
  }
}

export function getAudioUrl(slug: string): string | null {
  const map = loadAudioMap()
  return map[slug] ?? null
}
