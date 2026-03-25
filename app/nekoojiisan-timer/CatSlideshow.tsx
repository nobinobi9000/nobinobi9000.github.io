'use client'
import { useState, useEffect } from 'react'

const CAT_IMGS = Array.from({ length: 12 }, (_, i) =>
  `https://absolute-zero-meeting.vercel.app/cat_pic/cat${i + 1}.png`
)

export default function CatSlideshow() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx(prev => {
          let next
          do { next = Math.floor(Math.random() * CAT_IMGS.length) } while (next === prev)
          return next
        })
        setFade(true)
      }, 400)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '40px 0',
    }}>
      <div style={{
        width: '220px',
        height: '280px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '2px solid #2a2a2a',
        boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
        background: '#111',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CAT_IMGS[idx]}
          alt="ねこおじさん"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        gap: '6px',
      }}>
        {CAT_IMGS.map((_, i) => (
          <div key={i} style={{
            width: i === idx ? '16px' : '6px',
            height: '4px',
            borderRadius: '2px',
            background: i === idx ? 'var(--orange)' : '#333',
            transition: 'width 0.3s ease, background 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}
