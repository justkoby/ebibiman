import React from 'react'
import { Globe } from 'lucide-react'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith('#/') || targetId.startsWith('http')) return
    e.preventDefault()
    const element = document.getElementById(targetId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = targetId
    }
  }

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Top Row: Brand Info and 5-Column Navigation Grid */}
        <div className="footer-top-row">
          
          {/* Top Left: Logo & Social Icons */}
          <div className="footer-info-col">
            <div className="footer-logo-wrap">
              <img src="/images/logo.png" alt="Ebibiman Tech Alliance" className="footer-logo" />
            </div>
            
            {/* Social Icons positioned cleanly under logo */}
            <div className="footer-social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Top Right: 5 Structured Pathways & Resource Columns */}
          <div className="footer-links-grid">
            
            {/* Column 1: ETA */}
            <div className="footer-column">
              <h4 className="footer-col-title">ETA</h4>
              <ul className="footer-col-links">
                <li>
                  <a href="#knowledge-meets-tech" onClick={(e) => handleSmoothScroll(e, '#knowledge-meets-tech')}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#approach" onClick={(e) => handleSmoothScroll(e, '#approach')}>
                    Our Approach
                  </a>
                </li>
                <li>
                  <a href="#ecosystem" onClick={(e) => handleSmoothScroll(e, '#ecosystem')}>
                    Impact
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Insights */}
            <div className="footer-column">
              <h4 className="footer-col-title">Insights</h4>
              <ul className="footer-col-links">
                <li><a href="#/blog/ai-coming-for-you">AI & Work</a></li>
                <li><a href="#/blog/nita-bill">Digital Policy</a></li>
                <li><a href="#/articles">Indigenous Knowledge</a></li>
                <li><a href="#/blog/digital-innovation-facade">African Innovation</a></li>
              </ul>
            </div>

            {/* Column 3: Academy */}
            <div className="footer-column">
              <h4 className="footer-col-title">Academy</h4>
              <ul className="footer-col-links">
                <li>
                  <a href="#programmes" onClick={(e) => handleSmoothScroll(e, '#programmes')}>
                    Learning Programmes
                  </a>
                </li>
                <li>
                  <a href="#programmes" onClick={(e) => handleSmoothScroll(e, '#programmes')}>
                    Corporate Learning
                  </a>
                </li>
                <li><a href="#/events-page">Workshops</a></li>
              </ul>
            </div>

            {/* Column 4: Solutions */}
            <div className="footer-column">
              <h4 className="footer-col-title">Solutions</h4>
              <ul className="footer-col-links">
                <li>
                  <a href="#/solutions">
                    AI & Automation
                  </a>
                </li>
                <li>
                  <a href="#/solutions">
                    Knowledge Systems
                  </a>
                </li>
                <li>
                  <a href="#/solutions">
                    Digital Solutions
                  </a>
                </li>
                <li>
                  <a href="#/solutions">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Connect */}
            <div className="footer-column">
              <h4 className="footer-col-title">Connect</h4>
              <ul className="footer-col-links">
                <li>
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                    Partner With ETA
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    Social Channels
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Row: Giant Typography & Copyright */}
        <div className="footer-bottom-row">
          
          {/* Giant Typography "AFRICA BUILDS." Infinite Marquee */}
          <div className="footer-marquee-container" aria-hidden="true">
            <div className="footer-marquee-track">
              <span className="footer-marquee-text">
                AFRICA BUILDS. &bull; AFRICA BUILDS. &bull; AFRICA BUILDS. &bull; AFRICA BUILDS. &bull; AFRICA BUILDS. &bull;&nbsp;
              </span>
              <span className="footer-marquee-text">
                AFRICA BUILDS. &bull; AFRICA BUILDS. &bull; AFRICA BUILDS. &bull; AFRICA BUILDS. &bull; AFRICA BUILDS. &bull;&nbsp;
              </span>
            </div>
          </div>
          
          {/* Divider and Copyright */}
          <div className="footer-copyright-bar">
            <span className="copyright-text">
              © {currentYear} Ebibiman Tech Alliance. All rights reserved.
            </span>
            <div className="copyright-meta">
              <span className="made-in-ghana">Made in Ghana</span>
              <span className="separator">•</span>
              <span className="globe-icon-wrap"><Globe className="copyright-globe" /> EN</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer
