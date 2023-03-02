import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import getDepartamentos, { deleteDepartamento } from '../../services/departamentos'

const Row = ({ depto, callback, callbackErro, callbackSucesso }) => {

  return (
    <tr key={depto.id_departamento}>
      <td>{depto.nome}</td>
      <td>{depto.sigla}</td>
      <td>
        <button type="button" className="btn btn-outline-warning me-3">
          <i className="bi bi-pencil"/> Editar
        </button>
        <button 
          type="button" 
          className="btn btn-outline-danger"
          onClick={async () => {

            // Limpa as mensagens antes!
            callbackErro()
            callbackSucesso()

            try {
              await deleteDepartamento({
                idDepartamento: depto.id_departamento
              })
              callbackSucesso('Departamento removido com sucesso.')
            } catch (e) {
              console.log('Excessao', e.response.data.code)

              if (e.response.data.code === 'ER_ROW_IS_REFERENCED_2') {
                // tem funcionarios ligados ao depto!
                callbackErro('Departamento possui funcionários vinculados!')
              } else {
                // erro generico
                callbackErro('Falha ao excluir o departamento, tente novamente!')
              }
            }
            
            // O ideal seria recarregar a listagem de departamentos no state
            callback()

          }}
        >
          <i className="bi bi-trash"/> Excluir 
        </button>
      </td>
    </tr>
  )
}

Row.propTypes = {
  depto: PropTypes.any,
  callback: PropTypes.func.isRequired,
  callbackErro: PropTypes.func.isRequired,
  callbackSucesso: PropTypes.func.isRequired
}

const Departamentos = () => {

  const [departamentos, setDepartamentos] = useState()
  const [mensagem, setMensagem] = useState('Loading...')
  const [erro ,setErro] = useState()
  const [sucesso, setSucesso] = useState()

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

      {erro &&
        <div className='alert alert-danger mt-3 alert-dismissible fade show'>
          {erro}
          <button 
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
      }

      {sucesso &&
        <div className='alert alert-success mt-3 alert-dismissible fade show'>
          {sucesso}
          <button 
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"></button>
        </div>
      }

      {!departamentos &&
        <div className='alert alert-dark mt-3'>{mensagem}</div>
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
                <Row 
                  key={d.id_departamento} 
                  depto={d}
                  callback={loadDepartamentos}
                  callbackErro={setErro}
                  callbackSucesso={setSucesso}
                />
              )
            })}
          </tbody>
        </table>
      }
    </>
  )
}


export default Departamentos