import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EcosystemGlobe from './EcosystemGlobe'
import './Ecosystem.css'

const Ecosystem = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as any

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  const flowSteps = [
    { label: 'Students', desc: 'Nurturing young, aspiring minds across schools.' },
    { label: 'Skills', desc: 'Equipping them with ethical coding & indigenous-centered design.' },
    { label: 'Innovation', desc: 'Channelling skills to build custom community solutions.' },
    { label: 'Communities', desc: 'Deploying technology hubs and fostering peer learning.' },
    { label: 'Impact', desc: 'Catalysing economic sovereignty & technology leadership.' }
  ]

  const nodeDetails: Record<string, { desc: string; image?: string; items: string[] }> = {
    'AI Masterclasses': {
      desc: 'Specialized intensive training camps preparing African developers for the cognitive economy.',
      image: '/images/AI Prompt Engineering.png',
      items: ['Prompt Engineering', 'AI Literacy', 'Ethical AI', 'Soft Skills']
    },
    'Webinars': {
      desc: 'Public broadcasts bridging the gap between students, leaders, and the tech ecosystem.',
      image: '/images/webinar_series.png',
      items: ['Ghanaian Tech Space discussions', 'Industry leaders', 'Innovation conversations']
    },
    'Future Minds Ghana': {
      desc: 'Our cornerstone initiative building ICT infrastructure and setting up tech clubs directly in schools.',
      image: '/images/future_minds_ghana.png',
      items: ['ICT Labs', 'School Training', 'Teacher Development', 'Tech Clubs']
    },
    'Partners': {
      desc: 'Stakeholders and collaborators funding and scaling our digital development programs.',
      items: ['Universities', 'NGOs', 'Companies']
    },
    'Schools': {
      desc: 'Educational institutions participating in our hands-on digital curriculums.',
      items: ['Primary Schools', 'Junior High', 'Senior High']
    },
    'Communities': {
      desc: 'Decentralized local circles building open tech and fostering digital literacy.',
      items: ['Tech Clubs', 'Local Hubs', 'Developer Circles']
    },
    'Innovation Labs': {
      desc: 'Physical sandboxes and research groups building localized software and hardware.',
      items: ['R&D Projects', 'Local Tooling', 'Open Source Labs']
    },
    'Tech Leaders': {
      desc: 'Industry veterans guiding our developers and ensuring tech sovereignty.',
      items: ['Mentorship', 'Industry Advisory', 'Alumni Network']
    }
  }

  const activeDetails = hoveredNode ? nodeDetails[hoveredNode] : null

  return (
    <section className="eco-section" id="ecosystem">
      {/* Subtle Adinkra Background Overlay */}
      <div className="adinkra-overlay"></div>

      <div className="eco-container">
        <motion.div 
          className="eco-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Side: Content, Stats & CTAs */}
          <motion.div className="eco-left" variants={fadeUp}>
            <div className="eco-eyebrow">The Ecosystem</div>
            
            <h2 className="eco-title">
              Building Africa’s <br />
              <span className="gold-gradient">Ethical Technology</span> <br />
              Ecosystem
            </h2>
            
            <p className="eco-intro">
              Ebibiman connects schools, students, educators, communities, and partners into one growing movement for ethical African technology.
            </p>

            {/* Interactive Flow */}
            <div className="eco-flow-container">
              <div className="flow-steps">
                {flowSteps.map((step, idx) => (
                  <div className="flow-step-item" key={idx}>
                    <div className="flow-marker">
                      <div className="flow-marker-dot"></div>
                      {idx < flowSteps.length - 1 && <div className="flow-marker-line"></div>}
                    </div>
                    <div className="flow-text">
                      <span className="flow-step-title">{step.label}</span>
                      <p className="flow-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="eco-stats-grid">
              <div className="eco-stat-card">
                <h4 className="eco-stat-value">5,000+</h4>
                <p className="eco-stat-label">Students Reached</p>
              </div>
              <div className="eco-stat-card">
                <h4 className="eco-stat-value">45+</h4>
                <p className="eco-stat-label">Schools Engaged</p>
              </div>
              <div className="eco-stat-card">
                <h4 className="eco-stat-value">20+</h4>
                <p className="eco-stat-label">Partners</p>
              </div>
              <div className="eco-stat-card">
                <h4 className="eco-stat-value">15+</h4>
                <p className="eco-stat-label">Communities</p>
              </div>
            </div>

            <div className="eco-cta-actions">
              <a href="#explore" className="btn-eco-primary">
                <span>Explore the Ecosystem</span>
              </a>
              <a href="#partner-with-us" className="btn-eco-secondary">
                <span>Partner With Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side: 3D Globe & Preview Tooltip */}
          <motion.div className="eco-right" variants={fadeUp}>
            <div className="globe-wrapper-eco">
              <EcosystemGlobe hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
              
              {/* Floating Hover Details Card */}
              <AnimatePresence mode="wait">
                {activeDetails && (
                  <motion.div 
                    className="eco-hover-card"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {activeDetails.image && (
                      <div className="hover-card-image-wrapper">
                        <img src={activeDetails.image} alt={hoveredNode || ''} className="hover-card-image" />
                      </div>
                    )}
                    <div className="hover-card-content">
                      <h4 className="hover-card-title">{hoveredNode}</h4>
                      <p className="hover-card-desc">{activeDetails.desc}</p>
                      
                      <div className="hover-card-bullets">
                        {activeDetails.items.map((item, idx) => (
                          <div className="bullet-tag" key={idx}>
                            <span className="bullet-dot"></span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {!activeDetails && (
                  <motion.div 
                    className="eco-hover-card-hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.85 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p>Hover over the nodes on the globe to explore our ecosystem</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Ecosystem
