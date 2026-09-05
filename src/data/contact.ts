export interface ContactLink {
  id: string
  label: string
  href?: string
}

export const contactLinks: ContactLink[] = [
  { id: 'github', label: 'GitHub' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/faed-velasco' },
  { id: 'email', label: 'Email', href: 'mailto:faed.velasco@gmail.com' },
]
