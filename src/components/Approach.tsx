import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Cpu, ArrowRight } from 'lucide-react'
import './Approach.css'

interface ApproachCardData {
  id: string
  label: string
  icon: any
  title: string
  desc: string
  cta: string
  link: string
  bgImage: string
}

const approachCards: ApproachCardData[] = [
  {
    id: 'insights',
    label: '01 / THINK',
    icon: BookOpen,
    title: 'ETA INSIGHTS',
    desc: 'Technology does not exist outside society. We examine how AI, policy, indigenous knowledge and emerging technologies are reshaping African life.',
    cta: 'EXPLORE INSIGHTS',
    link: '#/articles',
    bgImage: '/images/pattern-1.jpg'
  },
  {
    id: 'academy',
    label: '02 / TEACH',
    icon: GraduationCap,
    title: 'ETA ACADEMY',
    desc: 'Learning experiences that help people, businesses and institutions understand and use emerging technology meaningfully.',
    cta: 'EXPLORE ACADEMY',
    link: '#/events-page',
    bgImage: '/images/pattern-2.jpg'
  },
  {
    id: 'solutions',
    label: '03 / BUILD',
    icon: Cpu,
    title: 'ETA SOLUTIONS',
    desc: 'We design digital and intelligent systems around real organisational problems, while exploring how technology can be built around African contexts and knowledge.',
    cta: 'EXPLORE SOLUTIONS',
    link: '#solutions',
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
          <h2 className="approach-title">
            WE THINK. WE TEACH. WE BUILD.
          </h2>
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
              <motion.a 
                href={card.link}
                className="approach-card" 
                variants={cardVariants}
                key={card.id}
                style={{ textDecoration: 'none' }}
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
                    <span>{card.cta}</span>
                    <ArrowRight className="approach-card-arrow" />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default Approach
