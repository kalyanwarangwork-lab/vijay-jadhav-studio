import { projects } from '../data/paintings'
import './Sidebar.css'

export default function Sidebar({ activeSection, onSelect }) {
  const onProject = activeSection !== 'about'

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
          className={`painting-item about-item ${onProject ? 'active' : ''}`}
          onClick={() => onSelect(projects[0].id)}
        >
          <span className="painting-number">—</span>
          <span className="painting-name">Projects</span>
        </button>

        {projects.map(project => (
          <button
            key={project.id}
            className={`painting-item painting-subitem ${activeSection === project.id ? 'active' : ''}`}
            onClick={() => onSelect(project.id)}
          >
            <span className="painting-number">—</span>
            <span className="painting-name">{project.title}</span>
          </button>
        ))}

        <div className="nav-divider" />

        <button
          className={`painting-item about-item ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => onSelect('contact')}
        >
          <span className="painting-number">—</span>
          <span className="painting-name">Contact Us</span>
        </button>
      </nav>
    </aside>
  )
}
