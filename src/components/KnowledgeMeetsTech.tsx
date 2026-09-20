import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Cpu } from 'lucide-react'
import './KnowledgeMeetsTech.css'

const knownItems = [
  { id: 'k1', title: 'Language', desc: 'Indigenous idioms, tonal structures & linguistic nuance' },
  { id: 'k2', title: 'Oral knowledge', desc: 'Generational storytelling, memory frameworks & ethics' },
  { id: 'k3', title: 'Community practices', desc: 'Mutual aid, consensus building & cooperative trust' },
  { id: 'k4', title: 'Local context', desc: 'Ground-level economic, ecological & social realities' },
  { id: 'k5', title: 'Traditional knowledge', desc: 'Botanical, architectural, mathematical & ecological sciences' },
  { id: 'k6', title: 'Cultural systems', desc: 'Shared values, governance philosophy & worldview paradigms' }
]

const possibleItems = [
  { id: 'p1', title: 'Artificial Intelligence', desc: 'Reasoning models, synthesis & generative intelligence' },
  { id: 'p2', title: 'Data', desc: 'Distributed telemetry, pattern recognition & predictive systems' },
  { id: 'p3', title: 'Automation', desc: 'Cognitive workflows, robotics & operational leverage' },
  { id: 'p4', title: 'Digital platforms', desc: 'Decentralized exchanges, sovereign public infrastructure' },
  { id: 'p5', title: 'Connected systems', desc: 'IoT sensors, mesh networking & hyperconnectivity' },
  { id: 'p6', title: 'New interfaces', desc: 'Multimodal voice, spatial computing & vernacular UI' }
]

const KnowledgeMeetsTech: React.FC = () => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <section className="kmt-section" id="knowledge-meets-tech">
      {/* Background ambient lighting */}
      <div className="kmt-glow-bg kmt-glow-left"></div>
      <div className="kmt-glow-bg kmt-glow-right"></div>
      <div className="kmt-grid-pattern"></div>

      <div className="kmt-container">
        
        {/* Section Header */}
        <motion.div 
          className="kmt-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="kmt-main-title">
            WHERE KNOWLEDGE MEETS TECHNOLOGY
          </h2>
        </motion.div>

        {/* The Experimental Dual Matrix */}
        <div className="kmt-matrix-wrapper">
          
          {/* Left Column: What We Already Know */}
          <motion.div 
            className={`kmt-column kmt-column-left ${hoveredSide === 'left' ? 'kmt-column-focused' : ''}`}
            onMouseEnter={() => setHoveredSide('left')}
            onMouseLeave={() => setHoveredSide(null)}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="kmt-column-header">
              <div className="kmt-column-badge kmt-badge-left">
                <Compass size={14} />
                <span>Foundational Roots</span>
              </div>
              <h3 className="kmt-column-title">WHAT WE ALREADY KNOW</h3>
            </div>

            <div className="kmt-items-list">
              {knownItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`kmt-item-card ${activeItem === item.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveItem(item.id)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <span className="kmt-item-number">0{idx + 1}</span>
                  <div className="kmt-item-content">
                    <h4 className="kmt-item-name">{item.title}</h4>
                    <p className="kmt-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center Experimental Nexus Symbol */}
          <div className="kmt-nexus-divider">
            <div className="kmt-nexus-line"></div>
            <motion.div 
              className="kmt-nexus-symbol-wrap"
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <span className="kmt-nexus-symbol">×</span>
            </motion.div>
            <div className="kmt-nexus-line"></div>
          </div>

          {/* Right Column: What Is Becoming Possible */}
          <motion.div 
            className={`kmt-column kmt-column-right ${hoveredSide === 'right' ? 'kmt-column-focused' : ''}`}
            onMouseEnter={() => setHoveredSide('right')}
            onMouseLeave={() => setHoveredSide(null)}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="kmt-column-header">
              <div className="kmt-column-badge kmt-badge-right">
                <Cpu size={14} />
                <span>Frontier Capabilities</span>
              </div>
              <h3 className="kmt-column-title">WHAT IS BECOMING POSSIBLE</h3>
            </div>

            <div className="kmt-items-list">
              {possibleItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`kmt-item-card ${activeItem === item.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveItem(item.id)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <span className="kmt-item-number">0{idx + 1}</span>
                  <div className="kmt-item-content">
                    <h4 className="kmt-item-name">{item.title}</h4>
                    <p className="kmt-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Epilogue Question */}
        <motion.div 
          className="kmt-epilogue-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <div className="kmt-epilogue-inner">
            <span className="kmt-epilogue-eyebrow">THE CORE INQUIRY</span>
            <h3 className="kmt-epilogue-statement">
              What could we build when one informs the other?
            </h3>
            <p className="kmt-epilogue-sub" style={{ marginBottom: 0 }}>
              By grounding the most advanced computational architectures in African linguistic, ecological, and cultural knowledge systems, we move from being consumers of foreign technologies to pioneering creators of human-centered innovation.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default KnowledgeMeetsTech
