# Portafolio Profesional — Faed Velasco

[![E2E Tests](https://github.com/faedvelasco-ops/mi-portafolio/actions/workflows/e2e.yml/badge.svg)](https://github.com/faedvelasco-ops/mi-portafolio/actions/workflows/e2e.yml)

Portafolio web y CV interactivo de **Faed Velasco**, QA Engineer enfocado en aseguramiento de calidad, pruebas funcionales/exploratorias/de regresión y testing de APIs, con proyectos propios de automatización E2E y de API con Playwright y TypeScript. El sitio tiene dos perfiles, **QA** y **Dev**, que se eligen por URL o con un switch, para enviar a cada vacante el enlace que corresponde.

Este proyecto nació como una actividad académica de introducción a HTML5, y evolucionó hacia un portafolio profesional real construido con React y TypeScript, manteniendo HTML semántico como base.

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Características](#características)
- [Perfiles QA y Dev](#perfiles-qa-y-dev)
- [Proyectos incluidos](#proyectos-incluidos)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Testing](#testing)
- [Deployment](#deployment)

## Stack tecnológico

- **React 19** + **TypeScript** — componentes tipados, sin `any` salvo justificación explícita.
- **Vite** — build tool y dev server.
- **ESLint** (flat config) — `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
- **CSS3** puro — sin frameworks de UI (sin Tailwind/Bootstrap/Material UI). Sistema de diseño propio basado en custom properties (`src/styles/variables.css`).
- **lucide-react** — iconos SVG tree-shakeable.
- **framer-motion** — animaciones de scroll-reveal y transiciones de vista.

No se utilizan frameworks de componentes ni generadores de UI: cada sección es un componente React propio con su HTML semántico y CSS dedicado.

## Características

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`, tabla para idiomas).
- Sidebar de navegación fija (desktop) con resaltado activo por scroll-spy (`IntersectionObserver` nativo, sin librerías).
- Diseño responsive mobile-first (sidebar colapsa a un menú deslizante en mobile/tablet).
- Accesibilidad: `alt` descriptivos, jerarquía de headings correcta, estados `focus-visible`, textos de enlace descriptivos, soporte de `prefers-reduced-motion` en todas las animaciones.
- SEO básico: metadatos reales (`title`, `description`, Open Graph, Twitter Card), favicon.
- CV descargable en PDF real (`/cv.pdf`), sincronizado con el documento fuente.
- Sección Automation Lab con enlaces al repositorio, al reporte HTML en vivo y a las ejecuciones de CI del proyecto de automatización.
- Vista de detalle de proyecto (Changarritos) como "página" separada dentro de la misma SPA (sin router, con estado de React).
- Formulario de contacto real (Web3Forms + hCaptcha), sin backend propio.
- Menú móvil como panel deslizante activado por un avatar fijo en la esquina superior.

## Perfiles QA y Dev

| URL | Perfil | Enfoque |
| --- | --- | --- |
| `/` o `/qa` | QA Engineer | Hero de QA, habilidades de QA primero, Automation Lab antes de Proyectos |
| `/dev` | Desarrollador de Software | Hero de desarrollo, habilidades de desarrollo primero, Proyectos antes de Experiencia |

- **La URL manda**: cada CV puede enlazar directo a su perfil, y los botones atrás/adelante del navegador funcionan (`history.pushState` + `popstate`). `vercel.json` reescribe `/qa` y `/dev` a la SPA.
- **Switch "QA | Dev"** accesible (botones con `aria-pressed`, operable con teclado y foco visible): arriba del menú lateral en escritorio y flotante en móvil.
- **Aviso de primera visita** pequeño y descartable (no un modal), guardado en `localStorage`.
- **Color por perfil**: QA usa verde azulado (`#0f766e`) y Dev violeta (`#6d28d9`), ambos con contraste WCAG AA sobre blanco, y variantes claras sobre el menú oscuro. El cambio de color se anima con `@property` y se desactiva con `prefers-reduced-motion`.
- **Contenido compartido**: experiencia, educación, certificaciones, idiomas y contacto son iguales en ambos perfiles. La experiencia profesional es de QA en los dos; el perfil Dev presenta el desarrollo como proyectos propios.
- El texto de cada perfil vive en `src/profile/profiles.ts`.
- **Limitación conocida**: `document.title` cambia por perfil, pero las metaetiquetas (`description`, Open Graph, Twitter Card) son estáticas en una SPA y están orientadas a QA. Una vista previa de `/dev` en LinkedIn o WhatsApp muestra el texto de QA.

## Proyectos incluidos

### Changarritos

Marketplace universitario (WordPress) para encontrar, comprar y vender productos y servicios dentro de la universidad. La versión web ya no está en producción; se conserva como video de referencia dentro del portafolio. Versión nativa (React Native) en desarrollo, también documentada en video.

### Portafolio profesional

Este mismo sitio, listado como proyecto: React 19 + TypeScript + Vite, perfiles por URL y pruebas E2E con Playwright en GitHub Actions.

### Automation Lab

Sección visible después de Experiencia (y en la navegación) con evidencia práctica de QA Automation. Los datos viven en `src/data/automationLab.ts`.

- **[playwright-qa-automation](https://github.com/faedvelasco-ops/playwright-qa-automation)**: suite de Playwright + TypeScript con 45 pruebas por ejecución: E2E sobre SauceDemo en Chromium, Firefox y WebKit, y pruebas de API sobre Restful Booker. Usa Page Object Model, fixtures propios y validación de esquemas con zod. Corre en GitHub Actions en cada push y publica el [reporte HTML en vivo](https://faedvelasco-ops.github.io/playwright-qa-automation/).

## Arquitectura

```text
src/
├── components/       # Un componente por sección, con su .tsx + .css co-localizado
│   ├── Header/        (sidebar de navegación)
│   ├── Hero/
│   ├── About/
│   ├── Skills/
│   ├── Experience/
│   ├── Education/
│   ├── Certifications/
│   ├── Projects/
│   ├── ProjectDetail/  (componente reutilizable para vistas de detalle de proyecto)
│   ├── Changarritos/
│   ├── AutomationLab/
│   ├── ProfileSwitch/  (switch QA | Dev)
│   ├── ProfileNotice/  (aviso de primera visita)
│   ├── Languages/
│   ├── Contact/
│   ├── Footer/
│   ├── Reveal/         (wrapper de scroll-reveal con framer-motion)
│   └── icons/           (iconos de marca no disponibles en lucide-react)
├── data/               # Datos tipados por sección (experience.ts, skills.ts, projects.ts, etc.)
├── hooks/              # useActiveSection (scroll-spy)
├── profile/            # Perfiles QA/Dev: contenido, contexto y sincronización con la URL
├── types/              # Interfaces compartidas (ProjectDetailData)
├── styles/             # variables.css (tokens) + base.css (reset y utilidades globales)
├── assets/             # Imágenes propias del sitio
├── App.tsx
└── main.tsx
e2e/                    # Pruebas E2E con Playwright (page object, fixtures, specs)
```

Cada sección del PRD/roadmap académico corresponde a un componente independiente, con datos separados en `src/data/` cuando aplica, siguiendo el patrón: **componente de presentación + datos tipados**.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev       # servidor de desarrollo con HMR
npm run lint       # ESLint
npm run build      # type-check (tsc -b) + build de producción a dist/
npm run preview    # sirve el build de producción localmente
npm run test:e2e   # build + pruebas E2E con Playwright
npm run test:e2e:report  # abre el último reporte HTML
```

## Testing

Pruebas E2E con **Playwright** (`e2e/`) contra el build de producción, en Chrome de escritorio y en un Pixel 7 emulado. Corren en GitHub Actions en cada push y pull request, junto con lint y build, y suben el reporte HTML como artefacto.

Cubren:

- `/`, `/qa` y `/dev` cargan el perfil correcto (atributo `data-profile`, título, hero, switch y color de acento).
- El switch cambia URL, título, contenido y color, y es operable con teclado.
- Atrás y adelante del navegador restauran el perfil.
- Cada perfil ordena sus secciones como se espera.
- El aviso de primera visita ofrece el otro perfil y no vuelve a aparecer después de cerrarlo.
- No hay errores de consola en ninguno de los perfiles. El único que se ignora es el aviso "localhost detected" de hCaptcha, que solo ocurre en local.

Para instalar el navegador la primera vez: `npx playwright install chromium`.

La validación de contenido y responsive sigue siendo manual. La automatización más amplia vive en un repositorio aparte ([playwright-qa-automation](https://github.com/faedvelasco-ops/playwright-qa-automation)), enlazado desde la sección Automation Lab.

## Deployment

Desplegado en **Vercel** (auto-detecta Vite: build `npm run build`, output `dist`), conectado al repositorio de GitHub — cada push a `main` despliega automáticamente. `vercel.json` reescribe `/qa` y `/dev` a `index.html`.

- Repositorio: [github.com/faedvelasco-ops/mi-portafolio](https://github.com/faedvelasco-ops/mi-portafolio)
- URL de producción: [mi-portafolio-black-nu.vercel.app](https://mi-portafolio-black-nu.vercel.app/)
