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

const NAV_KEYWORDS = [
  { keywords: ["future minds", "ghana", "lab", "sponsor", "lab setup"], targetId: "future-minds", name: "Future Minds Ghana" },
  { keywords: ["event", "webinar", "debate", "masterclass", "news", "insight"], targetId: "events", name: "News, Events & Insights" },
  { keywords: ["ecosystem", "student", "educator", "school", "community"], targetId: "ecosystem", name: "Our Ecosystem" },
  { keywords: ["contact", "join", "partner", "touch", "email", "get involved"], targetId: "contact", name: "Get Involved / Contact" },
  { keywords: ["about", "who", "mission", "why", "ebibiman"], targetId: "why-ebibiman", name: "About Ebibiman" },
  { keywords: ["approach", "how", "method", "strategy"], targetId: "approach", name: "Our Approach" },
  { keywords: ["faq", "question", "help", "how to"], targetId: "faq", name: "FAQs" },
  { keywords: ["programme", "course", "ai", "prompt", "literacy"], targetId: "programmes", name: "Programmes in Motion" },
  { keywords: ["voices", "saying", "speak", "leader", "quote"], targetId: "voices", name: "What Tech Leaders Are Saying" },
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
        text: "Hello! 👋 I'm Ebi, your Ebibiman Navigation Assistant. I can help you find programmes, explore events, learn about Future Minds Ghana, or discover partnership opportunities. Select an option below or type a section name to go there directly!",
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

      if (action.includes("Student")) {
        botResponse = "Ebibiman equips students with practical technology skills to go from users of tech to builders. Here are relevant pathways:\n\n• **AI Prompt Engineering**: Master AI tools and coding fundamentals.\n• **Future Minds Ghana**: Join tech & coding clubs in fully equipped digital labs.\n• **Learning Through Play**: Build creative, analytical, and digital skills through interactive gaming."
        targetLinks = [
          { label: "View Programmes", targetId: "programmes" },
          { label: "Future Minds Labs", targetId: "future-minds" },
          { label: "Explore Ecosystem", targetId: "ecosystem" }
        ]
      } else if (action.includes("Educator")) {
        botResponse = "We empower educators to comfortably lead digital classrooms and sustain technology adoption:\n\n• **Teacher Training**: Practical digital skill development integrated with curriculums.\n• **School Outreach**: Direct networking and digital classroom setup.\n• **Responsible Tech Educationship**: Resources on digital citizenship and ethics."
        targetLinks = [
          { label: "Our Approach", targetId: "approach" },
          { label: "Future Minds Ghana", targetId: "future-minds" },
          { label: "Ecosystem View", targetId: "ecosystem" }
        ]
      } else if (action.includes("Partner")) {
        botResponse = "Thank you for joining the movement! We collaborate with organizations, leaders, and communities to scale impact:\n\n• **Lab Sponsorship**: Setup digital infrastructure in public schools.\n• **Program Funding**: Sponsor courses like AI and software coding.\n• **Mentorship**: Guide students in tech & innovation clubs."
        targetLinks = [
          { label: "Get in Touch", targetId: "contact" },
          { label: "Lab Details", targetId: "future-minds" }
        ]
      } else if (action.includes("Events")) {
        botResponse = "Stay active with the Ebibiman community. We host discussions, masterclasses, and panels:\n\n• **AI Masterclass**: Coding and prompt design workshop updates.\n• **Ecosystem Webinars**: Dynamic thought-leadership discussions.\n• **Tech Space Debates**: Engaging youth on digital issues."
        targetLinks = [
          { label: "Browse Events", targetId: "events" },
          { label: "Leader Insights", targetId: "voices" }
        ]
      } else if (action.includes("Ecosystem")) {
        botResponse = "Our collaborative ecosystem links students, educators, and tech innovators. Select an area to explore:"
        targetLinks = [
          { label: "About Ebibiman", targetId: "why-ebibiman" },
          { label: "Our Approach", targetId: "approach" },
          { label: "Frequently Asked Questions", targetId: "faq" }
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

    // Generate smart navigation or general guidance response
    setTimeout(() => {
      const lowerText = userText.toLowerCase()
      let matchedNav = NAV_KEYWORDS.find((nav) =>
        nav.keywords.some((keyword) => lowerText.includes(keyword))
      )

      const botMsgId = Math.random().toString(36).substring(7)

      if (matchedNav) {
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: `I've found details on **${matchedNav!.name}**. Let me scroll you there right away!`,
            timestamp: new Date()
          }
        ])
        
        setTimeout(() => {
          const element = document.getElementById(matchedNav!.targetId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            if (window.innerWidth < 768) {
              setIsOpen(false)
            }
          }
        }, 500)
      } else {
        // Fallback response with navigation menu
        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            sender: "bot",
            text: "I couldn't find a specific section matching your request. I can scroll you to any of these areas directly:\n\n• **About Ebibiman**\n• **Programmes**\n• **Future Minds Ghana**\n• **Ecosystem**\n• **Events**\n• **FAQ**\n• **Contact**\n\nOr check out these profiles:",
            timestamp: new Date(),
            isQuickActions: true
          }
        ])
      }
    }, 500)
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
