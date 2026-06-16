import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, ChevronDown, Compass } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  const { scrollY } = useScroll()

  // Parallax effect transformations based on scroll position
  const bgY = useTransform(scrollY, [0, 800], ['0%', '20%'])
  const logoY = useTransform(scrollY, [0, 800], [0, 80])
  const badgeY = useTransform(scrollY, [0, 800], [0, -35])

  // Smooth scroll helper for bottom menu button
  const handleScrollToEcosystem = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('ecosystem')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-metony" id="hero">
      {/* Background Video with slow zoom-in on page load */}
      <motion.div
        className="hero-metony-bg-video-wrapper"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.85 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: bgY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
        >
          <source src="https://res.cloudinary.com/justkoby/video/upload/v1780198737/bg-video_pnwybf.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay for text contrast */}
      <div className="hero-metony-overlay"></div>

      {/* Center Container: Main Brand Logo & Subtext */}
      <div className="hero-metony-center">
        <motion.div
          className="brand-logo-container"
          style={{ y: logoY }}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/images/logo.png"
            alt="Ebibiman Tech Alliance"
            className="hero-logo-main"
          />
        </motion.div>

        <motion.p
          className="hero-supporting-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          Africa built technologies long before the digital age.<br />
          Yet much of that knowledge is disappearing.
        </motion.p>
      </div>

      {/* Floating Card #3: Bottom-Left Review Badge */}
      <motion.div
        className="floating-badge-reviews"
        style={{ y: badgeY }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 1.0 }}
      >
        <div className="star-row">
          <Star className="star-iconfill" />
          <Star className="star-iconfill" />
          <Star className="star-iconfill" />
          <Star className="star-iconfill" />
          <Star className="star-iconfill" />
        </div>
        <div className="badge-text-block">
          <span className="badge-val">12+ Events Hosted</span>
          <span className="badge-lbl">Across Ghana & 500+ Youth Reached</span>
        </div>
      </motion.div>

      {/* Bottom Center Button: Explore Ecosystem Menu */}
      <motion.div
        className="bottom-menu-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <a
          href="#ecosystem"
          className="btn-bottom-menu"
          onClick={handleScrollToEcosystem}
        >
          <span>Explore Ecosystem</span>
          <Compass className="menu-icon-spin" />
        </a>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="scroll-down-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <ChevronDown className="bounce-arrow" />
        <span>Discover The Ecosystem</span>
      </motion.div>
    </section>
  )
}

export default Hero
