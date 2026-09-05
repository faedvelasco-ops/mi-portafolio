export interface Certification {
  id: string
  name: string
  issuer?: string
}

export const certifications: Certification[] = [
  { id: 'diplomado-ia', name: 'Diplomado en IA' },
  { id: 'cybersecurity', name: 'Introduction to Cybersecurity', issuer: 'Cisco' },
  { id: 'iot', name: 'Introduction to IoT', issuer: 'Cisco' },
]
