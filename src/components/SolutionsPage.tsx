import React, { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  X,
  Play,
  Mail,
  Search,
  ExternalLink
} from 'lucide-react'
import './SolutionsPage.css'

interface SolutionsPageProps {
  onBack: () => void
}

interface KnowledgeQuestion {
  id: string
  question: string
  answer: string
  source: string
  isEscalated?: boolean
}

const knowledgeQuestions: KnowledgeQuestion[] = [
  {
    id: 'expense',
    question: 'What is our policy on expense approvals over $500?',
    answer: 'All operational and capital expenditures exceeding $500 require dual-tier signoff: departmental lead approval followed by Finance verification before disbursement.',
    source: 'ETA Operations & Finance SOP / Section 3.2 / Page 14'
  },
  {
    id: 'database',
    question: 'Can external contractors access the production database?',
    answer: 'External contractors are restricted to staging environments. Production database access requires explicit CISO authorization and a temporary 24-hour monitored token.',
    source: 'Information Security Guidelines v2.4 / Section 8.1 / Page 29'
  },
  {
    id: 'privacy',
    question: 'What happens when a customer requests data deletion under local law?',
    answer: 'The Compliance Officer must be alerted within 24 hours. The automated pipeline purges customer identifiers from live DBs while preserving legally mandated audit logs.',
    source: 'Data Governance Framework / Section 4.5 / Page 22'
  },
  {
    id: 'generative',
    question: 'Can we feed raw unencrypted client files into public generative AI tools?',
    answer: 'I do not have enough approved information to answer this safely. Uploading confidential records to unauthorized public tools violates data security boundaries. Escalating to the Privacy & Compliance Lead.',
    source: 'Escalation Trigger: Unapproved / High-Risk Inquiry',
    isEscalated: true
  }
]

interface SelectedProject {
  id: string
  category: 'LIVE SYSTEMS' | 'ETA DEMOS' | 'EXPERIMENTS'
  title: string
  problem: string
  workflow: string
  whatEtaBuilt: string
  measuredOutcome: string
  humanControlPoints: string
}

const selectedProjects: SelectedProject[] = [
  {
    id: 'adom',
    category: 'ETA DEMOS',
    title: 'ETA Adom — Customer Enquiry Automation',
    problem: 'Staff spend 4+ hours daily answering routine, predictable questions across WhatsApp and email, causing customer wait times to stretch past 2 hours.',
    workflow: 'Inbound message → Intent classification → Approved knowledge base lookup → Confidence scoring → Auto-response OR Human agent transfer.',
    whatEtaBuilt: 'WhatsApp & Web conversational assistant integrated with a live agent dashboard, audit logging, and approved knowledge routing.',
    measuredOutcome: '8 of 10 routine enquiries handled autonomously in 4.2 seconds; 2 sensitive cases escalated to staff with full conversational context.',
    humanControlPoints: 'Billing disputes, angry customer sentiment, and unapproved policy questions trigger immediate human escalation.'
  },
  {
    id: 'docroute',
    category: 'ETA DEMOS',
    title: 'ETA DocRoute — Document & Invoice Processing Pipeline',
    problem: 'PDF invoices, application forms and receipts arrive continuously via email and must be manually read, checked, and keyed into accounting software.',
    workflow: 'Document ingestion → Field extraction (OCR & schema parsing) → Rule-based validation → Discrepancy detection → Database update + Notification.',
    whatEtaBuilt: 'Automated document processing workflow connecting inbound emails directly to structured ledger spreadsheets and team alerts.',
    measuredOutcome: 'Batch of 25 vendor invoices processed in 45 seconds (versus ~14 minutes manually). 171 of 175 fields correctly parsed (97.7%).',
    humanControlPoints: 'Unmatched tax IDs, blurry scans, and amounts exceeding standard variance thresholds are flagged for one-click human verification.'
  },
  {
    id: 'sika',
    category: 'ETA DEMOS',
    title: 'ETA Sika — Searchable Organisational Knowledge System',
    problem: 'Staff waste hours searching through scattered Google Drive folders, PDFs, and WhatsApp chats to locate internal policy and operational SOPs.',
    workflow: 'Employee asks natural question → Semantic search over approved source documents only → Passage retrieval → Source citation verification → Strict answer return.',
    whatEtaBuilt: 'Internal knowledge engine restricted exclusively to uploaded, verified company handbooks, manuals, and compliance documentation.',
    measuredOutcome: 'Average document retrieval time reduced from 20 minutes to under 2 seconds; zero hallucinated or speculative answers returned.',
    humanControlPoints: 'If an inquiry falls outside approved sources, the system explicitly refuses to guess and offers one-click escalation to the subject expert.'
  }
]

const frictionOptions = [
  'Repetitive data entry & copying',
  'Customer enquiry backlog (WhatsApp/Email)',
  'Manual PDF & form processing',
  'Scattered knowledge & policies',
  'Missed lead follow-ups',
  'Time-consuming manual reporting'
]

