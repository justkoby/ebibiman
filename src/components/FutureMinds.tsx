import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import "./FutureMinds.css"

interface Phase {
  num: string
  title: string
  desc: string
  // placeholder color for now — user will swap in real images later
  placeholderColor: string
}

const phases: Phase[] = [
  {
    num: "01",
    title: "ICT LAB SETUP",
    desc: "We equip schools with computers, networking, and digital infrastructure — creating a foundation for meaningful technology education.",
    placeholderColor: "#2A2A2A"
  },
  {
    num: "02",
    title: "DIGITAL LITERACY",
    desc: "Students gain practical technology skills integrated into their everyday learning — from basic computing to creative problem solving.",
    placeholderColor: "#1E1E2E"
  },
  {
    num: "03",
    title: "TEACHER TRAINING",
    desc: "Educators receive hands-on training to confidently lead digital lessons, ensuring technology adoption is sustained long-term.",
    placeholderColor: "#1A2A1A"
  },
  {
    num: "04",
    title: "TECH CLUBS & INNOVATION",
    desc: "Students explore coding, AI, robotics, and creative problem solving — discovering what it means to be a builder of technology.",
    placeholderColor: "#2A1A10"
  },
  {
    num: "05",
    title: "COMMUNITY ACCESS",
    desc: "Labs become shared resources for parents, local communities, and young adults — extending the impact beyond the school gates.",
    placeholderColor: "#1A1A2A"
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
          <span className="fm-eyebrow">Future Minds Ghana</span>
          <div className="fm-header-grid">
            <h2 className="fm-title">
              BUILDING THE NEXT<br />
              GENERATION OF<br />
              AFRICAN INNOVATORS
            </h2>
            <p className="fm-subtitle">
              Future Minds Ghana equips schools with technology,
              trains educators, and creates opportunities for students
              to become creators of technology rather than consumers.
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
                  <h3 className="fm-phase-title">{phase.title}</h3>
                  <p className="fm-phase-desc">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
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
                    {/* Placeholder — user will replace with real images */}
                    <div className="fm-placeholder-inner">
                      <div className="fm-placeholder-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                          <rect x="8" y="12" width="32" height="22" rx="3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
                          <path d="M16 34V38M32 34V38M12 38H36" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="24" cy="23" r="5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <span className="fm-placeholder-label">{phase.num}</span>
                      <span className="fm-placeholder-title">{phase.title}</span>
                    </div>
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

        {/* Bottom CTA */}
        <div className="fm-bottom-cta">
          <a href="#partner" className="fm-cta-btn">
            <span>Sponsor a Future Minds Lab</span>
            <div className="fm-cta-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  )
}

export default FutureMinds
