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

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Changarritos />
        <AutomationLab />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
