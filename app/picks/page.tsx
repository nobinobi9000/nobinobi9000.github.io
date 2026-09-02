import type { Metadata } from 'next'
import Link from 'next/link'
import PicksClient from './PicksClient'
import { getAllProducts } from '@/lib/affiliate-products'

export const metadata: Metadata = {
  title: 'おすすめ',
  description: 'noteのコラムで紹介したレトロゲーム・投資/お金・ガジェット・マンガ全巻セットのおすすめ品まとめ。',
  alternates: { canonical: '/picks' },
}

export default function PicksPage() {
  const products = getAllProducts()

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-24">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">おすすめ</span>
        </div>
        <h1 className="font-extrabold tracking-[-0.03em] leading-[1.1]" style={{ fontSize: 'clamp(40px, 5.5vw, 68px)' }}>
          おすすめ
        </h1>
        <p className="mt-4 text-[17px] text-[#444444] leading-[1.7] max-w-[560px]">
          noteのコラムで紹介した、実際に使って良かったものだけをまとめました。
        </p>
        <p className="mt-3 text-[12.5px] text-[#999999] leading-[1.7]">
          本ページはAmazonアソシエイト・プログラムの参加者として、適格販売により収入を得ています。
        </p>

        <PicksClient products={products} />
      </section>
    </div>
  )
}
