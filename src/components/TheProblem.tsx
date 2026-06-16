import { motion } from 'framer-motion'
import './TheProblem.css'

const TheProblem = () => {
  return (
    <section className="the-problem-section" id="problem">
      <div className="the-problem-container">
        <motion.div 
          className="problem-label-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="problem-tag">The Problem</span>
          <h2 className="problem-title">What happens when tradition meets <br /> innovation in tech?</h2>
        </motion.div>

        <div className="problem-content-grid">
          <motion.div 
            className="problem-lead-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Why Indigenous Technology Matters</h3>
          </motion.div>

          <motion.div 
            className="problem-body-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              Long before computers, African societies developed systems for communication, agriculture, architecture, governance, medicine, and trade.
            </p>
            <p>
              Yet much of this knowledge remains undocumented, underutilized, or at risk of disappearing.
            </p>
            <p className="problem-highlight">
              The challenge is not that Africa lacks innovation.<br />
              The challenge is that we have forgotten how much innovation already exists.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TheProblem
