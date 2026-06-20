import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AFRICA_COUNTRIES } from './AfricaMapData'
import './AfricanKnowledgeAtlas.css'

interface KnowledgeNode {
  id: string
  title: string
  desc: string
  modern: string
  x: number // Map coordinate X
  y: number // Map coordinate Y
}

interface CountryDetail {
  id: string
  name: string
  quote: string
  challenge: string
  innovation: string
  ebibiman: string
  center: { x: number; y: number }
  nodes: KnowledgeNode[]
}

const countryDetails: Record<string, CountryDetail> = {
  GH: {
    id: 'GH',
    name: 'Ghana',
    quote: 'Innovation should not replace heritage. It should build upon it.',
    challenge: 'Many local technologies and cultural systems remain underdocumented and disconnected from STEM education.',
    innovation: 'Growing fintech ecosystem, AI research, drone delivery networks, EdTech startups, and digital agriculture.',
    ebibiman: 'Future Minds Ghana and ETA seek to bridge traditional knowledge with modern digital skills.',
    center: { x: 205, y: 275 },
    nodes: [
      {
        id: 'adinkra',
        title: 'Adinkra Symbols',
        desc: 'A visual communication system used to express complex ideas, philosophy, and historical narratives.',
        modern: 'Inspiring visual programming languages, UX/UI icons, and modern symbol systems.',
        x: 195,
        y: 265
      },
      {
        id: 'kente',
        title: 'Kente Weaving',
        desc: 'Algorithmic design and structural mathematical weaving patterns.',
        modern: 'Directly relates to grid-based layouts, matrix calculations, and computing patterns.',
        x: 215,
        y: 285
      },
      {
        id: 'goldweights',
        title: 'Gold Weights',
        desc: 'Ashanti gold weights used for precise measurement and mathematical fraction representation.',
        modern: 'Parallels modern trade economics, fractional banking, and calibration standards.',
        x: 200,
        y: 298
      }
    ]
  },
  NG: {
    id: 'NG',
    name: 'Nigeria',
    quote: 'Our ancestors were metallurgists and urban planners. The digital age is our next canvas.',
    challenge: 'Scaling innovation across a massive population while preserving cultural knowledge systems.',
    innovation: 'Largest African startup ecosystem, thriving fintech, artificial intelligence hubs, and digital commerce.',
    ebibiman: 'Youth innovation networks and cross-border collaboration platforms.',
    center: { x: 290, y: 265 },
    nodes: [
      {
        id: 'nok',
        title: 'Nok Metallurgy',
        desc: 'Advanced iron smelting and terracotta furnace engineering dating back to 1000 BC.',
        modern: 'Materials science, structural engineering, and modern industrial manufacturing.',
        x: 270,
        y: 265
      },
      {
        id: 'ifa',
        title: 'Ifá Binary Systems',
        desc: 'A mathematical system of divination based on a 16-state double-binary matrix.',
        modern: 'Directly aligns with computer science binary logic, binary code, and probability theory.',
        x: 310,
        y: 255
      }
    ]
  },
  KE: {
    id: 'KE',
    name: 'Kenya',
    quote: 'Digital growth must be as inclusive and sustainable as the lands we have conserved for centuries.',
    challenge: 'Balancing rapid digital transformation with equitable access for rural and nomadic communities.',
    innovation: 'M-Pesa pioneer of mobile money, Agritech, climate monitoring tech, and mobile-first innovations.',
    ebibiman: 'Building community-first technology models that empower local ecosystems.',
    center: { x: 536, y: 338 },
    nodes: [
      {
        id: 'pastoral',
        title: 'Pastoral Management',
        desc: 'Seasonal migration and resource allocation mapping techniques practiced by pastoralists.',
        modern: 'Resource optimization, GIS tracking, and smart agricultural mapping algorithms.',
        x: 526,
        y: 350
      },
      {
        id: 'conservation',
        title: 'Indigenous Conservation',
        desc: 'Traditional forest, water, and wildlife preservation practices.',
        modern: 'Eco-tech platforms, carbon tracking, and digital sustainability systems.',
        x: 548,
        y: 323
      }
    ]
  },
  ET: {
    id: 'ET',
    name: 'Ethiopia',
    quote: 'Preserving our ancient scripts and systems is not looking backward—it is securing our digital sovereignty.',
    challenge: 'Overcoming digital infrastructure deficits and expanding internet inclusion.',
    innovation: 'AI research networks, digital government databases, and educational technology programs.',
    ebibiman: 'Preserving historical knowledge systems through open digital archives and tools.',
    center: { x: 558, y: 260 },
    nodes: [
      {
        id: 'geez',
        title: 'Ge\'ez Manuscripts',
        desc: 'Ancient written language system and parchment preservation methods.',
        modern: 'OCR systems, digital archiving, and Amharic Natural Language Processing (NLP) models.',
        x: 543,
        y: 248
      },
      {
        id: 'lalibela',
        title: 'Rock-Hewn Architecture',
        desc: 'Monolithic churches carved out of solid volcanic rock with complex drainage systems.',
        modern: 'Civil engineering, structural integrity modeling, and 3D architectural mapping.',
        x: 570,
        y: 275
      }
    ]
  },
  ZA: {
    id: 'ZA',
    name: 'South Africa',
    quote: 'Ethical innovation is reading the signs of the environment to build technologies that respect all life.',
    challenge: 'Closing the wide digital divide and reducing socio-economic technology inequality.',
    innovation: 'Advanced HealthTech systems, renewable energy storage grids, AI research, and robust universities.',
    ebibiman: 'Developing frameworks for responsible technology and ethical AI development.',
    center: { x: 424, y: 587 },
    nodes: [
      {
        id: 'san',
        title: 'San Animal Tracking',
        desc: 'Highly detailed observation of footprints and environmental signs to deduce animal behavior.',
        modern: 'Data analysis, threat heuristics in cybersecurity, and pattern recognition systems.',
        x: 405,
        y: 575
      },
      {
        id: 'astronomy',
        title: 'Indigenous Astronomy',
        desc: 'Traditional star mapping systems used for navigation and harvesting cycles.',
        modern: 'Astrophysical research, satellite scheduling, and aerospace navigation.',
        x: 440,
        y: 597
      }
    ]
  },
  RW: {
    id: 'RW',
    name: 'Rwanda',
    quote: 'Restorative systems of the community can inspire the distributed consensus of the future.',
    challenge: 'Scaling digital governance infrastructure to reach every citizen efficiently.',
    innovation: 'Smart cities infrastructure, drone-based medical deliveries, and fully digital public services.',
    ebibiman: 'Applying technology networks to facilitate community consensus and societal development.',
    center: { x: 468, y: 356 },
    nodes: [
      {
        id: 'gacaca',
        title: 'Gacaca Justice Model',
        desc: 'Community-led, restorative legal hearings designed for reconciliation and truth.',
        modern: 'Decentralized governance frameworks, consensus networks, and peer-to-peer protocols.',
        x: 462,
        y: 350
      },
      {
        id: 'imigongo',
        title: 'Imigongo Geometric Art',
        desc: 'Traditional art style utilizing cow dung to create striking geometric, fractal-like patterns.',
        modern: 'Fractal math, graphic design layouts, and generative UI design patterns.',
        x: 474,
        y: 362
      }
    ]
  }
}

