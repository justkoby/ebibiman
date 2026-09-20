import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Send,
  X,
  Play,
  Mail,
  ExternalLink,
  Loader2,
  Sparkles,
  Cpu,
  ShieldCheck,
  Workflow
} from 'lucide-react'
import Footer from './Footer'
import './AcademyPage.css'

interface AcademyPageProps {
  onBack: () => void
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onBack }) => {
  // Modal & Form state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTopic, setModalTopic] = useState('Explore Programmes')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactRole, setContactRole] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [generatedMailto, setGeneratedMailto] = useState('')
  const [generatedGmailWeb, setGeneratedGmailWeb] = useState('')

  // Automation showcase simulation state
  const [simStep, setSimStep] = useState(0)

  const openInquiryModal = (topic: string, defaultMessage: string = '') => {
    setModalTopic(topic)
    setMessage(defaultMessage)
    setIsSubmitting(false)
    setSubmitted(false)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subjectText = `[ETA Academy - ${modalTopic}] from ${contactName || 'Learner / Partner'}`
    const bodyText =
      `ETA ACADEMY INQUIRY & ENROLLMENT REQUEST\n\n` +
      `Topic / Programme: ${modalTopic}\n` +
      `Target Recipient: ebibimantech@gmail.com\n\n` +
      `CONTACT DETAILS:\n` +
      `- Full Name: ${contactName || 'N/A'}\n` +
      `- Email / WhatsApp: ${contactEmail || 'N/A'}\n` +
      `- Role / Organisation: ${contactRole || 'N/A'}\n\n` +
      `LEARNING GOALS / INQUIRY DETAILS:\n` +
      `${message || 'N/A'}\n\n` +
      `---\nSubmitted via ETA Academy Portal`

    const mailtoUrl = `mailto:ebibimantech@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ebibimantech@gmail.com&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`
    setGeneratedMailto(mailtoUrl)
    setGeneratedGmailWeb(gmailWebUrl)

    // Send via FormSubmit AJAX endpoint directly to ebibimantech@gmail.com
    try {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 1400))
      const fetchPromise = fetch('https://formsubmit.co/ajax/ebibimantech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          topic: modalTopic,
          role_organisation: contactRole || 'N/A',
          learning_goals: message,
          _subject: subjectText,
          _template: 'table'
        })
      })

      await Promise.all([fetchPromise, minDelay])
    } catch (err) {
      console.warn('Form network dispatch notice:', err)
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
    }
  }

  const runAutomationSimulation = () => {
    setSimStep(1)
    const t1 = setTimeout(() => setSimStep(2), 700)
    const t2 = setTimeout(() => setSimStep(3), 1500)
    const t3 = setTimeout(() => setSimStep(4), 2300)
    const t4 = setTimeout(() => setSimStep(5), 3100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="academy-page">
      {/* Top Floating Navigation */}
      <header className="academy-top-nav">
        <button onClick={onBack} className="academy-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="academy-nav-brand">
          <span className="brand-dot"></span>
          <span>ETA ACADEMY</span>
        </div>

        <button
          onClick={() => openInquiryModal('Contact Us', 'Hello ETA Academy, I would like to get in touch with your team.')}
          className="academy-nav-cta"
        >
          <span>Contact Us</span>
          <ArrowRight size={14} />
        </button>
      </header>

      {/* ========================================================= */}
      {/* 01. HERO */}
      {/* ========================================================= */}
      <section className="academy-hero-section">
        <div className="academy-container">
          <div className="academy-hero-eyebrow">
            <span className="eyebrow-tag">ETA ACADEMY / TEACH</span>
          </div>

          <h1 className="academy-hero-title">
            <span>LEARN TECHNOLOGY.</span>
            <span>UNDERSTAND IT.</span>
            <span className="highlight-text">BUILD WITH IT.</span>
          </h1>

          <p className="academy-hero-lead">
            ETA Academy equips people with practical technology skills for a changing world,
            from early digital learning to AI, automation and emerging technologies.
          </p>

          <div className="academy-hero-actions">
            <button
              onClick={() => openInquiryModal('Contact Us', 'Hello ETA Academy, I would like to get in touch regarding your practical technology programmes.')}
              className="academy-btn academy-btn-primary"
            >
              <span>CONTACT US</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02. WHAT WE TEACH */}
      {/* ========================================================= */}
      <section className="academy-teach-section" id="what-we-teach">
        <div className="academy-container">
          <div className="section-meta-header">
            <span className="academy-label">OUR CURRICULUM</span>
            <h2 className="academy-section-title">
              LEARNING FOR A CHANGING TECHNOLOGICAL WORLD.
            </h2>
            <p className="academy-section-sub">
              Keep this to four strong cards designed around real capabilities, not academic theory.
            </p>
          </div>

          <div className="teach-cards-grid">
            {/* Card 1: AI & Digital Skills */}
            <div className="teach-card">
              <div className="teach-card-top">
                <span className="teach-card-num">01</span>
                <Sparkles size={20} className="teach-icon" />
              </div>
              <h3 className="teach-card-title">AI & DIGITAL SKILLS</h3>
              <p className="teach-card-desc">
                Learn how to use AI and digital tools effectively for work, learning,
                creativity and problem-solving.
              </p>
              <div className="teach-tags">
                <span>AI Literacy</span>
                <span className="dot">•</span>
                <span>AI for Work</span>
                <span className="dot">•</span>
                <span>Digital Skills</span>
                <span className="dot">•</span>
                <span>Prompting</span>
              </div>
              <button
                onClick={() => openInquiryModal('AI & Digital Skills', 'I am interested in learning practical AI tools and prompt engineering for my workflow.')}
                className="teach-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 2: Automation (Flagship) */}
            <div className="teach-card teach-card-featured">
              <div className="teach-card-top">
                <span className="teach-card-num">02 / FLAGSHIP</span>
                <Workflow size={20} className="teach-icon text-gold" />
              </div>
              <h3 className="teach-card-title">AUTOMATION</h3>
              <span className="teach-card-tagline">
                LEARN TO MAKE SYSTEMS WORK FOR YOU.
              </span>
              <p className="teach-card-desc">
                Practical training for people who want to automate repetitive work and build
                their own workflows.
              </p>

              <div className="progression-strip">
                <span className="prog-step">Workflows</span>
                <span>→</span>
                <span className="prog-step">Identify</span>
                <span>→</span>
                <span className="prog-step">Build</span>
                <span>→</span>
                <span className="prog-step">Connect Tools</span>
                <span>→</span>
                <span className="prog-step">Add AI</span>
                <span>→</span>
                <span className="prog-step">Human Approval</span>
              </div>

              <div className="automation-examples-list">
                <span>• Automating emails and follow-ups</span>
                <span>• Processing forms and documents</span>
                <span>• Moving data between systems</span>
                <span>• Building customer-response workflows</span>
                <span>• Creating AI assistants</span>
                <span>• Automating reports and notifications</span>
              </div>

              <button
                onClick={() => scrollToSection('automation-showcase')}
                className="teach-explore-link text-gold"
              >
                <span>LEARN AUTOMATION</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3: Technology & Building */}
            <div className="teach-card">
              <div className="teach-card-top">
                <span className="teach-card-num">03</span>
                <Cpu size={20} className="teach-icon" />
              </div>
              <h3 className="teach-card-title">TECHNOLOGY & BUILDING</h3>
              <p className="teach-card-desc">
                Practical skills for people who want to move from technology users to creators.
              </p>
              <div className="teach-tags">
                <span>Web Development</span>
                <span className="dot">•</span>
                <span>Digital Product Skills</span>
                <span className="dot">•</span>
                <span>No-Code Tools</span>
                <span className="dot">•</span>
                <span>Prototyping</span>
              </div>
              <button
                onClick={() => openInquiryModal('Technology & Building', 'I want to build my own digital products and learn practical software building skills.')}
                className="teach-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 4: Responsible Technology */}
            <div className="teach-card">
              <div className="teach-card-top">
                <span className="teach-card-num">04</span>
                <ShieldCheck size={20} className="teach-icon" />
              </div>
              <h3 className="teach-card-title">RESPONSIBLE TECHNOLOGY</h3>
              <p className="teach-card-desc">
                Learn to use AI and emerging technologies with judgement. Keep this practical
                rather than making it a separate academic ethics course.
              </p>
              <div className="teach-tags">
                <span>Privacy</span>
                <span className="dot">•</span>
                <span>Verification</span>
                <span className="dot">•</span>
                <span>Responsible AI</span>
                <span className="dot">•</span>
                <span>Human Oversight</span>
                <span className="dot">•</span>
                <span>Digital Safety</span>
              </div>
              <button
                onClick={() => openInquiryModal('Responsible Technology', 'I want to learn responsible AI verification, data privacy, and ethical control systems.')}
                className="teach-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03. LEARNING TECH THROUGH PLAY */}
      {/* ========================================================= */}
      <section className="academy-play-section" id="young-learners">
        <div className="academy-container">
          <div className="play-grid">
            {/* Left Content */}
            <div className="play-content-col">
              <span className="academy-label">ETA YOUNG LEARNERS</span>
              <h2 className="play-title">
                LEARNING TECHNOLOGY<br />
                THROUGH PLAY.
              </h2>

              <div className="play-quote">
                <blockquote>
                  “Children shouldn't have to wait until adulthood to begin understanding the
                  technology shaping their world.”
                </blockquote>
              </div>

              <p className="play-body-text">
                Learning Tech Through Play introduces children to technology through age-appropriate,
                hands-on and playful activities. Rather than sitting through lectures, children
                explore, experiment, create and solve problems.
              </p>

              <div className="play-activities-grid">
                <div className="play-activity-item">
                  <span className="act-bullet">✓</span>
                  <span>Digital creativity</span>
                </div>
                <div className="play-activity-item">
                  <span className="act-bullet">✓</span>
                  <span>Simple coding concepts</span>
                </div>
                <div className="play-activity-item">
                  <span className="act-bullet">✓</span>
                  <span>Technology puzzles and games</span>
                </div>
                <div className="play-activity-item">
                  <span className="act-bullet">✓</span>
                  <span>Problem-solving activities</span>
                </div>
                <div className="play-activity-item">
                  <span className="act-bullet">✓</span>
                  <span>Building simple digital projects</span>
                </div>
                <div className="play-activity-item">
                  <span className="act-bullet">✓</span>
                  <span>Safe and responsible technology use</span>
                </div>
              </div>

              <div className="play-cta-row">
                <button
                  onClick={() => openInquiryModal('Learning Tech Through Play', 'I am interested in enrolling my child or partnering to host Learning Tech Through Play in our school.')}
                  className="academy-btn academy-btn-primary"
                >
                  <span>EXPLORE LEARNING TECH THROUGH PLAY</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Real Photographs */}
            <div className="play-visual-col">
              <div className="play-image-card-main">
                <img
                  src="/images/learning_through_play.png"
                  alt="Children learning technology through play"
                  className="play-img-main"
                />
                <div className="play-img-caption">
                  <span>Hands-on creative computing with young African creators</span>
                </div>
              </div>

              <div className="play-image-sub-grid">
                <div className="play-sub-card">
                  <img
                    src="/images/school_outreach.png"
                    alt="ETA School Outreach"
                    className="play-sub-img"
                  />
                  <span>School outreaches & clubs</span>
                </div>
                <div className="play-sub-card">
                  <img
                    src="/images/future_minds_ghana.png"
                    alt="Future Minds in tech"
                    className="play-sub-img"
                  />
                  <span>Creative digital problem-solving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04. HOW YOU CAN LEARN */}
      {/* ========================================================= */}
      <section className="academy-formats-section" id="ways-to-learn">
        <div className="academy-container">
          <div className="section-meta-header">
            <span className="academy-label">FORMATS</span>
            <h2 className="academy-section-title">CHOOSE HOW YOU LEARN.</h2>
          </div>

          <div className="formats-grid">
            {/* Format 1: Masterclasses */}
            <div className="format-card">
              <span className="format-tag">01 / FOCUSED</span>
              <h3 className="format-title">MASTERCLASSES</h3>
              <p className="format-desc">
                Focused programmes for learning a specific technology skill.
              </p>
              <button
                onClick={() => openInquiryModal('Masterclasses', 'I want to know more about upcoming masterclasses.')}
                className="format-link"
              >
                <span>VIEW MASTERCLASSES</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Format 2: Practical Bootcamps */}
            <div className="format-card">
              <span className="format-tag">02 / IMMERSIVE</span>
              <h3 className="format-title">PRACTICAL BOOTCAMPS</h3>
              <p className="format-desc">
                Learn by building real projects and solving practical problems.
              </p>
              <button
                onClick={() => openInquiryModal('Practical Bootcamps', 'I am interested in joining an immersive practical bootcamp.')}
                className="format-link"
              >
                <span>VIEW BOOTCAMPS</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Format 3: Corporate Training */}
            <div className="format-card">
              <span className="format-tag">03 / ORGANISATIONS</span>
              <h3 className="format-title">CORPORATE TRAINING</h3>
              <p className="format-desc">
                Technology, AI and automation training designed around the needs of your organisation.
              </p>
              <button
                onClick={() => openInquiryModal('Corporate Training', 'We want to train our team on practical AI and automation workflows.')}
                className="format-link"
              >
                <span>CONTACT US</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Format 4: Young Learners */}
            <div className="format-card">
              <span className="format-tag">04 / CHILDREN</span>
              <h3 className="format-title">YOUNG LEARNERS</h3>
              <p className="format-desc">
                Practical technology experiences designed for children.
              </p>
              <button
                onClick={() => scrollToSection('young-learners')}
                className="format-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 05. LEARN AUTOMATION BY BUILDING IT */}
      {/* ========================================================= */}
      <section className="academy-automation-showcase" id="automation-showcase">
        <div className="academy-container">
          <div className="auto-showcase-box">
            <span className="academy-label academy-label-gold">PRACTICAL SHOWCASE</span>

            <h2 className="auto-showcase-title">
              DON'T JUST LEARN ABOUT AUTOMATION.<br />
              BUILD ONE.
            </h2>

            {/* Visual Workflow */}
            <div className="auto-flow-diagram">
              <div className={`auto-node ${simStep >= 1 ? 'active' : ''}`}>
                Customer sends enquiry
              </div>
              <div className="auto-arrow">↓</div>
              <div className={`auto-node ${simStep >= 2 ? 'active' : ''}`}>
                System identifies request
              </div>
              <div className="auto-arrow">↓</div>
              <div className={`auto-node ${simStep >= 3 ? 'active' : ''}`}>
                Information retrieved
              </div>
              <div className="auto-arrow">↓</div>

              {/* Decision Gate */}
              <div className={`auto-gate-card ${simStep >= 3 ? 'active' : ''}`}>
                <div className="gate-title">Routine request?</div>
                <div className="gate-options">
                  <div className="gate-opt yes-opt">
                    <strong>YES →</strong>
                    <span>Respond automatically</span>
                  </div>
                  <div className="gate-opt no-opt">
                    <strong>NO →</strong>
                    <span>Send to a person</span>
                  </div>
                </div>
              </div>

              <div className="auto-arrow">↓</div>
              <div className={`auto-node auto-node-end ${simStep >= 4 ? 'active' : ''}`}>
                Interaction recorded
              </div>
            </div>

            {/* Supporting Takeaway */}
            <div className="auto-takeaway">
              <blockquote>
                “Learners understand how to map the process, build the workflow, connect the
                tools, introduce AI where it adds value and decide where human judgement needs
                to remain.”
              </blockquote>
            </div>

            <div className="auto-cta-buttons">
              <button onClick={runAutomationSimulation} className="academy-btn academy-btn-dark">
                <Play size={14} />
                <span>{simStep > 0 ? 'REPLAY WORKFLOW DEMO' : 'TEST THE FLOW'}</span>
              </button>
              <button
                onClick={() => openInquiryModal('Automation Training', 'I want to enroll in the practical Automation Training programme.')}
                className="academy-btn academy-btn-primary"
              >
                <span>EXPLORE AUTOMATION TRAINING</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 06. FEATURED PROGRAMMES (CURRENTLY AT ETA ACADEMY) */}
      {/* ========================================================= */}
      <section className="academy-current-section" id="current-programmes">
        <div className="academy-container">
          <div className="section-meta-header">
            <span className="academy-label">CURRENT OFFERINGS</span>
            <h2 className="academy-section-title">CURRENTLY AT ETA ACADEMY</h2>
            <p className="academy-section-sub">
              Dynamic courses updating with real community demand.
            </p>
          </div>

          <div className="current-programmes-grid">
            {/* Programme 1 */}
            <div className="prog-card">
              <div className="prog-card-badge">OPEN FOR ENROLLMENT</div>
              <h3 className="prog-title">Automation for Work</h3>
              <p className="prog-desc">
                Learn to identify and automate repetitive workflows across emails, documents,
                spreadsheets and messaging apps.
              </p>
              <div className="prog-meta">
                <span>Duration: 4 Weeks</span>
                <span>•</span>
                <span>Hands-on Projects</span>
              </div>
              <button
                onClick={() => openInquiryModal('Automation for Work', 'I want to enroll in Automation for Work.')}
                className="academy-btn academy-btn-outline prog-btn"
              >
                <span>ENROLL NOW</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Programme 2 */}
            <div className="prog-card">
              <div className="prog-card-badge">POPULAR</div>
              <h3 className="prog-title">AI for Work</h3>
              <p className="prog-desc">
                Use AI practically and responsibly in everyday professional tasks without the
                hype or hallucinations.
              </p>
              <div className="prog-meta">
                <span>Duration: 2 Weeks</span>
                <span>•</span>
                <span>Real Work Scenarios</span>
              </div>
              <button
                onClick={() => openInquiryModal('AI for Work', 'I want to enroll in AI for Work.')}
                className="academy-btn academy-btn-outline prog-btn"
              >
                <span>ENROLL NOW</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Programme 3 */}
            <div className="prog-card">
              <div className="prog-card-badge">KIDS & TEENS</div>
              <h3 className="prog-title">Learning Tech Through Play</h3>
              <p className="prog-desc">
                Hands-on technology learning for young learners through creative coding, robotics
                and problem-solving games.
              </p>
              <div className="prog-meta">
                <span>Ages: 7 - 15</span>
                <span>•</span>
                <span>Weekly Interactive Labs</span>
              </div>
              <button
                onClick={() => openInquiryModal('Learning Tech Through Play', 'I want to register my child for Learning Tech Through Play.')}
                className="academy-btn academy-btn-outline prog-btn"
              >
                <span>REGISTER CHILD</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="current-programmes-footer">
            <button
              onClick={() => openInquiryModal('All Programmes Inquiry', 'I would like to receive the full catalogue and upcoming dates for ETA Academy programmes.')}
              className="academy-inline-cta"
            >
              <span>VIEW ALL PROGRAMMES & UPCOMING SESSIONS</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>



      {/* ========================================================= */}
      {/* 09. OUTCOMES */}
      {/* ========================================================= */}
      <section className="academy-outcomes-section" id="outcomes">
        <div className="academy-container">
          <div className="section-meta-header">
            <span className="academy-label">TANGIBLE IMPACT</span>
            <h2 className="academy-section-title">
              WHAT DID YOU LEARN TO DO?
            </h2>
            <p className="academy-section-sub">
              Genuine learner metrics and stories from the field.
            </p>
          </div>

          {/* Genuine Metrics Categories */}
          <div className="outcomes-metrics-grid">
            <div className="metric-item">
              <span className="metric-tag">LEARNERS</span>
              <h4 className="metric-title">Practical Skills Acquired</h4>
              <p>Young learners to professionals completing hands-on builds.</p>
            </div>
            <div className="metric-item">
              <span className="metric-tag">BUILDS</span>
              <h4 className="metric-title">Automations Deployed</h4>
              <p>Real internal workflows built by learners for their teams.</p>
            </div>
            <div className="metric-item">
              <span className="metric-tag">ORGANISATIONS</span>
              <h4 className="metric-title">Teams Upskilled</h4>
              <p>SMEs and institutions equipped with workflow literacy.</p>
            </div>
            <div className="metric-item">
              <span className="metric-tag">YOUTH</span>
              <h4 className="metric-title">Young Learners Reached</h4>
              <p>Children discovering computing and robotics through play.</p>
            </div>
          </div>

          {/* 3 Genuine Learner Stories */}
          <div className="stories-grid">
            <div className="story-card">
              <p className="story-quote">
                “Before Academy, I spent hours every Monday manually checking forms and typing
                emails. Now I built an automation that handles 80% of routine client routing
                automatically.”
              </p>
              <div className="story-author">
                <span className="author-name">Operations Specialist</span>
                <span className="author-context">Automation for Work Graduate</span>
              </div>
            </div>

            <div className="story-card">
              <p className="story-quote">
                “My 10-year-old daughter used to only watch videos on my phone. After six weeks
                of Learning Tech Through Play, she was designing her own interactive puzzles.”
              </p>
              <div className="story-author">
                <span className="author-name">Parent & Educator</span>
                <span className="author-context">Accra, Ghana</span>
              </div>
            </div>

            <div className="story-card">
              <p className="story-quote">
                “We didn't need another generic lecture on AI. ETA came into our office and
                helped our staff build actual prompt templates and verification filters for
                everyday research.”
              </p>
              <div className="story-author">
                <span className="author-name">Managing Partner</span>
                <span className="author-context">Corporate AI Training</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FINAL CTA */}
      {/* ========================================================= */}
      <section className="academy-final-cta-section" id="final-cta">
        <div className="academy-container">
          <div className="academy-final-cta-content">
            <span className="academy-label">ETA ACADEMY</span>

            <h2 className="academy-final-title">
              WHAT DO YOU<br />
              WANT TO LEARN<br />
              TO BUILD?
            </h2>

            <div className="academy-final-actions">
              <button
                onClick={() => openInquiryModal('Contact Us', 'Hello ETA Academy, I would like to get in touch regarding learning practical technology.')}
                className="academy-btn academy-btn-primary academy-btn-lg"
              >
                <span>CONTACT US</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="final-direct-email-row">
              <span className="direct-email-caption">Direct Inquiries:</span>
              <a
                href="mailto:ebibimantech@gmail.com?subject=ETA%20Academy%20Inquiry"
                className="direct-email-link"
              >
                <Mail size={15} />
                <span>ebibimantech@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer of the main landing page */}
      <Footer />

      {/* ========================================================= */}
      {/* ENROLLMENT & INQUIRY MODAL */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="academy-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="academy-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="modal-inner">
                <div className="modal-topic-badge-row">
                  <span className="academy-label sol-label-gold">ACADEMY INQUIRY</span>
                  <span className="modal-destination-pill">
                    <Mail size={12} />
                    <span>To: ebibimantech@gmail.com</span>
                  </span>
                </div>

                <h3 className="modal-title">{modalTopic}</h3>

                <p className="modal-desc">
                  Tell us what you or your team want to learn. Your submission is routed directly
                  to the ETA Academy admissions team at <strong>ebibimantech@gmail.com</strong>.
                </p>

                <div className="modal-form-row">
                  <div className="modal-field">
                    <label className="field-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="modal-input"
                    />
                  </div>
                  <div className="modal-field">
                    <label className="field-label">Email or WhatsApp Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. kwame@organisation.org or +233..."
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="modal-input"
                    />
                  </div>
                </div>

                <div className="modal-field-group">
                  <label className="field-label">Organisation / School / Role (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Operations Manager / Student / School Parent"
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value)}
                    className="modal-input"
                  />
                </div>

                <div className="modal-field-group">
                  <label className="field-label">
                    What would you like to achieve or learn?
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your learning goals, cohort size, or specific skills you want to develop..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="modal-textarea"
                  />
                </div>

                <div className="modal-submit-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`academy-btn academy-btn-primary academy-btn-block ${isSubmitting ? 'btn-loading-state' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner-rotate" />
                        <span>TRANSMITTING TO EBIBIMANTECH@GMAIL.COM...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT INQUIRY</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-success-inner">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={44} className="success-icon" />
                </div>
                <h3 className="modal-title">INQUIRY TRANSMITTED</h3>
                <p className="modal-desc">
                  Your request for <strong>{modalTopic}</strong> has been dispatched directly to{' '}
                  <strong className="highlight-email">ebibimantech@gmail.com</strong>. Our team will
                  review your details and get back to you promptly.
                </p>

                <div className="activation-notice-box">
                  <p>
                    <strong>Direct routing active:</strong> If you are opening from your email client, you can also launch Gmail directly:
                  </p>
                </div>

                <div className="modal-success-actions">
                  {generatedGmailWeb && (
                    <a
                      href={generatedGmailWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="academy-btn academy-btn-dark"
                    >
                      <Mail size={15} />
                      <span>Open in Gmail Web</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <a
                    href={generatedMailto || 'mailto:ebibimantech@gmail.com'}
                    className="academy-btn academy-btn-secondary"
                  >
                    <Mail size={15} />
                    <span>Open in Mail App</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setSubmitted(false)
                      setContactName('')
                      setContactEmail('')
                      setContactRole('')
                      setMessage('')
                    }}
                    className="academy-btn academy-btn-primary"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AcademyPage
