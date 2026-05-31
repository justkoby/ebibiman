import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import './FAQ.css'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is Ebibiman Tech Alliance?',
    answer: 'Ebibiman Tech Alliance is an organization empowering young Africans to design, build, and lead technology. We focus on training that is rooted in indigenous knowledge, ethical principles, and community-driven impact, ensuring African builders are active creators rather than passive consumers.'
  },
  {
    question: 'Who can join?',
    answer: 'We open our programs to students, developers, educators, and technology enthusiasts who want to build a career in software, prompt engineering, or responsible design. Depending on the initiative, we have tracks for high schoolers (Future Minds Ghana) and advanced bootcamps for developers (AI Masterclasses).'
  },
  {
    question: 'How can schools participate?',
    answer: 'Schools in Ghana can partner with us to benefit from our Future Minds initiative. We assist in configuring offline-capable computer laboratories, training ICT teachers, and setting up weekly tech clubs to guide students in creative computing.'
  },
  {
    question: 'How can organizations partner?',
    answer: 'Organizations can partner with us by funding computer labs, sponsoring specific educational programs, or providing mentorship. Companies can also explore hiring our qualified, ethically-trained developers for software projects.'
  },
  {
    question: 'Is there a cost to join?',
    answer: 'Most of our flagship community courses and public school outreaches are completely free of charge, supported by our partners and sponsors. Some advanced specialized bootcamps may have application fees to cover hosting costs, but we offer extensive scholarships.'
  }
]

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question-btn" onClick={onClick}>
        <span>{question}</span>
        <ChevronDown className="faq-chevron-icon" />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="faq-answer-wrapper"
          >
            <p className="faq-answer-text">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <div className="section-eyebrow">Queries</div>
          <h2 className="section-title">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
        </div>

        <div className="faq-accordions-list">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={idx === openIndex}
              onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
