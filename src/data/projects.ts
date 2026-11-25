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
    technologies: ['WordPress', 'WooCommerce', 'Dokan', 'Astra'],
    status: 'Disponible en video (ver detalles)',
    hasDetailPage: true,
  },
  {
    id: 'portafolio',
    name: 'Portafolio profesional',
    description:
      'Este sitio: SPA con React 19, TypeScript y Vite, con perfiles QA y Dev seleccionables por URL, CSS propio sin frameworks de UI y pruebas E2E con Playwright en GitHub Actions.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS', 'Playwright'],
    status: 'En línea',
    githubUrl: 'https://github.com/faedvelasco-ops/mi-portafolio',
    testsUrl: 'https://github.com/faedvelasco-ops/mi-portafolio/actions/workflows/e2e.yml',
  },
]
