import { motion } from 'framer-motion'
import { ArrowRight, Globe, ShieldAlert, Award } from 'lucide-react'
import './WhyEbibiman.css'

const WhyEbibiman = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15 
      }
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
    <section className="why-section" id="about">
      <div className="why-container">
        <motion.div 
          className="why-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="section-eyebrow">Why Ebibiman Exists</div>
          <h2 className="section-title">
            Africa Uses Technology. <br />
            <span className="gold-text">Africa Must Also Build It.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="why-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Statistics and challenges */}
          <motion.div className="why-left" variants={fadeUp}>
            <div className="stat-cards">
              <div className="stat-card">
                <div className="stat-icon-wrapper">
                  <Globe className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h4 className="stat-value">Less than 2%</h4>
                  <p className="stat-label">
                    of the world's developers are in Africa, despite the continent having the youngest population.
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper">
                  <ShieldAlert className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h4 className="stat-value">Cultural Divide</h4>
                  <p className="stat-label">
                    Most software utilized locally is created elsewhere, resulting in critical ethical and cultural gaps.
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper">
                  <Award className="stat-icon" />
                </div>
                <div className="stat-content">
                  <h4 className="stat-value">Rooted Builders</h4>
                  <p className="stat-label">
                    We train programmers to embed local values and community needs directly into their code.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & CTA */}
          <motion.div className="why-right" variants={fadeUp}>
            <div className="narrative-content">
              <p className="narrative-lead">
                Most technology shaping African lives is built elsewhere.
              </p>
              <p className="narrative-body">
                As AI, automation, and digital systems become more influential, African voices must be active creators, not passive consumers. Without local builders, we risk inheriting biased algorithms that exclude our histories, realities, and opportunities.
              </p>
              <p className="narrative-body">
                Ebibiman Tech Alliance bridges this divide by nurturing builders who treat technology as a tool for self-reliance, cultural expression, and community impact.
              </p>
              
              <div className="why-cta-wrapper">
                <a href="#programmes" className="btn-why-cta">
                  <span>Explore Our Mission</span>
                  <ArrowRight className="cta-arrow" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyEbibiman
