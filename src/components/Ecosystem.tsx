import { useState } from "react"
import { motion } from "framer-motion"
import "./Ecosystem.css"

interface EcoItem {
  num: string
  title: string
  tags: string[]
  image: string
  stat?: string
  statLabel?: string
}

const ecoItems: EcoItem[] = [
  {
    num: "01",
    title: "AI MASTERCLASSES",
    tags: ["Prompt Engineering", "AI Literacy", "Future Skills"],
    image: "/images/AI Prompt Engineering.png",
    stat: "150+",
    statLabel: "Participants"
  },
  {
    num: "02",
    title: "ETA WEBINAR SERIES",
    tags: ["Industry Conversations", "Thought Leadership", "Innovation Discussions"],
    image: "/images/webinar_series.png",
    stat: "12+",
    statLabel: "Sessions"
  },
  {
    num: "03",
    title: "FUTURE MINDS GHANA",
    tags: ["ICT Labs", "Teacher Training", "Digital Literacy"],
    image: "/images/future_minds_ghana.png",
    stat: "5+",
    statLabel: "Schools"
  },
  {
    num: "04",
    title: "RESPONSIBLE TECH EDUCATIONSHIP",
    tags: ["Ethical Technology", "Indigenous Innovation", "Community Impact"],
    image: "/images/Responsible Tech Educationship.png"
  },
  {
    num: "05",
    title: "LEARNING THROUGH PLAY",
    tags: ["Children", "Creativity", "Technology Exploration"],
    image: "/images/learning_through_play.png"
  },
  {
    num: "06",
    title: "PARTNERS & COMMUNITIES",
    tags: ["Schools", "NGOs", "Universities", "Sponsors"],
    image: "/images/school_outreach.png"
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const activeItem = hoveredIndex !== null ? ecoItems[hoveredIndex] : null

  return (
    <section className="eco-section" id="ecosystem">
      <div className="eco-container">

        {/* Section Header */}
        <div className="eco-header">
          <span className="eco-eyebrow">Our Ecosystem</span>
          <div className="eco-header-grid">
            <h2 className="eco-title">
              BUILDING AFRICA'S<br />
              TECHNOLOGY<br />
              ECOSYSTEM
            </h2>
            <p className="eco-subtitle">
              We connect students, educators, communities,
              industry leaders, and technology partners
              to create lasting digital impact across Africa.
            </p>
          </div>
        </div>

        {/* Main Grid: List Left + Preview Right */}
        <div className="eco-body-grid">

          {/* Left: Numbered List */}
          <div className="eco-list">
            {ecoItems.map((item, i) => (
              <motion.div
                key={item.num}
                className={`eco-row ${hoveredIndex === i ? "eco-row-active" : ""}`}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="eco-row-left">
                  <span className="eco-row-num">{item.num}</span>
                  <span className="eco-row-title">{item.title}</span>
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

          {/* Right: Sticky Preview Panel */}
          <div className="eco-preview-panel">
            <div className="eco-preview-inner">
              {activeItem ? (
                <div className="eco-preview-card" key={activeItem.num}>
                  <div className="eco-preview-img-wrap">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="eco-preview-img"
                    />
                  </div>
                  <div className="eco-preview-info">
                    <span className="eco-preview-num">{activeItem.num}</span>
                    <h3 className="eco-preview-title">{activeItem.title}</h3>
                    {activeItem.stat && (
                      <div className="eco-preview-stat">
                        <span className="eco-preview-stat-val">{activeItem.stat}</span>
                        <span className="eco-preview-stat-lbl">{activeItem.statLabel}</span>
                      </div>
                    )}
                    <div className="eco-preview-tags">
                      {activeItem.tags.map((tag, i) => (
                        <span key={i} className="eco-preview-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="eco-preview-empty">
                  <div className="eco-preview-empty-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <path d="M10 16H22M22 16L17 11M22 16L17 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p>Hover a row to explore</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Ecosystem
