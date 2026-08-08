import { paintings } from '../data/paintings'
import './Sidebar.css'

export default function Sidebar({ activeSection, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="studio-name">Vijay Jadhav</h1>
        <span className="studio-label">Studio</span>
      </div>
      <nav className="painting-list">
        <button
          className={`painting-item about-item ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => onSelect('about')}
        >
          <span className="painting-number">—</span>
          <span className="painting-name">About</span>
        </button>

        <div className="nav-divider" />

        <button
          className={`painting-item about-item ${activeSection !== 'about' ? 'active' : ''}`}
          onClick={() => onSelect(1)}
        >
          <span className="painting-number">—</span>
          <span className="painting-name">Paintings</span>
        </button>

        {paintings.map((painting, index) => (
          <button
            key={painting.id}
            className={`painting-item painting-subitem ${activeSection === painting.id ? 'active' : ''}`}
            onClick={() => onSelect(painting.id)}
          >
            <span className="painting-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="painting-name">{painting.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
