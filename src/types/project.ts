export interface ProjectDetailData {
  id: string
  name: string
  tagline?: string
  overview?: string
  problem: string
  solution: string
  features: string[]
  technologies: string[]
  upcomingTechnologies?: string[]
  qaStrategy?: string
  status: string
  liveUrl?: string
  githubUrl?: string
  testsUrl?: string
}
