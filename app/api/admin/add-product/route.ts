import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'
import { CATEGORY_ORDER, type Product, type ProductCategory } from '@/lib/affiliate-products'

const FILE_PATH = path.join(process.cwd(), 'lib', 'affiliate-products.json')
const VALID_CATEGORIES: ProductCategory[] = CATEGORY_ORDER

function isAuthorized(request: NextRequest): boolean {
  const token = request.cookies.get('admin-token')?.value
  return !!token && token === process.env.ADMIN_SECRET
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const body = await request.json()
  const { category, tags, name, comment, articleUrl, amazonUrl, imageUrl } = body

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: 'カテゴリが不正です' }, { status: 400 })
  }
  if (!name || !comment || !amazonUrl) {
    return NextResponse.json({ error: '必須項目が不足しています' }, { status: 400 })
  }

  let products: Product[]
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf-8')
    products = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'データファイルの読み込みに失敗しました' }, { status: 500 })
  }

  const newProduct: Product = {
    id: `${category}-${Date.now()}`,
    category,
    tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
    name,
    comment,
    articleUrl,
    amazonUrl,
    imageUrl: imageUrl || '',
    addedAt: new Date().toISOString().slice(0, 10),
  }

  products.push(newProduct)

  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(products, null, 2) + '\n', 'utf-8')
  } catch {
    return NextResponse.json(
      { error: 'ファイルへの書き込みに失敗しました。このツールは「npm run dev」でのローカル実行時のみ使用できます（本番環境では書き込めません）。' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, product: newProduct })
}
