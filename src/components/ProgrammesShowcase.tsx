import { useEffect, useRef, useState } from "react"
import "./ProgrammesShowcase.css"

interface ShowcaseSlide {
  id: string
  videoSrc: string
  title: string[]
  tags: string[]
  stat: string
  statLabel: string
}

const slides: ShowcaseSlide[] = [
  {
    id: "ai-masterclass",
    videoSrc: "https://res.cloudinary.com/justkoby/video/upload/v1780201589/9365273-hd_1920_1080_25fps_qylb8r.mp4",
    title: ["AI PROMPT", "ENGINEERING", "MASTERCLASS"],
    tags: ["AI Literacy", "Prompt Engineering", "Future Skills"],
    stat: "150+",
    statLabel: "Participants"
  },
  {
    id: "tech-webinar",
    videoSrc: "https://res.cloudinary.com/justkoby/video/upload/v1780198737/bg-video_pnwybf.mp4",
    title: ["THE GHANAIAN", "TECH SPACE", "IS DYING?"],
    tags: ["Industry Leaders", "Innovation", "Technology Policy"],
    stat: "12+",
    statLabel: "Webinar Sessions"
  },
  {
    id: "future-minds",
    videoSrc: "https://res.cloudinary.com/justkoby/video/upload/v1780201601/11025564-hd_4096_2160_25fps_t8lj3l.mp4",
    title: ["FUTURE", "MINDS", "GHANA"],
    tags: ["ICT Labs", "Digital Literacy", "Tech Clubs"],
    stat: "5+",
    statLabel: "Schools Engaged"
  }
]

const ProgrammesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      
      // Calculate scroll progress within the sticky range (0.0 to 1.0)
      const scrollTop = -rect.top
      const scrollHeight = rect.height - window.innerHeight
      
      if (scrollHeight <= 0) return
      
      const pct = Math.max(0, Math.min(1, scrollTop / scrollHeight))
      
      // Map percentage to slide index
      let index = Math.floor(pct * slides.length)
      if (index >= slides.length) index = slides.length - 1
      
      setActiveIndex(index)
    }

    window.addEventListener("scroll", handleScroll)
    // Run once on mount to sync initial state
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const current = slides[activeIndex]

  return (
    // Outer wrapper: tall enough to scroll through all 3 slides.
    // Background is black so the sticky frame's "overflow" is invisible.
    <div className="ps-outer-wrapper" id="programmes" ref={sectionRef}>

      {/* Sticky cinematic frame — pins to viewport while user scrolls through wrapper */}
      <div className="ps-sticky-frame">
        {/* Background Videos — cross-fade */}
        <div className="ps-bg-layer">
          {slides.map((slide, i) => {
            const isActive = i === activeIndex
            const isNear = Math.abs(i - activeIndex) <= 1
            return (
              <div key={slide.id} className={`ps-bg-video-wrap ${isActive ? "ps-bg-active" : ""}`}>
                {isNear && (
                  <video autoPlay loop muted playsInline className="ps-bg-video">
                    <source src={slide.videoSrc} type="video/mp4" />
                  </video>
                )}
              </div>
            )
          })}
          <div className="ps-bg-overlay"></div>
        </div>

        {/* Content */}
        <div className="ps-content">
          <div className="ps-eyebrow">
            <span className="ps-label">Programmes In Motion</span>
            <span className="ps-counter">{activeIndex + 1} / {slides.length}</span>
          </div>

          <div className="ps-dots">
            {slides.map((_, i) => (
              <div key={i} className={`ps-dot ${i === activeIndex ? "ps-dot-active" : ""}`}></div>
            ))}
          </div>

          <div className="ps-title-wrap">
            {current.title.map((line, i) => (
              <h2
                key={`${activeIndex}-${i}`}
                className="ps-title-line"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {line}
              </h2>
            ))}
          </div>

          <div className="ps-bottom-row">
            <div className="ps-tags">
              {current.tags.map((tag, i) => (
                <span
                  key={`${activeIndex}-tag-${i}`}
                  className="ps-tag"
                  style={{ animationDelay: `${0.15 + i * 0.06}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="ps-stat-block">
              <span key={`${activeIndex}-stat`} className="ps-stat-value">{current.stat}</span>
              <span className="ps-stat-label">{current.statLabel}</span>
            </div>
          </div>

          {activeIndex === 0 && (
            <div className="ps-scroll-hint"><span>(SCROLL)</span></div>
          )}
        </div>
      </div>

    </div>
  )
}

export default ProgrammesShowcase
