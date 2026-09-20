import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, MapPin, Search, Sparkles, X } from 'lucide-react'
import './EventsPage.css'

interface EventItem {
  id: string
  title: string
  category: string
  date: string
  location: string
  status: 'Upcoming' | 'Active' | 'Ongoing Series' | 'Registration Opening' | 'Event Recap' | 'Completed'
  image: string
  desc: string
  link: string
  fullStory?: string[]
}

const eventsData: EventItem[] = [
  {
    id: 'young-leaders-governance-2025',
    title: 'Equipping Young Leaders for Governance in the Digital Age',
    category: 'Leadership Seminar',
    date: '13 July 2025',
    location: 'TBS SRC Leadership Seminar 2025',
    status: 'Event Recap',
    image: '/images/unmutre.jpeg',
    desc: 'ETA led a breakout session on “Digital Influence, AI & Leadership in Governance” at the TBS SRC Leadership Seminar 2025, challenging young leaders to use technology intelligently, influence responsibly, and lead ethically.',
    fullStory: [
      'Ebibiman Tech Alliance (ETA) had the opportunity to lead a breakout session on “Digital Influence, AI & Leadership in Governance” at the TBS SRC Leadership Seminar 2025.',
      'Our session focused on preparing young leaders for a leadership environment increasingly shaped by technology, artificial intelligence and digital communication.',
      'We explored how participants can use digital influence responsibly, recognising that leadership today extends beyond physical spaces. What leaders post, share and communicate online can shape opinions, build trust and influence the communities they represent.',
      'We also introduced participants to the growing role of artificial intelligence in leadership and governance. Beyond simply using AI tools, we encouraged them to think critically about how AI can support research, decision-making, communication and problem-solving, while remaining conscious of issues such as misinformation, bias, privacy and responsible use.',
      'A key part of our conversation was ethical digital leadership. Technology may make leadership faster and more efficient, but accountability, integrity and sound judgement cannot be automated. Young leaders must understand when and how technology should be used and remain responsible for the decisions they make with it.',
      'Finally, we challenged participants to think about technology within the African context. Innovation should not require us to abandon our identity. Our cultures, indigenous knowledge and understanding of our communities can help shape technological solutions that are more relevant to the people they are intended to serve.',
      'For ETA, the goal was simple: to leave participants with a different understanding of leadership in the digital age.',
      'Use technology intelligently. Influence responsibly. Lead ethically. And ensure that as Africa embraces the digital future, we also help shape it.'
    ],
    link: '#recap'
  },
  {
    id: 'ai-prompt-engineering',
    title: 'AI Prompt Engineering: Teaching Young Africans To Work Smarter With AI',
    category: 'Masterclass',
    date: 'July 2025',
    location: 'Virtual & Regional Cohorts',
    status: 'Completed',
    image: '/images/AI Prompt Engineering.png',
    desc: 'Equipping the next generation of African builders with advanced AI prompt structures, cognitive frameworks, and critical future-skills required for an AI-shaped workforce.',
    link: '#contact'
  },
  {
    id: 'webinar-series',
    title: "The Ghanaian Tech Space Is Dying: Reimagining Ghana's Technology Landscape",
    category: 'Webinar',
    date: '25 April 2025',
    location: 'Live Stream & Virtual Panel',
    status: 'Completed',
    image: '/images/Responsible Tech Educationship.png',
    desc: 'A landmark one-time forum bringing industry leaders, policymakers, founders, and students together to challenge digital policy bottlenecks and architect sustainable tech ecosystems.',
    link: '#contact'
  },
  {
    id: 'masterclass-online-edition',
    title: 'Masterclass: Online Edition - Start Your Journey in Web Development',
    category: 'Masterclass',
    date: '1st - 31st March 2025',
    location: 'Online Edition',
    status: 'Completed',
    image: '/images/masterclass.jpeg',
    desc: 'An intensive hands-on masterclass introducing young African builders to the fundamentals of modern web development, semantic HTML, and responsive CSS.',
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
  }
]

const categories = ['All', 'Leadership Seminar', 'Masterclass', 'Webinar', 'Workshop']

interface EventsPageProps {
  onBack: () => void
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null)

  const filteredEvents = eventsData.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ev.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const handleEventClick = (e: React.MouseEvent, ev: EventItem) => {
    if (ev.fullStory) {
      e.preventDefault()
      setSelectedEventModal(ev)
    }
  }

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
              <div 
                className="event-full-card"
                onClick={(e) => handleEventClick(e, ev)}
                style={{ cursor: ev.fullStory ? 'pointer' : 'default' }}
              >
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
                    {ev.fullStory ? (
                      <button 
                        className="event-action-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedEventModal(ev)
                        }}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        <span>Read Event Recap</span>
                        <ArrowRight className="action-arrow" />
                      </button>
                    ) : (
                      <a href={ev.link} className="event-action-btn">
                        <span>Register / Learn More</span>
                        <ArrowRight className="action-arrow" />
                      </a>
                    )}
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

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEventModal && (
          <motion.div 
            className="event-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEventModal(null)}
          >
            <motion.div 
              className="event-modal-dialog"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="event-modal-close-btn"
                onClick={() => setSelectedEventModal(null)}
                title="Close Modal"
              >
                <X size={18} />
              </button>

              <div className="event-modal-image-wrap">
                <img 
                  src={selectedEventModal.image} 
                  alt={selectedEventModal.title} 
                  className="event-modal-img" 
                />
              </div>

              <div className="event-modal-inner">
                <div className="event-modal-badges-row">
                  <span className="event-modal-category">{selectedEventModal.category}</span>
                  <span className={`event-status-pill ${selectedEventModal.status.toLowerCase().replace(/\s+/g, '-')}`} style={{ position: 'static' }}>
                    {selectedEventModal.status}
                  </span>
                </div>

                <h2 className="event-modal-title">{selectedEventModal.title}</h2>

                <div className="event-modal-meta">
                  <div className="event-meta-pill">
                    <Calendar size={14} className="meta-icon" />
                    <span>{selectedEventModal.date}</span>
                  </div>
                  <div className="event-meta-pill">
                    <MapPin size={14} className="meta-icon" />
                    <span>{selectedEventModal.location}</span>
                  </div>
                </div>

                <div className="event-modal-body">
                  {selectedEventModal.fullStory?.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}

                  <div className="event-modal-key-takeaways">
                    <h4>ETA Takeaway:</h4>
                    <p>
                      "Use technology intelligently. Influence responsibly. Lead ethically. And ensure that as Africa embraces the digital future, we also help shape it."
                    </p>
                  </div>
                </div>

                <div className="event-modal-footer">
                  <button 
                    className="event-modal-done-btn"
                    onClick={() => setSelectedEventModal(null)}
                  >
                    Close Recap
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventsPage
