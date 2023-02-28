import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import getDepartamentos from '../../services/departamentos'


const Row = ({ depto }) => {
  return (
    <tr key={depto.id_departamento}>
      <td>{depto.nome}</td>
      <td>{depto.sigla}</td>
      <td>
        <button type="button" className="btn btn-outline-warning me-3">
          <i className="bi bi-pencil"/> Editar
        </button>
        <button type="button" className="btn btn-outline-danger">
          <i className="bi bi-trash"/> Excluir
        </button>
      </td>
    </tr>
  )
}

Row.propTypes = {
  depto: PropTypes.any
}

const Departamentos = () => {

  const [departamentos, setDepartamentos] = useState()
  const [mensagem, setMensagem] = useState('Loading...')

  const loadDepartamentos = async () => {
    try {
      const result = await getDepartamentos()
      setDepartamentos(result.data)
    } catch (e) {
      setMensagem(`Erro na API - ${e}`)
    }
  }

  useEffect(() => {
    if (!departamentos) {
      loadDepartamentos()
    }
  }, [departamentos])

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
      {!departamentos &&
        <div className='alert alert-dark'>{mensagem}</div>
      }


      {departamentos &&
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="col-6">Nome</th>
              <th className="col-3">Sigla</th>
              <th className="col-3">Ação</th>
            </tr>
          </thead>
          <tbody className="align-middle">

            {departamentos && departamentos.map(d => {
              return (
                <Row key={d.id_departamento} depto={d}/>
              )
            })}
          </tbody>
        </table>
      }
    </>
  )
}


export default Departamentos