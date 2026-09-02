'use client'
import { useMemo, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getProductsByCategory,
  getTagsForProducts,
  type Product,
  type ProductCategory,
} from '@/lib/affiliate-products'

type FilterKey = 'all' | ProductCategory

export default function PicksClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<FilterKey>('all')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const categoryFiltered = useMemo(
    () => (activeCategory === 'all' ? products : getProductsByCategory(products, activeCategory)),
    [products, activeCategory]
  )

  const tagsInCategory = useMemo(() => getTagsForProducts(categoryFiltered), [categoryFiltered])

  const visible = useMemo(
    () => (activeTag ? categoryFiltered.filter(p => p.tags.includes(activeTag)) : categoryFiltered),
    [categoryFiltered, activeTag]
  )

  const filters: { key: FilterKey; label: string; icon?: string }[] = [
    { key: 'all', label: 'すべて' },
    ...CATEGORY_ORDER.map(key => ({ key, label: CATEGORY_META[key].label, icon: CATEGORY_META[key].icon })),
  ]

  function selectCategory(key: FilterKey) {
    setActiveCategory(key)
    setActiveTag(null)
  }

  return (
    <>
      {/* Category Filter */}
      <div className="mt-9 flex gap-[10px] flex-wrap">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => selectCategory(f.key)}
            className={`px-[18px] py-[9px] text-[14px] font-semibold rounded-full border-[1.5px] transition-colors ${
              activeCategory === f.key
                ? 'border-[#2D6A4F] bg-[#F0F7F4] text-[#2D6A4F]'
                : 'border-[#EBEBEB] bg-white text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
            }`}
          >
            {f.icon ? `${f.icon} ` : ''}{f.label}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      {tagsInCategory.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-[6px] text-[12.5px] font-medium rounded-md border transition-colors ${
              activeTag === null
                ? 'border-[#2D6A4F] text-[#2D6A4F] bg-[#F0F7F4]'
                : 'border-[#EBEBEB] text-[#444444] bg-[#F7F7F7] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
            }`}
          >
            タグ: すべて
          </button>
          {tagsInCategory.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-[6px] text-[12.5px] font-medium rounded-md border transition-colors ${
                activeTag === tag
                  ? 'border-[#2D6A4F] text-[#2D6A4F] bg-[#F0F7F4]'
                  : 'border-[#EBEBEB] text-[#444444] bg-[#F7F7F7] hover:border-[#2D6A4F] hover:text-[#2D6A4F]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="mt-10">
        {visible.length > 0 ? (
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {visible.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[15px] text-[#999999]">
            このカテゴリの商品は準備中です。近日追加予定！
          </div>
        )}
      </div>
    </>
  )
}
