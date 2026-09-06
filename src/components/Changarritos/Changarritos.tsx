import changarritosFlyer from '../../assets/changarritos-flyer.jpeg'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import { changarritos } from '../../data/changarritos'
import './Changarritos.css'

interface ChangarritosProps {
  onBack: () => void
}

function Changarritos({ onBack }: ChangarritosProps) {
  return (
    <section
      id="changarritos"
      className="section section--alt changarritos"
      aria-labelledby="changarritos-heading"
    >
      <div className="container">
        <button type="button" className="btn btn--secondary changarritos__back" onClick={onBack}>
          ← Volver al inicio
        </button>
        <h2 className="section__heading" id="changarritos-heading">
          {changarritos.name}
        </h2>
        <ProjectDetail
          data={changarritos}
          image={changarritosFlyer}
          imageAlt="Flyer promocional de Changarritos App"
        />
      </div>
    </section>
  )
}

export default Changarritos
