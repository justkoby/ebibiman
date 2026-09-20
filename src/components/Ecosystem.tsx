import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import "./Ecosystem.css"

interface EcoItem {
  num: string
  title: string
  tags: string[]
  image: string
  stat?: string
  statLabel?: string
  link?: string
  isArticle?: boolean
}

const ecoItems: EcoItem[] = [
  {
    num: "01",
    title: "AI & AUTOMATION",
    tags: ["Workflow Optimization", "Intelligent Systems", "Process Automation"],
    image: "/images/tech_trends_2026.png"
  },
  {
    num: "02",
    title: "DIGITAL SOLUTIONS",
    tags: ["Custom Platforms", "Digital Infrastructure", "Sovereign Systems"],
    image: "/images/pattern-1.jpg"
  },
  {
    num: "03",
    title: "AI ADOPTION & CONSULTING",
    tags: ["Organizational AI", "Capability Assessment", "Strategic Roadmaps"],
    image: "/images/workshops.png"
  },
  {
    num: "04",
    title: "DOCUMENT & DATA AUTOMATIONS",
    tags: ["Smart Workflows", "Intelligent Extraction", "Contextual Data"],
    image: "/images/pattern-3.jpg"
  }
]

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }
  })
} as any

const Ecosystem = () => {
  return (
    <section className="eco-section" id="solutions">
      <div className="eco-container">

        {/* Section Header */}
        <div className="eco-header">
          <span className="eco-eyebrow">ETA SOLUTIONS</span>
          <div className="eco-header-grid">
            <h2 className="eco-title">
              WE BEGIN WITH THE PROBLEM.
            </h2>
            <p className="eco-subtitle">
              We study how work actually happens, identify where technology can create meaningful value, and design systems around the people and organisations that will use them.
            </p>
          </div>
        </div>

        {/* Full-width Solutions List */}
        <div className="eco-body-grid">
          <div className="eco-list">
            {ecoItems.map((item, i) => (
              <motion.div
                key={item.num}
                className="eco-row"
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                onClick={() => { window.location.hash = '#/solutions' }}
                style={{ cursor: 'pointer' }}
              >
                <div className="eco-row-left">
                  <span className="eco-row-num">{item.num}</span>
                  <div className="eco-row-title-block">
                    <span className="eco-row-title">
                      {item.title}
                    </span>
                  </div>
                </div>
                <div className="eco-row-right">
                  <div className="eco-row-tags">
                    {item.tags.map((tag, ti) => (
                      <span key={ti} className="eco-row-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="eco-arrow-circle">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="eco-cta-wrapper">
          <a href="#/solutions" className="eco-cta-btn">
            <span>EXPLORE ETA SOLUTIONS</span>
            <ArrowRight size={15} />
          </a>
        </div>

      </div>
    </section>
  )
}

export default Ecosystem
