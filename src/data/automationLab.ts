export interface AutomationProject {
  id: string
  name: string
  summary: string
  stats: { value: string; label: string }[]
  highlights: string[]
  technologies: string[]
  repoUrl: string
  reportUrl: string
  ciUrl: string
}

export const automationProjects: AutomationProject[] = [
  {
    id: 'playwright-qa-automation',
    name: 'Playwright QA Automation',
    summary:
      'Suite de pruebas E2E y de API sobre dos aplicaciones públicas de práctica: SauceDemo (tienda en línea) y Restful Booker (API de reservaciones). Corre en cada push con GitHub Actions y publica el reporte HTML.',
    stats: [
      { value: '45', label: 'pruebas por ejecución' },
      { value: '3', label: 'navegadores' },
      { value: '23', label: 'escenarios UI y API' },
    ],
    highlights: [
      'UI en Chromium, Firefox y WebKit: login, ordenamiento de productos, carrito, checkout completo con validación de totales y validaciones de formulario data-driven.',
      'API: autenticación, CRUD de reservaciones, pruebas negativas (403 sin token) y un flujo encadenado crear → leer → actualizar → borrar.',
      'Page Object Model, fixtures propios y locators por rol y data-test; sin esperas fijas.',
      'Validación de esquemas de respuesta con zod y limpieza automática de los datos de prueba.',
      'Diagnóstico y corrección de dos condiciones de carrera que solo aparecían en WebKit.',
    ],
    technologies: ['Playwright', 'TypeScript', 'zod', 'GitHub Actions', 'GitHub Pages'],
    repoUrl: 'https://github.com/faedvelasco-ops/playwright-qa-automation',
    reportUrl: 'https://faedvelasco-ops.github.io/playwright-qa-automation/',
    ciUrl: 'https://github.com/faedvelasco-ops/playwright-qa-automation/actions/workflows/playwright.yml',
  },
]
