import productsData from './affiliate-products.json'

export type ProductCategory = 'retro-game' | 'money' | 'gadget' | 'manga-set'

export type Product = {
  id: string
  category: ProductCategory
  tags: string[]
  name: string
  comment: string
  articleUrl: string
  amazonUrl: string
  imageUrl?: string
  addedAt: string
}

export const CATEGORY_ORDER: ProductCategory[] = ['retro-game', 'money', 'gadget', 'manga-set']

export const CATEGORY_META: Record<ProductCategory, { label: string; icon: string; color: string; bg: string }> = {
  'retro-game': { label: 'レトロゲーム', icon: '🕹️', color: '#C2410C', bg: '#FDF1EB' },
  money:        { label: '投資・お金',   icon: '💰', color: '#92400E', bg: '#FBF4EC' },
  gadget:       { label: 'ガジェット',   icon: '🔌', color: '#2563EB', bg: '#F0F5FF' },
  'manga-set':  { label: 'マンガ全巻セット', icon: '📚', color: '#E8384F', bg: '#FDEEF0' },
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
