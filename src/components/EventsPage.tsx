import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag, Search, Sparkles } from 'lucide-react'
import './EventsPage.css'

interface EventItem {
  id: string
  title: string
  category: string
  date: string
  location: string
  status: 'Upcoming' | 'Active' | 'Ongoing Series' | 'Registration Opening'
  image: string
  desc: string
  link: string
}

const eventsData: EventItem[] = [
  {
    id: 'ai-prompt-engineering',
    title: 'AI Prompt Engineering: Teaching Young Africans To Work Smarter With AI',
    category: 'Masterclass',
    date: 'July 2025',
    location: 'Virtual & Regional Cohorts',
    status: 'Upcoming',
    image: '/images/AI Prompt Engineering.png',
    desc: 'Equipping the next generation of African builders with advanced AI prompt structures, cognitive frameworks, and critical future-skills required for an AI-shaped workforce.',
    link: '#contact'
  },
  {
    id: 'webinar-series',
    title: "The Ghanaian Tech Space Is Dying: Reimagining Ghana's Technology Landscape",
    category: 'Webinar Series',
    date: 'Monthly Series',
    location: 'Live Stream & Hybrid Panel',
    status: 'Ongoing Series',
    image: '/images/webinar_series.png',
    desc: 'Bringing industry leaders, policymakers, founders, and students together to challenge digital policy bottlenecks and architect sustainable tech ecosystems.',
    link: '#contact'
  },
  {
    id: 'future-minds-labs',
    title: "Preparing Schools For Africa's Digital Future",
    category: 'Education Outreach',
    date: 'Ongoing Initiative',
    location: 'Regional High Schools & Colleges',
    status: 'Active',
    image: '/images/future_minds_ghana.png',
    desc: 'Deploying modern ICT equipment, teacher training curricula, and hands-on mentorship across underserved institutions to democratize digital access.',
    link: '#future-minds'
  },
  {
    id: 'responsible-tech',
    title: 'Responsible Tech Educationship',
    category: 'Fellowship',
    date: '2025 - 2026 Cohort',
    location: 'Pan-African Hybrid Fellowship',
    status: 'Upcoming',
    image: '/images/Responsible Tech Educationship.png',
    desc: 'Nurturing ethical, human-centered technology creators grounded in African developmental realities, digital rights, and community welfare.',
    link: '#contact'
  },
  {
    id: 'learning-through-play',
    title: 'Learning Through Play: Early Digital Literacy',
    category: 'Workshop',
    date: 'Quarterly Tours',
    location: 'Community Hubs & Primary Schools',
    status: 'Active',
    image: '/images/learning_through_play.png',
    desc: 'Experiential coding, spatial puzzles, and hands-on technology discovery designed to ignite computational thinking in young African minds.',
    link: '#ecosystem'
  },
  {
    id: 'tech-symposium',
    title: 'Indigenous Knowledge × Emerging Tech Annual Symposium',
    category: 'Summit',
    date: 'Q4 2026',
    location: 'Accra, Ghana & Global Stream',
    status: 'Registration Opening',
    image: '/images/tech_talks.png',
    desc: 'An international gathering uniting historians, indigenous elders, software engineers, and AI researchers to explore African computational paradigms.',
    link: '#contact'
  }
]

const categories = ['All', 'Masterclass', 'Webinar Series', 'Education Outreach', 'Fellowship', 'Workshop', 'Summit']

interface EventsPageProps {
  onBack: () => void
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEvents = eventsData.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ev.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="events-page">
      {/* Top Navigation */}
      <header className="events-nav-header">
        <button onClick={onBack} className="events-back-btn">
          <ArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>
      </header>

      <div className="events-page-container">
        {/* Header */}
        <div className="events-page-header">
          <div className="events-page-eyebrow">
            <Sparkles className="eyebrow-icon" />
            <span>Gatherings, Masterclasses & Fieldwork</span>
          </div>
          <h1 className="events-page-main-title">Events & Programmes</h1>
          <p className="events-page-main-desc">
            Explore our masterclasses, webinars, community outreach programs, and summits designed to upskill African youth and spark transformative tech discourse.
          </p>
        </div>

        {/* Filters */}
        <div className="events-controls-row">
          <div className="events-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`events-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="events-search-wrap">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="events-search-input"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="events-page-grid">
          {filteredEvents.map((ev, idx) => (
            <motion.div 
              key={ev.id}
              className="event-card-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <div className="event-full-card">
                <div className="event-card-img-wrap">
                  <span className="event-card-badge">{ev.category}</span>
                  <span className={`event-status-pill ${ev.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {ev.status}
                  </span>
                  <img src={ev.image} alt={ev.title} className="event-card-img" />
                  <div className="event-card-overlay"></div>
                </div>

                <div className="event-card-content">
                  <div className="event-meta-row">
                    <div className="event-meta-pill">
                      <Calendar size={13} className="meta-icon" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="event-meta-pill">
                      <MapPin size={13} className="meta-icon" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <h2 className="event-card-title">{ev.title}</h2>
                  <p className="event-card-desc">{ev.desc}</p>

                  <div className="event-card-footer">
                    <a href={ev.link} className="event-action-btn">
                      <span>Register / Learn More</span>
                      <ArrowRight className="action-arrow" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="events-no-results">
            <p>No events found matching your search.</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery('') }} className="events-reset-btn">
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default EventsPage
