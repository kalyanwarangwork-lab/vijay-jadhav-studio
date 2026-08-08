import { useEffect, useRef, useState } from 'react'
import './PaintingCard.css'

export default function PaintingCard({ painting, onOpen }) {
  const [revealed, setRevealed] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const [w, h] = painting.aspectRatio.split('/').map(Number)
  const isLandscape = w > h

  return (
    <section
      id={`painting-${painting.id}`}
      className="painting-card"
      ref={cardRef}
    >
      <div className={`painting-layout ${isLandscape ? 'landscape' : 'portrait'}`}>
        <div
          className="painting-image-wrapper"
          style={{ aspectRatio: painting.aspectRatio }}
          onClick={() => onOpen(painting)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onOpen(painting)}
          aria-label={`View ${painting.title} fullscreen`}
        >
          <div
            className={`painting-image ${revealed ? 'revealed' : ''}`}
            style={{ background: painting.gradient }}
          >
            <img
              src={import.meta.env.BASE_URL + painting.image.slice(1)}
              alt={painting.title}
              className="painting-photo"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>
        </div>
        <div className={`painting-meta ${revealed ? 'visible' : ''}`}>
          <h2 className="meta-title">{painting.title}</h2>
          <p className="meta-details">
            <span>{painting.year}</span>
            <span className="dot" aria-hidden="true">·</span>
            <span>{painting.medium}</span>
            <span className="dot" aria-hidden="true">·</span>
            <span>{painting.dimensions}</span>
          </p>
          {painting.description && (
            <p className="meta-description">{painting.description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
