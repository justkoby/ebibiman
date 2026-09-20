import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import Hero from './components/Hero'
import TheProblem from './components/TheProblem'
import AfricanKnowledgeAtlas from './components/AfricanKnowledgeAtlas'
// import WhyEbibiman from './components/WhyEbibiman'
import KnowledgeMeetsTech from './components/KnowledgeMeetsTech'
import Approach from './components/Approach'
import TransitionMarquee from './components/TransitionMarquee'
import ProgrammesShowcase from './components/ProgrammesShowcase'
import Ecosystem from './components/Ecosystem'
import Events from './components/Events'
import Voices from './components/Voices'
import CTA from './components/CTA'
import MenuDrawer from './components/MenuDrawer'
import Footer from './components/Footer'
import EbiAssistant from './components/EbiAssistant'
import BlogPage from './components/BlogPage'
import ArticlesPage from './components/ArticlesPage'
import EventsPage from './components/EventsPage'
import SolutionsPage from './components/SolutionsPage'
import AcademyPage from './components/AcademyPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'nita-bill' | 'tech-issues-2026' | 'ai-coming-for-you' | 'reproducing-mind' | 'digital-innovation-facade' | 'articles' | 'events-page' | 'solutions' | 'academy'>('home')

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

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/blog/nita-bill') {
        setCurrentView('nita-bill')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/blog/tech-issues-2026') {
        setCurrentView('tech-issues-2026')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/blog/ai-coming-for-you' || window.location.hash === '#/blog/ai-is-coming-for-you') {
        setCurrentView('ai-coming-for-you')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/blog/reproducing-mind' || window.location.hash === '#/blog/what-happens-when-tech-reproduces-mind') {
        setCurrentView('reproducing-mind')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/blog/digital-innovation-facade') {
        setCurrentView('digital-innovation-facade')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/articles') {
        setCurrentView('articles')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/events-page' || window.location.hash === '#/events-listing') {
        setCurrentView('events-page')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/solutions' || window.location.hash === '#/eta-solutions') {
        setCurrentView('solutions')
        window.scrollTo(0, 0)
      } else if (window.location.hash === '#/academy' || window.location.hash === '#/eta-academy') {
        setCurrentView('academy')
        window.scrollTo(0, 0)
      } else {
        setCurrentView('home')
        
        // Handle auto-scroll to anchor when returning to home view
        const anchor = window.location.hash.slice(1)
        if (anchor && anchor !== 'home' && anchor !== 'hero' && !anchor.startsWith('/')) {
          // Wait for DOM update
          setTimeout(() => {
            const element = document.getElementById(anchor)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }, 150)
        } else {
          window.scrollTo(0, 0)
        }
      }
    }

    // Run on mount
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBackToHome = () => {
    window.location.hash = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app-container ${isMenuOpen ? 'drawer-open' : ''}`}>
      {/* Global Navigation Header */}
      <header className={`global-header ${scrolled ? 'scrolled' : ''} ${currentView !== 'home' ? 'hidden-header' : ''}`}>
        <button className="header-btn left-btn" onClick={() => setIsMenuOpen(true)}>
          <span className="burger-icon">
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </span>
          <span className="btn-text">Menu</span>
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
        {currentView === 'nita-bill' ? (
          <BlogPage articleId="nita-bill" onBack={handleBackToHome} />
        ) : currentView === 'tech-issues-2026' ? (
          <BlogPage articleId="tech-issues-2026" onBack={handleBackToHome} />
        ) : currentView === 'ai-coming-for-you' ? (
          <BlogPage articleId="ai-coming-for-you" onBack={handleBackToHome} />
        ) : currentView === 'reproducing-mind' ? (
          <BlogPage articleId="reproducing-mind" onBack={handleBackToHome} />
        ) : currentView === 'digital-innovation-facade' ? (
          <BlogPage articleId="digital-innovation-facade" onBack={handleBackToHome} />
        ) : currentView === 'articles' ? (
          <ArticlesPage onBack={handleBackToHome} />
        ) : currentView === 'events-page' ? (
          <EventsPage onBack={handleBackToHome} />
        ) : currentView === 'solutions' ? (
          <SolutionsPage onBack={handleBackToHome} />
        ) : currentView === 'academy' ? (
          <AcademyPage onBack={handleBackToHome} />
        ) : (
          <>
            <Hero />
            <TheProblem />
            <AfricanKnowledgeAtlas />
            {/* <WhyEbibiman /> */}
            <KnowledgeMeetsTech />
            <Approach />
            <TransitionMarquee />
            <ProgrammesShowcase />
            <Ecosystem />
            <Voices />
            <Events />
            <CTA />
            <Footer />
            <EbiAssistant />
            <ScrollToTop />
          </>
        )}
      </div>
    </div>
  )
}

export default App
