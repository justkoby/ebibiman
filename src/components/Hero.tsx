import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ParticleSwarm from './ParticleSwarm'
import './Hero.css'

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  } as any

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } as any

  return (
    <section className="hero">
      {/* Navigation Bar */}
      <motion.nav 
        className="hero-nav"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/images/logo.png" alt="ETA Logo" className="logo-image" />
          </div>

          <ul className="nav-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#programmes">Programmes</a></li>
            <li><a href="#get-involved">Get Involved</a></li>
            <li><a href="#news">News</a></li>
          </ul>

          <div className="nav-action">
            <a href="#contact" className="btn-contact">Contact</a>
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#programmes" onClick={() => setMobileMenuOpen(false)}>Programmes</a>
            <a href="#get-involved" onClick={() => setMobileMenuOpen(false)}>Get Involved</a>
            <a href="#news" onClick={() => setMobileMenuOpen(false)}>News</a>
            <a href="#contact" className="mobile-contact-btn" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Content Area */}
      <motion.div 
        className="hero-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Headline */}
        <motion.div className="hero-left" variants={fadeUpVariants}>

          <h1 className="hero-headline">
            Building Africa's <br />
            Next Generation of <br />
            <span className="gradient-text">Ethical Technology</span> <br />
            Creators
          </h1>
        </motion.div>

        {/* Right Column: Glowy Sphere, Subtext, CTAs */}
        <motion.div className="hero-right" variants={fadeUpVariants}>
          <div className="sphere-wrapper">
            <ParticleSwarm />
            <div className="sphere-glow-ring"></div>
          </div>
          
          <div className="content-block">
            <p className="hero-subtext">
              Ebibiman Tech Alliance empowers young Africans to design, build, and lead technology 
              rooted in indigenous knowledge, ethical principles, and community impact.
            </p>
            
            <div className="hero-cta-actions">
              <a href="#join" className="btn-primary-new">
                <span>Join the Movement</span>
              </a>
              <a href="#partner" className="btn-secondary-new">
                <span>Become a Partner</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}

export default Hero
