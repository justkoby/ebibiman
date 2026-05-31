import { motion } from 'framer-motion'
import './MenuDrawer.css'

interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: 'Home', targetId: 'hero' },
  { label: 'About', targetId: 'why-ebibiman' },
  { label: 'Approach', targetId: 'approach' },
  { label: 'Programmes', targetId: 'programmes' },
  { label: 'Future Minds Ghana', targetId: 'future-minds' },
  { label: 'Events', targetId: 'events' },
  { label: 'FAQ', targetId: 'faq' },
  { label: 'Contact', targetId: 'contact' }
]

const MenuDrawer = ({ isOpen, onClose }: MenuDrawerProps) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    onClose()
    
    // Slight timeout to let the drawer close transition start before scrolling
    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  // Animation variants for container
  const containerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15
      }
    }
  } as any

  // Animation variants for individual menu items
  const itemVariants = {
    closed: { opacity: 0, x: -15 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  return (
    <motion.div 
      className="menu-drawer"
      animate={{ 
        x: isOpen ? '0%' : '-15%', 
        opacity: isOpen ? 1 : 0 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div className="menu-drawer-content">
        
        {/* Drawer Header with Close Button */}
        <div className="drawer-header">
          <button className="btn-close-menu" onClick={onClose}>
            <span className="close-icon">✕</span>
            <span className="close-text">Close</span>
          </button>
          <span className="drawer-brand-name">Ebibiman Tech Alliance</span>
        </div>

        {/* Tagline Statement */}
        <div className="drawer-tagline">
          BUILDING AFRICA'S NEXT<br />
          GENERATION OF<br />
          TECHNOLOGY CREATORS
        </div>

        {/* Primary Menu Links */}
        <motion.nav 
          className="drawer-nav"
          variants={containerVariants}
          animate={isOpen ? 'open' : 'closed'}
        >
          {menuItems.map((item) => (
            <motion.div 
              key={item.label} 
              variants={itemVariants}
              className="drawer-nav-item-wrap"
            >
              <a 
                href={`#${item.targetId}`} 
                onClick={(e) => handleLinkClick(e, item.targetId)}
                className="drawer-nav-link"
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </motion.nav>

        {/* Divider 1 */}
        <div className="drawer-divider"></div>

        {/* Secondary Links */}
        <div className="drawer-secondary-links">
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, 'contact')} 
            className="drawer-sec-link"
          >
            Join The Movement
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, 'contact')} 
            className="drawer-sec-link"
          >
            Become A Partner
          </a>
        </div>

        {/* Divider 2 */}
        <div className="drawer-divider"></div>

        {/* Socials Block */}
        <div className="drawer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="drawer-social-link">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="drawer-social-link">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="drawer-social-link">Facebook</a>
        </div>

      </div>
    </motion.div>
  )
}

export default MenuDrawer
