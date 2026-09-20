import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './TheProblem.css'

const TheProblem = () => {
  return (
    <section className="the-problem-section" id="the-problem">
      <div className="the-problem-container">
        {/* Eyebrow Label */}
        <motion.div
          className="problem-eyebrow-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="problem-tag">THE QUESTION FACING US</span>
        </motion.div>

        {/* Main Editorial Headline */}
        <motion.div
          className="problem-headline-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <h2 className="problem-headline">
            WHAT HAPPENS WHEN<br />
            TECHNOLOGY STARTS<br />
            REPRODUCING NOT MERELY<br />
            WHAT YOUR HANDS CAN DO,<br />
            <span className="problem-highlight">BUT WHAT YOUR MIND CAN DO?</span>
          </h2>
        </motion.div>

        {/* Supporting Text & CTA Row */}
        <motion.div
          className="problem-footer-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="problem-supporting-text">
            “AI is changing work, education and economic opportunity. For African societies, the challenge is bigger than adoption. We need to understand what these technologies mean for us and participate in shaping what comes next.”
          </p>

          <div className="problem-cta-wrapper">
            <a href="#/blog/ai-coming-for-you" className="problem-cta-btn">
              <span>READ THE ARTICLE</span>
              <ArrowRight size={16} className="problem-cta-arrow" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TheProblem
