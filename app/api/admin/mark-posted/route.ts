import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function POST(request: NextRequest) {
  const { pageId } = await request.json()

  await notion.pages.update({
    page_id: pageId,
    properties: {
      'X投稿済み': { checkbox: true },
    },
  })

  return NextResponse.json({ ok: true })
}
