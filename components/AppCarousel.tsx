'use client'
import { useState, useEffect, useCallback } from 'react'

type Slide = {
  src: string
  caption: string
}

export default function AppCarousel({
  slides,
  accentColor = '#2563EB',
  bgColor = '#F0F5FF',
}: {
  slides: Slide[]
  accentColor?: string
  bgColor?: string
}) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  const len = slides.length

  const go = useCallback((n: number) => {
    setIdx((n + len) % len)
  }, [len])

  useEffect(() => {
    if (len <= 1 || paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % len), 3000)
    return () => clearInterval(t)
  }, [len, paused])

  if (len === 0) return null

  if (len === 1) {
    return (
      <div className="flex justify-center">
        <div className="w-[220px] rounded-[22px] overflow-hidden border-2"
          style={{ borderColor: accentColor, boxShadow: `0 8px 32px ${accentColor}1f`, background: bgColor }}>
          <img src={slides[0].src} alt={slides[0].caption} className="w-full h-auto" />
        </div>
      </div>
    )
  }

  const prev = (idx - 1 + len) % len
  const next = (idx + 1) % len

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-6 px-16">
          {/* Prev ghost */}
          <div className="flex-none w-[130px] opacity-35 pointer-events-none" style={{ transform: 'scale(0.92)', transition: 'all 0.4s ease' }}>
            <div className="aspect-[9/19] border border-[#EBEBEB] rounded-[18px] overflow-hidden" style={{ background: bgColor }}>
              <img src={slides[prev].src} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Active */}
          <div className="flex-none w-[220px]">
            <div className="aspect-[9/19] border-2 rounded-[22px] overflow-hidden transition-all duration-400"
              style={{ borderColor: accentColor, boxShadow: `0 8px 32px ${accentColor}1f`, background: bgColor }}>
              <img src={slides[idx].src} alt={slides[idx].caption} className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 text-center text-[14px] font-semibold text-[#111111]">
              {slides[idx].caption}
            </div>
          </div>

          {/* Next ghost */}
          <div className="flex-none w-[130px] opacity-35 pointer-events-none" style={{ transform: 'scale(0.92)', transition: 'all 0.4s ease' }}>
            <div className="aspect-[9/19] border border-[#EBEBEB] rounded-[18px] overflow-hidden" style={{ background: bgColor }}>
              <img src={slides[next].src} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Prev button */}
        <button
          onClick={() => { setPaused(false); go(idx - 1) }}
          className="absolute left-0 top-1/2 -translate-y-[60%] w-11 h-11 rounded-full border-[1.5px] border-[#EBEBEB] bg-white flex items-center justify-center text-[18px] text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
        >
          ←
        </button>
        {/* Next button */}
        <button
          onClick={() => { setPaused(false); go(idx + 1) }}
          className="absolute right-0 top-1/2 -translate-y-[60%] w-11 h-11 rounded-full border-[1.5px] border-[#EBEBEB] bg-white flex items-center justify-center text-[18px] text-[#444444] hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="mt-7 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPaused(false); setIdx(i) }}
            className="h-2 rounded-full border-none transition-all duration-300 p-0"
            style={{
              width: i === idx ? '24px' : '8px',
              background: i === idx ? accentColor : '#EBEBEB',
            }}
          />
        ))}
      </div>
    </div>
  )
}
