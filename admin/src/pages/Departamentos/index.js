import React from 'react'
import { Link } from 'react-router-dom'
import getDepartamentos from '../../services/departamentos'

const Departamentos = () => {

  const loadDepartamentos = async () => {
    const result = await getDepartamentos()
    console.log(result)
  }
  loadDepartamentos()


  return (
    <>
      <div className="row">
        <div className="col-9">
          <h3>Listar Departamentos</h3>
        </div>
        <div className="col-3 text-end">
          
          <Link 
            className="btn btn-secondary"
            to='/departamentos/new'
          >
            <i className="bi bi-plus"/> Novo
          </Link>

        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className="col-6">Nome</th>
            <th className="col-3">Sigla</th>
            <th className="col-3">Ação</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          <tr>
            <td>Contabilidade</td>
            <td>Contab.</td>
            <td>
              <button type="button" className="btn btn-outline-warning me-3">
                <i className="bi bi-pencil"/> Editar
              </button>
              <button type="button" className="btn btn-outline-danger">
                <i className="bi bi-trash"/> Excluir
              </button>
            </td>
          </tr>

          <tr>
            <td>Recursos Humanos</td>
            <td>RH</td>
            <td>
              <button type="button" className="btn btn-outline-warning me-3">
                <i className="bi bi-pencil"/> Editar
              </button>
              <button type="button" className="btn btn-outline-danger">
                <i className="bi bi-trash"/> Excluir
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </>
  )
}
  

export default Departamentos