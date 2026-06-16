import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './Events.css'

interface MagazineStory {
  category: string
  title: string
  date: string
  image: string
  link: string
  desc: string
}

const featuredStory: MagazineStory = {
  category: 'Opinion Piece',
  title: "Ghana's Digital Future Is at Stake - The NITA Bill Must Do Better",
  date: 'June 2025',
  image: '/images/nita_bill_opinion.png',
  link: '#/blog/nita-bill',
  desc: 'Ghana is at an inflection point. The National Information Technology Authority Bill, 2025 is an opportunity to build legal architecture for the next generation. We cannot stay silent about the ways this bill, as currently drafted, could do serious harm.'
}

const sideStories: MagazineStory[] = [
  {
    category: 'Opinion Piece',
    title: 'AI is coming for you!',
    date: 'March 8, 2025',
    image: '/images/ai_coming_for_you.png',
    link: '#/blog/ai-coming-for-you',
    desc: 'AI is not just a harbinger of job displacement; it is a powerful tool to revolutionize industries. But its rapid advancement raises critical questions about our future.'
  },
  {
    category: 'Opinion Piece',
    title: 'Five Technology Issues to Watch Out For in 2026',
    date: 'June 2026',
    image: '/images/tech_trends_2026.png',
    link: '#/blog/tech-issues-2026',
    desc: 'Rapid advances in AI, digital finance, connectivity, green tech, and cybersecurity are redefining work, health, and agriculture. How will Ghana navigate this transition?'
  },
  {
    category: 'Masterclass',
    title: 'AI Prompt Engineering: Teaching Young Africans To Work Smarter With AI',
    date: 'July 2025',
    image: '/images/AI Prompt Engineering.png',
    link: '#story-ai',
    desc: 'Equipping the next generation of African builders with AI prompt structures, communication frameworks, and critical future-skills required for cognitive work.'
  },
  {
    category: 'Thought Leadership',
    title: "The Ghanaian Tech Space Is Dying: Reimagining Ghana's Technology Landscape",
    date: 'Monthly Series',
    image: '/images/webinar_series.png',
    link: '#story-webinar',
    desc: 'Bringing industry leaders together to challenge status quos and design sustainable digital policy.'
  },
  {
    category: 'Education',
    title: "Preparing Schools For Africa's Digital Future",
    date: 'Ongoing Initiative',
    image: '/images/future_minds_ghana.png',
    link: '#story-education',
    desc: 'Setting up modern ICT labs and training educators to sustain technology adoption across regional institutions.'
  }
]

const allStories = [featuredStory, ...sideStories]

const Events = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
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

        {/* Desktop Magazine Grid View */}
        <motion.div 
          className="events-layout-grid desktop-only"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Giant Featured Card */}
          <motion.div className="featured-story-col" variants={fadeUp}>
            <a href={featuredStory.link} className="mag-card featured-card">
              <div className="mag-image-wrapper">
                <span className="mag-badge highlight">{featuredStory.category}</span>
                <img 
                  src={featuredStory.image} 
                  alt={featuredStory.title} 
                  className="mag-image featured-parallax" 
                />
                <div className="mag-overlay"></div>
              </div>
              <div className="mag-content">
                <span className="mag-date">{featuredStory.date}</span>
                <h3 className="mag-title">{featuredStory.title}</h3>
                <p className="mag-desc">{featuredStory.desc}</p>
                <div className="mag-action-link">
                  <span>Read Story</span>
                  <ArrowRight className="mag-arrow-icon" />
                </div>
              </div>
            </a>
          </motion.div>

          {/* Right Column: Stacked Smaller Cards */}
          <motion.div className="side-stories-col" variants={fadeUp}>
            <div className="side-stories-stack">
              {sideStories.map((story, idx) => (
                <a href={story.link} className="mag-card side-card" key={idx}>
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
                    <h4 className="mag-title">{story.title}</h4>
                    <p className="mag-desc">{story.desc}</p>
                    <div className="mag-action-link">
                      <span>Read Story</span>
                      <ArrowRight className="mag-arrow-icon" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Horizontal Carousel View */}
        <div className="blog-scroll mobile-only">
          {allStories.map((story, idx) => (
            <a href={story.link} className="blog-card" key={idx}>
              <div className="blog-card-image-wrap">
                <img src={story.image} alt={story.title} />
                <span className="blog-badge">{story.category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-date">{story.date}</span>
                </div>
                <h3 className="blog-title">{story.title}</h3>
                <div className="blog-action-link">
                  <span>Read Story</span>
                  <ArrowRight className="blog-arrow-icon" size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Events;
