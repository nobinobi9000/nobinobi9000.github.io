'use client'
import { useState } from 'react'
import Link from 'next/link'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', type: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* PAGE HEADER */}
      <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-14">
        <div className="flex items-center gap-2 text-[13px] text-[#999999] mb-8">
          <Link href="/" className="hover:text-[#2D6A4F] transition-colors">nobi-labo</Link>
          <span>›</span>
          <span className="text-[#111111] font-medium">Contact</span>
        </div>
        <h1 className="font-extrabold tracking-[-0.03em] leading-[1.1]"
          style={{ fontSize: 'clamp(36px, 5vw, 62px)' }}>
          お問い合わせ・<br />ご連絡
        </h1>
        <p className="mt-[18px] text-[16px] text-[#999999]">2〜3営業日以内にご返信します。</p>
      </section>

      {/* FORM + SIDE */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid gap-20 items-start" style={{ gridTemplateColumns: 'minmax(0, 480px) 1fr' }}>

          {/* FORM */}
          {status === 'success' ? (
            <div className="bg-[#F0F7F4] rounded-2xl p-10 text-center">
              <div className="text-[48px] mb-4">✅</div>
              <h2 className="text-[22px] font-extrabold tracking-[-0.02em] mb-3">送信しました</h2>
              <p className="text-[15px] text-[#444444] leading-[1.8]">2〜3営業日以内にご返信します。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold flex items-center gap-2">
                  お名前
                  <span className="px-2 py-[2px] text-[11px] font-bold rounded text-white bg-[#2D6A4F]">必須</span>
                </label>
                <input
                  type="text"
                  placeholder="鈴木 太郎"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 text-[15px] border-[1.5px] border-[#EBEBEB] rounded-[10px] outline-none transition-colors focus:border-[#2D6A4F] placeholder:text-[#CCCCCC]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold flex items-center gap-2">
                  メールアドレス
                  <span className="px-2 py-[2px] text-[11px] font-bold rounded text-white bg-[#2D6A4F]">必須</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 text-[15px] border-[1.5px] border-[#EBEBEB] rounded-[10px] outline-none transition-colors focus:border-[#2D6A4F] placeholder:text-[#CCCCCC]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold">お問い合わせの種類</label>
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full px-4 py-3 text-[15px] border-[1.5px] border-[#EBEBEB] rounded-[10px] outline-none transition-colors focus:border-[#2D6A4F] bg-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    paddingRight: '40px',
                  }}
                >
                  <option value="">選択してください</option>
                  <option value="bug">アプリの不具合</option>
                  <option value="feature">機能のご要望</option>
                  <option value="collab">コラボレーション</option>
                  <option value="media">メディア取材</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold flex items-center gap-2">
                  メッセージ
                  <span className="px-2 py-[2px] text-[11px] font-bold rounded text-white bg-[#2D6A4F]">必須</span>
                </label>
                <textarea
                  placeholder="ご用件をご記入ください。"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  rows={6}
                  className="w-full px-4 py-3 text-[15px] border-[1.5px] border-[#EBEBEB] rounded-[10px] outline-none transition-colors focus:border-[#2D6A4F] placeholder:text-[#CCCCCC] resize-y leading-[1.7]"
                />
              </div>

              <p className="text-[12.5px] leading-[1.8] text-[#999999]">
                送信することで、
                <Link href="/privacy" className="text-[#2D6A4F] underline underline-offset-[2px]">プライバシーポリシー</Link>
                に同意したものとみなします。いただいた情報はお問い合わせへの返信のみに使用します。
              </p>

              {status === 'error' && (
                <p className="text-[14px] text-[#E8384F]">送信に失敗しました。時間をおいて再度お試しください。</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 text-[16px] font-bold text-white bg-[#2D6A4F] rounded-[11px] hover:bg-[#21503b] transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? '送信中...' : '送信する →'}
              </button>
            </form>
          )}

          {/* SIDE INFO */}
          <div className="flex flex-col gap-[18px] pt-1">
            <div className="bg-[#F7F7F7] rounded-2xl p-7">
              <div className="text-[12px] font-bold tracking-[0.08em] text-[#999999]">NOTE</div>
              <h3 className="mt-3 text-[17px] font-extrabold tracking-[-0.01em]">note でも発信中</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">
                開発の裏側・投資・マンガについて書いています。気軽なコメントはnoteへどうぞ。
              </p>
              <div className="mt-[18px] flex flex-col gap-[10px]">
                <a href="https://note.com/suzukidaichisan" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-[10px] text-[14px] font-semibold hover:text-[#00B899] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#00B899] flex-none" />
                  @suzukidaichisan →
                </a>
                <a href="https://note.com/nobi9000nobi" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-[10px] text-[14px] font-semibold hover:text-[#E8384F] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#E8384F] flex-none" />
                  @nobi-nobi →
                </a>
              </div>
            </div>

            <div className="bg-[#F7F7F7] rounded-2xl p-7">
              <div className="text-[12px] font-bold tracking-[0.08em] text-[#999999]">REPLY</div>
              <h3 className="mt-3 text-[17px] font-extrabold tracking-[-0.01em]">返信について</h3>
              <p className="mt-[10px] text-[14px] leading-[1.75] text-[#444444]">
                通常2〜3営業日以内にご返信します。アプリの不具合報告は優先的に対応します。スパムフィルターにより返信が届かない場合は、迷惑メールフォルダをご確認ください。
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
