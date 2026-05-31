import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './CTA.css'

interface ActionCard {
  title: string
  desc: string
  linkText: string
  link: string
}

const actions: ActionCard[] = [
  {
    title: 'Sponsor a School',
    desc: 'Provide workstations, servers, and offline curriculum infrastructure to a rural computer laboratory.',
    linkText: 'Funding Inquiries',
    link: '#sponsor'
  },
  {
    title: 'Support a Programme',
    desc: 'Fund masterclasses, prompt engineering resources, or webinar speaker slots for upcoming developers.',
    linkText: 'Support Programs',
    link: '#support'
  },
  {
    title: 'Volunteer as Mentor',
    desc: 'Are you a tech veteran? Lend your voice, review code, or teach a class of aspiring ethical builders.',
    linkText: 'Apply as Mentor',
    link: '#volunteer'
  }
]

const CTA = () => {
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
          <div className="section-eyebrow">Get Involved</div>
          <h2 className="section-title">
            Help Build This <span className="gold-text">Future Together</span>
          </h2>
          <p className="cta-subtitle">
            Ethical technology is not a solo effort. We work with academic institutions, technology companies, and schools to build a sustainable tech ecosystem.
          </p>
        </motion.div>

        {/* Action Cards */}
        <motion.div 
          className="cta-action-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {actions.map((act, idx) => (
            <motion.div className="cta-action-card" key={idx} variants={fadeUp}>
              <h4 className="cta-act-title">{act.title}</h4>
              <p className="cta-act-desc">{act.desc}</p>
              
              <div className="cta-act-btn-row">
                <a href={act.link} className="btn-cta-act">
                  <span>{act.linkText}</span>
                  <ArrowRight className="cta-btn-arrow" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default CTA
