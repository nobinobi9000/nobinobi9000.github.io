'use client'
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { CATEGORY_META, CATEGORY_ORDER, type Product, type ProductCategory } from '@/lib/affiliate-products'

type ArticleOption = { label: string; value: string }

const EMPTY_FORM = {
  category: 'gadget' as ProductCategory,
  tagsText: '',
  name: '',
  comment: '',
  articleUrl: '',
  amazonUrl: '',
  imageUrl: '',
}

export default function PicksAdminClient({
  articles,
  initialProducts,
}: {
  articles: ArticleOption[]
  initialProducts: Product[]
}) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [products, setProducts] = useState(initialProducts)
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const previewProduct: Product = {
    id: 'preview',
    category: form.category,
    tags: form.tagsText.split(',').map(t => t.trim()).filter(Boolean),
    name: form.name || '商品名がここに表示されます',
    comment: form.comment || 'ひとことコメントがここに表示されます',
    articleUrl: form.articleUrl || undefined,
    amazonUrl: form.amazonUrl || '#',
    imageUrl: form.imageUrl,
    addedAt: '',
  }

  function update<K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.comment || !form.amazonUrl) {
      setStatus('error')
      setErrorMsg('商品名・コメント・Amazonリンクは必須です')
      return
    }
    setStatus('saving')
    setErrorMsg('')

    const res = await fetch('/api/admin/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: form.category,
        tags: form.tagsText.split(',').map(t => t.trim()).filter(Boolean),
        name: form.name,
        comment: form.comment,
        articleUrl: form.articleUrl,
        amazonUrl: form.amazonUrl,
        imageUrl: form.imageUrl,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setStatus('error')
      setErrorMsg(data.error ?? '追加に失敗しました')
      return
    }

    setProducts(p => [data.product, ...p])
    setForm(EMPTY_FORM)
    setStatus('idle')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #EBEBEB',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
  }
  const labelStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 700, color: '#444', marginBottom: '6px', display: 'block' }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 800 }}>おすすめ商品を追加</h1>
      <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>
        このツールは「npm run dev」のローカル実行時のみ使用できます。追加後は git commit / push でサイトに反映してください。
      </p>

      <div style={{ marginTop: '32px', display: 'grid', gap: '32px', gridTemplateColumns: 'minmax(320px, 480px) 1fr' }}>
        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={labelStyle}>カテゴリ</label>
            <select
              value={form.category}
              onChange={e => update('category', e.target.value as ProductCategory)}
              style={inputStyle}
            >
              {CATEGORY_ORDER.map(cat => (
                <option key={cat} value={cat}>{CATEGORY_META[cat].icon} {CATEGORY_META[cat].label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>商品名 *</label>
            <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="例: MOFT ノートPCスタンド" />
          </div>

          <div>
            <label style={labelStyle}>ひとことコメント *</label>
            <textarea
              style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
              value={form.comment}
              onChange={e => update('comment', e.target.value)}
              placeholder="なぜ良かったか、体験ベースで一言"
            />
          </div>

          <div>
            <label style={labelStyle}>タグ（カンマ区切り）</label>
            <input style={inputStyle} value={form.tagsText} onChange={e => update('tagsText', e.target.value)} placeholder="例: 充電器, PC周辺機器" />
          </div>

          <div>
            <label style={labelStyle}>元記事リンク（任意）</label>
            <input
              style={inputStyle}
              list="article-options"
              value={form.articleUrl}
              onChange={e => update('articleUrl', e.target.value)}
              placeholder="コラム記事から選ぶ、または note.com のURLを直接入力"
            />
            <datalist id="article-options">
              {articles.map(a => (
                <option key={a.value} value={a.value} label={a.label} />
              ))}
            </datalist>
          </div>

          <div>
            <label style={labelStyle}>AmazonアソシエイトURL *</label>
            <input style={inputStyle} value={form.amazonUrl} onChange={e => update('amazonUrl', e.target.value)} placeholder="https://amzn.to/xxxxx" />
          </div>

          <div>
            <label style={labelStyle}>商品画像URL（任意）</label>
            <input style={inputStyle} value={form.imageUrl} onChange={e => update('imageUrl', e.target.value)} placeholder="空欄でも崩れません" />
          </div>

          {status === 'error' && (
            <p style={{ color: '#DC2626', fontSize: '13px' }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'saving'}
            style={{
              padding: '12px 20px',
              background: status === 'saving' ? '#999' : '#2D6A4F',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: status === 'saving' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'saving' ? '追加中...' : '追加する'}
          </button>
        </form>

        {/* PREVIEW */}
        <div>
          <div style={labelStyle}>プレビュー</div>
          <div style={{ maxWidth: '300px' }}>
            <ProductCard product={previewProduct} />
          </div>

          <div style={{ marginTop: '40px' }}>
            <div style={labelStyle}>登録済み商品（{products.length}件）</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
              {products.map(p => (
                <div key={p.id} style={{ padding: '10px 14px', border: '1px solid #EBEBEB', borderRadius: '8px', fontSize: '13px' }}>
                  <span style={{ marginRight: '6px' }}>{CATEGORY_META[p.category].icon}</span>
                  <strong>{p.name}</strong>
                  <span style={{ color: '#999', marginLeft: '8px' }}>{p.addedAt}</span>
                </div>
              ))}
              {products.length === 0 && <p style={{ color: '#999', fontSize: '13px' }}>まだ商品がありません</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
