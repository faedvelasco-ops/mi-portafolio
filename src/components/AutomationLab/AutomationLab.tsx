import './AutomationLab.css'

function AutomationLab() {
  return (
    <section
      id="automation-lab"
      className="section automation-lab"
      aria-labelledby="automation-lab-heading"
    >
      <div className="container">
        <h2 className="section__heading" id="automation-lab-heading">
          Automation Lab
        </h2>
        {/* TODO: proyectos de automatización pendientes de confirmar (Objetivo 11) */}
        <div className="automation-lab__list">
          <article className="card">
            <h3>TODO: Nombre del proyecto de automatización</h3>
            <p>TODO: framework, lenguaje, casos automatizados</p>
            <a className="btn btn--secondary" href="#">
              TODO: Repositorio
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

export default AutomationLab
