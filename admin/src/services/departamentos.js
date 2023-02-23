import api from './api'

const headers = {
  'Authorization': 'Bearer API-1606024'
}

const getDepartamentos = async () => {
  const resp = await api.get('/departamentos', { headers })

  return resp
}

export default getDepartamentos