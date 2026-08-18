import { useEffect, useRef, useState } from 'react'
import './PaintingCard.css'

export default function PaintingCard({ painting, onOpen }) {
  const [revealed, setRevealed] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`painting-card ${revealed ? 'revealed' : ''}`}
      onClick={() => onOpen(painting)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(painting)}
      aria-label={`View ${painting.title}`}
    >
      <div className="painting-card-image-wrap" style={{ background: painting.gradient }}>
        <img
          src={import.meta.env.BASE_URL + painting.image.slice(1)}
          alt={painting.title}
          className="painting-card-photo"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <div className="painting-card-overlay">
        <span className="painting-card-title">{painting.title}</span>
        <span className="painting-card-year">{painting.year}</span>
      </div>
    </div>
  )
}
