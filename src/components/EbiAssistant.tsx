import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles, ArrowUpRight } from "lucide-react"
import "./EbiAssistant.css"

interface ChatMessage {
  id: string
  sender: "bot" | "user"
  text: string
  timestamp: Date
  isQuickActions?: boolean
  links?: { label: string; targetId: string }[]
}

interface FAQKnowledge {
  keywords: string[]
  question: string
  answer: string
  targetLinks?: { label: string; targetId: string }[]
}

const FAQ_KNOWLEDGE_BASE: FAQKnowledge[] = [
  {
    keywords: ["what is", "about eta", "about ebibiman", "who are you", "what do you do", "mission", "purpose"],
    question: "What is Ebibiman Tech Alliance?",
    answer: "Ebibiman Tech Alliance (ETA) is an African technology social enterprise exploring the intersection of emerging technology, indigenous knowledge, and African development. We think, teach, and build toward technological systems grounded in African realities—ensuring African builders are active creators rather than passive consumers.",
    targetLinks: [
      { label: "Our Approach", targetId: "approach" },
      { label: "Our Solutions", targetId: "ecosystem" },
      { label: "Get in Touch", targetId: "contact" }
    ]
  },
  {
    keywords: ["who can join", "eligibility", "can i join", "audience", "requirements", "apply", "who is this for"],
    question: "Who can join ETA?",
    answer: "Our programs are open to students, developers, educators, researchers, and technology enthusiasts who want to build a career in software, AI, prompt engineering, or ethical tech design. We offer tracks for high schoolers, university students, and advanced bootcamps for professionals.",
    targetLinks: [
      { label: "Programmes in Motion", targetId: "programmes" },
      { label: "Contact Us", targetId: "contact" }
    ]
  },
  {
    keywords: ["school", "schools", "participate", "ict teacher", "lab setup", "high school", "students"],
    question: "How can schools participate?",
    answer: "Schools across Ghana and Africa can partner with us to benefit from our youth initiatives. We assist in configuring digital learning environments, training ICT teachers, and setting up weekly tech clubs to guide students in creative computing, AI literacy, and practical software design.",
    targetLinks: [
      { label: "Get in Touch", targetId: "contact" }
    ]
  },
  {
    keywords: ["partner", "partnership", "sponsor", "sponsorship", "organizations", "hire", "collaborate"],
    question: "How can organizations partner?",
    answer: "Organizations can collaborate with us by sponsoring specific educational programs, providing mentorship, or partnering on community initiatives. Enterprises can also partner with ETA Solutions to build custom AI workflows, digital systems, and document automations tailored to their operations.",
    targetLinks: [
      { label: "ETA Solutions", targetId: "ecosystem" },
      { label: "Contact Our Team", targetId: "contact" }
    ]
  },
  {
    keywords: ["cost", "price", "fee", "free", "pricing", "how much", "payment", "scholarship"],
    question: "Is there a cost to join?",
    answer: "Most of our flagship community initiatives, webinars, and youth outreaches are completely free of charge, supported by our partners. For specialized advanced masterclasses, we offer extensive scholarships and subsidized rates.",
    targetLinks: [
      { label: "Programmes in Motion", targetId: "programmes" },
      { label: "Inquire via Contact", targetId: "contact" }
    ]
  },
  {
    keywords: ["solution", "service", "consulting", "automation", "ai adoption", "document", "build"],
    question: "What services does ETA Solutions offer?",
    answer: "ETA Solutions works with organizations across 4 core areas:\n\n1. **AI & Automation**: Intelligent workflow agents & automated processing.\n2. **Digital Solutions**: Custom software, web architectures, and mobile systems.\n3. **AI Adoption & Consulting**: Readiness audits, team training, and implementation roadmaps.\n4. **Document & Data Automations**: Enterprise unstructured data extraction & archival pipelines.",
    targetLinks: [
      { label: "Explore Solutions", targetId: "ecosystem" },
      { label: "Contact Our Team", targetId: "contact" }
    ]
  },
  {
    keywords: ["contact", "email", "phone", "reach", "location", "touch"],
    question: "How do I contact ETA?",
    answer: "You can reach our team directly at **ebibimantech@gmail.com** or fill out the quick contact form on our page.",
    targetLinks: [
      { label: "Contact Form", targetId: "contact" }
    ]
  }
]

