import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /column は note.com に原文がある複製コンテンツのため、AdSense/検索クローラーの
      // 到達自体を防ぐ（noindexだけではクロール自体は防げないため）
      disallow: ['/admin', '/admin/', '/api/', '/column', '/column/'],
    },
    sitemap: 'https://nobi-labo.com/sitemap.xml',
  }
}
