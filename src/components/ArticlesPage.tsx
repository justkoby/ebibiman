import React, { useState } from 'react'
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight, Search } from 'lucide-react'
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
    id: 'reproducing-mind',
    title: "What Happens When Technology Starts Reproducing Not Merely What Your Hands Can Do, but What Your Mind Can Do?",
    tagline: "What happens to a developing economy when technology begins automating the very cognitive skills we have spent decades telling young people to acquire?",
    category: "Editorial",
    date: "Sept. 2026",
    readTime: "6 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/What Happens When Technology Starts Reproducing Not Merely What Your Hands Can Do, but What Your Mind Can Do.jpeg",
    link: "#/blog/reproducing-mind"
  },
  {
    id: 'nita-bill',
    title: "Ghana's Digital Future Is at Stake - The NITA Bill Must Do Better",
    tagline: "Why we must ensure the new legal architecture of our IT sector builds inclusion and fosters innovation, not isolation and capture.",
    category: "Tech Policy & Advocacy",
    date: "June 2026",
    readTime: "7 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/image-1.jpeg",
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
    image: "/images/image-6.jpg",
    link: "#/blog/tech-issues-2026"
  },
  {
    id: 'ai-coming-for-you',
    title: "AI is coming for you!",
    tagline: "The headline may sound ominous, but the reality of artificial intelligence (AI) is far more nuanced. Exploring AI's transformative potential, workforce disruption, and the double-edged sword for society.",
    category: "Editorial",
    date: "March 8, 2025",
    readTime: "8 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/image-4.jpg",
    link: "#/blog/ai-coming-for-you"
  },
  {
    id: 'digital-innovation-facade',
    title: "GHANA’S DIGITAL INNOVATION IS A FAÇADE",
    tagline: "Yet, beneath this promising narrative lies a stark reality: a persistent digital divide, limited rural connectivity, and an overdependence on foreign technologies.",
    category: "Tech Policy & Advocacy",
    date: "January 16, 2025",
    readTime: "5 min read",
    author: "Samuel Sasu Adonteng & Margaret Edem Gasu",
    image: "/images/image-3.jpeg",
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
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="articles-page-title">Articles</h1>
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
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="articles-search-input"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="articles-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => (
              <div key={art.id} className="article-card-col">
                <a href={art.link} className="article-main-card">
                  <div className="article-card-img-wrap">
                    <span className="article-card-badge">{art.category}</span>
                    <img src={art.image} alt={art.title} className="article-card-img" />
                    <div className="article-card-overlay"></div>
                  </div>

                  <div className="article-card-content">
                    <div className="article-card-meta">
                      <span className="meta-info">
                        <Calendar size={12} />
                        {art.date}
                      </span>
                      <span className="meta-divider">•</span>
                      <span className="meta-info">
                        <Clock size={12} />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="article-card-title">{art.title}</h3>
                    <p className="article-card-tagline">{art.tagline}</p>

                    <div className="article-card-author">
                      <span className="author-label">By</span>
                      <span className="author-name">{art.author}</span>
                    </div>

                    <div className="article-card-action">
                      <span>Read Article</span>
                      <ArrowRight className="action-arrow" />
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="articles-no-results">
              <p>No articles found matching your search or filter.</p>
              <button onClick={() => { setSelectedCategory('All'); setSearchQuery('') }} className="articles-reset-btn">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticlesPage
