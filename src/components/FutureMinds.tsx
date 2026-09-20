import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import "./FutureMinds.css"

interface Phase {
  num: string
  title: string
  category: string
  date: string
  desc: string
  image: string
  placeholderColor: string
}

const phases: Phase[] = [
  {
    num: "01",
    title: "EQUIPPING YOUNG LEADERS FOR GOVERNANCE IN THE DIGITAL AGE",
    category: "Leadership Seminar",
    date: "13 July 2025",
    desc: "ETA led a breakout session on “Digital Influence, AI & Leadership in Governance” at the TBS SRC Leadership Seminar 2025, empowering young leaders to use technology intelligently, influence responsibly, and lead ethically.",
    image: "/images/unmutre.jpeg",
    placeholderColor: "#1E1E2E"
  },
  {
    num: "02",
    title: "AI PROMPT ENGINEERING MASTERCLASS",
    category: "Masterclass",
    date: "July 2025",
    desc: "Equipping the next generation of African builders with advanced AI prompt structures, cognitive frameworks, and critical future-skills required for an AI-shaped workforce.",
    image: "/images/AI Prompt Engineering.png",
    placeholderColor: "#1A2A1A"
  },
  {
    num: "03",
    title: "THE GHANAIAN TECH SPACE IS DYING",
    category: "Webinar",
    date: "25 April 2025",
    desc: "A landmark forum bringing industry leaders, policymakers, founders, and students together to challenge digital policy bottlenecks, examine foreign technology reliance, and architect sustainable tech ecosystems.",
    image: "/images/Responsible Tech Educationship.png",
    placeholderColor: "#2A1A10"
  },
  {
    num: "04",
    title: "WEB DEVELOPMENT MASTERCLASS: ONLINE EDITION",
    category: "Masterclass",
    date: "March 2025",
    desc: "An intensive hands-on masterclass introducing young African builders to the fundamentals of modern web development, semantic HTML, and responsive CSS.",
    image: "/images/masterclass.jpeg",
    placeholderColor: "#1A1A2A"
  },
  {
    num: "05",
    title: "LEARNING THROUGH PLAY: EARLY DIGITAL LITERACY",
    category: "Workshop",
    date: "Quarterly Tours",
    desc: "Experiential coding, spatial puzzles, and hands-on technology discovery designed to ignite computational thinking in young African minds across schools and community hubs.",
    image: "/images/learning_through_play.png",
    placeholderColor: "#2A2A2A"
  }
]

const FutureMinds = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    phaseRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(i)
            }
          })
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0
        }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <section className="fm-section" id="future-minds" ref={sectionRef}>
      <div className="fm-container">

        {/* Section Header */}
        <motion.div
          className="fm-header"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="fm-eyebrow">ETA Gatherings & Masterclasses</span>
          <div className="fm-header-grid">
            <h2 className="fm-title">
              BUILDING THE NEXT<br />
              GENERATION OF<br />
              AFRICAN INNOVATORS
            </h2>
            <p className="fm-subtitle">
              Explore our masterclasses, seminars, public debates, and hands-on workshops empowering African youth to lead, build, and innovate with technology.
            </p>
          </div>
        </motion.div>

        {/* Scroll Storytelling Body */}
        <div className="fm-body">

          {/* Left: Scrolling Phase List */}
          <div className="fm-phases-col">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.num}
                className={`fm-phase-block ${activeIndex === i ? "fm-phase-active" : ""}`}
                ref={(el) => { phaseRefs.current[i] = el }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                <div className="fm-phase-num-col">
                  <span className="fm-phase-num">{phase.num}</span>
                  {i < phases.length - 1 && <div className="fm-phase-line"></div>}
                </div>
                <div className="fm-phase-content">
                  <span className="fm-slide-badge" style={{ marginBottom: "10px", display: "inline-block" }}>
                    {phase.category}
                  </span>
                  <h3 className="fm-phase-title">{phase.title}</h3>
                  <p className="fm-phase-desc">{phase.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* View All Events Link */}
            <div style={{ marginTop: "24px" }}>
              <a href="#/events-page" className="fm-events-all-btn">
                <span>View All Events & Programmes</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right: Sticky Visual Panel */}
          <div className="fm-visual-col">
            <div className="fm-visual-sticky">
              <div className="fm-visual-frame">
                {phases.map((phase, i) => (
                  <div
                    key={phase.num}
                    className={`fm-visual-slide ${activeIndex === i ? "fm-visual-active" : ""}`}
                    style={{ backgroundColor: phase.placeholderColor }}
                  >
                    {phase.image ? (
                      <div className="fm-slide-image-wrapper">
                        <img 
                          src={phase.image} 
                          alt={phase.title} 
                          className="fm-slide-img" 
                        />
                        <div className="fm-slide-img-overlay"></div>
                        <div className="fm-slide-content-overlay">
                          <span className="fm-slide-badge">{phase.category}</span>
                          <span className="fm-slide-date">{phase.date}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="fm-placeholder-inner">
                        <span className="fm-placeholder-label">{phase.num}</span>
                        <span className="fm-placeholder-title">{phase.title}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Progress indicator bar */}
                <div className="fm-progress-bar">
                  <div
                    className="fm-progress-fill"
                    style={{ height: `${((activeIndex + 1) / phases.length) * 100}%` }}
                  ></div>
                </div>

                {/* Phase counter */}
                <div className="fm-visual-counter">
                  <span className="fm-counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <span className="fm-counter-sep">/</span>
                  <span className="fm-counter-total">{String(phases.length).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Active label below */}
              <div className="fm-visual-label">
                <span className="fm-visual-label-num">{phases[activeIndex].num}</span>
                <span className="fm-visual-label-text">{phases[activeIndex].title}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default FutureMinds
