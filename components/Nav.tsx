'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/apps', label: 'Apps' },
  { href: '/blog', label: 'Blog' },
  { href: '/column', label: 'コラム' },
  { href: '/picks', label: 'おすすめ' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-saturate-[180%] backdrop-blur-[12px] border-b border-[#EBEBEB]">
      <nav className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between gap-6">
        <Link href="/" className="text-[20px] font-extrabold tracking-[-0.02em]">
          nobi-<span className="text-[#2D6A4F]">labo</span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-[14px] py-[9px] text-[14px] font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-[#2D6A4F] bg-[#F0F7F4] font-semibold'
                    : 'text-[#444444] hover:text-[#111111] hover:bg-[#F0F7F4]'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="ml-[6px] px-[18px] py-[10px] text-[14px] font-semibold text-white bg-[#2D6A4F] rounded-[9px] hover:bg-[#21503b] transition-colors"
          >
            Contact
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-[#111111] hover:bg-[#F0F7F4] transition-colors"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5H20M2 11H20M2 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden border-t border-[#EBEBEB] bg-white px-6 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-[14px] py-[10px] text-[15px] font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-[#2D6A4F] bg-[#F0F7F4] font-semibold'
                    : 'text-[#444444] hover:text-[#111111] hover:bg-[#F0F7F4]'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="mt-2 px-[18px] py-[12px] text-[15px] font-semibold text-white bg-[#2D6A4F] rounded-[9px] hover:bg-[#21503b] transition-colors text-center"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
