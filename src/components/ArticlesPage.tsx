import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Clock, Calendar, Search } from 'lucide-react'
import './ArticlesPage.css'

interface Article {
  id: string
  title: string
  tagline: string
  category: string
  date: string
  readTime: string
  author: string
  image: string
  link: string
}

const articlesData: Article[] = [
  {
    id: 'ai-coming-for-you',
    title: "What Happens When Technology Starts Reproducing Not Merely What Your Hands Can Do, but What Your Mind Can Do?",
    tagline: "What happens to a developing economy when technology begins automating the very cognitive skills we have spent decades telling young people to acquire?",
    category: "Editorial",
    date: "Sept. 2026",
    readTime: "6 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/What Happens When Technology Starts Reproducing Not Merely What Your Hands Can Do, but What Your Mind Can Do.jpeg",
    link: "#/blog/ai-coming-for-you"
  },
  {
    id: 'nita-bill',
    title: "Ghana's Digital Future Is at Stake - The NITA Bill Must Do Better",
    tagline: "Why we must ensure the new legal architecture of our IT sector builds inclusion and fosters innovation, not isolation and capture.",
    category: "Tech Policy & Advocacy",
    date: "June 2026",
    readTime: "7 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/nita_bill_opinion.png",
    link: "#/blog/nita-bill"
  },
  {
    id: 'tech-issues-2026',
    title: "Five Technology Issues to Watch Out For in 2026",
    tagline: "Situating global transitions in AI, cybersecurity, inclusion, fintech, and green tech within Ghana's and Africa's development context.",
    category: "Thought Leadership",
    date: "Feb. 2026",
    readTime: "8 min read",
    author: "Samuel Sasu Adonteng, Peter Kwasi Kodjie, Margaret Edem Gasu & Rexford Akrong",
    image: "/images/tech_trends_2026.png",
    link: "#/blog/tech-issues-2026"
  },
  {
    id: 'digital-innovation-facade',
    title: "GHANA’S DIGITAL INNOVATION IS A FAÇADE",
    tagline: "Yet, beneath this promising narrative lies a stark reality: a persistent digital divide, limited rural connectivity, and an overdependence on foreign technologies.",
    category: "Tech Policy & Advocacy",
    date: "January 16, 2025",
    readTime: "5 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/digital_innovation_facade.png",
    link: "#/blog/digital-innovation-facade"
  }
]

const categories = ['All', 'Editorial', 'Thought Leadership', 'Tech Policy & Advocacy']

interface ArticlesPageProps {
  onBack: () => void
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="articles-page">
      {/* Top Navigation */}
      <header className="articles-nav-header">
        <button onClick={onBack} className="articles-back-btn">
          <ArrowLeft className="back-icon" />
          <span>Back to Home</span>
        </button>
      </header>

      <div className="articles-page-container">
        {/* Page Header */}
        <div className="articles-header">
          <div className="articles-eyebrow">
            <BookOpen className="eyebrow-icon" />
            <span>ETA Editorial & Insights</span>
          </div>
          <h1 className="articles-page-title">Articles & Essays</h1>
          <p className="articles-page-desc">
            Rigorous analysis, critical perspectives, and forward-looking research on emerging technology, indigenous knowledge, and African socio-economic transformation.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="articles-controls-row">
          <div className="articles-category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`articles-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="articles-search-wrap">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="articles-search-input"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="articles-grid">
          {filteredArticles.map((article, idx) => (
            <motion.div 
              key={article.id}
              className="article-card-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <a href={article.link} className="article-main-card">
                <div className="article-card-img-wrap">
                  <span className="article-card-badge">{article.category}</span>
                  <img src={article.image} alt={article.title} className="article-card-img" />
                  <div className="article-card-overlay"></div>
                </div>

                <div className="article-card-content">
                  <div className="article-card-meta">
                    <span className="meta-info">
                      <Calendar size={12} className="meta-icon" />
                      {article.date}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-info">
                      <Clock size={12} className="meta-icon" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="article-card-title">{article.title}</h2>
                  <p className="article-card-tagline">{article.tagline}</p>
                  
                  <div className="article-card-author">
                    <span className="author-label">Author:</span>
                    <span className="author-name">{article.author}</span>
                  </div>

                  <div className="article-card-action">
                    <span>Read Full Article</span>
                    <ArrowRight className="action-arrow" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="articles-no-results">
            <p>No articles found matching your query.</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery('') }} className="articles-reset-btn">
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ArticlesPage
