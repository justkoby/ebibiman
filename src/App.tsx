import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Hero from './components/Hero'
import WhyEbibiman from './components/WhyEbibiman'
import Approach from './components/Approach'
import TransitionMarquee from './components/TransitionMarquee'
import ProgrammesShowcase from './components/ProgrammesShowcase'
import Ecosystem from './components/Ecosystem'
import Events from './components/Events'
import FutureMinds from './components/FutureMinds'
import Voices from './components/Voices'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import MenuDrawer from './components/MenuDrawer'
import Footer from './components/Footer'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`app-container ${isMenuOpen ? 'drawer-open' : ''}`}>
      {/* Global Navigation Header */}
      <header className={`global-header ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'hidden-header' : ''}`}>
        <button className="header-btn left-btn" onClick={() => setIsMenuOpen(true)}>
          <span className="burger-icon">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </span>
          <span className="btn-text-wrapper">
            <span className="btn-text-default">Menu</span>
            <span className="btn-text-hover">Explore</span>
          </span>
        </button>

        <a href="#contact" className="header-btn right-btn" onClick={handleJoinClick}>
          <span className="btn-text">Join The Movement</span>
          <ArrowRight className="btn-arrow" />
        </a>
      </header>

      {/* Behind-the-page Fixed Drawer Menu */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Layout Wrapper (scales and slides right on menu open) */}
      <div 
        className={`main-layout-wrapper ${isMenuOpen ? 'menu-open' : ''}`}
        onClick={isMenuOpen ? () => setIsMenuOpen(false) : undefined}
      >
        <Hero />
        <WhyEbibiman />
        <Approach />
        <TransitionMarquee />
        <ProgrammesShowcase />
        <Ecosystem />
        <FutureMinds />
        <Voices />
        <Events />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}

export default App
