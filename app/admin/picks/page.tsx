import { getAllArchiveArticles } from '@/lib/note-archive'
import { getAllProducts } from '@/lib/affiliate-products'
import PicksAdminClient from './PicksAdminClient'

export const dynamic = 'force-dynamic'

export default function PicksAdminPage() {
  const articles = getAllArchiveArticles()
    .map(a => ({ label: a.title, value: `/column/${a.slug}` }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const products = getAllProducts()

  return <PicksAdminClient articles={articles} initialProducts={products} />
}
