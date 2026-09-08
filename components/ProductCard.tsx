import { CATEGORY_META, getPurchaseLabel, getPurchaseUrl, type Product } from '@/lib/affiliate-products'

const PURCHASE_BUTTON_COLOR: Record<string, string> = {
  amazon: '#FF9900',
  anbernic: '#22262B',
  rakuten: '#BF0000',
}

export default function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORY_META[product.category]
  const purchaseUrl = getPurchaseUrl(product)
  const purchaseColor = PURCHASE_BUTTON_COLOR[product.platform ?? 'amazon']

  return (
    <div className="flex flex-col border border-[#EBEBEB] rounded-2xl overflow-hidden hover:border-[#2D6A4F] transition-colors bg-white">
      <div className="aspect-square overflow-hidden flex items-center justify-center" style={{ background: cat.bg }}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-6" />
        ) : (
          <span className="text-[48px]" aria-hidden>{cat.icon}</span>
        )}
      </div>
      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-[16px] font-extrabold tracking-[-0.02em] leading-[1.4]">{product.name}</h3>
        <p className="mt-2 text-[13.5px] leading-[1.75] text-[#444444] flex-1">{product.comment}</p>
        <div className="mt-4 flex gap-2">
          {product.articleUrl && (
            <a
              href={product.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[12.5px] font-semibold text-[#2D6A4F] border border-[#2D6A4F] px-3 py-[9px] rounded-lg hover:bg-[#F0F7F4] transition-colors"
            >
              元記事を読む
            </a>
          )}
          <a
            href={purchaseUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="flex-1 text-center text-[12.5px] font-bold text-white px-3 py-[9px] rounded-lg transition-colors"
            style={{ background: purchaseColor }}
          >
            {getPurchaseLabel(product)}
          </a>
        </div>
      </div>
    </div>
  )
}
