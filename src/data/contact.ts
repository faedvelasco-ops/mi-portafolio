export interface ContactLink {
  id: string
  label: string
  href?: string
}

export const contactLinks: ContactLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/faedvelasco-ops' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/faed-velasco' },
  { id: 'email', label: 'Correo', href: 'mailto:faed.velasco@gmail.com' },
]
