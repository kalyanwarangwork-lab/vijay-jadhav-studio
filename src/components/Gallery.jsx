import About from './About'
import ProjectSection from './ProjectSection'
import Contact from './Contact'
import { projects, paintings } from '../data/paintings'
import './Gallery.css'

export default function Gallery({ onOpenLightbox }) {
  return (
    <main className="gallery">
      <About />
      {projects.map(project => (
        <ProjectSection
          key={project.id}
          project={project}
          paintings={paintings.filter(p => p.project === project.id)}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
      <Contact />
    </main>
  )
}
