import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Mail, CheckCircle2, Send, MessageSquare, HeartHandshake } from 'lucide-react'
import './CTA.css'

interface ActionCard {
  id: 'contact' | 'mentor'
  title: string
  desc: string
  linkText: string
  icon: any
}

const actions: ActionCard[] = [
  {
    id: 'contact',
    title: 'Contact Us',
    desc: 'Have an idea, project, partnership inquiry or looking to explore how ETA can work with your organisation? Get in touch with our team.',
    linkText: 'Send a Message',
    icon: MessageSquare
  },
  {
    id: 'mentor',
    title: 'Volunteer as Mentor',
    desc: 'Are you a tech veteran or industry practitioner? Lend your voice, review code, or teach a class of aspiring ethical builders across Africa.',
    linkText: 'Apply as Mentor',
    icon: HeartHandshake
  }
]

const CTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<'contact' | 'mentor'>('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry / Contact',
    role: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  // Listen for escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleOpenModal = (e: React.MouseEvent, type: 'contact' | 'mentor') => {
    e.preventDefault()
    setSelectedType(type)
    setFormData(prev => ({
      ...prev,
      category: type === 'mentor' ? 'Volunteer / Mentor Application' : 'General Inquiry / Contact'
    }))
    setSubmitted(false)
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    
    // Construct mailto link as reliable direct transport fallback
    const subject = encodeURIComponent(`[ETA Website Inquiry] ${formData.category} - from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Category: ${formData.category}\n` +
      `Role / Organization: ${formData.role || 'N/A'}\n\n` +
      `Message:\n${formData.message}\n`
    )
    
    // Attempt mailto trigger in background
    setTimeout(() => {
      window.location.href = `mailto:ebibimantech@gmail.com?subject=${subject}&body=${body}`
    }, 600)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  } as any

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  return (
    <section className="cta-section" id="contact">
      <div className="cta-container">
        
        {/* Header Block */}
        <motion.div 
          className="cta-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="section-eyebrow">Get Involved</span>
          <h2 className="section-title">
            Help Build This <span className="gold-text">Future Together</span>
          </h2>
          <p className="cta-subtitle">
            Ethical technology is not a solo effort. We work with academic institutions, technology companies, developers, and organizations across the continent.
          </p>
        </motion.div>

        {/* 2 Action Cards */}
        <motion.div 
          className="cta-action-cards-grid cta-two-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {actions.map((act) => {
            const Icon = act.icon
            return (
              <motion.div className="cta-action-card" key={act.id} variants={fadeUp}>
                <div className="cta-card-header-row">
                  <h4 className="cta-act-title">{act.title}</h4>
                  <div className="cta-act-icon-wrap">
                    <Icon size={18} />
                  </div>
                </div>
                <p className="cta-act-desc">{act.desc}</p>
                
                <div className="cta-act-btn-row">
                  <button 
                    type="button" 
                    onClick={(e) => handleOpenModal(e, act.id)} 
                    className="btn-cta-act"
                  >
                    <span>{act.linkText}</span>
                    <ArrowRight className="cta-btn-arrow" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>

      {/* Mini Popup Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="cta-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div 
              className="cta-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button 
                type="button" 
                className="cta-modal-close" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {!submitted ? (
                <>
                  <div className="cta-modal-header">
                    <div className="cta-modal-badge">
                      <Mail size={13} />
                      <span>Direct Dispatch · ebibimantech@gmail.com</span>
                    </div>
                    <h3 className="cta-modal-title">
                      {selectedType === 'mentor' ? 'Volunteer as a Mentor' : 'Contact Ebibiman Tech Alliance'}
                    </h3>
                    <p className="cta-modal-desc">
                      Send us a note below and our team will get in touch directly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="cta-modal-form">
                    <div className="cta-form-row">
                      <div className="cta-form-group">
                        <label htmlFor="cta-name">Your Full Name</label>
                        <input 
                          id="cta-name"
                          type="text" 
                          required 
                          placeholder="e.g. Kwame Mensah"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="cta-form-group">
                        <label htmlFor="cta-email">Email Address</label>
                        <input 
                          id="cta-email"
                          type="email" 
                          required 
                          placeholder="kwame@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="cta-form-row">
                      <div className="cta-form-group">
                        <label htmlFor="cta-category">Inquiry Category</label>
                        <select 
                          id="cta-category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          <option value="General Inquiry / Contact">General Inquiry / Contact</option>
                          <option value="Volunteer / Mentor Application">Volunteer / Mentor Application</option>
                          <option value="Partnership / Institutional Work">Partnership / Institutional Work</option>
                          <option value="Technology Solutions & Consulting">Technology Solutions & Consulting</option>
                        </select>
                      </div>

                      <div className="cta-form-group">
                        <label htmlFor="cta-role">Role / Organization (Optional)</label>
                        <input 
                          id="cta-role"
                          type="text" 
                          placeholder="e.g. Software Engineer, Researcher, Student"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="cta-form-group">
                      <label htmlFor="cta-message">
                        {selectedType === 'mentor' 
                          ? 'Tell us about your background and how you would like to mentor' 
                          : 'Your Message'}
                      </label>
                      <textarea 
                        id="cta-message"
                        rows={4}
                        required
                        placeholder="Write your note or project summary here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button type="submit" className="cta-modal-submit-btn">
                      <span>Send Message to ebibimantech@gmail.com</span>
                      <Send size={14} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="cta-modal-success">
                  <CheckCircle2 size={54} className="cta-success-icon" />
                  <h3 className="cta-modal-title">Thank You, {formData.name}!</h3>
                  <p className="cta-modal-desc">
                    Your message has been processed. If your email client did not automatically launch, you can also write to us directly at:
                  </p>
                  <a href="mailto:ebibimantech@gmail.com" className="cta-success-email">
                    ebibimantech@gmail.com
                  </a>
                  <button 
                    type="button" 
                    className="cta-modal-close-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CTA

