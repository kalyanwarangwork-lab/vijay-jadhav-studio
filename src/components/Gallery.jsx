import { paintings } from '../data/paintings'
import PaintingCard from './PaintingCard'
import About from './About'
import './Gallery.css'

export default function Gallery({ onOpenLightbox }) {
  return (
    <main className="gallery">
      <About />
      {paintings.map((painting) => (
        <PaintingCard
          key={painting.id}
          painting={painting}
          onOpen={onOpenLightbox}
        />
      ))}
    </main>
  )
}
