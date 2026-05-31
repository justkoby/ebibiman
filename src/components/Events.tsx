import { motion } from 'framer-motion'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import './Events.css'

interface EventData {
  title: string
  image: string
  summary: string
  date: string
  participants: string
  category: string
}

const secondaryEvents: EventData[] = [
  {
    title: 'ETA Webinar Series',
    image: '/images/webinar_series.png',
    summary: 'Discussions featuring Ghanaian tech space leaders and industry pioneers sharing career insights.',
    date: 'Monthly',
    participants: '200+ Attendees',
    category: 'Webinar'
  },
  {
    title: 'Ebibiman Tech Talks',
    image: '/images/tech_talks.png',
    summary: 'Brief interactive sessions breaking down complex software architectures and systems.',
    date: 'Bi-Weekly',
    participants: '120+ Builders',
    category: 'Tech Talks'
  },
  {
    title: 'School Digital Outreach',
    image: '/images/school_outreach.png',
    summary: 'Visiting regional schools to donate learning materials, test ICT facilities, and onboard students.',
    date: 'Ongoing',
    participants: '8 Schools',
    category: 'Outreach'
  },
  {
    title: 'AI Literacy Workshops',
    image: '/images/workshops.png',
    summary: 'Hands-on coding bootcamps guiding local youths through their first neural network experiments.',
    date: 'Quarterly',
    participants: '50+ Students',
    category: 'Workshop'
  }
]

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as any

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  return (
    <section className="events-section" id="events">
      <div className="events-container">
        <motion.div 
          className="events-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="section-eyebrow">Activity & Presence</div>
          <h2 className="section-title">
            Recent Programmes & <span className="gold-text">Events</span>
          </h2>
          <p className="events-section-desc">
            Credibility comes from active execution. Explore Ebibiman’s recent courses, webinars, and developer bootcamps.
          </p>
        </motion.div>

        {/* Layout Grid: Large Featured on Left, Smaller Grid on Right */}
        <motion.div 
          className="events-layout-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Large Featured Event */}
          <motion.div className="featured-event-col" variants={fadeUp}>
            <div className="featured-event-card">
              <div className="featured-image-wrapper">
                <span className="event-tag-badge highlight">Featured Masterclass</span>
                <img 
                  src="/images/AI Prompt Engineering.png" 
                  alt="AI Prompt Engineering Masterclass" 
                  className="featured-event-image" 
                />
              </div>
              <div className="featured-event-content">
                <div className="event-meta-row">
                  <div className="meta-item">
                    <Calendar className="meta-icon" />
                    <span>Completed May 2026</span>
                  </div>
                  <div className="meta-item">
                    <Users className="meta-icon" />
                    <span>300+ Young Leaders</span>
                  </div>
                </div>
                
                <h3 className="featured-event-title">AI & Prompt Engineering Masterclass</h3>
                
                <p className="featured-event-desc">
                  An intensive workspace session focusing on equipping students with deep AI literacy, advanced prompt structure, communication frameworks, and soft skills essential to the future of cognitive work.
                </p>
                
                <div className="featured-action-row">
                  <a href="#register" className="btn-featured-cta">
                    <span>View Event Highlights</span>
                    <ArrowRight className="btn-arrow-icon" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Smaller Events Grid */}
          <motion.div className="secondary-events-col" variants={fadeUp}>
            <div className="secondary-events-grid">
              {secondaryEvents.map((event, idx) => (
                <div className="secondary-event-card" key={idx}>
                  <div className="secondary-image-wrapper">
                    <span className="event-tag-badge">{event.category}</span>
                    <img src={event.image} alt={event.title} className="secondary-event-image" />
                  </div>
                  <div className="secondary-event-content">
                    <div className="secondary-meta-row">
                      <span>{event.date}</span>
                      <span className="separator">•</span>
                      <span>{event.participants}</span>
                    </div>
                    <h4 className="secondary-event-title">{event.title}</h4>
                    <p className="secondary-event-desc">{event.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Events
