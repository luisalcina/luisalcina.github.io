export interface Env { OPENROUTER_API_KEY: string; OPENROUTER_MODEL?: string; ALLOWED_ORIGIN: string }
const system = `You are Ask Luis AI, a concise portfolio assistant. Answer only from the supplied verified profile. Do not invent employers, projects, achievements, metrics, certifications, or education. If information is unavailable, say so and direct visitors to Luis's LinkedIn: https://www.linkedin.com/in/luis-alcina-63272318b/. Verified profile: Luis Alcina is a technology professional focused on AI, contact center technology (CCaaS), solution delivery, systems integrations, APIs, automation, and technical strategy. He is based in Naples, Florida. Credentials include Prompt Engineering Specialization (Vanderbilt University), Google Data Analytics Professional Certificate, Google Project Management Professional Certificate, and Workato Automation Pro I & II.`
const visits = new Map<string, { count: number; resetAt: number }>()
export default { async fetch(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('Origin') || ''
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Vary': 'Origin' }
  if (request.method === 'OPTIONS') return new Response(null, { headers })
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
  if (origin && origin !== env.ALLOWED_ORIGIN) return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403, headers })
  const key = request.headers.get('CF-Connecting-IP') || 'unknown'
  const now = Date.now(), visit = visits.get(key)
  const current = !visit || visit.resetAt < now ? { count: 0, resetAt: now + 60_000 } : visit
  if (current.count >= 10) return new Response(JSON.stringify({ error: 'Please wait a moment before asking another question.' }), { status: 429, headers })
  visits.set(key, { ...current, count: current.count + 1 })
  const { message } = await request.json<{ message?: string }>()
  if (!message || message.length > 1200) return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400, headers })
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', headers: { 'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json', 'HTTP-Referer': env.ALLOWED_ORIGIN, 'X-Title': 'Luis Alcina Portfolio' }, body: JSON.stringify({ model: env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free', messages: [{ role: 'system', content: system }, { role: 'user', content: message }], max_tokens: 350, temperature: .25 }) })
  if (!response.ok) return new Response(JSON.stringify({ error: 'Assistant unavailable' }), { status: 502, headers })
  const data = await response.json<{ choices?: Array<{ message?: { content?: string } }> }>()
  return new Response(JSON.stringify({ answer: data.choices?.[0]?.message?.content || 'I do not have that information yet.' }), { headers })
} }
