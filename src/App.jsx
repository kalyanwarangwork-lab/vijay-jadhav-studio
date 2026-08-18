import { useState, useCallback, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Gallery from './components/Gallery'
import Lightbox from './components/Lightbox'
import { projects } from './data/paintings'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [lightboxPainting, setLightboxPainting] = useState(null)

  useEffect(() => {
    const sections = [
      { id: 'about', elId: 'about' },
      ...projects.map(p => ({ id: p.id, elId: `project-${p.id}` })),
      { id: 'contact', elId: 'contact' },
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
    const elId = id === 'about' ? 'about' : id === 'contact' ? 'contact' : `project-${id}`
    const el = document.getElementById(elId)
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