const SolutionsPage: React.FC<SolutionsPageProps> = ({ onBack }) => {
  // Knowledge Assistant interactive demo state
  const [selectedQuestion, setSelectedQuestion] = useState<KnowledgeQuestion>(knowledgeQuestions[0])

  // Demo 01 simulation state
  const [simStep, setSimStep] = useState<number>(0)

  // Selected work filter tab
  const [workFilter, setWorkFilter] = useState<'LIVE SYSTEMS' | 'ETA DEMOS' | 'EXPERIMENTS'>('ETA DEMOS')

  // Forwarding & Modal state
  const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false)
  const [modalTopic, setModalTopic] = useState('Discovery Session')
  const [contactName, setContactName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [contactOrg, setContactOrg] = useState('')
  const [discoveryProcess, setDiscoveryProcess] = useState('')
  const [discoveryFriction, setDiscoveryFriction] = useState<string[]>([])
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false)
  const [generatedMailto, setGeneratedMailto] = useState('')

  const openInquiryModal = (topic: string, defaultProcess: string = '') => {
    setModalTopic(topic)
    setDiscoveryProcess(defaultProcess)
    setDiscoverySubmitted(false)
    setIsDiscoveryModalOpen(true)
  }

  const toggleFriction = (item: string) => {
    if (discoveryFriction.includes(item)) {
      setDiscoveryFriction(discoveryFriction.filter((f) => f !== item))
    } else {
      setDiscoveryFriction([...discoveryFriction, item])
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDiscoverySubmitted(true)

    const subject = encodeURIComponent(`[ETA Solutions - ${modalTopic}] from ${contactName || 'Inquirer'}`)
    const body = encodeURIComponent(
      `ETA SOLUTIONS INQUIRY & DEMO REQUEST\n\n` +
      `Target Demo / Topic: ${modalTopic}\n` +
      `Recipient: ebibimantech@gmail.com\n\n` +
      `CONTACT DETAILS:\n` +
      `- Full Name: ${contactName || 'N/A'}\n` +
      `- Email / WhatsApp: ${contactInfo || 'N/A'}\n` +
      `- Organisation / Role: ${contactOrg || 'N/A'}\n\n` +
      `IDENTIFIED FRICTION POINTS:\n` +
      `${discoveryFriction.length > 0 ? discoveryFriction.map(f => `• ${f}`).join('\n') : '• None selected'}\n\n` +
      `PROCESS & WORKFLOW DETAILS:\n` +
      `${discoveryProcess || 'N/A'}\n\n` +
      `---\nSubmitted through ETA Solutions Portal (Forwarded to ebibimantech@gmail.com)`
    )

    const mailtoUrl = `mailto:ebibimantech@gmail.com?subject=${subject}&body=${body}`
    setGeneratedMailto(mailtoUrl)

    // Trigger direct mail client dispatch
    setTimeout(() => {
      window.location.href = mailtoUrl
    }, 400)
  }

  const runDemo1Simulation = () => {
    setSimStep(1)
    const timer1 = setTimeout(() => setSimStep(2), 700)
    const timer2 = setTimeout(() => setSimStep(3), 1500)
    const timer3 = setTimeout(() => setSimStep(4), 2300)
    const timer4 = setTimeout(() => setSimStep(5), 3100)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="solutions-page">
      {/* Top Floating Navigation */}
      <header className="solutions-top-nav">
        <button onClick={onBack} className="solutions-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="solutions-nav-brand">
          <span className="brand-dot"></span>
          <span>ETA SOLUTIONS</span>
        </div>

        <button
          onClick={() => openInquiryModal('Discovery Session')}
          className="solutions-nav-cta"
        >
          <span>Discovery Session</span>
          <ArrowRight size={14} />
        </button>
      </header>

      {/* ========================================================= */}
      {/* 01. HERO */}
      {/* ========================================================= */}
      <section className="sol-hero-section">
        <div className="sol-container">
          <div className="sol-hero-eyebrow">
            <span className="eyebrow-tag">ETA SOLUTIONS / BUILD</span>
          </div>

          <h1 className="sol-hero-title">
            <span>WE DON'T START</span>
            <span>WITH THE TECHNOLOGY.</span>
            <span>WE START WITH</span>
            <span className="highlight-text">THE PROBLEM.</span>
          </h1>

          <p className="sol-hero-lead">
            ETA Solutions helps organisations identify inefficient, repetitive and
            knowledge-heavy processes, then design practical digital and AI-enabled systems
            around the people who actually use them.
          </p>

          <div className="sol-hero-actions">
            <button
              onClick={() => openInquiryModal('Discovery Session')}
              className="sol-btn sol-btn-primary"
            >
              <span>START A DISCOVERY SESSION</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('live-demos')}
              className="sol-btn sol-btn-secondary"
            >
              <span>SEE OUR DEMOS</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02. THE PROBLEMS WE SOLVE */}
      {/* ========================================================= */}
      <section className="sol-problems-section" id="problems">
        <div className="sol-container">
          <div className="section-meta-header">
            <span className="sol-label">BEFORE WE BUILD</span>
            <h2 className="sol-section-title">
              GOOD TECHNOLOGY SHOULD REMOVE FRICTION.
            </h2>
          </div>

          <div className="problems-grid">
            {/* Card 1 */}
            <div className="problem-card">
              <div className="problem-card-num">01</div>
              <h3 className="problem-card-title">REPETITIVE WORK</h3>
              <p className="problem-card-desc">
                The same information is entered, checked or moved repeatedly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="problem-card">
              <div className="problem-card-num">02</div>
              <h3 className="problem-card-title">CUSTOMER ENQUIRIES</h3>
              <p className="problem-card-desc">
                Teams spend valuable time answering predictable questions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="problem-card">
              <div className="problem-card-num">03</div>
              <h3 className="problem-card-title">DOCUMENT PROCESSING</h3>
              <p className="problem-card-desc">
                PDFs, forms and emails still depend on manual reading and routing.
              </p>
            </div>

            {/* Card 4 */}
            <div className="problem-card">
              <div className="problem-card-num">04</div>
              <h3 className="problem-card-title">SCATTERED KNOWLEDGE</h3>
              <p className="problem-card-desc">
                Important information exists, but staff struggle to find it quickly.
              </p>
            </div>

            {/* Card 5 */}
            <div className="problem-card">
              <div className="problem-card-num">05</div>
              <h3 className="problem-card-title">MISSED FOLLOW-UPS</h3>
              <p className="problem-card-desc">
                Leads and customer requests get buried across WhatsApp, email and spreadsheets.
              </p>
            </div>

            {/* Card 6 */}
            <div className="problem-card">
              <div className="problem-card-num">06</div>
              <h3 className="problem-card-title">MANUAL REPORTING</h3>
              <p className="problem-card-desc">
                Staff spend hours assembling information that already exists elsewhere.
              </p>
            </div>
          </div>

          {/* Section Close Callout */}
          <div className="sol-closing-quote">
            <blockquote>
              “Sometimes the answer is AI. Sometimes it's automation. Sometimes it's simply a
              better workflow. We build what the problem requires.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03. WHAT WE BUILD */}
      {/* ========================================================= */}
      <section className="sol-capabilities-section" id="capabilities">
        <div className="sol-container">
          <div className="section-meta-header">
            <span className="sol-label">CORE CAPABILITIES</span>
            <h2 className="sol-section-title">WHAT WE BUILD</h2>
            <p className="sol-section-sub">
              Visually clean systems engineered around real operational bottlenecks.
            </p>
          </div>

          <div className="capabilities-grid">
            {/* Capability 01 */}
            <div className="capability-card">
              <div className="cap-header">
                <span className="cap-num">01 / WORKFLOW AUTOMATION</span>
              </div>
              <h3 className="cap-title">
                MAKE THE PROCESS MOVE WITHOUT CHASING IT.
              </h3>
              <p className="cap-desc">
                Connect repetitive steps across the tools an organisation already uses.
              </p>
              <div className="cap-tags">
                <span>Lead routing</span>
                <span className="dot">•</span>
                <span>Approvals</span>
                <span className="dot">•</span>
                <span>Notifications</span>
                <span className="dot">•</span>
                <span>Follow-ups</span>
                <span className="dot">•</span>
                <span>Reporting</span>
                <span className="dot">•</span>
                <span>Data movement</span>
              </div>
              <button
                onClick={() => scrollToSection('demo-01')}
                className="cap-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Capability 02 */}
            <div className="capability-card">
              <div className="cap-header">
                <span className="cap-num">02 / INTELLIGENT ASSISTANTS</span>
              </div>
              <h3 className="cap-title">
                LET AI HANDLE THE ROUTINE. LET PEOPLE HANDLE THE EXCEPTIONS.
              </h3>
              <p className="cap-desc">
                Customer, web and internal assistants designed around clearly defined tasks
                and approved information.
              </p>
              <div className="cap-tags">
                <span>Customer enquiries</span>
                <span className="dot">•</span>
                <span>WhatsApp</span>
                <span className="dot">•</span>
                <span>Lead qualification</span>
                <span className="dot">•</span>
                <span>Employee support</span>
                <span className="dot">•</span>
                <span>Service navigation</span>
              </div>
              <button
                onClick={() => scrollToSection('demo-01')}
                className="cap-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Capability 03 */}
            <div className="capability-card">
              <div className="cap-header">
                <span className="cap-num">03 / KNOWLEDGE SYSTEMS</span>
              </div>
              <h3 className="cap-title">
                TURN ORGANISATIONAL KNOWLEDGE INTO SOMETHING PEOPLE CAN USE.
              </h3>
              <p className="cap-desc">
                Bring policies, manuals, SOPs, reports, FAQs and internal documentation into
                searchable knowledge systems.
              </p>
              <div className="cap-steps-list">
                <div className="cap-step-item">
                  <span className="step-arrow">→</span>
                  <span>Employees ask.</span>
                </div>
                <div className="cap-step-item">
                  <span className="step-arrow">→</span>
                  <span>The system searches approved sources.</span>
                </div>
                <div className="cap-step-item">
                  <span className="step-arrow">→</span>
                  <span>The answer is returned with its source.</span>
                </div>
                <div className="cap-step-item">
                  <span className="step-arrow">→</span>
                  <span>When the system cannot answer confidently, it doesn't invent one.</span>
                </div>
              </div>
              <button
                onClick={() => scrollToSection('demo-03')}
                className="cap-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Capability 04 */}
            <div className="capability-card">
              <div className="cap-header">
                <span className="cap-num">04 / DOCUMENT & DATA AUTOMATION</span>
              </div>
              <h3 className="cap-title">FROM DOCUMENT TO ACTION.</h3>
              <div className="cap-flow-strip">
                <span>Receive</span>
                <span>→</span>
                <span>Extract</span>
                <span>→</span>
                <span>Validate</span>
                <span>→</span>
                <span>Classify</span>
                <span>→</span>
                <span>Update</span>
                <span>→</span>
                <span>Route</span>
                <span>→</span>
                <span>Notify</span>
              </div>
              <p className="cap-desc">
                Useful for forms, PDFs, emails, applications, reports and other document-heavy
                processes.
              </p>
              <button
                onClick={() => scrollToSection('demo-02')}
                className="cap-explore-link"
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Secondary Sub-line */}
          <div className="capabilities-secondary-line">
            <p>
              Need something beyond these? We also design digital tools, integrations and
              custom workflow systems around specific organisational needs.
            </p>
            <button
              onClick={() => openInquiryModal('Custom Workflow & Integration Systems')}
              className="sol-inline-cta"
            >
              <span>TALK TO ETA</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 04. DON'T TELL THEM. SHOW THEM. (LIVE ETA DEMOS) */}
      {/* ========================================================= */}
      <section className="sol-demos-section" id="live-demos">
        <div className="sol-container">
          <div className="demos-main-header">
            <span className="sol-label">LIVE ETA DEMOS</span>
            <h2 className="sol-section-title sol-title-huge">
              SEE WHAT HAPPENS WHEN THE WORKFLOW WORKS.
            </h2>
            <p className="sol-demos-notice">
              The mistake here would be filling the section with marketing claims.
              Let the demos prove the point. All demo requests are processed directly by our
              engineering team at <strong>ebibimantech@gmail.com</strong>.
            </p>
          </div>

          {/* ------------------------------------------------------- */}
          {/* DEMO 01 / CUSTOMER ENQUIRY AUTOMATION */}
          {/* ------------------------------------------------------- */}
          <div className="demo-showcase-box" id="demo-01">
            <div className="demo-box-header">
              <span className="demo-tag">DEMO 01</span>
              <h3 className="demo-headline">CUSTOMER ENQUIRY AUTOMATION</h3>
            </div>

            <div className="demo-comparison-grid">
              {/* The Old Way */}
              <div className="demo-side-col old-way-col">
                <div className="col-label">BEFORE</div>
                <div className="flow-vertical-list">
                  <div className="flow-list-item">A customer sends a message.</div>
                  <div className="flow-connector">↓</div>
                  <div className="flow-list-item">Someone notices it.</div>
                  <div className="flow-connector">↓</div>
                  <div className="flow-list-item">Someone checks for the answer.</div>
                  <div className="flow-connector">↓</div>
                  <div className="flow-list-item">Someone replies.</div>
                  <div className="flow-connector">↓</div>
                  <div className="flow-list-item">Someone hopefully remembers to follow up.</div>
                </div>
              </div>

              {/* The ETA Workflow */}
              <div className="demo-side-col eta-way-col">
                <div className="col-label eta-label">WITH THE ETA WORKFLOW</div>
                <div className="flow-pipeline">
                  <div className={`pipe-node ${simStep >= 1 ? 'active' : ''}`}>
                    Customer enquiry
                  </div>
                  <div className="pipe-arrow">↓</div>
                  <div className={`pipe-node ${simStep >= 2 ? 'active' : ''}`}>
                    Request identified
                  </div>
                  <div className="pipe-arrow">↓</div>
                  <div className={`pipe-node ${simStep >= 3 ? 'active' : ''}`}>
                    Approved knowledge searched
                  </div>
                  <div className="pipe-arrow">↓</div>
                  <div className={`pipe-node ${simStep >= 4 ? 'active' : ''}`}>
                    Response generated
                  </div>
                  <div className="pipe-arrow">↓</div>

                  {/* Branch Decision */}
                  <div className={`pipe-decision-card ${simStep >= 4 ? 'active' : ''}`}>
                    <div className="decision-title">Can the system safely resolve it?</div>
                    <div className="decision-branches">
                      <div className="branch branch-yes">
                        <span className="branch-tag">YES →</span>
                        <span>Respond + log interaction</span>
                      </div>
                      <div className="branch branch-no">
                        <span className="branch-tag">NO →</span>
                        <span>Escalate to a person</span>
                      </div>
                    </div>
                  </div>

                  <div className="pipe-arrow">↓</div>
                  <div className={`pipe-node highlight-node ${simStep >= 5 ? 'active' : ''}`}>
                    Human receives the conversation and context
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Results & Telemetry */}
            <div className="demo-results-panel">
              <div className="panel-title-row">
                <span className="panel-badge">LIVE DEMO RESULT</span>
                <span className="panel-sub">
                  Actual output from the ETA Adom demo benchmark, not hypothetical percentages.
                </span>
              </div>

              <div className="demo-metrics-strip">
                <div className="metric-box">
                  <span className="metric-val">10</span>
                  <span className="metric-name">test enquiries submitted</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">8</span>
                  <span className="metric-name">handled within approved workflow</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">2</span>
                  <span className="metric-name">correctly escalated for human review</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">10</span>
                  <span className="metric-name">interactions logged with audit trail</span>
                </div>
              </div>

              <div className="telemetry-grid">
                <div className="telemetry-item">
                  <span className="telem-label">AVERAGE RESPONSE TIME</span>
                  <span className="telem-value">4.2s (Workflow) vs 45m (Manual)</span>
                </div>
                <div className="telemetry-item">
                  <span className="telem-label">ROUTINE ENQUIRIES RESOLVED</span>
                  <span className="telem-value">8 / 10 (80%)</span>
                </div>
                <div className="telemetry-item">
                  <span className="telem-label">INCORRECT UNSUPPORTED ANSWERS</span>
                  <span className="telem-value">0 (Strict Source Enforcement)</span>
                </div>
              </div>

              <div className="demo-action-buttons">
                <button onClick={runDemo1Simulation} className="sol-btn sol-btn-dark">
                  <Play size={14} />
                  <span>{simStep > 0 ? 'REPLAY WORKFLOW TEST' : 'WATCH THE DEMO'}</span>
                </button>
                <button
                  onClick={() => openInquiryModal(
                    'Demo 01: Customer Enquiry Automation (ETA Adom)',
                    'I would like to test the live Customer Enquiry Automation workflow for our incoming customer messages.'
                  )}
                  className="sol-btn sol-btn-outline"
                >
                  <span>TRY THE DEMO →</span>
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* DEMO 02 / DOCUMENT PROCESSING */}
          {/* ------------------------------------------------------- */}
          <div className="demo-showcase-box" id="demo-02">
            <div className="demo-box-header">
              <span className="demo-tag">DEMO 02</span>
              <h3 className="demo-headline">DOCUMENT PROCESSING</h3>
            </div>

            <div className="demo-task-intro">
              <span className="task-label">THE TASK</span>
              <p className="task-desc">
                A document arrives containing information that needs to enter an
                organisational workflow.
              </p>
            </div>

            <div className="demo-comparison-grid">
              {/* The Old Way */}
              <div className="demo-side-col old-way-col">
                <div className="col-label">THE OLD WAY</div>
                <div className="linear-horizontal-steps">
                  <span>Open document</span>
                  <span>→</span>
                  <span>Read</span>
                  <span>→</span>
                  <span>Find fields</span>
                  <span>→</span>
                  <span>Copy information</span>
                  <span>→</span>
                  <span>Check</span>
                  <span>→</span>
                  <span>Enter into system</span>
                  <span>→</span>
                  <span>Forward</span>
                  <span>→</span>
                  <span>Notify</span>
                </div>
              </div>

              {/* The ETA Workflow */}
              <div className="demo-side-col eta-way-col">
                <div className="col-label eta-label">THE ETA WORKFLOW</div>
                <div className="flow-pipeline">
                  <div className="pipe-node">Document received</div>
                  <div className="pipe-arrow">↓</div>
                  <div className="pipe-node">Relevant fields extracted</div>
                  <div className="pipe-arrow">↓</div>
                  <div className="pipe-node">Information checked against defined rules</div>
                  <div className="pipe-arrow">↓</div>

                  {/* Decision */}
                  <div className="pipe-decision-card active">
                    <div className="decision-title">Something doesn't match?</div>
                    <div className="decision-branches">
                      <div className="branch branch-no">
                        <span className="branch-tag">YES →</span>
                        <span>Human review</span>
                      </div>
                      <div className="branch branch-yes">
                        <span className="branch-tag">NO →</span>
                        <span>Continue</span>
                      </div>
                    </div>
                  </div>

                  <div className="pipe-arrow">↓</div>
                  <div className="pipe-node">Record updated</div>
                  <div className="pipe-arrow">↓</div>
                  <div className="pipe-node">Responsible person notified</div>
                  <div className="pipe-arrow">↓</div>
                  <div className="pipe-node highlight-node">Processing event logged</div>
                </div>
              </div>
            </div>

            {/* Test Results & Before/After */}
            <div className="demo-results-panel">
              <div className="panel-title-row">
                <span className="panel-badge">TEST RESULTS</span>
                <span className="panel-sub">
                  Show actual demo evidence. That is far more convincing than saying "save 80%
                  of your time."
                </span>
              </div>

              <div className="results-data-table">
                <div className="data-row">
                  <span className="data-key">Documents processed:</span>
                  <span className="data-val">25</span>
                </div>
                <div className="data-row">
                  <span className="data-key">Fields extracted:</span>
                  <span className="data-val">175</span>
                </div>
                <div className="data-row">
                  <span className="data-key">Fields correctly extracted:</span>
                  <span className="data-val highlight-green">171 / 175 (97.7%)</span>
                </div>
                <div className="data-row">
                  <span className="data-key">Documents flagged for review:</span>
                  <span className="data-val highlight-amber">2 (Flagged for human verification)</span>
                </div>
                <div className="data-row">
                  <span className="data-key">Average processing time:</span>
                  <span className="data-val">1.8s per document</span>
                </div>
              </div>

              {/* Time Delta Comparison */}
              <div className="time-delta-card">
                <div className="time-box manual-time">
                  <span className="time-label">MANUAL TEST</span>
                  <span className="time-metric">~14 minutes</span>
                  <span className="time-note">Manual reading, typing, and tab toggling</span>
                </div>
                <div className="time-vs">versus</div>
                <div className="time-box eta-time">
                  <span className="time-label">ETA WORKFLOW</span>
                  <span className="time-metric">45 seconds</span>
                  <span className="time-note">Full batch ingestion, validation, and notification</span>
                </div>
              </div>

              <div className="demo-action-buttons">
                <button
                  onClick={() => openInquiryModal(
                    'Demo 02: Document Processing Pipeline (ETA DocRoute)',
                    'I would like to see or test the Document & Form Processing workflow for our invoices and forms.'
                  )}
                  className="sol-btn sol-btn-dark"
                >
                  <FileText size={14} />
                  <span>WATCH DOCUMENT DEMO →</span>
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* DEMO 03 / ORGANISATIONAL KNOWLEDGE ASSISTANT */}
          {/* ------------------------------------------------------- */}
          <div className="demo-showcase-box" id="demo-03">
            <div className="demo-box-header">
              <span className="demo-tag">DEMO 03</span>
              <h3 className="demo-headline">ORGANISATIONAL KNOWLEDGE ASSISTANT</h3>
            </div>

            <div className="knowledge-from-to">
              <div className="k-from">
                <span className="k-label">FROM:</span>
                <blockquote>“Does anyone know where the policy on this is?”</blockquote>
              </div>
              <div className="k-to">
                <span className="k-label">TO:</span>
                <div className="k-sequence">
                  <div className="k-seq-node">Employee asks: <em>“What is our policy on X?”</em></div>
                  <div className="k-seq-arrow">↓</div>
                  <div className="k-seq-node">System searches approved organisational documents only</div>
                  <div className="k-seq-arrow">↓</div>
                  <div className="k-seq-node">Relevant passages retrieved</div>
                  <div className="k-seq-arrow">↓</div>
                  <div className="k-seq-node">Answer generated from those sources</div>
                  <div className="k-seq-arrow">↓</div>
                  <div className="k-seq-node">Source document displayed</div>
                  <div className="k-seq-arrow">↓</div>
                  <div className="k-seq-fallback">
                    <span className="fallback-tag">If evidence is insufficient:</span>
                    <p>
                      “I don't have enough approved information to answer this. Would you like me
                      to escalate it?”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Knowledge Widget */}
            <div className="interactive-knowledge-widget">
              <div className="widget-header">
                <span className="panel-badge">TEST THE SYSTEM</span>
                <span className="panel-sub">
                  Select a sample question or test how the system answers strictly inside defined
                  boundaries.
                </span>
              </div>

              {/* Sample Questions Selector */}
              <div className="sample-questions-list">
                {knowledgeQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className={`sample-q-btn ${selectedQuestion.id === q.id ? 'active' : ''}`}
                  >
                    <span>{q.question}</span>
                    <ArrowRight size={12} />
                  </button>
                ))}
              </div>

              {/* Dynamic Answer & Source Display */}
              <div className={`answer-source-display ${selectedQuestion.isEscalated ? 'escalated-state' : ''}`}>
                <div className="as-header">
                  <span className="as-label">
                    {selectedQuestion.isEscalated ? 'ESCORT TO HUMAN REVIEW' : 'VERIFIED ANSWER'}
                  </span>
                  {selectedQuestion.isEscalated ? (
                    <span className="as-status-badge badge-warn">
                      <AlertCircle size={12} />
                      Boundary Guard Active
                    </span>
                  ) : (
                    <span className="as-status-badge badge-ok">
                      <CheckCircle2 size={12} />
                      Source Verified
                    </span>
                  )}
                </div>

                <div className="as-answer-body">
                  <p>{selectedQuestion.answer}</p>
                </div>

                <div className="as-source-footer">
                  <span className="source-label">SOURCE:</span>
                  <span className="source-citation">{selectedQuestion.source}</span>
                </div>
              </div>

              <div className="sol-closing-quote widget-subquote">
                <blockquote>
                  “The assistant works inside defined boundaries. It searches approved sources,
                  returns the citation, and never invents answers when evidence is missing.”
                </blockquote>
              </div>

              <div className="demo-action-buttons widget-action-buttons">
                <button
                  onClick={() => openInquiryModal(
                    'Demo 03: Organisational Knowledge Assistant (ETA Sika)',
                    'We want to test or deploy a searchable knowledge assistant over our internal policies, manuals, and SOPs.'
                  )}
                  className="sol-btn sol-btn-dark"
                >
                  <Search size={14} />
                  <span>REQUEST KNOWLEDGE DEMO →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07. THE PRINCIPLE BEHIND THE SYSTEMS */}
      {/* ========================================================= */}
      <section className="sol-dark-interruption" id="principle">
        <div className="sol-container">
          <div className="principle-content-wrap">
            <span className="sol-label sol-label-gold">THE PRINCIPLE BEHIND THE SYSTEMS</span>
            
            <h2 className="principle-big-title">
              AUTOMATE THE TASK.<br />
              NOT THE JUDGEMENT.
            </h2>

            <div className="principle-copy-block">
              <blockquote>
                “We design intelligent systems around defined workflows, approved information
                and clear escalation points. When a decision requires context, authority or human
                judgement, the workflow returns it to a person.”
              </blockquote>
            </div>

            {/* Architecture Visual */}
            <div className="control-architecture-visual">
              <div className="arch-tier tier-automation">
                <div className="tier-tag">AI / AUTOMATION</div>
                <div className="tier-attributes">
                  <span>Routine</span>
                  <span className="dot">•</span>
                  <span>Repeatable</span>
                  <span className="dot">•</span>
                  <span>Defined</span>
                  <span className="dot">•</span>
                  <span>Low ambiguity</span>
                </div>
              </div>

              <div className="arch-connector">
                <span className="connector-line"></span>
                <span className="connector-arrow">↓</span>
              </div>

              <div className="arch-tier tier-review">
                <div className="tier-tag">REVIEW POINT</div>
                <div className="tier-attributes">
                  <span>Confidence low?</span>
                  <span className="dot">•</span>
                  <span>Exception detected?</span>
                  <span className="dot">•</span>
                  <span>Sensitive decision?</span>
                  <span className="dot">•</span>
                  <span>Approval required?</span>
                </div>
              </div>

              <div className="arch-connector">
                <span className="connector-line"></span>
                <span className="connector-arrow">↓</span>
              </div>

              <div className="arch-tier tier-human">
                <div className="tier-tag">HUMAN</div>
                <div className="tier-attributes">
                  <span>Review</span>
                  <span className="dot">•</span>
                  <span>Decide</span>
                  <span className="dot">•</span>
                  <span>Approve</span>
                  <span className="dot">•</span>
                  <span>Override</span>
                </div>
              </div>

              <div className="arch-connector">
                <span className="connector-line"></span>
                <span className="connector-arrow">↓</span>
              </div>

              <div className="arch-tier tier-continue">
                <div className="tier-tag">SYSTEM CONTINUES</div>
                <div className="tier-attributes">
                  <span>Audit record written</span>
                  <span className="dot">•</span>
                  <span>Process advances</span>
                </div>
              </div>
            </div>

            <div className="arch-caption">
              Don't create a huge Responsible AI essay. Show the control architecture.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08. ONE WORKFLOW. CLEAR BOUNDARIES. */}
      {/* ========================================================= */}
      <section className="sol-boundaries-section" id="boundaries">
        <div className="sol-container">
          <div className="boundaries-grid">
            {/* Left Diagram */}
            <div className="boundaries-diagram-col">
              <div className="boundaries-pipeline-diagram">
                <div className="diag-node">CUSTOMER REQUEST</div>
                <div className="diag-arrow">↓</div>
                <div className="diag-node">SYSTEM IDENTIFIES INTENT</div>
                <div className="diag-arrow">↓</div>

                {/* Gate 1 */}
                <div className="diag-gate">
                  <div className="gate-question">IS THIS WITHIN THE APPROVED WORKFLOW?</div>
                  <div className="gate-branches">
                    <div className="gate-no">
                      <span>NO →</span>
                      <strong className="gate-human-label">HUMAN</strong>
                    </div>
                    <div className="gate-yes">
                      <span>YES ↓</span>
                    </div>
                  </div>
                </div>

                {/* Gate 2 */}
                <div className="diag-gate">
                  <div className="gate-question">IS APPROVED INFORMATION AVAILABLE?</div>
                  <div className="gate-branches">
                    <div className="gate-no">
                      <span>NO →</span>
                      <strong className="gate-human-label">HUMAN</strong>
                    </div>
                    <div className="gate-yes">
                      <span>YES ↓</span>
                    </div>
                  </div>
                </div>

                <div className="diag-node">COMPLETE ROUTINE ACTION</div>
                <div className="diag-arrow">↓</div>
                <div className="diag-node">LOG WHAT HAPPENED</div>
                <div className="diag-arrow">↓</div>
                <div className="diag-node diag-done">DONE</div>
              </div>
            </div>

            {/* Right Statement */}
            <div className="boundaries-statement-col">
              <span className="sol-label">ETHICAL ARCHITECTURE</span>
              <h3 className="boundaries-triad">
                <span>The system knows what it can do.</span>
                <span>It knows what it cannot do.</span>
                <span>And it knows when to involve someone who can.</span>
              </h3>
              <p className="boundaries-statement-body">
                That is the strongest way to explain ETA's ethical technology position.
                Clear architectural constraints, transparent audit logging, and absolute human
                supremacy over ambiguous or sensitive decisions.
              </p>
              <button
                onClick={() => openInquiryModal('Workflow Boundaries Consultation')}
                className="sol-btn sol-btn-primary"
              >
                <span>DISCUSS YOUR WORKFLOW BOUNDARIES</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 09. OUTCOMES */}
      {/* ========================================================= */}
      <section className="sol-outcomes-section" id="outcomes">
        <div className="sol-container">
          <div className="section-meta-header">
            <span className="sol-label">MEASURED VALUE</span>
            <h2 className="sol-section-title">WHAT SHOULD ACTUALLY CHANGE?</h2>
          </div>

          <div className="outcomes-grid">
            <div className="outcome-block">
              <span className="outcome-num">01</span>
              <h3 className="outcome-title">LESS REPETITIVE WORK</h3>
              <p className="outcome-desc">
                People spend less time copying, searching, routing and repeating routine actions.
              </p>
            </div>

            <div className="outcome-block">
              <span className="outcome-num">02</span>
              <h3 className="outcome-title">FASTER RESPONSE</h3>
              <p className="outcome-desc">
                Routine requests move immediately instead of waiting for someone to notice them.
              </p>
            </div>

            <div className="outcome-block">
              <span className="outcome-num">03</span>
              <h3 className="outcome-title">FEWER THINGS FALL THROUGH THE CRACKS</h3>
              <p className="outcome-desc">
                Defined workflows make follow-up, routing and escalation systematic.
              </p>
            </div>

            <div className="outcome-block">
              <span className="outcome-num">04</span>
              <h3 className="outcome-title">PEOPLE STAY IN CONTROL</h3>
              <p className="outcome-desc">
                Automation handles defined work. People remain responsible for exceptions,
                judgement and important decisions.
              </p>
            </div>
          </div>

          <div className="sol-closing-quote">
            <blockquote>
              “Every figure we publish here comes from an actual ETA demo or deployed workflow.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. HOW ETA BUILDS */}
      {/* ========================================================= */}
      <section className="sol-process-section" id="how-we-build">
        <div className="sol-container">
          <div className="section-meta-header">
            <span className="sol-label">OUR METHOD</span>
            <h2 className="sol-section-title">
              FROM MESSY PROCESS TO WORKING SYSTEM.
            </h2>
          </div>

          <div className="process-steps-list">
            <div className="p-step-row">
              <div className="p-step-badge">01 / DISCOVER</div>
              <div className="p-step-content">
                <h4>Show us how the work happens today.</h4>
                <p>We observe the exact manual steps, tool switching, and human handoffs.</p>
              </div>
            </div>

            <div className="p-step-row">
              <div className="p-step-badge">02 / MAP</div>
              <div className="p-step-content">
                <h4>We identify friction, repetition, decision points and risk.</h4>
                <p>Every operational bottleneck is documented before any code or tool is considered.</p>
              </div>
            </div>

            <div className="p-step-row">
              <div className="p-step-badge">03 / DECIDE</div>
              <div className="p-step-content">
                <h4>What needs process improvement? What can be automated? Where, if anywhere, does AI add value?</h4>
                <p>We do not push AI for tasks better resolved by a simpler form or clean notification.</p>
              </div>
            </div>

            <div className="p-step-row">
              <div className="p-step-badge">04 / BUILD</div>
              <div className="p-step-content">
                <h4>We develop the workflow around defined rules and real users.</h4>
                <p>Practical systems created to match existing workflows and digital confidence levels.</p>
              </div>
            </div>

            <div className="p-step-row">
              <div className="p-step-badge">05 / TEST</div>
              <div className="p-step-content">
                <h4>Normal cases. Exceptions. Failures. Escalations.</h4>
                <p>We stress-test edge cases to ensure the system escalates gracefully without guessing.</p>
              </div>
            </div>

            <div className="p-step-row">
              <div className="p-step-badge">06 / INTEGRATE</div>
              <div className="p-step-content">
                <h4>Connect the workflow to the tools people already use where practical.</h4>
                <p>WhatsApp, Google Sheets, email, CRMs, and internal databases.</p>
              </div>
            </div>

            <div className="p-step-row">
              <div className="p-step-badge">07 / TRAIN & IMPROVE</div>
              <div className="p-step-content">
                <h4>People understand the system, its limits and when to intervene.</h4>
                <p>Training teams so they command the tool rather than feeling displaced by it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. DISCOVERY SESSION (Commercial conversion section) */}
      {/* ========================================================= */}
      <section className="sol-discovery-section" id="discovery-session">
        <div className="sol-container">
          <div className="discovery-box">
            <div className="discovery-header">
              <span className="sol-label">NOT SURE WHERE TO BEGIN?</span>
              <h2 className="sol-section-title sol-title-huge">
                SHOW US HOW THE WORK HAPPENS.
              </h2>
              <p className="discovery-lead">
                Bring us one process that is slow, repetitive, frustrating or overly manual.
                We'll map it with you and determine what should actually change.
              </p>
            </div>

            <div className="discovery-breakdown-grid">
              {/* Column 1: We look for */}
              <div className="discovery-col">
                <h3 className="d-col-title">WE LOOK FOR</h3>
                <ul className="d-checklist">
                  <li>
                    <span className="check-mark">•</span>
                    <span>Repetition</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Waiting</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Manual data movement</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Duplicated work</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Unnecessary handoffs</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Information bottlenecks</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Document-heavy tasks</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Routine enquiries</span>
                  </li>
                  <li>
                    <span className="check-mark">•</span>
                    <span>Missing follow-ups</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: The outcome */}
              <div className="discovery-col">
                <h3 className="d-col-title">THE OUTCOME</h3>
                <ul className="d-checklist outcome-checklist">
                  <li>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>Current workflow map</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>Friction points identified</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>Automation opportunities</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>Human decision points</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>Recommended approach</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="check-icon" />
                    <span>Potential next steps</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="discovery-action-wrap">
              <button
                onClick={() => openInquiryModal('Discovery Session')}
                className="sol-btn sol-btn-primary sol-btn-lg"
              >
                <span>BOOK A DISCOVERY SESSION</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 12. BUILT FOR REALITY */}
      {/* ========================================================= */}
      <section className="sol-reality-section" id="reality">
        <div className="sol-container">
          <div className="section-meta-header">
            <span className="sol-label">OPERATIONAL CONTEXT</span>
            <h2 className="sol-section-title">
              SYSTEMS HAVE TO WORK WHERE PEOPLE ACTUALLY WORK.
            </h2>
          </div>

          <div className="reality-badges-grid">
            <div className="reality-badge-card">
              <span className="rb-icon">💬</span>
              <h4>WhatsApp-first communication</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">📱</span>
              <h4>Mobile access</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">⚡</span>
              <h4>Unreliable connectivity</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">📊</span>
              <h4>Existing spreadsheets and legacy tools</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">👥</span>
              <h4>Different levels of digital confidence</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">🗣️</span>
              <h4>Local-language requirements</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">🛡️</span>
              <h4>Human escalation</h4>
            </div>
            <div className="reality-badge-card">
              <span className="rb-icon">🔒</span>
              <h4>Privacy and responsible data handling</h4>
            </div>
          </div>

          <div className="sol-closing-quote">
            <blockquote>
              “We design around the operating environment rather than pretending it doesn't
              exist.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 13. SELECTED WORK */}
      {/* ========================================================= */}
      <section className="sol-selected-section" id="selected-work">
        <div className="sol-container">
          <div className="section-meta-header">
            <span className="sol-label">EVIDENCE & BUILDS</span>
            <h2 className="sol-section-title">SELECTED WORK</h2>
            <p className="sol-section-sub">
              Only show what is true. Until there are client deployments, these builds are called
              ETA Demos. Never disguise a demo as a client case study.
            </p>
          </div>

          {/* Three filters */}
          <div className="selected-filters-row">
            {(['LIVE SYSTEMS', 'ETA DEMOS', 'EXPERIMENTS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setWorkFilter(tab)}
                className={`filter-pill-btn ${workFilter === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Display */}
          <div className="selected-projects-list">
            {selectedProjects
              .filter((p) => p.category === workFilter)
              .map((proj) => (
                <div key={proj.id} className="selected-project-card">
                  <div className="proj-card-top">
                    <span className="proj-badge">{proj.category}</span>
                    <h3 className="proj-title">{proj.title}</h3>
                  </div>

                  <div className="proj-specs-grid">
                    <div className="spec-col">
                      <span className="spec-label">THE PROBLEM</span>
                      <p className="spec-body">{proj.problem}</p>
                    </div>

                    <div className="spec-col">
                      <span className="spec-label">THE WORKFLOW</span>
                      <p className="spec-body">{proj.workflow}</p>
                    </div>

                    <div className="spec-col">
                      <span className="spec-label">WHAT ETA BUILT</span>
                      <p className="spec-body">{proj.whatEtaBuilt}</p>
                    </div>

                    <div className="spec-col">
                      <span className="spec-label">MEASURED OUTCOME</span>
                      <p className="spec-body highlight-text">{proj.measuredOutcome}</p>
                    </div>

                    <div className="spec-col">
                      <span className="spec-label">HUMAN CONTROL POINTS</span>
                      <p className="spec-body">{proj.humanControlPoints}</p>
                    </div>
                  </div>

                  <div className="proj-card-footer">
                    <button
                      onClick={() => openInquiryModal(`Case Study Request: ${proj.title}`)}
                      className="sol-inline-cta"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}

            {selectedProjects.filter((p) => p.category === workFilter).length === 0 && (
              <div className="empty-filter-state">
                <p>
                  No client deployments in this category yet. We only publish verified live
                  deployments. Explore our working builds under{' '}
                  <button onClick={() => setWorkFilter('ETA DEMOS')} className="link-btn">
                    ETA DEMOS
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 14. FINAL CTA (Almost empty) */}
      {/* ========================================================= */}
      <section className="sol-final-cta-section" id="final-cta">
        <div className="sol-container">
          <div className="final-cta-content">
            <span className="sol-label">ETA SOLUTIONS</span>

            <h2 className="final-cta-title">
              HAVE A PROCESS<br />
              THAT SHOULDN'T<br />
              STILL BE MANUAL?
            </h2>

            <div className="final-cta-subquote">
              <blockquote>“Show us how the work happens.”</blockquote>
            </div>

            <div className="final-cta-actions">
              <button
                onClick={() => openInquiryModal('Discovery Session')}
                className="sol-btn sol-btn-primary sol-btn-lg"
              >
                <span>BOOK A DISCOVERY SESSION</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => openInquiryModal('General ETA Solutions Inquiry')}
                className="sol-btn sol-btn-outline sol-btn-lg"
              >
                <span>TALK TO ETA</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Direct Email Address Indicator */}
            <div className="final-direct-email-row">
              <span className="direct-email-caption">Direct Inquiries & Demos:</span>
              <a
                href="mailto:ebibimantech@gmail.com?subject=ETA%20Solutions%20Inquiry"
                className="direct-email-link"
              >
                <Mail size={15} />
                <span>ebibimantech@gmail.com</span>
              </a>
            </div>

            <div className="final-closing-note">
              <p>
                No AI pitch required. If automation isn't the right answer, we'll say so.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* DISCOVERY & DEMO FORWARDING INTERACTIVE MODAL */}
      {/* ========================================================= */}
      {isDiscoveryModalOpen && (
        <div className="discovery-modal-backdrop" onClick={() => setIsDiscoveryModalOpen(false)}>
          <div
            className="discovery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setIsDiscoveryModalOpen(false)}
            >
              <X size={20} />
            </button>

            {!discoverySubmitted ? (
              <form onSubmit={handleFormSubmit} className="modal-inner">
                <div className="modal-topic-badge-row">
                  <span className="sol-label sol-label-gold">INQUIRY TOPIC</span>
                  <span className="modal-destination-pill">
                    <Mail size={12} />
                    <span>To: ebibimantech@gmail.com</span>
                  </span>
                </div>

                <h3 className="modal-title">{modalTopic}</h3>

                <p className="modal-desc">
                  Tell us about your process, workflow bottleneck, or the specific live demo you want
                  configured. Your submission is forwarded directly to the ETA Solutions engineering
                  team at <strong>ebibimantech@gmail.com</strong>.
                </p>

                <div className="modal-field-group">
                  <label className="field-label">
                    Select any friction points you are experiencing:
                  </label>
                  <div className="friction-options-list">
                    {frictionOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleFriction(opt)}
                        className={`friction-opt-btn ${
                          discoveryFriction.includes(opt) ? 'selected' : ''
                        }`}
                      >
                        {discoveryFriction.includes(opt) ? '✓ ' : '+ '}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-field-group">
                  <label className="field-label">
                    Describe your process or demo requirements:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. We have 40 invoices arriving weekly by PDF that we manually enter into spreadsheets, or we receive 100+ WhatsApp customer queries..."
                    value={discoveryProcess}
                    onChange={(e) => setDiscoveryProcess(e.target.value)}
                    className="modal-textarea"
                  />
                </div>

                <div className="modal-form-row">
                  <div className="modal-field">
                    <label className="field-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ama Mensah"
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
                      placeholder="e.g. ama@organisation.org or +233 50..."
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="modal-input"
                    />
                  </div>
                </div>

                <div className="modal-field-group">
                  <label className="field-label">Organisation / Role (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Operations Lead, AgroLink Ltd."
                    value={contactOrg}
                    onChange={(e) => setContactOrg(e.target.value)}
                    className="modal-input"
                  />
                </div>

                <div className="modal-submit-row">
                  <button
                    type="submit"
                    className="sol-btn sol-btn-primary sol-btn-block"
                  >
                    <span>SUBMIT & FORWARD TO EBIBIMANTECH@GMAIL.COM</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="modal-success-inner">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={44} className="success-icon" />
                </div>
                <h3 className="modal-title">INQUIRY FORWARDED</h3>
                <p className="modal-desc">
                  Your request for <strong>{modalTopic}</strong> has been packaged and directed to{' '}
                  <strong className="highlight-email">ebibimantech@gmail.com</strong>. Our engineering
                  team will review your workflow details and get back to you promptly.
                </p>

                <div className="modal-success-actions">
                  <a
                    href={generatedMailto || "mailto:ebibimantech@gmail.com"}
                    className="sol-btn sol-btn-secondary"
                  >
                    <Mail size={15} />
                    <span>Open in Mail Client / Gmail</span>
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDiscoveryModalOpen(false)
                      setDiscoverySubmitted(false)
                      setDiscoveryFriction([])
                      setDiscoveryProcess('')
                      setContactName('')
                      setContactInfo('')
                      setContactOrg('')
                    }}
                    className="sol-btn sol-btn-primary"
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

export default SolutionsPage
