import { useEffect, useRef, useState } from 'react'
import './About.css'

export default function About() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className={`about-inner ${revealed ? 'revealed' : ''}`}>
        <div className="about-image-col">
          <div className="about-image-wrapper">
            <div className="about-image">
              <img
                src="/images/artist.jpg"
                alt="Vijay Jadhav"
                className="about-photo"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="about-text-col">
          <span className="about-label">About the Artist</span>
          <h2 className="about-name">Vijay Jadhav</h2>

          <p className="about-bio">
            Mumbai-born and trained at the Sir J.J. School of Art, Vijay Jadhav has spent
            two decades building a practice rooted in the art of seeing slowly. His canvases
            explore the quiet tension between memory and landscape — the quality of morning
            light on a coastal village, the stillness that precedes a monsoon, the particular
            weight of an afternoon that has nowhere to go.
          </p>
          <p className="about-bio">
            His work moves between oil and watercolour, each medium chosen for what it
            withholds as much as what it reveals. Figures dissolve into atmosphere. Colours
            are pushed toward feeling rather than fact. The result is painting that asks the
            viewer to slow down and stay a while.
          </p>
          <p className="about-bio">
            Jadhav's work has been exhibited across India and internationally. He lives and
            works in Pune.
          </p>

          <div className="about-details">
            <div className="about-detail">
              <span className="detail-label">Based in</span>
              <span className="detail-value">Pune, India</span>
            </div>
            <div className="about-detail">
              <span className="detail-label">Training</span>
              <span className="detail-value">Sir J.J. School of Art, Mumbai</span>
            </div>
            <div className="about-detail">
              <span className="detail-label">Medium</span>
              <span className="detail-value">Oil · Watercolour · Acrylic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
