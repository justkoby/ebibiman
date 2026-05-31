import { motion } from 'framer-motion'
import { Landmark, Briefcase, HeartHandshake, School, ArrowRight } from 'lucide-react'
import './Partners.css'

interface PartnerCategory {
  title: string
  items: string[]
  icon: any
}

interface ActionCard {
  title: string
  desc: string
  linkText: string
  link: string
}

const categories: PartnerCategory[] = [
  {
    title: 'Universities',
    items: ['Ashesi University', 'KNUST', 'University of Ghana'],
    icon: Landmark
  },
  {
    title: 'Technology & Corporate',
    items: ['Google Africa', 'Microsoft Research', 'MTN Foundation'],
    icon: Briefcase
  },
  {
    title: 'NGO Partners',
    items: ['UNICEF Innovation Labs', 'Africa Teen Geeks', 'Hacks on Hills'],
    icon: HeartHandshake
  },
  {
    title: 'Schools Engaged',
    items: ['Achimota School', 'Presbyterian Boys SHS', 'Wesley Girls High'],
    icon: School
  }
]

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

const Partners = () => {
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
    <section className="partners-section" id="partners">
      <div className="partners-container">
        
        {/* Header Block */}
        <motion.div 
          className="partners-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="section-eyebrow">Collaboration</div>
          <h2 className="section-title">
            Building This <span className="gold-text">Future Together</span>
          </h2>
          <p className="partners-subtitle">
            Ethical technology is not a solo effort. We work with academic institutions, technology companies, and schools to build a sustainable tech ecosystem.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div 
          className="partners-logo-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <motion.div className="partner-logo-card" key={idx} variants={fadeUp}>
                <div className="partner-logo-title-row">
                  <Icon className="partner-cat-icon" />
                  <h4>{cat.title}</h4>
                </div>
                <div className="partner-items-list">
                  {cat.items.map((item, itemIdx) => (
                    <span className="partner-item-name" key={itemIdx}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Actions Divider */}
        <motion.div 
          className="partner-actions-divider"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="divider-line"></div>
          <span className="divider-label">Get Involved</span>
          <div className="divider-line"></div>
        </motion.div>

        {/* Action Cards */}
        <motion.div 
          className="partner-action-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {actions.map((act, idx) => (
            <motion.div className="partner-action-card" key={idx} variants={fadeUp}>
              <h4 className="partner-act-title">{act.title}</h4>
              <p className="partner-act-desc">{act.desc}</p>
              
              <div className="partner-act-btn-row">
                <a href={act.link} className="btn-partner-act">
                  <span>{act.linkText}</span>
                  <ArrowRight className="partner-btn-arrow" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Partners
