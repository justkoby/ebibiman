import { motion } from 'framer-motion'
import { BookOpen, Cpu, Gamepad2, ArrowRight } from 'lucide-react'
import './Programmes.css'

interface ProgrammeData {
  id: string
  title: string
  subtitle: string
  focus: string[]
  desc: string
  image: string
  icon: any
}

const programmes: ProgrammeData[] = [
  {
    id: 'responsible-tech',
    title: 'Responsible Tech Educationship',
    subtitle: 'Nurturing tech innovators who prioritize ethics, sovereignty, and local communities.',
    focus: ['Ethical Design', 'Responsible Innovation', 'African-Centered Thinking'],
    desc: 'This programme equips builders with the mental models needed to inspect the societal and cultural impacts of software. Rather than importing western paradigms, we teach tech development grounded in indigenous knowledge, privacy protection, and ethical community stewardship.',
    image: '/images/Responsible Tech Educationship.png',
    icon: BookOpen
  },
  {
    id: 'ai-prompting',
    title: 'AI & Prompt Engineering',
    subtitle: 'Shaping future communication, AI literacy, and workplace agility.',
    focus: ['AI Literacy', 'Prompt Engineering', 'Communication Skills', 'Future of Work'],
    desc: 'The future belongs to those who collaborate effectively with artificial intelligence. We guide students to understand the underlying mechanics of Large Language Models, master the art of prompt engineering, and build the critical cognitive skills required to thrive in a digital-first workplace.',
    image: '/images/AI Prompt Engineering.png',
    icon: Cpu
  },
  {
    id: 'learning-play',
    title: 'Learning Through Play',
    subtitle: 'Fostering technical curiosity, abstract problem solving, and gaming dynamics.',
    focus: ['Children', 'Creativity', 'Educational Games', 'Problem Solving'],
    desc: 'We introduce younger minds to logic, coding, and mathematical thinking through games, interactive puzzles, and physical computing. By removing the abstract intimidation of technology, we allow kids to design games, build creative logic boards, and learn computer science concepts playfully.',
    image: '/images/learning_through_play.png',
    icon: Gamepad2
  }
]

const Programmes = () => {
  const textFadeVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  } as any

  const imageFadeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } 
    }
  } as any

  return (
    <section className="programmes-section" id="programmes">
      <div className="programmes-section-header">
        <div className="section-eyebrow">Flagship Pillars</div>
        <h2 className="section-title">
          How We Build: <span className="gold-text">Our Flagship Programmes</span>
        </h2>
      </div>

      <div className="programmes-list">
        {programmes.map((prog, idx) => {
          const Icon = prog.icon
          const isEven = idx % 2 === 0
          
          return (
            <div 
              className={`programme-showcase-row ${isEven ? 'row-normal' : 'row-reversed'}`} 
              key={prog.id}
            >
              {/* Visual Side */}
              <motion.div 
                className="prog-visual-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={imageFadeVariants}
              >
                <div className="prog-image-frame">
                  <div className="prog-image-glow"></div>
                  <img src={prog.image} alt={prog.title} className="prog-showcase-image" />
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div 
                className="prog-content-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={textFadeVariants}
              >
                <div className="prog-icon-badge">
                  <Icon className="prog-badge-icon" />
                  <span>Pillar 0{idx + 1}</span>
                </div>
                
                <h3 className="prog-showcase-title">{prog.title}</h3>
                <h4 className="prog-showcase-subtitle">{prog.subtitle}</h4>
                <p className="prog-showcase-description">{prog.desc}</p>
                
                <div className="prog-focus-tags">
                  {prog.focus.map((tag, tagIdx) => (
                    <span className="focus-tag-item" key={tagIdx}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="prog-action-row">
                  <a href="#contact" className="btn-prog-primary">
                    <span>Enroll Programme</span>
                    <ArrowRight className="prog-btn-arrow" />
                  </a>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Programmes
