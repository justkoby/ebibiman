import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, Mail, CheckCircle2, Send, Lightbulb, GraduationCap, Cpu, Loader2, ExternalLink } from 'lucide-react'
import './CTA.css'

type PathwayType = 'think' | 'learn' | 'build' | 'contact'

interface ActionCard {
  id: PathwayType
  title: string
  desc: string
  linkText: string
  icon: any
  categoryName: string
  modalTitle: string
  modalDesc: string
  href?: string
}

const pathways: ActionCard[] = [
  {
    id: 'think',
    title: 'THINK WITH US',
    desc: 'Researchers, institutions and partners exploring technology and African society.',
    linkText: 'CONTACT US',
    icon: Lightbulb,
    categoryName: 'Think With Us · Research & Institutional Partnership',
    modalTitle: 'Contact Us (Think With Us)',
    modalDesc: 'Collaborate on research, policy, ethical tech frameworks, and institutional initiatives.'
  },
  {
    id: 'learn',
    title: 'LEARN WITH US',
    desc: 'People and organisations developing capabilities for a changing technological environment.',
    linkText: 'EXPLORE ACADEMY',
    href: '#/academy',
    icon: GraduationCap,
    categoryName: 'Learn With Us · Academy & Capability Development',
    modalTitle: 'Explore Academy (Learn With Us)',
    modalDesc: 'Join our cohorts, masterclasses, and capacity-building programs across Africa.'
  },
  {
    id: 'build',
    title: 'BUILD WITH US',
    desc: 'Organisations solving real problems through technology, AI and intelligent systems.',
    linkText: 'EXPLORE SOLUTIONS',
    href: '#/solutions',
    icon: Cpu,
    categoryName: 'Build With Us · Technology Solutions & AI Systems',
    modalTitle: 'Explore Solutions (Build With Us)',
    modalDesc: 'Work with ETA to design, engineer, and deploy high-impact indigenous technology solutions.'
  }
]

const CTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>('think')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Think With Us · Research & Institutional Partnership',
    role: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatedGmailWeb, setGeneratedGmailWeb] = useState('')
  const [generatedMailto, setGeneratedMailto] = useState('')

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

  const handleOpenModal = (e: React.MouseEvent, pathway: PathwayType) => {
    e.preventDefault()
    setSelectedPathway(pathway)
    const activePathway = pathways.find(p => p.id === pathway)
    setFormData(prev => ({
      ...prev,
      category: activePathway ? activePathway.categoryName : 'General Inquiry / Contact'
    }))
    setIsSubmitting(false)
    setSubmitted(false)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const subjectText = `[ETA Website - ${formData.category}] from ${formData.name}`
    const bodyText =
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Pathway / Category: ${formData.category}\n` +
      `Role / Organization: ${formData.role || 'N/A'}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\nSubmitted via ETA Website Contact Form`

    const mailtoUrl = `mailto:ebibimantech@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ebibimantech@gmail.com&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`
    setGeneratedMailto(mailtoUrl)
    setGeneratedGmailWeb(gmailWebUrl)

    try {
      const minDelay = new Promise(resolve => setTimeout(resolve, 1400))
      const fetchPromise = fetch('https://formsubmit.co/ajax/ebibimantech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          role: formData.role || 'N/A',
          message: formData.message,
          _subject: subjectText,
          _template: 'table'
        })
      })

      await Promise.all([fetchPromise, minDelay])
    } catch (err) {
      console.warn('Network submit notice:', err)
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
    }
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

  const currentPathwayInfo = pathways.find(p => p.id === selectedPathway) || pathways[0]

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
            AFRICA'S TECHNOLOGICAL FUTURE IS ALREADY BEING BUILT.
            <span className="gold-text cta-title-highlight">
              LET'S MAKE SURE WE'RE BUILDING IT TOO.
            </span>
          </h2>
        </motion.div>

        {/* 3 Pathway Action Cards */}
        <motion.div 
          className="cta-action-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pathways.map((card) => {
            const Icon = card.icon
            return (
              <motion.div className="cta-action-card" key={card.id} variants={fadeUp}>
                <div className="cta-card-header-row">
                  <h4 className="cta-act-title">{card.title}</h4>
                  <div className="cta-act-icon-wrap">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="cta-act-desc">{card.desc}</p>
                
                <div className="cta-act-btn-row">
                  {card.href ? (
                    <a 
                      href={card.href} 
                      className="btn-cta-act"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight className="cta-btn-arrow" />
                    </a>
                  ) : (
                    <button 
                      type="button" 
                      onClick={(e) => handleOpenModal(e, card.id)} 
                      className="btn-cta-act"
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight className="cta-btn-arrow" />
                    </button>
                  )}
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
                      {currentPathwayInfo.modalTitle}
                    </h3>
                    <p className="cta-modal-desc">
                      {currentPathwayInfo.modalDesc}
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
                        <label htmlFor="cta-category">Pathway / Inquiry Focus</label>
                        <select 
                          id="cta-category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          <option value="Think With Us · Research & Institutional Partnership">Think With Us · Research & Institutional Partnership</option>
                          <option value="Learn With Us · Academy & Capability Development">Learn With Us · Academy & Capability Development</option>
                          <option value="Build With Us · Technology Solutions & AI Systems">Build With Us · Technology Solutions & AI Systems</option>
                          <option value="General Inquiry / Contact">General Inquiry / Contact</option>
                        </select>
                      </div>

                      <div className="cta-form-group">
                        <label htmlFor="cta-role">Role / Organisation (Optional)</label>
                        <input 
                          id="cta-role"
                          type="text" 
                          placeholder="e.g. Researcher, Founder, Engineer, Student"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="cta-form-group">
                      <label htmlFor="cta-message">
                        How would you like to collaborate or get involved?
                      </label>
                      <textarea 
                        id="cta-message"
                        rows={4}
                        required
                        placeholder="Tell us about your organization, idea, learning goals, or partnership interest..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="cta-modal-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="spinner-rotate" />
                          <span>Transmitting to ebibimantech@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Dispatch to ebibimantech@gmail.com</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="cta-modal-success">
                  <CheckCircle2 size={54} className="cta-success-icon" />
                  <h3 className="cta-modal-title">Thank You, {formData.name}!</h3>
                  <p className="cta-modal-desc">
                    Your inquiry has been transmitted to <strong>ebibimantech@gmail.com</strong>.
                  </p>
                  <div className="cta-success-actions">
                    {generatedGmailWeb && (
                      <a 
                        href={generatedGmailWeb} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cta-action-btn cta-gmail-btn"
                      >
                        <Mail size={15} />
                        <span>Open in Gmail Web</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <a 
                      href={generatedMailto || "mailto:ebibimantech@gmail.com"} 
                      className="cta-action-btn cta-mail-btn"
                    >
                      <Mail size={15} />
                      <span>Open in Mail App</span>
                    </a>
                  </div>
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
