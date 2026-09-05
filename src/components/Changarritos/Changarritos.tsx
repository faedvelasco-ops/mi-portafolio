import changarritosFlyer from '../../assets/changarritos-flyer.jpeg'
import ProjectDetail from '../ProjectDetail/ProjectDetail'
import { changarritos } from '../../data/changarritos'

function Changarritos() {
  return (
    <section
      id="changarritos"
      className="section section--alt changarritos"
      aria-labelledby="changarritos-heading"
    >
      <div className="container">
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
