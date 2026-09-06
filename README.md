# Portafolio Profesional — Faed Velasco

Portafolio web y CV interactivo de **Faed Velasco**, Ingeniero QA enfocado en aseguramiento de calidad, pruebas funcionales/exploratorias/de regresión, testing de APIs y automatización de pruebas (Playwright, en desarrollo activo).

Este proyecto nació como una actividad académica de introducción a HTML5, y evolucionó hacia un portafolio profesional real construido con React y TypeScript, manteniendo HTML semántico como base.

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Características](#características)
- [Proyectos incluidos](#proyectos-incluidos)
- [Arquitectura](#arquitectura)
- [Decisiones técnicas](#decisiones-técnicas)
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
- Diseño responsive mobile-first (sidebar colapsa a barra superior en mobile/tablet).
- Accesibilidad: `alt` descriptivos, jerarquía de headings correcta, estados `focus-visible`, textos de enlace descriptivos, soporte de `prefers-reduced-motion` en todas las animaciones.
- SEO básico: metadatos reales (`title`, `description`, Open Graph, Twitter Card), favicon.
- CV descargable en PDF real (`/cv.pdf`), sincronizado con el documento fuente.
- Vista de detalle de proyecto (Changarritos) como "página" separada dentro de la misma SPA (sin router, con estado de React) — ver [Decisiones técnicas](#decisiones-técnicas).

## Proyectos incluidos

### Changarritos

Marketplace universitario (WordPress) para encontrar, comprar y vender productos y servicios dentro de la universidad. En producción: [changarritosapp.com](https://changarritosapp.com/). Versión nativa (React Native) en desarrollo.

### Automation Lab

Sección reservada para evidencia práctica de QA Automation con Playwright (E2E) sobre Changarritos Web. **Pendiente** — bloqueado actualmente porque el entorno de desarrollo no tiene acceso de red saliente al dominio en producción; se retomará cuando se resuelva ese acceso.

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
│   ├── Languages/
│   ├── Contact/
│   ├── Footer/
│   ├── Reveal/         (wrapper de scroll-reveal con framer-motion)
│   └── icons/           (iconos de marca no disponibles en lucide-react)
├── data/               # Datos tipados por sección (experience.ts, skills.ts, projects.ts, etc.)
├── hooks/              # useActiveSection (scroll-spy)
├── types/              # Interfaces compartidas (ProjectDetailData)
├── styles/             # variables.css (tokens) + base.css (reset y utilidades globales)
├── assets/             # Imágenes propias del sitio
├── App.tsx
└── main.tsx
```

Cada sección del PRD/roadmap académico corresponde a un componente independiente, con datos separados en `src/data/` cuando aplica, siguiendo el patrón: **componente de presentación + datos tipados**.

## Decisiones técnicas

- **Sin router (react-router-dom)**: con un solo proyecto que requiere vista de detalle (Changarritos), se optó por manejar la navegación entre "Inicio" y "Detalle" con estado de React (`useState` en `App.tsx`) en vez de agregar una dependencia de enrutamiento. Limitación aceptada: no hay URL propia para el detalle ni soporte nativo del botón "atrás" del navegador.
- **Sin CMS/backend**: todo el contenido vive en archivos TypeScript tipados dentro de `src/data/`, versionados junto al código. No hay base de datos ni API propia.
- **Iconos de marca (GitHub/LinkedIn) manuales**: la versión de `lucide-react` usada eliminó los iconos de marca por licenciamiento; se reintrodujeron como SVG propios en `src/components/icons/brand-icons.tsx`.
- **Tema oscuro solo en el sidebar**: contraste intencional (sidebar oscuro fijo / contenido claro) en vez de un modo oscuro global, que queda como posible mejora futura (P2).

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
```

## Testing

Validación manual realizada durante el desarrollo: navegación y anclas, enlaces externos, descarga de CV, responsive (desktop/tablet/mobile vía revisión de CSS), accesibilidad (jerarquía de headings, alt text, foco, `prefers-reduced-motion`), y `npm run build`/`lint` en cada cambio.

No se instalaron frameworks de testing automatizado (Vitest/Jest/Playwright/Cypress) para el sitio en sí, evaluando que el proyecto es mayormente contenido estático sin lógica de negocio compleja que justifique pruebas unitarias por ahora. Playwright se usará específicamente para automatizar y evidenciar pruebas E2E reales sobre Changarritos Web en la sección Automation Lab (pendiente, ver arriba).

## Deployment

Desplegado en **Vercel** (auto-detecta Vite: build `npm run build`, output `dist`), conectado al repositorio de GitHub — cada push a `main` despliega automáticamente.

- Repositorio: [github.com/faedvelasco-ops/mi-portafolio](https://github.com/faedvelasco-ops/mi-portafolio)
- URL de producción: [mi-portafolio-black-nu.vercel.app](https://mi-portafolio-black-nu.vercel.app/)
