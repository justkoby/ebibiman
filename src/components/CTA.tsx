import { motion } from 'framer-motion'
import './CTA.css'

const CTA = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  return (
    <section className="cta-section" id="contact">
      {/* Background abstract layout shapes */}
      <div className="cta-bg-glow"></div>

      <div className="cta-container">
        <motion.div 
          className="cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="cta-heading">
            Let's Build Technology <br />
            <span className="gold-text">That Reflects Africa</span>
          </h2>
          
          <p className="cta-sub">
            Whether you’re a student, educator, organization, or partner, there’s a place for you in the movement.
          </p>

          <div className="cta-btn-group">
            <a href="#join" className="btn-cta-primary">
              <span>Join the Movement</span>
            </a>
            <a href="#partner" className="btn-cta-secondary">
              <span>Become a Partner</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
