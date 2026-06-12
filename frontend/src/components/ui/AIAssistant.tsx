'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { Message } from '@/types'

const SUGGESTED = [
  'What projects have you shipped?',
  'How do you approach system architecture?',
  'What\'s your experience with AI integrations?',
  'Are you open to full-time roles?',
]

export function AIAssistant() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [streaming, setStreaming] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  // const send = async (text: string) => {
  //   if (!text.trim() || loading) return

  //   const userMsg: Message = {
  //     id: crypto.randomUUID(),
  //     role: 'user',
  //     content: text.trim(),
  //     timestamp: Date.now(),
  //   }

  //   setMessages((prev) => [...prev, userMsg])
  //   setInput('')
  //   setLoading(true)
  //   setStreaming('')

  //   try {
  //     const res = await fetch('/api/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
  //       }),
  //     })

  //     if (!res.ok) throw new Error('API error')

  //     const reader  = res.body!.getReader()
  //     const decoder = new TextDecoder()
  //     let full = ''

  //     while (true) {
  //       const { done, value } = await reader.read()
  //       if (done) break
  //       const chunk = decoder.decode(value)

  //       for (const line of chunk.split('\n')) {
  //         if (!line.startsWith('data: ')) continue
  //         const data = line.slice(6)
  //         if (data === '[DONE]') break
  //         try {
  //           const { text } = JSON.parse(data)
  //           if (text) { full += text; setStreaming(full) }
  //         } catch { /* skip */ }
  //       }
  //     }

  //     setMessages((prev) => [
  //       ...prev,
  //       { id: crypto.randomUUID(), role: 'assistant', content: full, timestamp: Date.now() },
  //     ])
  //   } catch {
  //     setMessages((prev) => [
  //       ...prev,
  //       { id: crypto.randomUUID(), role: 'assistant', content: 'AI system temporarily offline. Try again shortly.', timestamp: Date.now() },
  //     ])
  //   } finally {
  //     setLoading(false)
  //     setStreaming('')
  //   }
  // }
const send = async (text: string) => {
  if (!text.trim() || loading) return

  const userMsg: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content: text.trim(),
    timestamp: Date.now(),
  }

  setMessages((prev) => [...prev, userMsg])
  setInput('')
  setLoading(true)

  // Simulate thinking delay then show coming soon
  await new Promise((r) => setTimeout(r, 800))

  setMessages((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'AI assistant is coming soon. For now, reach out directly via the contact form below — I respond within 24 hours.',
      timestamp: Date.now(),
    },
  ])
  setLoading(false)
}


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'fixed bottom-6 right-6 z-modal',
          'w-12 h-12 border flex items-center justify-center',
          'transition-all duration-300',
          open
            ? 'border-[--accent-lime] bg-[rgba(199,255,63,0.1)]'
            : 'border-[--border] bg-[--bg-secondary] hover:border-[--border-accent]'
        )}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className={cn('text-base', open ? 'text-[--accent-lime]' : 'text-[--text-secondary]')}
          >
            {open ? '✕' : '◈'}
          </motion.span>
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-0 border border-[--accent-lime]/30"
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-6 z-modal w-80 md:w-96 flex flex-col"
            style={{ maxHeight: '70vh' }}
          >
            <div className="panel-dark border border-[--border] flex flex-col overflow-hidden"
              style={{ maxHeight: '70vh' }}>

              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[--border]">
                <div className="status-dot" />
                <div>
                  <p className="text-label text-[--text-primary]">PORTFOLIO AI</p>
                  <p className="text-system text-[--text-muted]">Ask anything about Rahul's work</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.length === 0 ? (
  <div>
    {/* Coming soon banner */}
    <div className="border border-[--border] p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-[--accent-cyan]"
        />
        <span className="text-system text-[--accent-cyan]">COMING SOON</span>
      </div>
      <p className="text-system text-[--text-muted] leading-relaxed">
        AI assistant is being configured. You can still send a message — I'll reply directly.
      </p>
    </div>

    {/* Still show suggested questions — they'll get the fallback reply */}
    <p className="text-system text-[--text-muted] mb-3">TRY ASKING</p>
    <div className="space-y-2">
      {SUGGESTED.map((s) => (
        <button
          key={s}
          onClick={() => send(s)}
          className="w-full text-left text-system text-[--text-secondary] px-3 py-2.5 border border-[--border] hover:border-[--border-accent] hover:text-[--accent-lime] transition-all duration-200"
        >
          {s}
        </button>
      ))}
    </div>
  </div>
                    
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                    >
                      <div
                        className={cn(
                          'max-w-[85%] px-3.5 py-2.5 text-body leading-relaxed',
                          msg.role === 'user'
                            ? 'bg-[rgba(199,255,63,0.08)] border border-[--border-accent] text-[--text-primary]'
                            : 'bg-[--bg-surface] border border-[--border] text-[--text-secondary]'
                        )}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}

                {/* Streaming preview */}
                {streaming && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] px-3.5 py-2.5 text-body text-[--text-secondary] bg-[--bg-surface] border border-[--border]">
                      {streaming}
                      <span className="terminal-cursor" />
                    </div>
                  </div>
                )}

                {/* Loading dots */}
                {loading && !streaming && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 bg-[--bg-surface] border border-[--border] flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-[--accent-lime]"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="border-t border-[--border] p-3 flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, stack, availability..."
                  disabled={loading}
                  className={cn(
                    'flex-1 bg-transparent text-body text-[--text-primary]',
                    'placeholder:text-[--text-muted] outline-none',
                    'font-mono text-sm',
                    loading && 'opacity-50'
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={cn(
                    'text-system px-3 py-1.5 border transition-colors duration-200',
                    input.trim() && !loading
                      ? 'border-[--border-accent] text-[--accent-lime] hover:bg-[rgba(199,255,63,0.06)]'
                      : 'border-[--border] text-[--text-muted] cursor-not-allowed'
                  )}
                >
                  ↵
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// {messages.length === 0 ? (
//                   <div>
//                     <p className="text-system text-[--text-muted] mb-4">QUICK START</p>
//                     <div className="space-y-2">
//                       {SUGGESTED.map((s) => (
//                         <button
//                           key={s}
//                           onClick={() => send(s)}
//                           className="w-full text-left text-system text-[--text-secondary] px-3 py-2.5 border border-[--border] hover:border-[--border-accent] hover:text-[--accent-lime] transition-all duration-200"
//                         >
//                           {s}
//                         </button>
//                       ))}