export default function AfricanKnowledgeAtlas() {
  const [selectedCountry, setSelectedCountry] = useState<string>('GH')

  const activeData = countryDetails[selectedCountry] || countryDetails.GH

  // Map viewport transform calculation based on country center coordinates
  const scale = selectedCountry ? 1.7 : 1.0
  const tx = selectedCountry ? 355 - activeData.center.x : 0
  const ty = selectedCountry ? 365 - activeData.center.y : 0

  const handleCountryClick = (code: string) => {
    if (countryDetails[code]) {
      setSelectedCountry(code)
    }
  }

  // Pre-calculate line connections between our key countries for visual route overlays
  const routePoints = [
    { from: 'GH', to: 'NG' },
    { from: 'NG', to: 'RW' },
    { from: 'RW', to: 'KE' },
    { from: 'KE', to: 'ET' },
    { from: 'RW', to: 'ZA' },
    { from: 'GH', to: 'ZA' }
  ]

  return (
    <section className="atlas-section" id="knowledge-atlas">
      {/* Background Tech Network Pattern */}
      <div className="atlas-grid-overlay"></div>

      <div className="atlas-container">
        
        {/* Eyebrow & Title */}
        <div className="atlas-header">
          <span className="atlas-eyebrow">The Knowledge Atlas</span>
          <h2 className="atlas-title">Africa Has Always Built.</h2>
          <p className="atlas-desc">
            Explore the indigenous knowledge systems, modern innovations, and future opportunities shaping Africa's technological story.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="atlas-layout-grid">
          
          {/* Left Column: Dynamic Content Panel */}
          <div className="atlas-content-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCountry}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="atlas-content-panel"
              >
                {/* Active Country Name */}
                <h3 className="atlas-active-country-name">
                  {activeData.name}
                </h3>

                {/* Country Quote */}
                <div className="atlas-quote-block">
                  <p className="atlas-quote">"{activeData.quote}"</p>
                </div>

                {/* Structured Details */}
                <div className="atlas-details-list">
                  
                  {/* Indigenous Knowledge Systems */}
                  <div className="atlas-detail-item">
                    <span className="atlas-detail-label">
                      <span className="bullet" style={{ backgroundColor: '#8E7A53' }}></span>
                      Indigenous Knowledge
                    </span>
                    <p className="atlas-detail-value">
                      {activeData.nodes.map(n => n.title).join(', ')}
                    </p>
                  </div>

                  {/* Current Challenge */}
                  <div className="atlas-detail-item">
                    <span className="atlas-detail-label">
                      <span className="bullet" style={{ backgroundColor: '#B03A2E' }}></span>
                      Current Challenge
                    </span>
                    <p className="atlas-detail-value">
                      {activeData.challenge}
                    </p>
                  </div>

                  {/* Modern Innovation */}
                  <div className="atlas-detail-item">
                    <span className="atlas-detail-label">
                      <span className="bullet" style={{ backgroundColor: '#3A70B0' }}></span>
                      Modern Innovation
                    </span>
                    <p className="atlas-detail-value">
                      {activeData.innovation}
                    </p>
                  </div>

                  {/* Ebibiman Perspective */}
                  <div className="atlas-detail-item">
                    <span className="atlas-detail-label">
                      <span className="bullet" style={{ backgroundColor: '#2C5F3F' }}></span>
                      Ebibiman Connection
                    </span>
                    <p className="atlas-detail-value">
                      {activeData.ebibiman}
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Custom Legend */}
            <div className="atlas-legend-container">
              <span className="atlas-legend-item active">
                <span className="atlas-legend-dot" style={{ backgroundColor: '#8E7A53' }}></span>
                Indigenous Knowledge
              </span>
              <span className="atlas-legend-item active">
                <span className="atlas-legend-dot" style={{ backgroundColor: '#3A70B0' }}></span>
                Research & Innovation
              </span>
              <span className="atlas-legend-item active">
                <span className="atlas-legend-dot" style={{ backgroundColor: '#2C5F3F' }}></span>
                Community Programmes
              </span>
              <span className="atlas-legend-item active">
                <span className="atlas-legend-dot" style={{ backgroundColor: '#9B59B6' }}></span>
                Policy & Leadership
              </span>
              <span className="atlas-legend-item active">
                <span className="atlas-legend-dot" style={{ backgroundColor: '#E67E22' }}></span>
                Digital Transformation
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Map Panel */}
          <div className="atlas-map-panel">
            
            <div className="atlas-map-svg-container">
              
              {/* Interactive SVG Map Wrapper */}
              <svg 
                viewBox="-5 -5 710 730" 
                className="atlas-svg"
              >
                {/* SVG Filters for glowing drop shadows */}
                <defs>
                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Country paths with dynamic centering, scaling, and translations */}
                <motion.g
                  animate={{
                    scale,
                    x: tx,
                    y: ty
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: '355px 365px' }}
                >
                  {/* Drawing faint trade route connection lines between active countries */}
                  {routePoints.map((route, i) => {
                    const fromC = countryDetails[route.from]
                    const toC = countryDetails[route.to]
                    if (!fromC || !toC) return null
                    return (
                      <motion.path
                        key={`route-${i}`}
                        d={`M ${fromC.center.x} ${fromC.center.y} Q ${(fromC.center.x + toC.center.x)/2 + 20} ${(fromC.center.y + toC.center.y)/2 - 20} ${toC.center.x} ${toC.center.y}`}
                        className="atlas-trade-route-path"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 + i * 0.1 }}
                      />
                    )
                  })}

                  {/* Render all 57 African countries */}
                  {AFRICA_COUNTRIES.map((country) => {
                    const isInteractive = !!countryDetails[country.id]
                    const isActive = selectedCountry === country.id

                    return (
                      <path
                        key={country.id}
                        d={country.path}
                        id={`map-country-${country.id}`}
                        className={`atlas-country-path ${isInteractive ? 'interactive' : ''} ${isActive ? 'active' : ''}`}
                        onClick={() => isInteractive && handleCountryClick(country.id)}
                      >
                        <title>{country.name}</title>
                      </path>
                    )
                  })}
                </motion.g>
              </svg>

              {/* Floating Knowledge Nodes Layer (absolutely positioned on top of the active country center) */}
              <AnimatePresence>
                {activeData.nodes.map((node) => {
                  // Calculate absolute position on the map layout wrapper.
                  // The SVG has viewBox coordinates. We translate them to percentages based on width and height.
                  // Since the SVG viewBox width is 710 and height is 730:
                  // For a scale and shift, we can calculate where the pins go.
                  // But wait! If we absolute position them on top of the container, their absolute position
                  // shifts during scale and translation.
                  // To keep the pins pinned exactly to their SVG coordinates *without complex JS math*,
                  // we can render the pins as HTML inside the SVG using <foreignObject> elements inside the SVG <motion.g>!
                  // That way, they are nested inside the scaled and translated group, so they scale, zoom, and translate
                  // perfectly with the country! This is an elegant, robust, and mathematically flawless solution.
                  return (
                    <foreignObject
                      key={node.id}
                      x={node.x - 20} // Center the 40x40 foreignObject around coordinate
                      y={node.y - 20}
                      width={40}
                      height={40}
                      style={{ overflow: 'visible', pointerEvents: 'none' }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                        className="atlas-node-wrapper"
                        style={{ pointerEvents: 'auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <div className="atlas-node-pin">
                          {/* Inner core */}
                        </div>

                        {/* Floating tooltip on hover */}
                        <div className="atlas-node-tooltip">
                          <h4 className="atlas-node-tooltip-title">{node.title}</h4>
                          <p className="atlas-node-tooltip-desc">{node.desc}</p>
                          <div className="atlas-node-tooltip-modern">
                            <span>Modern Connection</span>
                            {node.modern}
                          </div>
                        </div>
                      </motion.div>
                    </foreignObject>
                  )
                })}
              </AnimatePresence>

            </div>

            {/* Faint instructions at bottom of map panel */}
            <span className="atlas-map-instruction">
              Explore Africa's Innovation Heritage. Select a country.
            </span>

          </div>

        </div>

      </div>
    </section>
  )
}
