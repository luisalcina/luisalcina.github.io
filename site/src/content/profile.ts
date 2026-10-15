export const profile = {
  name: 'Luis Alcina',
  role: 'Technology professional focused on AI, CCaaS, integrations, and technical strategy.',
  location: 'Miami, Florida',
  linkedIn: 'https://www.linkedin.com/in/luis-alcina-63272318b/',
  github: 'https://github.com/luisalcina',
  focus: [
    { label: 'AI', copy: 'Applied AI that helps teams complete complex work through natural conversation and clear guidance.', glyph: '✦', href: '#case-ai', action: 'Read the case study' },
    { label: 'Contact Center Technology', copy: 'Customer engagement systems and CCaaS experiences designed around real operational needs.', glyph: '◌', href: '#case-cc', action: 'Read the case study' },
    { label: 'Automation', copy: 'Purposeful workflows that gather information, apply logic, and surface the right next action.', glyph: '↗', href: '#case-api', action: 'Read the case study' },
    { label: 'Integrations & APIs', copy: 'Connecting platforms, information, and workflows so the whole system works with less effort.', glyph: '⊹', href: '#connect', action: 'Case study in development' }
  ],
  caseStudies: [
    {
      mark: 'AI',
      label: 'Case study 01 / BPO operations',
      title: 'Turning complex program creation into a natural conversation.',
      challenge: 'Professional services and operations teams were completing repetitive, technically complex tasks at scale. Creating a new customer program involved structured JSON data, API calls, database management, and specialized platform knowledge—an end-to-end process that could take one to three days.',
      solution: 'Luis led the strategy, workflow design, integrations, and delivery of a portfolio of AI skills. Team members can describe their goal in natural language, guide the assistant through requirements, and create or update programs and user data without needing to operate the technical systems directly.',
      workflow: ['Capture the business need and requirements', 'Guide the request through an AI-assisted conversation', 'Generate the required program configuration and actions', 'Make the output ready for testing'],
      systems: ['LLMs', 'CCaaS', 'Internal tools', 'APIs', 'Databases'],
      impact: 'Reduced an end-to-end process from one to three days to approximately 15–30 minutes, while improving accuracy and making complex workflows accessible to non-technical teams.'
    },
    {
      mark: 'CC',
      label: 'Case study 02 / Sales workflow',
      title: 'Making every sales call start with the right next step.',
      challenge: 'Sales teams were working from an incomplete outreach cadence, which limited contact rates and left agents responsible for managing calling lists alongside their system of record.',
      solution: 'Luis owned the strategy, solution design, configuration, integration, delivery, and rollout of a CCaaS dialer workflow. The system applies a comprehensive outreach cadence, brings the calling experience together with the system of record, and guides agents from login through the next best call.',
      workflow: ['Define the outreach strategy and calling cadence', 'Configure the dialer around the sales workflow', 'Integrate the calling experience with the system of record', 'Guide agents to the right calls without list management'],
      systems: ['CCaaS', 'Sales dialer', 'System of record', 'Calling cadence'],
      impact: 'Gave agents one integrated workflow instead of separate calling and record-keeping systems, removed the burden of maintaining calling lists, and improved contact rates through a more purposeful cadence.'
    },
    {
      mark: 'API',
      label: 'Case study 03 / Fuel pricing workflow',
      title: 'Turning daily market-price research into a clear morning decision.',
      challenge: 'A multi-location fuel retailer needed to keep prices competitive, but the owner had to manually research nearby stations to understand the local market. That process could take substantial time at each location and made it easy for pricing gaps to persist unnoticed.',
      solution: 'Luis took the idea from problem to rollout, designing an automation that collects nearby fuel prices from an external market-data source, compares them with the retailer’s own prices, uses an LLM to turn the comparison into practical feedback, and emails the owner a concise daily briefing.',
      workflow: ['Trigger the pricing review each morning', 'Retrieve nearby market prices through an API', 'Compare external and internal price data', 'Generate plain-language recommendations with an LLM', 'Email the owner a briefing ready for action'],
      systems: ['Market-price API', 'LLM', 'Email automation', 'Data comparison'],
      impact: 'Replaced recurring manual price checks with a daily briefing, giving the owner faster visibility into pricing gaps and more time to coordinate action with station managers.'
    },
    {
      mark: 'FHIR',
      label: 'Case study 04 / Healthcare workflows',
      title: 'Giving contact-center teams the patient context they need, in one place.',
      challenge: 'Service-delivery and implementation teams needed contact-center and EHR platforms to work together. Without an integration, systems could not exchange information, leaving agents without an efficient way to complete patient-related tasks inside their primary interaction workspace.',
      solution: 'Luis configured, tested, and rolled out integrations between multiple EHR platforms and a CCaaS environment. The connected workflow lets users handle interactions in the contact-center platform while securely exchanging relevant information with the EHR through FHIR APIs.',
      workflow: ['Configure and connect the CCaaS environment to the EHR', 'Route the agent interaction through the contact-center workspace', 'Exchange relevant context with the EHR through FHIR APIs', 'Support verification, appointment, and refill-related workflows', 'Send an interaction note back to the EHR when the conversation ends'],
      systems: ['EHR platforms', 'CCaaS', 'FHIR APIs', 'Interaction notes'],
      impact: 'Created a more unified agent experience, making patient-related workflows easier to complete and supporting greater day-to-day productivity.'
    }
  ],
  foundations: [
    { label: 'Automotive', copy: 'Building deeper context around connected operations, dealership systems, and customer journeys.' },
    { label: 'Healthcare integrations', copy: 'Developing a practical systems perspective for secure, connected healthcare workflows.' },
    { label: 'Payment gateways', copy: 'Exploring the technology and integration patterns that make transactions reliable and trusted.' },
    { label: 'CRMs', copy: 'Strengthening the customer-data foundation behind smarter, more connected experiences.' }
  ],
  suggestedQuestions: [
    'What does Luis specialize in?',
    'How does Luis think about AI?',
    'What problems does he solve?',
    'How can I connect with Luis?'
  ]
} as const

export const answerFromProfile = (question: string) => {
  const q = question.toLowerCase()
  if (q.includes('connect') || q.includes('contact') || q.includes('linkedin')) return `The best way to connect is on LinkedIn: ${profile.linkedIn}`
  if (q.includes('ai') || q.includes('automation')) return 'Luis is interested in practical AI and automation—using technology to remove operational friction and create better experiences for teams and customers.'
  if (q.includes('problem') || q.includes('solve') || q.includes('work')) return 'Luis focuses on technical strategy, solution delivery, integrations, CCaaS, and automation. He is most interested in the point where technical systems and real business problems meet.'
  return 'Luis is a technology professional focused on AI, contact-center technology, systems integrations, solution delivery, and technical strategy. Detailed case studies are being prepared; in the meantime, LinkedIn is the best source for his current background.'
}
