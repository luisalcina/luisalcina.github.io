import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { answerFromProfile, profile } from './content/profile'
import './styles.css'

type Message = { role: 'user' | 'assistant'; text: string }
const apiUrl = import.meta.env.VITE_LUIS_AI_ENDPOINT as string | undefined

function App() {
  const [light, setLight] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: 'Hi — I’m Luis AI. Ask about Luis’s work, focus areas, or how to connect.' }])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { document.documentElement.dataset.theme = light ? 'light' : 'dark' }, [light])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen(v => !v) }
      if (event.key === 'Escape') { setPaletteOpen(false); setChatOpen(false) }
    }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { if (chatOpen) setTimeout(() => inputRef.current?.focus(), 120) }, [chatOpen])
  const ask = async (raw: string) => {
    const text = raw.trim(); if (!text || loading) return
    setMessages(current => [...current, { role: 'user', text }]); setQuestion(''); setLoading(true)
    try {
      if (apiUrl) {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) })
        if (!response.ok) throw new Error('AI endpoint unavailable')
        const data = await response.json() as { answer?: string }
        setMessages(current => [...current, { role: 'assistant', text: data.answer || answerFromProfile(text) }])
      } else {
        await new Promise(resolve => setTimeout(resolve, 650))
        setMessages(current => [...current, { role: 'assistant', text: answerFromProfile(text) }])
      }
    } catch { setMessages(current => [...current, { role: 'assistant', text: 'The live assistant is temporarily unavailable. You can still connect with Luis on LinkedIn.' }]) }
    finally { setLoading(false) }
  }
  const submit = (event: FormEvent) => { event.preventDefault(); ask(question) }
  const navigate = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setPaletteOpen(false) }
  return <>
    <header className="nav"><a href="#top" className="wordmark"><span>LA</span> Luis Alcina</a><nav><a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#connect">Connect</a></nav><div className="nav-actions"><button className="icon-button" aria-label="Toggle color theme" onClick={() => setLight(v => !v)}>{light ? '◐' : '◑'}</button><button className="command" onClick={() => setPaletteOpen(true)}>⌘ K</button><a className="linkedin" href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn ↗</a></div></header>
    <main id="top">
      <section className="hero section-shell"><div className="orb orb-one"/><div className="orb orb-two"/><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><p className="eyebrow"><i/> Technology · AI · Human outcomes</p><h1>Hi, I’m <span>Luis.</span><br/>I build systems that make business feel more <em>human.</em></h1><p className="lead">Working at the intersection of AI, CCaaS, integrations, and technical strategy to turn complex technology into practical solutions.</p><div className="hero-actions"><button className="primary" onClick={() => setChatOpen(true)}>Ask Luis AI <b>✦</b></button><a className="secondary" href="#work">Explore my work <b>↓</b></a></div></motion.div><div className="signal-card"><span>Signal / 01</span><p>AI<br/>CCaaS<br/>Automation<br/>Integrations<br/>Technical strategy</p><small>Use <kbd>⌘ K</kbd> to explore</small></div></section>
      <section id="work" className="work section-shell"><div className="section-header"><p className="eyebrow">01 / Portfolio</p><h2>Real-world systems.<br/><span>Meaningful outcomes.</span></h2><p>Case studies are being documented with the appropriate detail and context. For now, this is the map of the work I’m most energized by.</p></div><div className="focus-grid">{profile.focus.map((item, index) => <motion.article whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 250 }} className="focus-card" key={item.label}><span>0{index + 1}</span><b>{item.glyph}</b><h3>{item.label}</h3><p>{item.copy}</p><div className="card-footer">Case studies in development <i>↗</i></div></motion.article>)}</div></section>
      <section id="expertise" className="expertise section-shell"><p className="eyebrow">02 / The ecosystem</p><div className="expertise-layout"><h2>Strategy is the<br/><span>connection</span> between<br/>what’s possible and<br/>what’s useful.</h2><div className="constellation" aria-label="Expertise areas"><span className="core">Luis</span><span className="node n1">AI</span><span className="node n2">CCaaS</span><span className="node n3">APIs</span><span className="node n4">Automation</span><span className="node n5">Delivery</span><span className="line l1"/><span className="line l2"/><span className="line l3"/><span className="line l4"/></div></div><div className="credentials">{profile.credentials.map((credential, index) => <div key={credential}><span>0{index + 1}</span>{credential}</div>)}</div></section>
      <section className="about section-shell"><p className="eyebrow">03 / Perspective</p><div><h2>Technology is only valuable when it helps people do better work.</h2><p>I’m interested in the bridge between the technical and the practical: customer experiences that feel effortless, integrations that make information useful, and AI that earns its place in the workflow.</p></div></section>
    </main>
    <footer id="connect"><div className="section-shell"><p className="eyebrow">04 / Start a conversation</p><h2>Let’s turn a complex<br/>idea into <span>something useful.</span></h2><div className="footer-row"><a className="footer-link" href={profile.linkedIn} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a><a className="footer-link" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><small>© {new Date().getFullYear()} Luis Alcina</small></div></div></footer>
    <AnimatePresence>{chatOpen && <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section className="chat" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 28, opacity: 0 }}><header><div><span className="ai-mark">✦</span><div><b>Ask Luis AI</b><small><i/> Grounded in Luis’s portfolio</small></div></div><button className="close" aria-label="Close Ask Luis AI" onClick={() => setChatOpen(false)}>×</button></header><div className="messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}>{message.text}</div>)}{loading && <div className="message assistant typing"><i/><i/><i/></div>}</div><div className="suggestions">{profile.suggestedQuestions.slice(0, 3).map(item => <button key={item} onClick={() => ask(item)}>{item}</button>)}</div><form onSubmit={submit}><input ref={inputRef} value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ask anything about Luis…" aria-label="Ask Luis AI"/><button type="submit" aria-label="Send question">↑</button></form><p className="disclaimer">Answers are grounded in the published portfolio. The live LLM endpoint activates when configured.</p></motion.section></motion.div>}</AnimatePresence>
    <AnimatePresence>{paletteOpen && <motion.div className="overlay palette-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPaletteOpen(false)}><motion.div className="palette" onClick={event => event.stopPropagation()} initial={{ y: -16 }} animate={{ y: 0 }} exit={{ y: -16 }}><p>Jump to</p>{[['Work', '#work'], ['Expertise', '#expertise'], ['Connect', '#connect']].map(([label, id]) => <button key={id} onClick={() => navigate(id)}>{label}<span>↗</span></button>)}<button onClick={() => { setPaletteOpen(false); setChatOpen(true) }}>Ask Luis AI <span>✦</span></button></motion.div></motion.div>}</AnimatePresence>
  </>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
