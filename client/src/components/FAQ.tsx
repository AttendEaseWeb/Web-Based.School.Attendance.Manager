import { useState } from 'react'

export interface FAQItem {
  q: string
  a: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i)

  return (
    <ul className="faq-list">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const answerId = `faq-answer-${i}`
        const questionId = `faq-question-${i}`
        return (
          <li key={i} className={`faq-item${isOpen ? ' open' : ''}`}>
            <button
              id={questionId}
              className="faq-question"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <span>{item.q}</span>
              <span className="faq-icon" aria-hidden="true">+</span>
            </button>
            <div
              id={answerId}
              className="faq-answer"
              role="region"
              aria-labelledby={questionId}
              aria-hidden={!isOpen}
            >
              <p dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
