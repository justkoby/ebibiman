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
              <span className="footer-logo-text">EBIBIMAN</span>
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
            <div className="footer-column">
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
            <div className="footer-column">
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
            <div className="footer-column">
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
            <div className="footer-column">
              <h4 className="footer-col-title">Socials</h4>
              <ul className="footer-col-links">
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Row: Giant Typography & Copyright */}
        <div className="footer-bottom-row">
          
          {/* Giant Typography "AFRICA BUILDS." Stacks */}
          <div className="footer-giant-text-container" aria-hidden="true">
            <div className="giant-text-line">AFRICA BUILDS.</div>
            <div className="giant-text-line">AFRICA BUILDS.</div>
            <div className="giant-text-line">AFRICA BUILDS.</div>
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
