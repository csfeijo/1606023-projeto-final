import axios from 'axios'

// URL da API
//const baseURL = 'http://localhost:3033'
const baseURL = 'https://1606024-nodejs.vercel.app'

const api = axios.create({
  baseURL
})

export default api