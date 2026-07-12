import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#EBEBEB] mt-8">
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex items-center justify-between gap-6 flex-wrap">
        <Link href="/" className="text-[18px] font-extrabold tracking-[-0.02em]">
          nobi-<span className="text-[#2D6A4F]">labo</span>
        </Link>
        <div className="flex gap-7 text-[14px] text-[#444444]">
          <Link href="/about" className="hover:text-[#111111] transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-[#111111] transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-[#111111] transition-colors">Contact</Link>
        </div>
        <div className="text-[13px] text-[#999999]">© 2026 nobi-labo</div>
      </div>
    </footer>
  )
}
