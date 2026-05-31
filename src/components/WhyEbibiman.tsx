import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './WhyEbibiman.css'

// Animated Counter using RequestAnimationFrame
const AnimatedCounter = ({ target, suffix = '', duration = 1.8 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      
      // Quadratic ease out
      const easeProgress = 1 - (1 - progress) * (1 - progress)
      setCount(Math.round(easeProgress * target))
      
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    };
    window.requestAnimationFrame(step)
  }, [isVisible, target, duration])

  return <span ref={elementRef}>{count}{suffix}</span>
}

const ScrollRevealWord = ({ 
  children, 
  progress, 
  index, 
  total 
}: { 
  children: string; 
  progress: any; 
  index: number; 
  total: number 
}) => {
  // Stagger start scroll points, with overlap for a smooth fade-in
  const start = index / total
  const end = Math.min(1, (index + 3.5) / total)
  const opacity = useTransform(progress, [start, end], [0.15, 1])

  return (
    <motion.span style={{ opacity }} className="reveal-word">
      {children}
    </motion.span>
  )
}

const WhyEbibiman = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.25"]
  })

  const text1 = "AFRICA USES TECHNOLOGY."
  const text2 = "AFRICA MUST ALSO BUILD IT."
  const text3 = "THE NEXT GENERATION OF AFRICAN INNOVATORS SHOULD CREATE TECHNOLOGY ROOTED IN INDIGENOUS KNOWLEDGE, ETHICAL DESIGN, AND COMMUNITY IMPACT."

  const words1 = text1.split(/\s+/)
  const words2 = text2.split(/\s+/)
  const words3 = text3.split(/\s+/)

  const totalWords = words1.length + words2.length + words3.length

  return (
    <section className="why-metony-light" id="why-ebibiman" ref={containerRef}>
      <div className="why-metony-light-container">
        
        {/* Small Label at Top-Left */}
        <div className="why-light-label">Why Ebibiman Exists</div>

        {/* Large Bold Headline Statement */}
        <div className="why-light-statement">
          <h3 className="light-statement-line">
            {words1.map((word, i) => (
              <ScrollRevealWord key={`w1-${i}`} progress={scrollYProgress} index={i} total={totalWords}>
                {word + (i === words1.length - 1 ? "" : " ")}
              </ScrollRevealWord>
            ))}
          </h3>
          
          <h3 className="light-statement-line">
            {words2.map((word, i) => (
              <ScrollRevealWord key={`w2-${i}`} progress={scrollYProgress} index={words1.length + i} total={totalWords}>
                {word + (i === words2.length - 1 ? "" : " ")}
              </ScrollRevealWord>
            ))}
          </h3>

          <p className="light-statement-paragraph">
            {words3.map((word, i) => (
              <ScrollRevealWord key={`w3-${i}`} progress={scrollYProgress} index={words1.length + words2.length + i} total={totalWords}>
                {word + (i === words3.length - 1 ? "" : " ")}
              </ScrollRevealWord>
            ))}
          </p>
        </div>

        {/* Thin Divider #1 */}
        <div className="why-light-divider"></div>

        {/* Two Large Stats Blocks (Side-by-Side) */}
        <div className="why-light-stats-grid">
          {/* Left Stat */}
          <div className="light-stat-block">
            <span className="light-stat-desc">Youth interested in technology but lacking access</span>
            <h3 className="light-stat-value">
              <AnimatedCounter target={70} suffix="%" />
            </h3>
          </div>

          {/* Right Stat */}
          <div className="light-stat-block">
            <span className="light-stat-desc">Digital skills increasingly required for future jobs</span>
            <h3 className="light-stat-value">
              <AnimatedCounter target={80} suffix="%" />
            </h3>
          </div>
        </div>

        {/* Thin Divider #2 */}
        <div className="why-light-divider"></div>

        {/* Four Smaller Metrics in a Row */}
        <div className="why-light-metrics-row">
          <div className="light-metric-cell">
            <h4 className="light-metric-value">
              <AnimatedCounter target={3} suffix="+" />
            </h4>
            <span className="light-metric-subtitle">Flagship Programmes</span>
            <p className="light-metric-desc">Responsible Tech Educationship, AI Prompt Engineering, Learning Through Play</p>
          </div>

          <div className="light-metric-cell">
            <h4 className="light-metric-value">
              <AnimatedCounter target={12} suffix="+" />
            </h4>
            <span className="light-metric-subtitle">Workshops & Events</span>
            <p className="light-metric-desc">Masterclasses, Webinars, Community Sessions</p>
          </div>

          <div className="light-metric-cell">
            <h4 className="light-metric-value">
              <AnimatedCounter target={20} suffix="+" />
            </h4>
            <span className="light-metric-subtitle">Industry Leaders Engaged</span>
            <p className="light-metric-desc">Guest speakers and ecosystem partners</p>
          </div>

          <div className="light-metric-cell">
            <h4 className="light-metric-value">
              <AnimatedCounter target={500} suffix="+" />
            </h4>
            <span className="light-metric-subtitle">Pan-African Network</span>
            <p className="light-metric-desc">Schools, Communities, Youth reached across the continent</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyEbibiman
