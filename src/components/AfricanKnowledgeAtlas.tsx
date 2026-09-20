import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AFRICA_COUNTRIES } from './AfricaMapData'
import './AfricanKnowledgeAtlas.css'
import { 
  Home, 
  Palette, 
  Shield, 
  Hammer, 
  Zap, 
  Leaf, 
  Laptop, 
  BookOpen, 
  Cpu, 
  Users, 
  Building, 
  Crown, 
  Globe, 
  Navigation, 
  Activity, 
  Moon,
  X,
  Globe2,
  Compass,
  Sprout,
  Droplet,
  Tv,
  Eye,
  Settings,
  Scale,
  Sparkles,
  Book,
  Code,
  Wifi,
  Grid,
  Heart
} from 'lucide-react'

interface SidebarItem {
  title: string
  subtitle?: string
  icon: string
}

interface KnowledgeNode {
  id: string
  title: string
  desc: string
  modern: string
  x: number // Map coordinate X
  y: number // Map coordinate Y
  category: string
}

interface CountryDetail {
  id: string
  name: string
  quote: string
  challenge: string
  innovation: string
  ebibiman: string
  image: string
  center: { x: number; y: number }
  nodes: KnowledgeNode[]
  indigenousKnowledge: SidebarItem[]
  innovationToday: SidebarItem[]
  ebibimanAction: SidebarItem[]
}

const countryDetails: Record<string, CountryDetail> = {
  GH: {
    id: 'GH',
    name: 'Ghana',
    quote: 'Innovation should not replace heritage. It should build upon it.',
    challenge: 'Many local technologies and cultural systems remain underdocumented and disconnected from STEM education.',
    innovation: 'Growing fintech ecosystem, AI research, drone delivery networks, EdTech startups, and digital agriculture.',
    ebibiman: 'Future Minds Ghana and ETA seek to bridge traditional knowledge with modern digital skills.',
    image: '/images/larabanga_mosque.png',
    center: { x: 205, y: 275 },
    nodes: [
      {
        id: 'adinkra',
        title: 'Adinkra Symbols',
        desc: 'A visual communication system used to express complex ideas, philosophy, and historical narratives.',
        modern: 'Inspiring visual programming languages, UX/UI icons, and modern symbol systems.',
        x: 195,
        y: 265,
        category: 'communication'
      },
      {
        id: 'kente',
        title: 'Kente Weaving',
        desc: 'Algorithmic design and structural mathematical weaving patterns.',
        modern: 'Directly relates to grid-based layouts, matrix calculations, and computing patterns.',
        x: 215,
        y: 285,
        category: 'textiles'
      },
      {
        id: 'goldweights',
        title: 'Gold Weights',
        desc: 'Ashanti gold weights used for precise measurement and mathematical fraction representation.',
        modern: 'Parallels modern trade economics, fractional banking, and calibration standards.',
        x: 200,
        y: 298,
        category: 'metallurgy'
      }
    ],
    indigenousKnowledge: [
      { title: 'Akan Architecture', subtitle: 'Sustainable building principles', icon: 'Home' },
      { title: 'Adinkra Symbolism', subtitle: 'Communication & wisdom systems', icon: 'Palette' },
      { title: 'Traditional Governance', subtitle: 'Community leadership models', icon: 'Shield' },
      { title: 'Gold Processing', subtitle: 'Advanced metallurgy techniques', icon: 'Hammer' }
    ],
    innovationToday: [
      { title: 'Renewable Energy Projects', icon: 'Zap' },
      { title: 'AgriTech & Food Systems', icon: 'Leaf' },
      { title: 'Digital Heritage Initiatives', icon: 'Laptop' }
    ],
    ebibimanAction: [
      { title: 'Knowledge Documentation', icon: 'BookOpen' },
      { title: 'Youth Innovation Labs', icon: 'Cpu' },
      { title: 'Community Workshops', icon: 'Users' }
    ]
  },
  NG: {
    id: 'NG',
    name: 'Nigeria',
    quote: 'Our ancestors were metallurgists and urban planners. The digital age is our next canvas.',
    challenge: 'Scaling innovation across a massive population while preserving cultural knowledge systems.',
    innovation: 'Largest African startup ecosystem, thriving fintech, artificial intelligence hubs, and digital commerce.',
    ebibiman: 'Youth innovation networks and cross-border collaboration platforms.',
    image: '/images/nok_terracotta.png',
    center: { x: 290, y: 265 },
    nodes: [
      {
        id: 'nok',
        title: 'Nok Metallurgy',
        desc: 'Advanced iron smelting and terracotta furnace engineering dating back to 1000 BC.',
        modern: 'Materials science, structural engineering, and modern industrial manufacturing.',
        x: 270,
        y: 265,
        category: 'metallurgy'
      },
      {
        id: 'ifa',
        title: 'Ifá Binary Systems',
        desc: 'A mathematical system of divination based on a 16-state double-binary matrix.',
        modern: 'Directly aligns with computer science binary logic, binary code, and probability theory.',
        x: 310,
        y: 255,
        category: 'communication'
      }
    ],
    indigenousKnowledge: [
      { title: 'Nok Metallurgy', subtitle: 'Terracotta furnace engineering', icon: 'Hammer' },
      { title: 'Ifá Binary Logic', subtitle: 'Double-binary matrix divination', icon: 'Cpu' },
      { title: 'Yoruba Urbanism', subtitle: 'Ancient city wall layouts', icon: 'Building' },
      { title: 'Benin Bronze Casting', subtitle: 'Lost-wax precision casting', icon: 'Crown' }
    ],
    innovationToday: [
      { title: 'Fintech & Digital Commerce', icon: 'Zap' },
      { title: 'AI Research Labs', icon: 'Globe' },
      { title: 'Mobile Tech Ecosystems', icon: 'Laptop' }
    ],
    ebibimanAction: [
      { title: 'Code & Culture Incubators', icon: 'BookOpen' },
      { title: 'Regional Tech Summits', icon: 'Users' },
      { title: 'Localized STEM Toolkits', icon: 'Cpu' }
    ]
  },
  KE: {
    id: 'KE',
    name: 'Kenya',
    quote: 'Digital growth must be as inclusive and sustainable as the lands we have conserved for centuries.',
    challenge: 'Balancing rapid digital transformation with equitable access for rural and nomadic communities.',
    innovation: 'M-Pesa pioneer of mobile money, Agritech, climate monitoring tech, and mobile-first innovations.',
    ebibiman: 'Building community-first technology models that empower local ecosystems.',
    image: '/images/maasai_landscape.png',
    center: { x: 536, y: 338 },
    nodes: [
      {
        id: 'pastoral',
        title: 'Pastoral Management',
        desc: 'Seasonal migration and resource allocation mapping techniques practiced by pastoralists.',
        modern: 'Resource optimization, GIS tracking, and smart agricultural mapping algorithms.',
        x: 526,
        y: 350,
        category: 'agriculture'
      },
      {
        id: 'conservation',
        title: 'Indigenous Conservation',
        desc: 'Traditional forest, water, and wildlife preservation practices.',
        modern: 'Eco-tech platforms, carbon tracking, and digital sustainability systems.',
        x: 548,
        y: 323,
        category: 'conservation'
      }
    ],
    indigenousKnowledge: [
      { title: 'Pastoral GIS', subtitle: 'Seasonal migration mapping', icon: 'Navigation' },
      { title: 'Indigenous Conservation', subtitle: 'Sacred Kaya forest management', icon: 'Leaf' },
      { title: 'Maasai Beading Math', subtitle: 'Geometric pattern symmetry', icon: 'Palette' },
      { title: 'Herbal Pharmacopoeia', subtitle: 'Medicinal botany systems', icon: 'Activity' }
    ],
    innovationToday: [
      { title: 'M-Pesa Mobile Finance', icon: 'Zap' },
      { title: 'Smart Agriculture IoT', icon: 'Leaf' },
      { title: 'Off-Grid Solar Grids', icon: 'Laptop' }
    ],
    ebibimanAction: [
      { title: 'Eco-Tech Youth Camps', icon: 'BookOpen' },
      { title: 'Rural Digital Hubs', icon: 'Users' },
      { title: 'Heritage Archiving', icon: 'Cpu' }
    ]
  },
  ET: {
    id: 'ET',
    name: 'Ethiopia',
    quote: 'Preserving our ancient scripts and systems is not looking backward—it is securing our digital sovereignty.',
    challenge: 'Overcoming digital infrastructure deficits and expanding internet inclusion.',
    innovation: 'AI research networks, digital government databases, and educational technology programs.',
    ebibiman: 'Preserving historical knowledge systems through open digital archives and tools.',
    image: '/images/lalibela_church.png',
    center: { x: 558, y: 260 },
    nodes: [
      {
        id: 'geez',
        title: "Ge'ez Manuscripts",
        desc: 'Ancient written language system and parchment preservation methods.',
        modern: 'OCR systems, digital archiving, and Amharic Natural Language Processing (NLP) models.',
        x: 543,
        y: 248,
        category: 'communication'
      },
      {
        id: 'lalibela',
        title: 'Rock-Hewn Architecture',
        desc: 'Monolithic churches carved out of solid volcanic rock with complex drainage systems.',
        modern: 'Civil engineering, structural integrity modeling, and 3D architectural mapping.',
        x: 570,
        y: 275,
        category: 'architecture'
      }
    ],
    indigenousKnowledge: [
      { title: "Ge'ez Manuscripts", subtitle: 'Ancient written systems', icon: 'BookOpen' },
      { title: 'Monolithic Architecture', subtitle: 'Rock-hewn church engineering', icon: 'Home' },
      { title: 'Calendar & Astronomy', subtitle: 'Solar-lunar time mapping', icon: 'Moon' },
      { title: 'Coffee Agroforestry', subtitle: 'Forest shade cultivation', icon: 'Leaf' }
    ],
    innovationToday: [
      { title: 'Amharic NLP AI', icon: 'Zap' },
      { title: 'Digital Government', icon: 'Laptop' },
      { title: 'Space Science Programs', icon: 'Globe' }
    ],
    ebibimanAction: [
      { title: 'Ethiopic Coding Camps', icon: 'Cpu' },
      { title: 'Historical Preservation', icon: 'BookOpen' },
      { title: 'STEM Translation', icon: 'Users' }
    ]
  },
  ZA: {
    id: 'ZA',
    name: 'South Africa',
    quote: 'Ethical innovation is reading the signs of the environment to build technologies that respect all life.',
    challenge: 'Closing the wide digital divide and reducing socio-economic technology inequality.',
    innovation: 'Advanced HealthTech systems, renewable energy storage grids, AI research, and robust universities.',
    ebibiman: 'Developing frameworks for responsible technology and ethical AI development.',
    image: '/images/zulu_kraal.png',
    center: { x: 424, y: 587 },
    nodes: [
      {
        id: 'san',
        title: 'San Animal Tracking',
        desc: 'Highly detailed observation of footprints and environmental signs to deduce animal behavior.',
        modern: 'Data analysis, threat heuristics in cybersecurity, and pattern recognition systems.',
        x: 405,
        y: 575,
        category: 'conservation'
      },
      {
        id: 'astronomy',
        title: 'Indigenous Astronomy',
        desc: 'Traditional star mapping systems used for navigation and harvesting cycles.',
        modern: 'Astrophysical research, satellite scheduling, and aerospace navigation.',
        x: 440,
        y: 597,
        category: 'astronomy'
      }
    ],
    indigenousKnowledge: [
      { title: 'San Tracking Science', subtitle: 'Pattern & footprint heuristics', icon: 'Activity' },
      { title: 'Khoisan Star Mapping', subtitle: 'Cosmic navigation cycles', icon: 'Moon' },
      { title: 'Zulu Beehive Architecture', subtitle: 'Aerodynamic structural weaving', icon: 'Home' },
      { title: 'Southern Metallurgy', subtitle: 'Iron & copper smelting', icon: 'Hammer' }
    ],
    innovationToday: [
      { title: 'HealthTech Solutions', icon: 'Zap' },
      { title: 'Renewable Grid Tech', icon: 'Laptop' },
      { title: 'SKA Radio Telescope', icon: 'Globe' }
    ],
    ebibimanAction: [
      { title: 'Community Coding Labs', icon: 'Cpu' },
      { title: 'Indigenous STEM Curriculum', icon: 'BookOpen' },
      { title: 'Youth Climate Projects', icon: 'Leaf' }
    ]
  },
  RW: {
    id: 'RW',
    name: 'Rwanda',
    quote: 'Restorative systems of the community can inspire the distributed consensus of the future.',
    challenge: 'Scaling digital governance infrastructure to reach every citizen efficiently.',
    innovation: 'Smart cities infrastructure, drone-based medical deliveries, and fully digital public services.',
    ebibiman: 'Applying technology networks to facilitate community consensus and societal development.',
    image: '/images/kings_palace_rwanda.png',
    center: { x: 468, y: 356 },
    nodes: [
      {
        id: 'gacaca',
        title: 'Gacaca Justice Model',
        desc: 'Community-led, restorative legal hearings designed for reconciliation and truth.',
        modern: 'Decentralized governance frameworks, consensus networks, and peer-to-peer protocols.',
        x: 462,
        y: 350,
        category: 'governance'
      },
      {
        id: 'imigongo',
        title: 'Imigongo Geometric Art',
        desc: 'Traditional art style utilizing cow dung to create striking geometric, fractal-like patterns.',
        modern: 'Fractal math, graphic design layouts, and generative UI design patterns.',
        x: 474,
        y: 362,
        category: 'textiles'
      }
    ],
    indigenousKnowledge: [
      { title: 'Imigongo Art', subtitle: 'Fractal-based geometric designs', icon: 'Palette' },
      { title: 'Gacaca Restorative Law', subtitle: 'Community consensus systems', icon: 'Shield' },
      { title: 'Terraced Agriculture', subtitle: 'Highland water conservation', icon: 'Leaf' },
      { title: 'Traditional Medicine', subtitle: 'Sub-alpine herbalism', icon: 'Activity' }
    ],
    innovationToday: [
      { title: 'Drone Logistics Network', icon: 'Zap' },
      { title: 'Smart Green Cities', icon: 'Home' },
      { title: 'E-Government Portals', icon: 'Laptop' }
    ],
    ebibimanAction: [
      { title: 'Drone Coding Workshops', icon: 'Cpu' },
      { title: 'Regenerative Agriculture', icon: 'Leaf' },
      { title: 'Collaborative Consensus', icon: 'Users' }
    ]
  },
  EG: {
    id: 'EG',
    name: 'Egypt',
    quote: 'Engineering marvels along the Nile formed the bedrock of architectural and hydraulic science.',
    challenge: 'Managing water conservation and renewable power for hyper-dense riverine populations.',
    innovation: 'Mega-scale solar installations, fintech startups, Agritech along the delta, and AI translation.',
    ebibiman: 'Archiving classical Mediterranean and Saharan technology innovations.',
    image: '/images/larabanga_mosque.png',
    center: { x: 520, y: 130 },
    nodes: [
      {
        id: 'alex_hydraulics',
        title: 'Alexandrian Hydraulics & Siphons',
        desc: 'Pioneering pneumatic water automation, valve physics, and Nilometer level measurement.',
        modern: 'Fluid dynamics, automated valve telemetry, and water distribution sensors.',
        x: 505,
        y: 115,
        category: 'water'
      },
      {
        id: 'papyrus',
        title: 'Papyrus Material Science',
        desc: 'Cross-laminated fibrous writing material engineering and mineral ink chemistry.',
        modern: 'Cellulose biomaterials, flexible electronics substrates, and sustainable packaging.',
        x: 535,
        y: 135,
        category: 'textiles'
      }
    ],
    indigenousKnowledge: [
      { title: 'Nilometer Hydraulics', subtitle: 'Flood monitoring & calibration', icon: 'Droplet' },
      { title: 'Papyrus Chemistry', subtitle: 'Laminated substrate science', icon: 'Grid' },
      { title: 'Astronomical Alignments', subtitle: 'Solar architecture precision', icon: 'Moon' }
    ],
    innovationToday: [
      { title: 'Benban Solar Park', icon: 'Zap' },
      { title: 'Delta Smart Irrigation', icon: 'Leaf' }
    ],
    ebibimanAction: [
      { title: 'Historical Digital Archives', icon: 'BookOpen' }
    ]
  },
  ML: {
    id: 'ML',
    name: 'Mali',
    quote: 'Centuries of manuscript tradition and bioclimatic architecture in the heart of the Sahel.',
    challenge: 'Preserving fragile manuscript libraries and combating desertification.',
    innovation: 'Solar energy deployment, digital manuscript scanning, and mobile agricultural tools.',
    ebibiman: 'Digitizing ancestral manuscripts and supporting traditional earth architecture.',
    image: '/images/larabanga_mosque.png',
    center: { x: 195, y: 220 },
    nodes: [
      {
        id: 'timbuktu',
        title: 'Timbuktu Astronomy & Math',
        desc: 'Medieval planetary orbital treatises, mathematical optics, and algorithmic cataloging.',
        modern: 'Celestial mechanics, algorithmic archiving, and computational geometry.',
        x: 195,
        y: 205,
        category: 'astronomy'
      },
      {
        id: 'djenne',
        title: 'Djenné Earth Architecture',
        desc: 'Monumental adobe architecture engineered for thermal regulation and passive cooling.',
        modern: 'Sustainable bioclimatic architecture, natural cooling, and low-carbon construction.',
        x: 180,
        y: 235,
        category: 'architecture'
      }
    ],
    indigenousKnowledge: [
      { title: 'Timbuktu Astronomy', subtitle: 'Planetary mechanics treatises', icon: 'Moon' },
      { title: 'Earth Architecture', subtitle: 'Djenné thermal masonry', icon: 'Home' }
    ],
    innovationToday: [
      { title: 'Sahel Solar Grids', icon: 'Zap' },
      { title: 'Manuscript Digitization', icon: 'Laptop' }
    ],
    ebibimanAction: [
      { title: 'Digital Heritage Labs', icon: 'BookOpen' }
    ]
  },
  CD: {
    id: 'CD',
    name: 'DR Congo',
    quote: 'The cradle of mathematical tally calculation and the world’s vital ecological sanctuary.',
    challenge: 'Securing sustainable tech mineral supply chains and ecological preservation.',
    innovation: 'Renewable hydropower, forest carbon tracking, and digital logistics.',
    ebibiman: 'Empowering youth with computational thinking inspired by ancient mathematics.',
    image: '/images/larabanga_mosque.png',
    center: { x: 380, y: 350 },
    nodes: [
      {
        id: 'ishango',
        title: 'Ishango Mathematical Calculus',
        desc: 'Paleolithic bone tool marked with tally groupings for lunar arithmetic and prime numbers.',
        modern: 'Discrete mathematics, modular arithmetic, and foundational number theory.',
        x: 395,
        y: 340,
        category: 'communication'
      },
      {
        id: 'congo_ecology',
        title: 'Equatorial Forest Agroforestry',
        desc: 'Multi-canopy rainforest polyculture and indigenous medicinal botanical knowledge.',
        modern: 'Biodiversity genomics, regenerative ecosystem modeling, and carbon sink management.',
        x: 365,
        y: 365,
        category: 'conservation'
      }
    ],
    indigenousKnowledge: [
      { title: 'Ishango Number Theory', subtitle: 'Prime & lunar tally arithmetic', icon: 'Code' },
      { title: 'Rainforest Botany', subtitle: 'Medicinal ethnobotany systems', icon: 'Leaf' }
    ],
    innovationToday: [
      { title: 'Inga Hydro Grid Projects', icon: 'Zap' },
      { title: 'Forest Carbon Monitoring', icon: 'Globe' }
    ],
    ebibimanAction: [
      { title: 'Youth Math Bootcamps', icon: 'Cpu' }
    ]
  },
  ZW: {
    id: 'ZW',
    name: 'Zimbabwe',
    quote: 'Ancient dry-stone precision masonry built harmoniously with nature.',
    challenge: 'Upgrading energy access and boosting youth STEM retention.',
    innovation: 'AgriTech platforms, mobile money integration, and renewable micro-grids.',
    ebibiman: 'Connecting acoustic and stone masonry heritage to modern structural design.',
    image: '/images/larabanga_mosque.png',
    center: { x: 445, y: 495 },
    nodes: [
      {
        id: 'great_zimbabwe',
        title: 'Great Zimbabwe Stone Engineering',
        desc: 'Curvilinear dry-stone masonry with acoustic chambers built without mortar.',
        modern: 'Acoustic architecture, mortarless seismic design, and dry-stack construction.',
        x: 445,
        y: 495,
        category: 'architecture'
      }
    ],
    indigenousKnowledge: [
      { title: 'Dry-Stone Masonry', subtitle: 'Mortarless acoustic architecture', icon: 'Home' },
      { title: 'Terraced Metallurgy', subtitle: 'Gold & iron mining systems', icon: 'Hammer' }
    ],
    innovationToday: [
      { title: 'Fintech Inclusion', icon: 'Zap' },
      { title: 'Solar Mini-Grids', icon: 'Laptop' }
    ],
    ebibimanAction: [
      { title: 'Structural Heritage Labs', icon: 'Building' }
    ]
  },
  TZ: {
    id: 'TZ',
    name: 'Tanzania',
    quote: 'Centuries of advanced carbon-steel smelting and coastal oceanic navigation.',
    challenge: 'Broadening high-speed internet access across vast rural regions.',
    innovation: 'Mobile banking, marine eco-tech, and wildlife tracking networks.',
    ebibiman: 'Teaching high-temperature metallurgy principles through modern physics.',
    image: '/images/larabanga_mosque.png',
    center: { x: 510, y: 385 },
    nodes: [
      {
        id: 'haya_steel',
        title: 'Haya High-Carbon Smelting',
        desc: 'Pre-heating blast furnace engineering producing high-carbon steel 2,000 years ago.',
        modern: 'Thermodynamics, carbon metallurgy, and modern steel manufacturing.',
        x: 505,
        y: 385,
        category: 'metallurgy'
      }
    ],
    indigenousKnowledge: [
      { title: 'Haya Carbon Smelting', subtitle: 'Pre-heated blast furnace technology', icon: 'Hammer' },
      { title: 'Swahili Celestial Navigation', subtitle: 'Monsoon trade route mapping', icon: 'Compass' }
    ],
    innovationToday: [
      { title: 'Marine Conservation Tech', icon: 'Droplet' },
      { title: 'Smart Farming SMS', icon: 'Leaf' }
    ],
    ebibimanAction: [
      { title: 'Makerspace Metallurgy', icon: 'Cpu' }
    ]
  }
}

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ComponentType<any>> = {
    Home, Palette, Shield, Hammer, Zap, Leaf, Laptop, BookOpen, Cpu, Users, Building, Crown, Globe, Navigation, Activity, Moon, X, Globe2, Compass, Sprout, Droplet, Tv, Eye, Settings, Scale, Sparkles, Book, Code, Wifi, Grid, Heart
  }
  const Icon = icons[name] || Globe
  return <Icon className={className} />
}

