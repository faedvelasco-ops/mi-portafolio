import type { ProjectDetailData } from '../types/project'

export const changarritos: ProjectDetailData = {
  id: 'changarritos',
  name: 'Changarritos',
  tagline: 'Encuentra, compra y vende dentro de la universidad.',
  problem:
    'Los estudiantes universitarios no contaban con una plataforma centralizada para encontrar, comprar y vender productos y servicios (comida, bebidas, servicios) dentro de su propia universidad.',
  solution:
    'Una plataforma web tipo marketplace orientada a estudiantes universitarios, que conecta a clientes y vendedores dentro del entorno universitario.',
  features: [
    'Funcionalidades para clientes y vendedores.',
    'Administración de productos.',
    'Diseño e implementación de lógica de negocio y gestión de información.',
  ],
  technologies: ['WordPress'],
  upcomingTechnologies: ['React Native'],
  qaStrategy:
    'Validación funcional de las funcionalidades desde una perspectiva de QA.',
  status: 'En producción (web) — versión nativa en desarrollo',
  liveUrl: 'https://changarritosapp.com/',
}
