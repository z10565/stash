import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Send } from 'lucide-react'

// API key read from environment (add VITE_ANTHROPIC_API_KEY to .env.local)
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

const ChatInterface = forwardRef(function ChatInterface(
  { systemPrompt, AvatarComponent, starterPrompts = [], placeholder = 'Ask anything…', assistantName = 'Assistant', initialMessage = 'Hi! How can I help you today?' },
  ref
) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialMessage, isInitial: true },
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const messagesRef    = useRef(messages)
  const bottomRef      = useRef(null)
  const inputRef       = useRef(null)

  // Keep ref in sync for use inside async callbacks
  useEffect(() => { messagesRef.current = messages }, [messages])

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg      = { role: 'user', content: trimmed }
    const withUser     = [...messagesRef.current, userMsg]
    setMessages(withUser)
    setInput('')
    setLoading(true)
    setError(null)

    // Build history for API — exclude the pre-seeded initial greeting
    const apiMessages = withUser
      .filter(m => !m.isInitial)
      .map(({ role, content }) => ({ role, content }))

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type':                          'application/json',
          'x-api-key':                             API_KEY,
          'anthropic-version':                     '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model:      'claude-sonnet-4-6',
          max_tokens: 1000,
          system:     systemPrompt,
          messages:   apiMessages,
        }),
      })

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const data = await resp.json()
      const reply = data.content?.[0]?.text ?? '(no response)'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setError(`${assistantName} is taking a short break. Try again in a moment.`)
    } finally {
      setLoading(false)
    }
  }, [loading, systemPrompt, assistantName])

  // Expose sendMessage to parent via ref (used by lesson card auto-send)
  useImperativeHandle(ref, () => ({ sendMessage }), [sendMessage])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  // Messages to render — append a typing placeholder while loading
  const displayMessages = loading
    ? [...messages, { role: 'assistant', content: null, typing: true }]
    : messages

  return (
    <div className="flex flex-col rounded-2xl border overflow-hidden" style={{ backgroundColor: '#111827', borderColor: '#1F2937' }}>

      {/* Starter prompts */}
      {starterPrompts.length > 0 && (
        <div className="px-4 pt-4 pb-3 border-b flex flex-wrap gap-2" style={{ borderColor: '#1F2937' }}>
          {starterPrompts.map(p => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={loading}
              className="text-xs px-3 py-1.5 rounded-full border transition-all"
              style={{ borderColor: '#374151', color: '#9CA3AF', backgroundColor: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00C896'; e.currentTarget.style.color = '#00C896' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = '#9CA3AF' }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Message thread */}
      <div
        className="flex flex-col gap-4 px-4 py-4 overflow-y-auto"
        style={{ maxHeight: 420, minHeight: 200 }}
      >
        {displayMessages.map((msg, i) => {
          const isAssistant = msg.role === 'assistant'
          return (
            <div
              key={i}
              className={`flex gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
            >
              {/* Avatar — only for assistant messages */}
              {isAssistant && (
                <div className="flex-shrink-0 self-end">
                  <AvatarComponent size={32} typing={!!msg.typing} showLabel={false} />
                </div>
              )}

              {/* Bubble */}
              <div
                className="max-w-xs sm:max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={isAssistant
                  ? { backgroundColor: 'rgba(0,208,156,0.08)', color: '#C9D1D9', borderTopLeftRadius: 4 }
                  : { backgroundColor: '#1F2937',               color: '#fff',    borderTopRightRadius: 4 }
                }
              >
                {msg.typing ? (
                  <div className="flex gap-1.5 items-center py-0.5">
                    <div className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#00D09C' }} />
                    <div className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#00D09C' }} />
                    <div className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#00D09C' }} />
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          )
        })}

        {/* Error banner */}
        {error && (
          <p className="text-xs text-center py-2 px-4 rounded-xl" style={{ backgroundColor: 'rgba(255,71,87,0.08)', color: '#FF6B78' }}>
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 px-4 py-3 border-t"
        style={{ borderColor: '#1F2937' }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: '#E6EDF3' }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            backgroundColor: input.trim() && !loading ? '#00C896' : '#1F2937',
            color:            input.trim() && !loading ? '#0A0E1A' : '#374151',
          }}
        >
          <Send size={15} />
        </button>
      </form>

    </div>
  )
})

export default ChatInterface
