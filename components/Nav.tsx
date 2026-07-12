'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/apps', label: 'Apps' },
  { href: '/blog', label: 'Blog' },
  { href: '/column', label: 'コラム' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-saturate-[180%] backdrop-blur-[12px] border-b border-[#EBEBEB]">
      <nav className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between gap-6">
        <Link href="/" className="text-[20px] font-extrabold tracking-[-0.02em]">
          nobi-<span className="text-[#2D6A4F]">labo</span>
        </Link>
        <div className="flex items-center gap-2">
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
      </nav>
    </header>
  )
}