const categories = [
  { id: 'architecture', name: 'Architecture & Construction', icon: Home, color: '#E76F51' },
  { id: 'agriculture', name: 'Agriculture & Food Systems', icon: Sprout, color: '#2A9D8F' },
  { id: 'medicine', name: 'Traditional Medicine', icon: Sparkles, color: '#9B59B6' },
  { id: 'textiles', name: 'Textiles & Craftsmanship', icon: Grid, color: '#F4A261' },
  { id: 'water', name: 'Water Management', icon: Droplet, color: '#3A86C8' },
  { id: 'governance', name: 'Governance Systems', icon: Users, color: '#E67E22' },
  { id: 'communication', name: 'Communication Systems', icon: Wifi, color: '#319795' },
  { id: 'astronomy', name: 'Astronomy & Navigation', icon: Moon, color: '#805AD5' },
  { id: 'metallurgy', name: 'Metallurgy & Engineering', icon: Hammer, color: '#D4A017' },
  { id: 'conservation', name: 'Environmental Conservation', icon: Leaf, color: '#38A169' }
]

const getCountryRegionClass = (id: string): string => {
  const North = ['EG', 'LY', 'TN', 'DZ', 'MA', 'EH', 'SD', 'MR']
  const West = ['SN', 'GM', 'GW', 'GN', 'SL', 'LR', 'CI', 'GH', 'TG', 'BJ', 'NG', 'BF', 'NE', 'ML', 'CV']
  const Central = ['CM', 'CF', 'TD', 'GQ', 'GA', 'CG', 'CD', 'AO', 'ST']
  const East = ['ER', 'DJ', 'SO', 'ET', 'KE', 'UG', 'TZ', 'RW', 'BI', 'SS', 'KM', 'SC']
  const Southern = ['ZM', 'MW', 'MZ', 'ZW', 'NA', 'BW', 'SZ', 'LS', 'ZA', 'MG', 'MU']
  
  if (North.includes(id)) return 'region-north'
  if (West.includes(id)) return 'region-west'
  if (Central.includes(id)) return 'region-central'
  if (East.includes(id)) return 'region-east'
  if (Southern.includes(id)) return 'region-southern'
  return ''
}

