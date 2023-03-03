import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDepartamento, insertDepartamento, updateDepartamento } from '../../services/departamentos'

const FormDepartamentos = () => {
  const navigate = useNavigate()

  const { idDepartamento } = useParams()
  
  const inputNomeElem = useRef(null)
  const [nome, setNome] = useState('')
  const [nomeErro, setNomeErro] = useState('')

  const inputSiglaElem = useRef(null)
  const [sigla, setSigla] = useState('')
  const [siglaErro, setSiglaErro] = useState('')

  const [msg, setMsg] = useState('')

  const validaForm = async () => {
    // Começa resetando tudo
    setNomeErro('')
    setSiglaErro('')
    setMsg('')

    if (nome === '' && sigla === '') {
      setMsg('Preencha o nome e a sigla')
      inputNomeElem.current.focus()
      setNomeErro('is-invalid')
      setSiglaErro('is-invalid')
      return false
    }
    if (nome === '') {
      setMsg('Preencha o nome')
      inputNomeElem.current.focus()
      setNomeErro('is-invalid')
      return false
    }

    if(sigla === '') {
      setMsg('Preencha a sigla')
      inputSiglaElem.current.focus()
      setSiglaErro('is-invalid')
      return false
    }

    // Vamos chamar a API
    try {
      if (!idDepartamento) {
        await insertDepartamento({
          nome,
          sigla
        })
        navigate('/departamentos')
      } else {
        await updateDepartamento({
          idDepartamento,
          nome,
          sigla
        })
        navigate('/departamentos')
      }      
    } catch (e) {
      if (e.response.data.code === 'ER_DUP_ENTRY') {
        // Registro duplicado
        setMsg('Departamento já existe!')
      } else {
        // Erro generico
        setMsg('Erro interno, tente novamente!')
      }
    }
  }

  const loadDepartamento = async () => {
    const resp = await getDepartamento({ idDepartamento })
    setNome(resp.data[0].nome)
    setSigla(resp.data[0].sigla)
  }
  useEffect(() => {
    if (idDepartamento) {
      loadDepartamento()
    }
  },[])

  return (
    <>
      <div className="row">
        <div className="col">
          <h3>{idDepartamento ? 'Edição' : 'Cadastro'} de Departamento</h3>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-6">
          <input 
            ref={inputNomeElem}
            type="text"
            className={'form-control ' +  nomeErro}
            name="nome"
            placeholder="Nome"
            maxLength="50"
            value={nome}
            onChange={e => {
              setNome(e.target.value)
            }}
          />
        </div>
        <div className="col-3">
          <input 
            ref={inputSiglaElem}
            type="text"
            className={'form-control ' +  siglaErro}
            name="sigla"
            placeholder="Sigla"
            maxLength={10}
            value={sigla}
            onChange={e => {
              setSigla(e.target.value)
            }}
          />
        </div>
        <div className="col-3">
          <button
            type="button"
            className={`btn btn-${idDepartamento ? 'success' : 'primary'}`}
            onClick={validaForm}
          >
            <i className="bi bi-save"/> {idDepartamento ? 'Editar' : 'Salvar'}
          </button>
        </div>
      </div>

      {msg &&
        <div className="row mt-3">
          <div className="col-9">
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-diamond-fill"/> {msg}
            </div>
          </div>
        </div>
      }

    </>
  )


}

export default FormDepartamentos