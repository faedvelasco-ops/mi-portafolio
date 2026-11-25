import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import AutomationLab from './components/AutomationLab/AutomationLab'
import Education from './components/Education/Education'
import Certifications from './components/Certifications/Certifications'
import Projects from './components/Projects/Projects'
import Changarritos from './components/Changarritos/Changarritos'
import Languages from './components/Languages/Languages'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ProfileSwitch from './components/ProfileSwitch/ProfileSwitch'
import ProfileNotice from './components/ProfileNotice/ProfileNotice'
import { useProfile } from './profile/ProfileContext'
import type { SectionId } from './profile/profiles'

type ProjectDetailId = 'changarritos'

function App() {
  const [activeDetail, setActiveDetail] = useState<ProjectDetailId | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { content } = useProfile()
  const transitionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.25, ease: 'easeOut' as const },
      }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeDetail])

  const renderSection = (id: SectionId) => {
    switch (id) {
      case 'hero':
        return <Hero key={id} />
      case 'about':
        return <About key={id} />
      case 'skills':
        return <Skills key={id} />
      case 'experience':
        return <Experience key={id} />
      case 'automation-lab':
        return <AutomationLab key={id} />
      case 'projects':
        return <Projects key={id} onOpenDetail={() => setActiveDetail('changarritos')} />
      case 'education':
        return <Education key={id} />
      case 'certifications':
        return <Certifications key={id} />
      case 'languages':
        return <Languages key={id} />
      case 'contact':
        return <Contact key={id} />
    }
  }

  return (
    <>
      <Header onNavigateHome={activeDetail ? () => setActiveDetail(null) : undefined} />
      <ProfileSwitch className="profile-switch--floating" />
      <ProfileNotice />
      <div className="app-content">
        <AnimatePresence mode="wait">
          {activeDetail === 'changarritos' ? (
            <motion.main key="changarritos" {...transitionProps}>
              <Changarritos onBack={() => setActiveDetail(null)} />
            </motion.main>
          ) : (
            <motion.main key="home" className="home" {...transitionProps}>
              {content.sectionOrder.map((id) => renderSection(id))}
            </motion.main>
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

export default App
