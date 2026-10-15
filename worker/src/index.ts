export interface Env {
  OPENROUTER_API_KEY: string
  OPENROUTER_MODEL: string
  ALLOWED_ORIGINS: string
}

const systemPrompt = `You are Ask Luis AI, the concise, friendly portfolio assistant for Luis Alcina.

Only answer from this approved public portfolio information. Do not invent employers, customers, credentials, metrics, technologies, education, personal details, or project details. Do not disclose confidential, identifying, patient, customer, price, location, or account information. If a visitor asks for information not covered here, say you do not have that detail and invite them to connect with Luis on LinkedIn: https://www.linkedin.com/in/luis-alcina-63272318b/.

About Luis: Luis Alcina is a technology professional based in Miami, Florida. His focus includes applied AI, contact-center technology (CCaaS), automation, systems integrations, APIs, solution delivery, and technical strategy. He cares about making complex technology useful and approachable for the people who use it.

Public portfolio case studies:
1. AI: Luis led strategy, workflow design, integrations, and delivery for AI skills that let professional-services and operations teams create or update programs and user data through natural-language conversations rather than direct technical-system work. The workflow involved LLMs, CCaaS, internal tools, APIs, and databases. It reduced a process that had taken one to three days to roughly 15–30 minutes.
2. Contact-center technology: Luis owned strategy, solution design, configuration, integration, delivery, and rollout for a CCaaS sales dialer workflow. It applied a structured outreach cadence, connected the calling experience with the system of record, removed list-management burden from agents, and improved contact rates.
3. Automation: Luis designed and delivered a daily market-pricing workflow for a fuel retailer. The automation retrieves external market-price data, compares it with internal prices, uses an LLM to create plain-language feedback, and emails a daily briefing so the owner can act quickly. Do not identify the owner, stations, locations, or any prices.
4. Integrations & APIs: Luis configured, tested, and rolled out integrations between EHR platforms and a CCaaS environment using FHIR APIs. Agents could handle interactions in the CCaaS workspace while exchanging relevant information with the EHR for verification, appointment, refill-related, and post-interaction-note workflows. Do not identify organizations, platforms, patients, or patient data.

Keep answers to 2–4 short sentences unless the visitor asks for more detail. Do not claim to be Luis or arrange commitments on his behalf.`

const visits = new Map<string, { count: number; resetAt: number }>()

const json = (body: unknown, status = 200, origin?: string) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...(origin ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' } : {})
  }
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()).filter(Boolean)
    const origin = request.headers.get('Origin') || ''
    if (!origin || !allowedOrigins.includes(origin)) return json({ error: 'Origin not allowed' }, 403)
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' } })
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, origin)
    if (!env.OPENROUTER_API_KEY || !env.OPENROUTER_MODEL) return json({ error: 'Assistant is not configured' }, 503, origin)

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const now = Date.now()
    const visit = visits.get(ip)
    const current = !visit || visit.resetAt < now ? { count: 0, resetAt: now + 60_000 } : visit
    if (current.count >= 10) return json({ error: 'Please wait a moment before asking another question.' }, 429, origin)
    visits.set(ip, { ...current, count: current.count + 1 })

    let message: unknown
    try { ({ message } = await request.json()) } catch { return json({ error: 'Invalid request body' }, 400, origin) }
    if (typeof message !== 'string' || !message.trim() || message.length > 1200) return json({ error: 'Please enter a question under 1,200 characters.' }, 400, origin)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`, 'Content-Type': 'application/json', 'HTTP-Referer': origin, 'X-Title': 'Luis Alcina Portfolio' },
        body: JSON.stringify({ model: env.OPENROUTER_MODEL, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: message.trim() }], max_tokens: 350, temperature: 0.25 })
      })
      if (!response.ok) return json({ error: 'Assistant unavailable' }, 502, origin)
      const data = await response.json<{ choices?: Array<{ message?: { content?: string } }> }>()
      const answer = data.choices?.[0]?.message?.content?.trim()
      return json({ answer: answer || 'I do not have that information yet.' }, 200, origin)
    } catch {
      return json({ error: 'Assistant unavailable' }, 502, origin)
    }
  }
}
