import { useEffect, useRef, useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [revealed, setRevealed] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Studio enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:vijayjadhav@example.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className={`contact-inner ${revealed ? 'revealed' : ''}`}>
        <div className="contact-text-col">
          <span className="contact-label">Get in Touch</span>
          <h2 className="contact-heading">Contact</h2>
          <p className="contact-bio">
            For commissions, exhibitions, collaborations, or general enquiries,
            reach out using the form. Vijay responds to all messages personally.
          </p>
        </div>

        <div className="contact-form-col">
          {sent ? (
            <div className="contact-thanks">
              <p className="thanks-title">Thank you</p>
              <p className="thanks-sub">Your message is on its way.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell Vijay about your enquiry…"
                  rows={6}
                />
              </div>
              <button type="submit" className="form-submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