export default function AfricanKnowledgeAtlas() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>('GH')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const activeData = selectedCountry ? (countryDetails[selectedCountry] || countryDetails.GH) : null

  // Map viewport transform calculation based on country center coordinates
  const scale = selectedCountry ? 1.4 : 1.0
  const tx = selectedCountry && activeData ? 355 - activeData.center.x : 0
  const ty = selectedCountry && activeData ? 365 - activeData.center.y : 0

  const handleCountryClick = (code: string) => {
    if (countryDetails[code]) {
      setSelectedCountry(code)
    }
  }

  const handleCloseSidebar = () => {
    setSelectedCountry(null)
  }

  // Pre-calculate line connections between our key countries for visual route overlays
  const routePoints = [
    { from: 'GH', to: 'NG' },
    { from: 'NG', to: 'RW' },
    { from: 'RW', to: 'KE' },
    { from: 'KE', to: 'ET' },
    { from: 'ET', to: 'EG' },
    { from: 'ML', to: 'GH' },
    { from: 'CD', to: 'TZ' },
    { from: 'TZ', to: 'ZW' },
    { from: 'ZW', to: 'ZA' },
    { from: 'GH', to: 'ZA' }
  ]

  // Flatten all pins for rendering on the map simultaneously
  const allPins = Object.values(countryDetails).flatMap(c => 
    c.nodes.map(n => ({ ...n, countryId: c.id }))
  )

  return (
    <section className="atlas-section" id="knowledge-atlas">
      {/* Background Tech Network Pattern */}
      <div className="atlas-grid-overlay"></div>

      <div className="atlas-container">
        
        {/* Three-column premium grid layout */}
        <div className="atlas-layout-grid">
          
          {/* Column 1: Header, Stats and Category Explorer */}
          <div className="atlas-left-panel">
            {/* Eyebrow & Title */}
            <div className="atlas-header">
              <span className="atlas-eyebrow">The Knowledge Atlas</span>
              <h2 className="atlas-title">
                Africa's <br />
                <span className="highlight-gold">Knowledge</span> <br />
                Landscape
              </h2>
              <p className="atlas-desc">
                Explore the rich tapestry of indigenous knowledge and innovation across Africa. Click a country to discover its technologies, wisdom and the communities preserving them.
              </p>
            </div>

            {/* Info Cards Side-By-Side */}
            <div className="atlas-info-cards">
              {/* Card 1: A Living Atlas */}
              <div className="atlas-card-living">
                <div className="atlas-card-icon-container">
                  <Globe2 className="atlas-card-icon" />
                </div>
                <div className="atlas-card-content">
                  <span className="atlas-card-eyebrow">INDIGENOUS KNOWLEDGE × EMERGING TECHNOLOGY</span>
                  <p className="atlas-card-text">
                    Preserving heritage. Inspiring innovation. Building the future.
                  </p>
                </div>
              </div>

              {/* Card 2: Stats Counter */}
              <div className="atlas-card-stats">
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-number">55</span>
                    <span className="stat-label">African Union Member States</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <span className="stat-number">1,500–3,000</span>
                    <span className="stat-label">Languages Spoken Across Africa</span>
                  </div>
                </div>
                <div className="stat-footer-text">
                  <a 
                    href="https://au.int/en/member_states" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="stat-sources-link"
                  >
                    Sources: African Union & UNESCO ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Map Panel */}
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
                    const regionClass = getCountryRegionClass(country.id)
                    const isInteractive = !!countryDetails[country.id]
                    const isActive = selectedCountry === country.id
                    const hasNodeInActiveCategory = !activeCategory || (countryDetails[country.id] && countryDetails[country.id].nodes.some(n => n.category === activeCategory))
                    const isDimmed = activeCategory && !hasNodeInActiveCategory

                    return (
                      <path
                        key={country.id}
                        d={country.path}
                        id={`map-country-${country.id}`}
                        className={`atlas-country-path ${regionClass} ${isInteractive ? 'interactive' : ''} ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                        onClick={() => isInteractive && handleCountryClick(country.id)}
                      >
                        <title>{country.name}</title>
                      </path>
                    )
                  })}

                  {/* Floating Knowledge Nodes Layer (rendered on top of the active country center) */}
                  {allPins.map((node, index) => {
                    const isDimmed = activeCategory && node.category !== activeCategory
                    const isParentActive = selectedCountry === node.countryId
                    const categoryObj = categories.find(c => c.id === node.category)
                    const categoryColor = categoryObj ? categoryObj.color : '#D4A017'
                    const categoryName = categoryObj ? categoryObj.name : 'Indigenous Knowledge'

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
                          className={`atlas-node-wrapper category-${node.category} ${isDimmed ? 'dimmed' : ''} ${isParentActive ? 'active' : ''}`}
                          style={{ 
                            pointerEvents: 'auto', 
                            width: '100%', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            '--node-color': categoryColor,
                            '--pulse-delay': `${(index * 0.45) % 3.6}s`,
                            '--pulse-duration': `${4.8 + ((index * 0.6) % 2.4)}s`,
                          } as React.CSSProperties}
                        >
                          <div 
                            className="atlas-node-pin"
                            onClick={() => handleCountryClick(node.countryId)}
                          >
                            <div className="atlas-node-halo"></div>
                            <div className="atlas-node-core"></div>
                          </div>

                          {/* Floating tooltip on hover */}
                          <div className="atlas-node-tooltip">
                            <div className="atlas-node-category-tag">
                              <span className="category-tag-dot" style={{ backgroundColor: categoryColor }}></span>
                              <span className="category-tag-text">{categoryName}</span>
                            </div>
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
                </motion.g>
              </svg>

            </div>

            {/* Faint instructions at bottom of map panel */}
            <span className="atlas-map-instruction">
              Explore Africa's Innovation Heritage. Select a country.
            </span>

          </div>

          {/* Column 3: Selected Country Sidebar Panel */}
          <div className="atlas-sidebar-panel">
            <AnimatePresence mode="wait">
              {activeData ? (
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="sidebar-inner"
                >
                  {/* Sidebar Header */}
                  <div className="sidebar-header">
                    <h3 className="sidebar-country-name">{activeData.name}</h3>
                    <button className="sidebar-close-btn" onClick={handleCloseSidebar} title="Close Panel">
                      <X className="sidebar-close-icon" />
                    </button>
                  </div>

                  {/* Landmark Header Image */}
                  <div className="sidebar-image-container">
                    <img 
                      src={activeData.image} 
                      alt={`${activeData.name} landmark`} 
                      className="sidebar-image" 
                      onError={(e) => {
                        // Failover if image fails to load
                        (e.target as HTMLImageElement).src = '/images/bg.jpg'
                      }}
                    />
                  </div>

                  {/* Scrollable Detail lists */}
                  <div className="sidebar-content-scroll">
                    
                    {/* Indigenous Knowledge Section */}
                    <div className="sidebar-section">
                      <h4 className="sidebar-section-title gold">INDIGENOUS KNOWLEDGE</h4>
                      <div className="sidebar-list">
                        {activeData.indigenousKnowledge.map((item, idx) => (
                          <div className="sidebar-list-item" key={idx}>
                            <div className="sidebar-item-icon-wrapper gold-theme">
                              <IconComponent name={item.icon} className="sidebar-item-icon" />
                            </div>
                            <div className="sidebar-item-text">
                              <h5 className="sidebar-item-title">{item.title}</h5>
                              <p className="sidebar-item-subtitle">{item.subtitle}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Innovation Today Section */}
                    <div className="sidebar-section">
                      <h4 className="sidebar-section-title blue">INNOVATION TODAY</h4>
                      <div className="sidebar-list">
                        {activeData.innovationToday.map((item, idx) => (
                          <div className="sidebar-list-item" key={idx}>
                            <div className="sidebar-item-icon-wrapper blue-theme">
                              <IconComponent name={item.icon} className="sidebar-item-icon" />
                            </div>
                            <div className="sidebar-item-text">
                              <h5 className="sidebar-item-title">{item.title}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ebibiman in Action Section */}
                    <div className="sidebar-section">
                      <h4 className="sidebar-section-title green">EBIBIMAN IN ACTION</h4>
                      <div className="sidebar-list">
                        {activeData.ebibimanAction.map((item, idx) => (
                          <div className="sidebar-list-item" key={idx}>
                            <div className="sidebar-item-icon-wrapper green-theme">
                              <IconComponent name={item.icon} className="sidebar-item-icon" />
                            </div>
                            <div className="sidebar-item-text">
                              <h5 className="sidebar-item-title">{item.title}</h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sidebar-empty-state"
                >
                  <Globe2 className="empty-globe-icon" />
                  <p>Select a country on the map or choose a category on the left to explore Africa's diverse knowledge landscape.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Section: Category Explorer (Full Width Horizontal Row) */}
        <div className="atlas-categories-section">
          <h4 className="categories-title">EXPLORE BY KNOWLEDGE CATEGORY</h4>
          <div className="categories-grid">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  className={`category-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  style={{ '--category-color': cat.color } as React.CSSProperties}
                >
                  <div className="category-icon-wrapper">
                    <Icon className="category-icon" />
                  </div>
                  <span className="category-label">{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
