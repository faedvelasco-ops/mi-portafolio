import { languages } from '../../data/languages'
import './Languages.css'

function Languages() {
  return (
    <section
      id="languages"
      className="section section--alt languages"
      aria-labelledby="languages-heading"
    >
      <div className="container">
        <h2 className="section__heading" id="languages-heading">
          Idiomas
        </h2>
        <div className="languages__table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">Idioma</th>
                <th scope="col">Nivel</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((entry) => (
                <tr key={entry.language}>
                  <td>{entry.language}</td>
                  <td>{entry.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Languages
