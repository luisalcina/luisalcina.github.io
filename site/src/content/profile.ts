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
  credentials: ['Prompt Engineering Specialization · Vanderbilt University', 'Google Data Analytics Professional Certificate', 'Google Project Management Professional Certificate', 'Workato Automation Pro I & II'],
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
