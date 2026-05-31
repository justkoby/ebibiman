import { motion } from 'framer-motion'
import './Impact.css'

interface ImpactStat {
  value: string
  label: string
  detail: string
}

const stats: ImpactStat[] = [
  { value: '12', label: 'Webinar Sessions', detail: 'Connecting youth directly with global tech leaders.' },
  { value: '4', label: 'Masterclasses Run', detail: 'Intensive code bootcamps on AI and systems thinking.' },
  { value: '300+', label: 'Youth Reached', detail: 'Nurtured to become creators of ethical African solutions.' },
  { value: '5', label: 'Partner Schools', detail: 'Collaborating to deploy offline lab facilities.' },
  { value: '10+', label: 'Industry Experts', detail: 'Steering software training and career mentorship.' }
]

const Impact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <section className="impact-section" id="impact">
      <div className="impact-container">
        
        <motion.div 
          className="impact-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="section-eyebrow">Real Presence</div>
          <h2 className="section-title">
            Ebibiman’s <span className="gold-text">Impact in Numbers</span>
          </h2>
          <p className="impact-subtitle">
            We measure our credibility through action. These are the metrics showing our growth across schools, webinars, and training masterclasses.
          </p>
        </motion.div>

        <motion.div 
          className="impact-stats-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, idx) => (
            <motion.div className="impact-stat-panel" key={idx} variants={fadeUp}>
              <div className="stat-value-glow"></div>
              <h3 className="impact-val">{stat.value}</h3>
              <h4 className="impact-lbl">{stat.label}</h4>
              <p className="impact-detail">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default Impact
