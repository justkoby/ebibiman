import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, RefreshCw, BookOpen, GraduationCap, Cpu, Globe } from 'lucide-react'
import './BusinessModel.css'

interface ModelStep {
  id: string
  num: string
  title: string
  transition: string
  desc: string
  icon: any
}

const steps: ModelStep[] = [
  {
    id: 'insights',
    num: '01',
    title: 'INSIGHTS',
    transition: '↓ informs',
    desc: 'Rigorous research exploring technology, ethics, policy and African knowledge systems.',
    icon: BookOpen
  },
  {
    id: 'academy',
    num: '02',
    title: 'ACADEMY',
    transition: '↓ develops capability',
    desc: 'Masterclasses, institutional learning and future-ready talent development.',
    icon: GraduationCap
  },
  {
    id: 'solutions',
    num: '03',
    title: 'SOLUTIONS',
    transition: '↓ generates application + revenue',
    desc: 'Building practical digital systems, AI integrations and consulting for organisations.',
    icon: Cpu
  },
  {
    id: 'impact',
    num: '04',
    title: 'IMPACT',
    transition: '↻ strengthens the ecosystem',
    desc: 'Reinvesting commercial returns into open research, public initiatives and African technology sovereignty.',
    icon: Globe
  }
]

const BusinessModel: React.FC = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as any

  return (
    <section className="biz-section" id="business-model">
      <div className="biz-container">
        
        {/* Header Block */}
        <motion.div 
          className="biz-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <span className="biz-eyebrow">THE BUSINESS MODEL</span>
          <div className="biz-header-grid">
            <h2 className="biz-title">
              COMMERCIAL WORK.<br />
              PUBLIC PURPOSE.
            </h2>
            <div className="biz-lead-wrap">
              <h3 className="biz-lead-statement">
                ETA's commercial work helps sustain a wider mission.
              </h3>
              <p className="biz-lead-desc">
                Revenue generated through technology solutions, consulting and professional learning supports our work in research, technology education and initiatives that strengthen Africa's participation in the technological future.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visual Engine Loop Grid */}
        <motion.div 
          className="biz-loop-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isLast = idx === steps.length - 1

            return (
              <motion.div 
                className={`biz-card ${isLast ? 'biz-card-impact' : ''}`} 
                key={step.id}
                variants={fadeUp}
              >
                <div className="biz-card-top">
                  <span className="biz-card-num">{step.num}</span>
                  <div className="biz-card-icon-wrap">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="biz-card-title">{step.title}</h3>
                <p className="biz-card-desc">{step.desc}</p>

                {/* Transition Flow Badge */}
                <div className="biz-card-transition">
                  <span className="biz-trans-text">{step.transition}</span>
                  {isLast ? (
                    <RefreshCw size={13} className="biz-trans-icon spin-hover" />
                  ) : (
                    <ArrowDown size={13} className="biz-trans-icon" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default BusinessModel
