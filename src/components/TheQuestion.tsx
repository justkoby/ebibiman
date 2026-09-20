import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './TheQuestion.css'

export default function TheQuestion() {
  return (
    <section className="the-question-section" id="the-question">
      {/* Background ambient lighting accents */}
      <div className="question-glow-accent"></div>

      <div className="the-question-container">
        {/* Eyebrow Label */}
        <motion.div
          className="question-eyebrow-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="question-eyebrow">03 — THE QUESTION FACING US</span>
        </motion.div>

        {/* Main Editorial Headline */}
        <motion.div
          className="question-headline-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <h2 className="question-headline">
            WHAT HAPPENS WHEN<br />
            TECHNOLOGY STARTS<br />
            REPRODUCING NOT MERELY<br />
            WHAT YOUR HANDS CAN DO,<br />
            <span className="question-highlight">BUT WHAT YOUR MIND CAN DO?</span>
          </h2>
        </motion.div>

        {/* Supporting Text & CTA Row */}
        <motion.div
          className="question-footer-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="question-supporting-text">
            “AI is changing work, education and economic opportunity. For African societies, the challenge is bigger than adoption. We need to understand what these technologies mean for us and participate in shaping what comes next.”
          </p>

          <div className="question-cta-wrapper">
            <a href="#/blog/ai-coming-for-you" className="question-cta-btn">
              <span>READ THE ARTICLE</span>
              <ArrowRight className="question-cta-arrow" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
