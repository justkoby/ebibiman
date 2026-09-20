import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './Events.css'

interface ArticleItem {
  category: string
  title: string
  date: string
  image: string
  link: string
  desc: string
}

// 3 Latest Articles & Events for the homepage (Newest first)
const latestStories: ArticleItem[] = [
  {
    category: 'Editorial',
    title: "What Happens When Technology Starts Reproducing Not Merely What Your Hands Can Do, but What Your Mind Can Do?",
    date: 'Sept. 2026',
    image: '/images/What Happens When Technology Starts Reproducing Not Merely What Your Hands Can Do, but What Your Mind Can Do.jpeg',
    link: '#/blog/ai-coming-for-you',
    desc: 'What happens to a developing economy when technology begins automating the very cognitive skills we have spent decades telling young people to acquire? We must develop what becomes more valuable because the machine exists.'
  },
  {
    category: 'Tech Policy & Advocacy',
    title: "Ghana's Digital Future Is at Stake - The NITA Bill Must Do Better",
    date: 'June 2026',
    image: '/images/nita_bill_opinion.png',
    link: '#/blog/nita-bill',
    desc: 'Ghana is at an inflection point. The National Information Technology Authority Bill, 2025 is an opportunity to build legal architecture for the next generation. We cannot stay silent about the ways this bill, as currently drafted, could do serious harm.'
  },
  {
    category: 'Thought Leadership',
    title: "Five Technology Issues to Watch Out For in 2026",
    date: 'Feb. 2026',
    image: '/images/tech_trends_2026.png',
    link: '#/blog/tech-issues-2026',
    desc: 'Rapid advances in AI, digital finance, connectivity, green tech, and cybersecurity are redefining work, health, and agriculture. How will Ghana and Africa navigate this critical transition?'
  }
]

const Events: React.FC = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  } as any

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as any

  return (
    <section className="events-section" id="events">
      <div className="events-container">
        
        {/* Section Header */}
        <motion.div 
          className="events-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="section-eyebrow">Latest From The Ecosystem</div>
          <h2 className="section-title">
            Stories Shaping Africa's <span className="gold-text">Tech Future</span>
          </h2>
          <p className="events-section-desc">
            Explore the insights, milestones, and discussions driving technology adoption and digital impact across the continent.
          </p>
        </motion.div>

        {/* 3-Column Responsive Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <motion.div 
          className="events-layout-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {latestStories.map((story, idx) => (
            <motion.div className="events-grid-item" variants={fadeUp} key={idx}>
              <a href={story.link} className="mag-card">
                <div className="mag-image-wrapper">
                  <span className="mag-badge">{story.category}</span>
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="mag-image" 
                  />
                  <div className="mag-overlay"></div>
                </div>
                <div className="mag-content">
                  <span className="mag-date">{story.date}</span>
                  <h3 className="mag-title">{story.title}</h3>
                  <p className="mag-desc">{story.desc}</p>
                  <div className="mag-action-link">
                    <span>Read Article</span>
                    <ArrowRight className="mag-arrow-icon" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Actions (Direct links to Dedicated Articles & Events Pages) */}
        <motion.div 
          className="events-view-all-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="#/articles" className="events-view-all-btn">
            <span>VIEW ALL ARTICLES</span>
            <ArrowRight className="view-all-arrow" />
          </a>
          <a href="#/events-page" className="events-view-all-btn secondary">
            <span>VIEW ALL EVENTS</span>
            <ArrowRight className="view-all-arrow" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default Events
