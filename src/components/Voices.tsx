import { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import "./Voices.css"

interface Speaker {
  id: string
  name: string
  role: string
  org: string
  quote: string
  tags: string[]
  event: string
  eventSub: string
  photo: string
  initials: string
  accentColor: string
}

const speakers: Speaker[] = [
  {
    id: "josiah",
    name: "Josiah Kwesi Eyison",
    role: "CEO",
    org: "iSpace Foundation",
    quote: "Africa's startup ecosystem does not need more consumers of technology. It needs builders, problem-solvers, and founders who understand local challenges and can create solutions for them.",
    tags: ["Entrepreneurship", "Innovation", "Startups"],
    event: "ETA Webinar Series",
    eventSub: "The Ghanaian Tech Space Is Dying?",
    photo: "/images/josiah.jpg",
    initials: "JE",
    accentColor: "#8A6D3B"
  },
  {
    id: "kofi",
    name: "Prof. Kofi S. Adu-Manu",
    role: "Associate Professor",
    org: "University of Ghana",
    quote: "Technology education must move beyond theory. Students should leave our institutions with the skills, confidence, and mindset required to innovate and compete globally.",
    tags: ["Education", "Research", "Digital Skills"],
    event: "ETA Webinar Series",
    eventSub: "Reimagining Tech Education in Ghana",
    photo: "/images/kofi.jpg",
    initials: "KA",
    accentColor: "#3B6D8A"
  },
  {
    id: "akua",
    name: "Akua Serwaa Nkrumah",
    role: "Frontend Developer & Educator",
    org: "A2SV",
    quote: "The future belongs to young Africans who are willing to learn continuously, build publicly, and solve meaningful problems through technology.",
    tags: ["Web Development", "Youth", "Future Skills"],
    event: "AI Masterclass Series",
    eventSub: "Building in Public: The Developer Mindset",
    photo: "/images/akua.jpg",
    initials: "AN",
    accentColor: "#6D3B8A"
  },
  {
    id: "paul",
    name: "Paul Maen",
    role: "Founder",
    org: "Design Africa Network",
    quote: "Design is not simply about aesthetics. It is about understanding people, solving real problems, and creating experiences that improve lives.",
    tags: ["Design", "Innovation", "Creativity"],
    event: "ETA Webinar Series",
    eventSub: "African-Centred Design Thinking",
    photo: "/images/paul.jpg",
    initials: "PM",
    accentColor: "#3B8A5A"
  },
  {
    id: "aminah",
    name: "Aminah Abisiba Annan",
    role: "Moderator & Community Leader",
    org: "Ebibiman Tech Alliance",
    quote: "The conversations we have today will shape the technology ecosystem we leave behind for the next generation.",
    tags: ["Leadership", "Community", "Technology"],
    event: "ETA Webinar Series",
    eventSub: "The Ghanaian Tech Space Is Dying?",
    photo: "/images/aminah.jpg",
    initials: "AA",
    accentColor: "#8A3B5A"
  }
]

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  })
} as any

const Voices = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const dragStart = useRef(0)

  const go = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex((newIndex + speakers.length) % speakers.length)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStart.current = "touches" in e ? e.touches[0].clientX : e.clientX
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const delta = dragStart.current - endX
    if (Math.abs(delta) > 40) go(activeIndex + (delta > 0 ? 1 : -1))
  }

  const speaker = speakers[activeIndex]

  return (
    <section className="voi-section" id="voices">
      <div className="voi-container">

        {/* ===== LEFT COLUMN ===== */}
        <div className="voi-left">
          <span className="voi-eyebrow">Thought Leadership</span>
          <h2 className="voi-heading">
            WHAT AFRICA'S<br />
            TECH LEADERS<br />
            ARE SAYING
          </h2>

          {/* Navigation */}
          <div className="voi-nav">
            <button
              className="voi-nav-btn"
              onClick={() => go(activeIndex - 1)}
              aria-label="Previous speaker"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="voi-nav-btn"
              onClick={() => go(activeIndex + 1)}
              aria-label="Next speaker"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="voi-dots">
            {speakers.map((_, i) => (
              <button
                key={i}
                className={`voi-dot ${i === activeIndex ? "voi-dot-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Go to speaker ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="voi-counter">
            <span className="voi-counter-cur">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="voi-counter-sep"> / </span>
            <span className="voi-counter-tot">{String(speakers.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* ===== RIGHT COLUMN: Animated Card ===== */}
        <div
          className="voi-right"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={speaker.id}
              className="voi-card"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Event tag */}
              <div className="voi-event-tag">
                <div className="voi-event-dot" style={{ backgroundColor: speaker.accentColor }}></div>
                <div className="voi-event-info">
                  <span className="voi-event-series">{speaker.event}</span>
                  <span className="voi-event-sub">{speaker.eventSub}</span>
                </div>
              </div>

              {/* Speaker identity row */}
              <div className="voi-speaker-row">
                <div className="voi-photo-wrap" style={{ "--accent": speaker.accentColor } as React.CSSProperties}>
                  <div className="voi-photo-inner">
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="voi-photo"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                    />
                    <div className="voi-photo-fallback" style={{ backgroundColor: speaker.accentColor }}>
                      {speaker.initials}
                    </div>
                  </div>
                </div>

                <div className="voi-speaker-info">
                  <h3 className="voi-speaker-name">{speaker.name}</h3>
                  <p className="voi-speaker-role">{speaker.role}</p>
                  <p className="voi-speaker-org">{speaker.org}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="voi-quote">
                <span className="voi-quote-mark">"</span>
                {speaker.quote}
              </blockquote>

              {/* Tags */}
              <div className="voi-tags">
                {speaker.tags.map((tag, i) => (
                  <span key={i} className="voi-tag">{tag}</span>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

export default Voices
