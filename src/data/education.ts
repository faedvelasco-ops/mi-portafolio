export interface EducationEntry {
  id: string
  program: string
  institution: string
  period: string
  highlights?: string[]
}

export const educationEntries: EducationEntry[] = [
  {
    id: 'cucei',
    program: 'Ingeniería en Informática',
    institution: 'CUCEI',
    period: '2023 – Actualidad',
  },
  {
    id: 'ceti',
    program: 'Tecnólogo en Desarrollo de Software',
    institution: 'CETI',
    period: '2019 – 2023',
  },
  {
    id: 'sic',
    program: 'Samsung Innovation Campus (SIC)',
    institution: 'Samsung',
    period: 'Abril 2026',
    highlights: [
      'Formación en ciencia de datos y análisis de información.',
      'Desarrollo del pensamiento analítico para la resolución de problemas.',
      'Formación en liderazgo avalada por CENEVAL.',
      'Toma de decisiones basada en datos.',
    ],
  },
]
