export type Profile = 'qa' | 'dev'

export const profiles: Profile[] = ['qa', 'dev']
export const defaultProfile: Profile = 'qa'

/** Section ids rendered on the home view, in display order per profile. */
export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'automation-lab'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'languages'
  | 'contact'

export interface ProfileContent {
  /** Short label used by the switch. */
  label: string
  /** Long label used by the notice and assistive text. */
  name: string
  documentTitle: string
  sidebarRole: string
  heroRole: string
  heroIntro: string
  primaryCta: { label: string; href: string }
  aboutParagraphs: string[]
  specialties: string[]
  automationLabIntro: string
  sectionOrder: SectionId[]
  skillOrder: string[]
}

export const profileContent: Record<Profile, ProfileContent> = {
  qa: {
    label: 'QA',
    name: 'QA Engineer',
    documentTitle: 'Faed Velasco — QA Engineer · Playwright & API Testing',
    sidebarRole: 'QA Engineer',
    heroRole: 'QA Engineer · Playwright & API Testing',
    heroIntro:
      'QA Engineer en CONTPAQi, con experiencia previa como Ingeniero de Pruebas en IBM. Diseño y ejecuto pruebas funcionales, de regresión y de APIs en aplicaciones empresariales, y en proyectos propios automatizo pruebas E2E y de API con Playwright y TypeScript. El desarrollo de software (React, TypeScript) complementa mi perfil: entiendo cómo se construye lo que pruebo.',
    primaryCta: { label: 'Ver Automation Lab', href: '#automation-lab' },
    aboutParagraphs: [
      'QA Engineer con experiencia en aseguramiento de calidad de aplicaciones empresariales: pruebas funcionales, exploratorias, de regresión y de APIs, gestión de defectos en Azure DevOps y trabajo con equipos de desarrollo bajo Scrum.',
      'Fuera del trabajo construyo proyectos de automatización con Playwright y TypeScript (ver Automation Lab) y proyectos de desarrollo de principio a fin (ver Changarritos). Mi formación en desarrollo de software (React, TypeScript, Java, Python) y en ciencia de datos me permite entender cómo se construye lo que pruebo y comunicarme con los desarrolladores en su mismo lenguaje.',
    ],
    specialties: [
      'Pruebas funcionales, exploratorias y de regresión',
      'Pruebas de APIs REST (Postman, Swagger)',
      'Automatización E2E y de API con Playwright y TypeScript (proyectos propios)',
      'Gestión de defectos con Azure DevOps y metodologías ágiles (Scrum)',
      'Desarrollo frontend con React y TypeScript',
    ],
    automationLabIntro:
      'Proyectos propios de automatización de pruebas, con código, pipeline de CI y reporte de resultados públicos.',
    sectionOrder: [
      'hero',
      'about',
      'skills',
      'experience',
      'automation-lab',
      'education',
      'certifications',
      'projects',
      'languages',
      'contact',
    ],
    skillOrder: ['qa-manual', 'qa-automation', 'apis-tools', 'methodologies', 'frontend', 'programming'],
  },
  dev: {
    label: 'Dev',
    name: 'Desarrollador de Software',
    documentTitle: 'Faed Velasco — Desarrollador de Software · React & TypeScript',
    sidebarRole: 'Desarrollador de Software',
    heroRole: 'Desarrollador de Software · React & TypeScript',
    heroIntro:
      'Desarrollo aplicaciones web con React y TypeScript en proyectos propios, como este portafolio y Changarritos, un marketplace universitario cuya versión móvil construyo con React Native. Profesionalmente trabajo como QA Engineer en CONTPAQi (antes Ingeniero de Pruebas en IBM), así que escribo código pensando en cómo se va a probar.',
    primaryCta: { label: 'Ver proyectos', href: '#projects' },
    aboutParagraphs: [
      'Desarrollador de software con experiencia construyendo aplicaciones web con React, TypeScript y Next.js en proyectos propios, y programando con Java y Python. Soy Tecnólogo en Desarrollo de Software (CETI) y estudio Ingeniería en Informática (CUCEI).',
      'Mi experiencia profesional es en QA, en CONTPAQi e IBM: pruebas funcionales, de regresión y de APIs dentro de equipos ágiles. Eso me da una ventaja real al desarrollar: pienso en cómo se probará el código y en los casos límite desde el diseño, y también automatizo pruebas con Playwright.',
    ],
    specialties: [
      'Desarrollo frontend con React y TypeScript',
      'Programación con Java, Python y SQL',
      'Diseño y consumo de APIs REST',
      'Aplicaciones móviles con React Native (proyecto en curso)',
      'Calidad desde el diseño: pruebas y automatización con Playwright',
    ],
    automationLabIntro:
      'También automatizo pruebas. Estos son proyectos propios con código, pipeline de CI y reporte de resultados públicos.',
    sectionOrder: [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'automation-lab',
      'education',
      'certifications',
      'languages',
      'contact',
    ],
    skillOrder: ['frontend', 'programming', 'apis-tools', 'methodologies', 'qa-automation', 'qa-manual'],
  },
}

/** "/dev" -> dev, "/qa" -> qa, anything else -> the default profile. */
export function profileFromPath(pathname: string): Profile {
  const segment = pathname.replace(/\/+$/, '').split('/').pop()
  return segment === 'dev' || segment === 'qa' ? segment : defaultProfile
}

export function pathForProfile(profile: Profile): string {
  return `/${profile}`
}
