import api from './api'

const getDepartamentos = async () => {
  const resp = await api.get('/departamentos')

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

export default getDepartamentos