const NAV_KEYWORDS = [
  { keywords: ["event", "webinar", "debate", "masterclass", "news", "insight", "stories"], targetId: "events", name: "News, Events & Insights" },
  { keywords: ["ecosystem", "solutions", "automation", "consulting"], targetId: "ecosystem", name: "ETA Solutions" },
  { keywords: ["contact", "join", "partner", "touch", "email", "get involved", "mentor"], targetId: "contact", name: "Get Involved / Contact" },
  { keywords: ["problem", "question", "mission", "about"], targetId: "the-problem", name: "The Question Facing Us" },
  { keywords: ["approach", "how", "method", "strategy", "think", "teach", "build"], targetId: "approach", name: "Our Approach" },
  { keywords: ["programme", "course", "ai", "prompt", "literacy", "motion"], targetId: "programmes", name: "Programmes in Motion" },
  { keywords: ["voices", "saying", "speak", "leader", "quote"], targetId: "voices", name: "What Tech Leaders Are Saying" },
  { keywords: ["business model", "engine", "loop"], targetId: "business-model", name: "How The Model Works" },
  { keywords: ["home", "top", "hero"], targetId: "hero", name: "Home" }
]

const EbiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hello! 👋 I'm Ebi, your Ebibiman Assistant. You can ask me any question about ETA, our programs, solutions, partnership opportunities, or how to get involved. Select an option below or ask me anything!",
        timestamp: new Date(),
        isQuickActions: true
      }
    ])
  }, [])

  // Auto-scroll to bottom of chat when messages update or open state changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleScrollTo = (targetId: string, sectionName: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      // Add visual feedback message
      const botMessageId = Math.random().toString(36).substring(7)
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          sender: "bot",
          text: `Navigating you to **${sectionName}**...`,
          timestamp: new Date()
        }
      ])
      
      // Perform smooth scroll after a brief delay
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" })
        // On mobile, close assistant to let them view section, keep open on desktop
        if (window.innerWidth < 768) {
          setIsOpen(false)
        }
      }, 600)
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          sender: "bot",
          text: `Sorry, I couldn't locate the "${sectionName}" section on this page.`,
          timestamp: new Date()
        }
      ])
    }
  }

  const handleQuickAction = (action: string) => {
    const userMsgId = Math.random().toString(36).substring(7)
    const botMsgId = Math.random().toString(36).substring(7)
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: "user",
        text: action,
        timestamp: new Date()
      }
    ])

    // Generate bot response based on option clicked
    setTimeout(() => {
      let botResponse = ""
      let targetLinks: { label: string; targetId: string }[] = []

      if (action.includes("Student") || action.includes("Builder")) {
        botResponse = "Ebibiman equips students and young developers with practical technology skills to go from users of tech to builders:\n\n• **AI Prompt Engineering Masterclasses**: Master practical AI toolchains and advanced prompt design.\n• **Digital Literacy & Coding Clubs**: Hands-on computing rooted in practical problem solving.\n• **Leadership & Governance in AI**: Preparing young minds for an AI-shaped future."
        targetLinks = [
          { label: "Programmes in Motion", targetId: "programmes" },
          { label: "Explore Solutions", targetId: "ecosystem" },
          { label: "Get in Touch", targetId: "contact" }
        ]
      } else if (action.includes("Educator") || action.includes("School")) {
        botResponse = "We collaborate with schools and educators to lead digital classrooms and build computational thinking:\n\n• **Teacher Development**: Practical digital skills and AI workflows.\n• **School Partnerships**: Direct curriculum and tech club setup.\n• **Ethical Tech**: Resources on digital citizenship and accountability."
        targetLinks = [
          { label: "Our Approach", targetId: "approach" },
          { label: "Contact Our Team", targetId: "contact" }
        ]
      } else if (action.includes("Partner") || action.includes("Organization")) {
        botResponse = "We collaborate with companies, institutions, and leaders across Africa:\n\n• **ETA Solutions**: Deploy custom AI agents, web architectures, and document automations.\n• **Program Sponsorship**: Fund masterclasses and community cohorts.\n• **Mentorship**: Guide students in technical and leadership tracks."
        targetLinks = [
          { label: "ETA Solutions", targetId: "ecosystem" },
          { label: "Contact Us", targetId: "contact" }
        ]
      } else if (action.includes("Events") || action.includes("Stories")) {
        botResponse = "Stay active with the ETA ecosystem through our seminars, masterclasses, and thought pieces:\n\n• **Equipping Young Leaders**: Governance in the Digital Age.\n• **AI Prompt Engineering**: Hands-on Masterclasses.\n• **The Ghanaian Tech Space**: Policy & ecosystem debates."
        targetLinks = [
          { label: "Browse Stories & Events", targetId: "events" },
          { label: "Leader Voices", targetId: "voices" }
        ]
      } else if (action.includes("Solutions")) {
        botResponse = "ETA Solutions builds digital systems around how people actually work:\n\n1. AI & Automation\n2. Digital Solutions\n3. AI Adoption & Consulting\n4. Document & Data Automations"
        targetLinks = [
          { label: "View Solutions", targetId: "ecosystem" },
          { label: "Contact Us", targetId: "contact" }
        ]
      }

      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "bot",
          text: botResponse,
          timestamp: new Date(),
          links: targetLinks
        }
      ])
    }, 450)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue.trim()
    setInputValue("")

    const userMsgId = Math.random().toString(36).substring(7)
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        sender: "user",
        text: userText,
        timestamp: new Date()
      }
    ])

    // Generate intelligent FAQ answer or smart navigation
    setTimeout(() => {
      const lowerText = userText.toLowerCase()
      const botMsgId = Math.random().toString(36).substring(7)

      // 1. Check FAQ Knowledge Base first
      const matchedFAQ = FAQ_KNOWLEDGE_BASE.find((item) =>
        item.keywords.some((keyword) => lowerText.includes(keyword))
      )

      if (matchedFAQ) {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: matchedFAQ.answer,
            timestamp: new Date(),
            links: matchedFAQ.targetLinks
          }
        ])
        return
      }

      // 2. Check Navigation Keywords
      const matchedNav = NAV_KEYWORDS.find((nav) =>
        nav.keywords.some((keyword) => lowerText.includes(keyword))
      )

      if (matchedNav) {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: `I've found details on **${matchedNav.name}**. Let me scroll you there right away!`,
            timestamp: new Date()
          }
        ])
        
        setTimeout(() => {
          const element = document.getElementById(matchedNav.targetId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            if (window.innerWidth < 768) {
              setIsOpen(false)
            }
          }
        }, 500)
      } else {
        // Fallback response with helpful suggestions
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "I can help answer questions about ETA's mission, courses, solutions, eligibility, or scroll you to any section on the page. Feel free to ask or choose an option below:",
            timestamp: new Date(),
            isQuickActions: true
          }
        ])
      }
    }, 450)
  }

  return (
    <div className="ebi-assistant-root">
      {/* Floating Pill Trigger Button */}
      <button 
        className={`ebi-trigger-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Ecosystem Guide"
      >
        <span className="ebi-trigger-dot"></span>
        <span className="ebi-trigger-text">Ask Ebi</span>
        <MessageSquare className="ebi-trigger-icon" size={16} />
      </button>

      {/* Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="ebi-chat-drawer"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="ebi-chat-header">
              <div className="ebi-header-title-wrap">
                <div className="ebi-avatar">
                  <Sparkles size={14} className="ebi-sparkle-icon" />
                </div>
                <div>
                  <h4 className="ebi-header-name">Ebi</h4>
                  <span className="ebi-header-tagline">Ecosystem Guide</span>
                </div>
              </div>
              <button className="ebi-close-btn" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="ebi-chat-body">
              <div className="ebi-messages-container">
                {messages.map((msg) => (
                  <div key={msg.id} className={`ebi-message-wrapper ${msg.sender}`}>
                    <div className={`ebi-message-bubble ${msg.sender}`}>
                      <p className="ebi-message-text">{msg.text}</p>
                      
                      {/* Nav Links / Action Links inside Bubbles */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="ebi-message-links">
                          {msg.links.map((link) => (
                            <button
                              key={link.label}
                              className="ebi-bubble-link-btn"
                              onClick={() => handleScrollTo(link.targetId, link.label)}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight size={13} className="ebi-link-arrow" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Render Quick Actions in feed if requested */}
                    {msg.isQuickActions && (
                      <div className="ebi-quick-actions-container">
                        <button className="ebi-quick-btn" onClick={() => handleQuickAction("🎓 I'm a Student")}>
                          <span>🎓 I'm a Student</span>
                        </button>
                        <button className="ebi-quick-btn" onClick={() => handleQuickAction("🏫 I'm an Educator")}>
                          <span>🏫 I'm an Educator</span>
                        </button>
                        <button className="ebi-quick-btn" onClick={() => handleQuickAction("🤝 I Want to Partner")}>
                          <span>🤝 I Want to Partner</span>
                        </button>
                        <button className="ebi-quick-btn" onClick={() => handleQuickAction("📅 View Events")}>
                          <span>📅 View Events</span>
                        </button>
                        <button className="ebi-quick-btn" onClick={() => handleQuickAction("🌍 Explore Ecosystem")}>
                          <span>🌍 Explore Ecosystem</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input Form Footer */}
            <form className="ebi-chat-input-bar" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Ask Ebi to scroll to a section..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="ebi-text-input"
              />
              <button type="submit" className="ebi-send-btn" disabled={!inputValue.trim()}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EbiAssistant
