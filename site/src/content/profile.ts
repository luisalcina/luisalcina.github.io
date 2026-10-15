export const profile = {
  name: 'Luis Alcina',
  role: 'Technology professional focused on AI, CCaaS, integrations, and technical strategy.',
  location: 'Naples, Florida',
  linkedIn: 'https://www.linkedin.com/in/luis-alcina-63272318b/',
  github: 'https://github.com/luisalcina',
  focus: [
    { label: 'AI & Automation', copy: 'Practical uses of AI and automation that reduce friction and make teams more effective.', glyph: '✦' },
    { label: 'Contact Center Technology', copy: 'Customer engagement systems and CCaaS experiences designed around real operational needs.', glyph: '◌' },
    { label: 'Integrations & APIs', copy: 'Connecting platforms, information, and workflows so the whole system works with less effort.', glyph: '↗' },
    { label: 'Solution Delivery', copy: 'Taking technical ideas from ambiguity to an implementation people can understand and adopt.', glyph: '⊹' }
  ],
  caseStudies: [
    {
      mark: 'AI',
      label: 'Case study 01 / Anonymized BPO',
      title: 'Turning complex program creation into a natural conversation.',
      challenge: 'Professional services and operations teams were completing repetitive, technically complex tasks at scale. Creating a new customer program involved structured JSON data, API calls, database management, and specialized platform knowledge—an end-to-end process that could take one to three days.',
      solution: 'Luis led the strategy, workflow design, integrations, and delivery of a portfolio of AI skills. Team members can describe their goal in natural language, guide the assistant through requirements, and create or update programs and user data without needing to operate the technical systems directly.',
      workflow: ['Capture the business need and requirements', 'Guide the request through an AI-assisted conversation', 'Generate the required program configuration and actions', 'Make the output ready for testing'],
      systems: ['LLMs', 'CCaaS', 'Internal tools', 'APIs', 'Databases'],
      impact: 'Reduced an end-to-end process from one to three days to approximately 15–30 minutes, while improving accuracy and making complex workflows accessible to non-technical teams.'
    },
    {
      mark: 'CC',
      label: 'Case study 02 / Anonymized sales team',
      title: 'Making every sales call start with the right next step.',
      challenge: 'Sales teams were working from an incomplete outreach cadence, which limited contact rates and left agents responsible for managing calling lists alongside their system of record.',
      solution: 'Luis owned the strategy, solution design, configuration, integration, delivery, and rollout of a CCaaS dialer workflow. The system applies a comprehensive outreach cadence, brings the calling experience together with the system of record, and guides agents from login through the next best call.',
      workflow: ['Define the outreach strategy and calling cadence', 'Configure the dialer around the sales workflow', 'Integrate the calling experience with the system of record', 'Guide agents to the right calls without list management'],
      systems: ['CCaaS', 'Sales dialer', 'System of record', 'Calling cadence'],
      impact: 'Gave agents one integrated workflow instead of separate calling and record-keeping systems, removed the burden of maintaining calling lists, and improved contact rates through a more purposeful cadence.'
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
