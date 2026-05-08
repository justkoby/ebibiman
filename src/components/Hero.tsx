import { motion } from 'framer-motion'
import ParticleSwarm from './ParticleSwarm'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as any
    }
  }

  return (
    <section className="hero">
      <motion.div 
        className="hero-deco"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <ParticleSwarm />
      </motion.div>
      
      <motion.div 
        className="hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={itemVariants}>
          Ebibiman Tech Alliance &nbsp;·&nbsp; Africa's Indigenous Tech Movement
        </motion.p>
        
        <motion.h1 className="hero-title" variants={itemVariants}>
          Ethical.<br />
          Indigenous.<br />
          <span className="accent">African.</span>
        </motion.h1>
        
        <motion.p className="hero-mission" variants={itemVariants}>
          Empowering Africa's digital landscape by fostering collaboration, 
          leveraging indigenous knowledge, and addressing ethical challenges — 
          so Africans build technology, not just use it.
        </motion.p>
        
        <motion.div className="hero-cta-row" variants={itemVariants}>
          <button className="btn-primary">Join the Movement</button>
          <button className="btn-ghost">Our Programmes</button>
        </motion.div>

        <motion.div 
          className="hero-scroll"
          variants={itemVariants}
        >
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
