import { useEffect, useRef, useState } from 'react'
import PaintingCard from './PaintingCard'
import './ProjectSection.css'

export default function ProjectSection({ project, paintings, onOpenLightbox }) {
  const [revealed, setRevealed] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id={`project-${project.id}`} className="project-section">
      <div ref={headerRef} className={`project-header ${revealed ? 'revealed' : ''}`}>
        <span className="project-label">{String(paintings.length).padStart(2, '0')} works</span>
        <h2 className="project-title">{project.title}</h2>
        <p className="project-description">{project.description}</p>
      </div>
      <div className="masonry-grid">
        {paintings.map(painting => {
          const [w, h] = painting.aspectRatio.split('/').map(Number)
          const isLandscape = w > h
          return (
            <div key={painting.id} className={`masonry-item ${isLandscape ? 'landscape' : 'portrait'}`}>
              <PaintingCard painting={painting} onOpen={onOpenLightbox} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
