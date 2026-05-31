import { ArrowRight, Globe } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Top Row: Info/CTA and Navigation Grid */}
        <div className="footer-top-row">
          
          {/* Top Left: Logo & Mission & Action buttons */}
          <div className="footer-info-col">
            <div className="footer-logo-wrap">
              <img src="/images/logo.png" alt="Ebibiman Tech Alliance" className="footer-logo" />
            </div>
            <p className="footer-mission">
              Building Africa's next generation of technology creators through education, innovation, and community impact.
            </p>
            
            <div className="footer-cta-group">
              <a href="#join" className="footer-cta-btn primary" onClick={handleJoinClick}>
                <span>Join The Movement</span>
                <ArrowRight className="footer-cta-arrow" />
              </a>
              <a href="#partner" className="footer-cta-btn secondary" onClick={handleJoinClick}>
                <span>Become A Partner</span>
                <ArrowRight className="footer-cta-arrow" />
              </a>
            </div>
          </div>

          {/* Top Right: Columns of Links */}
          <div className="footer-links-grid">
            
            {/* Column 1: Programmes */}
            <div className="footer-column hide-on-mobile">
              <h4 className="footer-col-title">Programmes</h4>
              <ul className="footer-col-links">
                <li><a href="#programmes">AI Prompt Engineering</a></li>
                <li><a href="#future-minds">Future Minds Ghana</a></li>
                <li><a href="#events">ETA Webinar Series</a></li>
                <li><a href="#ecosystem">Learning Through Play</a></li>
                <li><a href="#ecosystem">Responsible Tech Educationship</a></li>
              </ul>
            </div>

            {/* Column 2: Ecosystem */}
            <div className="footer-column hide-on-mobile">
              <h4 className="footer-col-title">Ecosystem</h4>
              <ul className="footer-col-links">
                <li><a href="#ecosystem">Students</a></li>
                <li><a href="#ecosystem">Educators</a></li>
                <li><a href="#ecosystem">Schools</a></li>
                <li><a href="#ecosystem">Communities</a></li>
                <li><a href="#ecosystem">Industry Leaders</a></li>
                <li><a href="#ecosystem">Partners</a></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="footer-column hide-on-mobile">
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-col-links">
                <li><a href="#events">Events</a></li>
                <li><a href="#events">News & Insights</a></li>
                <li><a href="#voices">Speaker Highlights</a></li>
                <li><a href="#events">Media Centre</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Column 4: Socials */}
            <div className="footer-column socials-column">
              <h4 className="footer-col-title">Socials</h4>
              
              {/* Desktop links */}
              <ul className="footer-col-links desktop-only-links">
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a></li>
              </ul>

              {/* Mobile icon links */}
              <div className="footer-social-icons mobile-only-icons">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                </a>
              </div>
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
              <span>Made in Ghana</span>
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
