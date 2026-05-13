import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function getUserCount(supabaseUrl: string | undefined, serviceKey: string | undefined): Promise<number | null> {
  if (!supabaseUrl || !serviceKey) return null
  try {
    const authUrl = `${supabaseUrl}/auth/v1/admin/users?per_page=1000&page=1`
    const res = await fetch(authUrl, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
      },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data.users) ? data.users.length : null
  } catch {
    return null
  }
}

async function getBlogStats() {
  try {
    const notion = new Client({ auth: process.env.NOTION_TOKEN })
    const today = new Date().toISOString().split('T')[0]

    const [totalRes, unpostedRes] = await Promise.all([
      notion.databases.query({
        database_id: process.env.NOTION_BLOG_DB_ID!,
        filter: {
          and: [
            { property: 'ステータス', status: { equals: '公開済み' } },
            { property: '公開日', date: { on_or_before: today } },
          ],
        },
      }),
      notion.databases.query({
        database_id: process.env.NOTION_BLOG_DB_ID!,
        filter: {
          and: [
            { property: 'ステータス', status: { equals: '公開済み' } },
            { property: '公開日', date: { on_or_before: today } },
            { property: 'X投稿済み', checkbox: { equals: false } },
          ],
        },
      }),
    ])

    return {
      total: totalRes.results.length,
      unposted: unpostedRes.results.length,
    }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: '認証エラー' }, { status: 401 })
  }

  const [comicUsers, questlogUsers, kabuNoteUsers, blogStats] = await Promise.all([
    getUserCount(process.env.COMIC_CHECKER_SUPABASE_URL, process.env.COMIC_CHECKER_SERVICE_ROLE_KEY),
    getUserCount(process.env.QUESTLOG_SUPABASE_URL, process.env.QUESTLOG_SERVICE_ROLE_KEY),
    getUserCount(process.env.KABU_NOTE_SUPABASE_URL, process.env.KABU_NOTE_SERVICE_ROLE_KEY),
    getBlogStats(),
  ])

  return NextResponse.json({
    apps: [
      {
        id: 'comic-checker',
        name: 'comic-checker',
        emoji: '📚',
        users: comicUsers,
        appUrl: 'https://comic.nobi-labo.com',
        supabaseUrl: 'https://supabase.com/dashboard/project/jrblstmpnkudjcbkytxm',
        vercelUrl: 'https://vercel.com/nonobinoi9000s-projects/comic-checker',
      },
      {
        id: 'questlog',
        name: 'QUESTLOG',
        emoji: '🗺️',
        users: questlogUsers,
        appUrl: 'https://gamelog.nobi-labo.com',
        supabaseUrl: 'https://supabase.com/dashboard/project/czrgdosmlwepuydsqqdy',
        vercelUrl: 'https://vercel.com/nonobinoi9000s-projects/questlog',
      },
      {
        id: 'kabu-note',
        name: 'Kabu Note',
        emoji: '💰',
        users: kabuNoteUsers,
        appUrl: 'https://kabu.nobi-labo.com',
        supabaseUrl: 'https://supabase.com/dashboard/project/nhkgyipjeithytqqfuda',
        vercelUrl: 'https://vercel.com/nonobinoi9000s-projects/kabu-note',
      },
    ],
    blog: blogStats,
    fetchedAt: new Date().toISOString(),
  })
}
