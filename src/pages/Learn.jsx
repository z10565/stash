import { useRef } from 'react'
import MiaAvatar from '../components/ai/MiaAvatar'
import LessonCard from '../components/ai/LessonCard'
import ChatInterface from '../components/ai/ChatInterface'

const MIA_SYSTEM = `You are Mia, a friendly and knowledgeable investing guide for first-time investors in the EU, particularly Latvia and the Baltic states. You explain concepts in simple, warm, conversational language — no jargon unless you immediately explain it. You specialise in: ETFs, index funds, bonds, P2P loans, compound interest, and risk management. You never give specific financial advice or tell users what to invest in. You educate and empower. Keep responses concise — 2-4 sentences maximum unless the user asks for more detail. Always end with a follow-up question or encouragement to keep the user engaged.`

const MIA_GREETING = `Hi, I'm Mia, your investing guide. I'm here to make investing feel simple and approachable. What would you like to learn about today — compound interest, ETFs, risk, or something else?`

const LESSONS = [
  { title: 'What is compound interest?' },
  { title: "ETFs vs index funds — what's the difference?" },
  { title: 'How much risk should I take?' },
  { title: 'Why not just leave money in the bank?' },
  { title: 'How do I start with just €10?' },
]

const STARTER_PROMPTS = LESSONS.map(l => l.title)

export default function Learn() {
  const chatRef = useRef(null)

  const handleLessonSelect = (question) => {
    chatRef.current?.sendMessage(question)
  }

  return (
    <div style={{ backgroundColor: '#0A0E1A', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">
          <MiaAvatar size={80} showLabel={false} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#00D09C' }}>
              AI Learning Guide
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Learn with Mia
            </h1>
            <p className="text-base" style={{ color: '#6B7280' }}>
              Ask anything about investing. Mia explains it in plain, simple language.
            </p>
            <p className="text-xs mt-1 font-semibold" style={{ color: '#00D09C' }}>
              Mia · Your investing guide
            </p>
          </div>
        </div>

        {/* ── Lesson cards ── */}
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#374151' }}>
            Quick lessons — click to ask Mia
          </p>
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {LESSONS.map(l => (
              <LessonCard
                key={l.title}
                title={l.title}
                onSelect={handleLessonSelect}
              />
            ))}
          </div>
        </div>

        {/* ── Chat ── */}
        <ChatInterface
          ref={chatRef}
          systemPrompt={MIA_SYSTEM}
          AvatarComponent={MiaAvatar}
          starterPrompts={STARTER_PROMPTS}
          placeholder="Ask Mia anything about investing…"
          assistantName="Mia"
          initialMessage={MIA_GREETING}
        />

        {/* ── Disclaimer ── */}
        <p className="text-xs text-center mt-5" style={{ color: '#374151' }}>
          Mia provides education only — not personalised financial advice. Capital at risk.
        </p>

      </div>
    </div>
  )
}
