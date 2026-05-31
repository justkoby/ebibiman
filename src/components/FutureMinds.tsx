import { useState } from 'react'
import { motion } from 'framer-motion'
import { Laptop, GraduationCap, Users, Shield, ArrowRight } from 'lucide-react'
import './FutureMinds.css'

interface PillarData {
  title: string
  desc: string
  icon: any
}

interface TimelinePhase {
  phase: string
  title: string
  desc: string
  status: string
}

const pillars: PillarData[] = [
  {
    title: 'ICT Labs Setup',
    desc: 'Installing offline-capable servers, workstations, and network routers inside schools to bypass internet constraints.',
    icon: Laptop
  },
  {
    title: 'Teacher Training',
    desc: 'Equipping school educators with curriculum guides, digital skills, and AI-literacy frameworks to support peer learning.',
    icon: GraduationCap
  },
  {
    title: 'Tech Clubs',
    desc: 'Launching weekly student-led coding clubs where children build games, scripts, and automation boards together.',
    icon: Users
  },
  {
    title: 'Community Access',
    desc: 'Opening laboratory doors on weekends and holidays for local youths and adult literacy training programs.',
    icon: Shield
  }
]

const phases: TimelinePhase[] = [
  {
    phase: 'Phase 1',
    title: 'Computer Lab Setup',
    desc: 'Procuring workstations, configuring server racks, and provisioning localized offline education resources.',
    status: 'Completed'
  },
  {
    phase: 'Phase 2',
    title: 'Teacher Training Bootcamps',
    desc: 'Empowering core educators through workshops on Scratch, basic computing, and AI-assisted teaching.',
    status: 'Completed'
  },
  {
    phase: 'Phase 3',
    title: 'Tech Clubs Deployment',
    desc: 'Onboarding students, electing club mentors, and distributing creative computing playbooks.',
    status: 'Active'
  },
  {
    phase: 'Phase 4',
    title: 'Community Access Hours',
    desc: 'Opening labs to rural community members for digital identity, literacy, and job search guidance.',
    status: 'Upcoming'
  }
]

const FutureMinds = () => {
  const [activePhase, setActivePhase] = useState<number>(2) // Phase 3 (Active) is index 2

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

  return (
    <section className="fm-section" id="future-minds">
      <div className="fm-container">
        
        {/* Header Block */}
        <motion.div 
          className="fm-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="section-eyebrow">Flagship Initiative</div>
          <h2 className="section-title">
            Future Minds Ghana: <br />
            <span className="gold-text">Bringing Technology to Every Child</span>
          </h2>
          <p className="fm-section-desc">
            We partner with under-resourced schools to build digital infrastructure and nurture creative computing hubs, transforming students from consumers to creators.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div 
          className="fm-pillars-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div className="fm-pillar-card" key={idx} variants={fadeUp}>
                <div className="fm-pillar-icon-wrapper">
                  <Icon className="fm-pillar-icon" />
                </div>
                <h4 className="fm-pillar-title">{pillar.title}</h4>
                <p className="fm-pillar-desc">{pillar.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Timeline Roadmap Section */}
        <motion.div 
          className="fm-timeline-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h3 className="timeline-section-title">Our Impact Roadmap</h3>
          
          <div className="timeline-flow-container">
            {/* The Connecting Line */}
            <div className="timeline-axis-line"></div>
            
            <div className="timeline-phases-grid">
              {phases.map((phase, idx) => {
                const isActive = idx === activePhase
                const isPassed = idx < activePhase
                
                return (
                  <div 
                    className={`timeline-phase-card ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    onMouseEnter={() => setActivePhase(idx)}
                  >
                    {/* Glowing Node */}
                    <div className="timeline-node">
                      <div className="node-dot"></div>
                    </div>
                    
                    {/* Content Box */}
                    <div className="phase-content-card">
                      <div className="phase-badge-row">
                        <span className="phase-number">{phase.phase}</span>
                        <span className={`phase-status-tag ${phase.status.toLowerCase()}`}>
                          {phase.status}
                        </span>
                      </div>
                      <h4 className="phase-title">{phase.title}</h4>
                      <p className="phase-desc">{phase.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Supporting CTA */}
        <div className="fm-bottom-cta">
          <a href="#partner" className="btn-fm-partner">
            <span>Sponsor a Future Minds Lab</span>
            <ArrowRight className="fm-cta-arrow" />
          </a>
        </div>

      </div>
    </section>
  )
}

export default FutureMinds
