export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  status: string
  liveUrl?: string
  githubUrl?: string
  testsUrl?: string
  hasDetailPage?: boolean
}

export const projects: Project[] = [
  {
    id: 'changarritos',
    name: 'Changarritos',
    description:
      'Marketplace universitario para encontrar, comprar y vender productos y servicios dentro de la universidad.',
    technologies: ['WordPress'],
    status: 'En producción',
    liveUrl: 'https://changarritosapp.com/',
    hasDetailPage: true,
  },
]
