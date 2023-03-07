import api from './api'

const getDepartamentos = async () => {
  const resp = await api.get('/departamentos')

  return resp
}

export const getDepartamentoById = async ({ idDepartamento }) => {
  const resp = await api.get(`/departamentos/${idDepartamento}`)

  return resp
}

export const insertDepartamento = async ({ nome, sigla }) => {
  const resp = await api.post('/departamentos', { nome, sigla })

  return resp
}

export const deleteDepartamento = async ({ idDepartamento }) => {
  const resp = await api.delete(`/departamento/${idDepartamento}`)

  return resp
}

export const updateDepartamento = async ({ idDepartamento, nome, sigla }) => {
  const resp = await api.put(`/departamento/${idDepartamento}`, { nome, sigla })

  return resp
}

export default getDepartamentos