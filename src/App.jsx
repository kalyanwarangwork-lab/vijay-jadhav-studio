import { useState, useCallback, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Gallery from './components/Gallery'
import Lightbox from './components/Lightbox'
import { paintings } from './data/paintings'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [lightboxPainting, setLightboxPainting] = useState(null)

  useEffect(() => {
    const sections = [
      { id: 'about', elId: 'about' },
      ...paintings.map(p => ({ id: p.id, elId: `painting-${p.id}` })),
    ]

    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.4
      let active = sections[0].id
      for (const { id, elId } of sections) {
        const el = document.getElementById(elId)
        if (el && el.offsetTop <= scrollMid) active = id
      }
      setActiveSection(active)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSidebarClick = useCallback((id) => {
    setActiveSection(id)
    const el = document.getElementById(id === 'about' ? 'about' : `painting-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="app">
      <Sidebar activeSection={activeSection} onSelect={handleSidebarClick} />
      <Gallery onOpenLightbox={setLightboxPainting} />
      {lightboxPainting && (
        <Lightbox
          painting={lightboxPainting}
          onClose={(next) => setLightboxPainting(next)}
        />
      )}
    </div>
  )
}

export default App
