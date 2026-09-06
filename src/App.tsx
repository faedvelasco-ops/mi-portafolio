import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Education from './components/Education/Education'
import Certifications from './components/Certifications/Certifications'
import Projects from './components/Projects/Projects'
import Changarritos from './components/Changarritos/Changarritos'
import AutomationLab from './components/AutomationLab/AutomationLab'
import Languages from './components/Languages/Languages'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

type ProjectDetailId = 'changarritos'

function App() {
  const [activeDetail, setActiveDetail] = useState<ProjectDetailId | null>(null)
  const shouldReduceMotion = useReducedMotion()
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

  return (
    <>
      <Header onNavigateHome={activeDetail ? () => setActiveDetail(null) : undefined} />
      <div className="app-content">
        <AnimatePresence mode="wait">
          {activeDetail === 'changarritos' ? (
            <motion.main key="changarritos" {...transitionProps}>
              <Changarritos onBack={() => setActiveDetail(null)} />
            </motion.main>
          ) : (
            <motion.main key="home" {...transitionProps}>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Education />
              <Certifications />
              <Projects onOpenDetail={() => setActiveDetail('changarritos')} />
              <AutomationLab />
              <Languages />
              <Contact />
            </motion.main>
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

export default App
