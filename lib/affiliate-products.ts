import productsData from './affiliate-products.json'

// assoc-tool（アソシエイトリンク管理ツール）側のカテゴリ構成に暫定的に合わせている。
// assoc-tool自体がまだ改良予定のため、この分類は今後変わる前提の仮のもの。
export type ProductCategory = 'gadget' | 'diy' | 'home' | 'nas' | 'manga' | 'license' | 'uncategorized'

export type Product = {
  id: string
  category: ProductCategory
  tags: string[]
  name: string
  comment: string
  articleUrl?: string
  amazonUrl: string
  imageUrl?: string
  addedAt: string
}

export const CATEGORY_ORDER: ProductCategory[] = ['gadget', 'diy', 'home', 'nas', 'manga', 'license', 'uncategorized']

export const CATEGORY_META: Record<ProductCategory, { label: string; icon: string; color: string; bg: string }> = {
  gadget:         { label: 'ガジェット', icon: '🔌', color: '#2563EB', bg: '#F0F5FF' },
  diy:            { label: 'DIY',        icon: '🛠️', color: '#C2410C', bg: '#FDF1EB' },
  home:           { label: 'ホーム',     icon: '🏠', color: '#92400E', bg: '#FBF4EC' },
  nas:            { label: 'NAS',        icon: '💾', color: '#6D28D9', bg: '#F5F1FC' },
  manga:          { label: 'マンガ',     icon: '📚', color: '#E8384F', bg: '#FDEEF0' },
  license:        { label: 'ライセンス', icon: '🔑', color: '#00897B', bg: '#E6F8F3' },
  uncategorized:  { label: '未分類',     icon: '📦', color: '#767B72', bg: '#F0EEE7' },
}

export function getAllProducts(): Product[] {
  return [...(productsData as Product[])].sort((a, b) => b.addedAt.localeCompare(a.addedAt))
}

export function getProductsByCategory(products: Product[], category: ProductCategory): Product[] {
  return products.filter(p => p.category === category)
}

export function getTagsForProducts(products: Product[]): string[] {
  const tags = new Set<string>()
  products.forEach(p => p.tags.forEach(t => tags.add(t)))
  return [...tags].sort()
}
