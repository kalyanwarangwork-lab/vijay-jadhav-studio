import { useEffect, useCallback } from 'react'
import { paintings } from '../data/paintings'
import './Lightbox.css'

export default function Lightbox({ painting, onClose }) {
  const currentIndex = paintings.findIndex(p => p.id === painting.id)

  const goPrev = useCallback(() => {
    const prev = paintings[(currentIndex - 1 + paintings.length) % paintings.length]
    onClose(prev)
  }, [currentIndex, onClose])

  const goNext = useCallback(() => {
    const next = paintings[(currentIndex + 1) % paintings.length]
    onClose(next)
  }, [currentIndex, onClose])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose(null)
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  return (
    <div className="lightbox-overlay" onClick={() => onClose(null)}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={() => onClose(null)} aria-label="Close">×</button>

        <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Previous">‹</button>

        <div className="lightbox-image-wrap">
          <img
            src={import.meta.env.BASE_URL + painting.image.slice(1)}
            alt={painting.title}
            className="lightbox-image"
            style={{ background: painting.gradient }}
          />
        </div>

        <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Next">›</button>

        <div className="lightbox-caption">
          <span className="lightbox-title">{painting.title}</span>
          <span className="lightbox-dot">·</span>
          <span className="lightbox-details">{painting.year} · {painting.medium} · {painting.dimensions}</span>
        </div>
      </div>
    </div>
  )
}
