import { motion } from 'framer-motion'
import { GraduationCap, Cpu, Network, ArrowRight } from 'lucide-react'
import './Approach.css'

interface ApproachCardData {
  id: string
  label: string
  icon: any
  title: string
  desc: string
  bgImage: string
}

const approachCards: ApproachCardData[] = [
  {
    id: 'education',
    label: 'Learn',
    icon: GraduationCap,
    title: 'TECH EDUCATION & DIGITAL SKILLS',
    desc: 'Through workshops, masterclasses, and practical training, we help young Africans develop the skills needed to thrive in the digital economy.',
    bgImage: '/images/pattern-1.jpg'
  },
  {
    id: 'innovation',
    label: 'Build',
    icon: Cpu,
    title: 'AI & INNOVATION PROGRAMMES',
    desc: 'From prompt engineering to responsible technology design, participants learn how to create meaningful solutions for African challenges.',
    bgImage: '/images/pattern-2.jpg'
  },
  {
    id: 'connect',
    label: 'Connect',
    icon: Network,
    title: 'COMMUNITY & ECOSYSTEM BUILDING',
    desc: 'We bring together students, educators, industry leaders, and communities to create opportunities, partnerships, and lasting impact.',
    bgImage: '/images/pattern-3.jpg'
  }
]

const Approach = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18
      }
    }
  } as any

  const cardVariants = {
    hidden: { opacity: 0, y: 55 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  } as any

  return (
    <section className="approach-section" id="approach">
      <div className="approach-container">
        
        {/* Section Header */}
        <div className="approach-header">
          <div className="approach-eyebrow">Our Approach</div>
          <div className="approach-header-grid">
            <h2 className="approach-title">
              HOW WE TURN<br />
              CURIOSITY INTO<br />
              CREATORS
            </h2>
            <p className="approach-subtitle">
              Through education, innovation, community engagement, and ethical technology practices, 
              we equip young Africans to become builders—not just consumers—of technology.
            </p>
          </div>
        </div>

        {/* 3 Large Approach Cards Grid */}
        <motion.div 
          className="approach-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {approachCards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div 
                className="approach-card" 
                variants={cardVariants}
                key={card.id}
              >
                {/* Background Image inside the Card */}
                <div 
                  className="approach-card-bg"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                ></div>
                
                {/* Dark Overlay over the Background Image */}
                <div className="approach-card-overlay"></div>

                {/* White Container holding Card Content */}
                <div className="approach-card-inner">
                  <span className="approach-card-label">{card.label}</span>
                  
                  <div className="approach-card-icon-circle">
                    <Icon className="approach-card-icon" />
                  </div>

                  <h3 className="approach-card-title">{card.title}</h3>
                  <p className="approach-card-desc">{card.desc}</p>
                  
                  <div className="approach-card-cta">
                    <span>Learn More</span>
                    <ArrowRight className="approach-card-arrow" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default Approach
