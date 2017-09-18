import axios from 'axios'
import store from '../store'

axios.interceptors.request.use(cfg => {
  if (store.getters.isAuthenticated) {
    const auth = store.getters.getAuth
    // cfg.headers.Authorization = `${auth.token_type} ${auth.access_token}`
    // TODO set jwt token header
  }
  return cfg
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => res, err => {
  // TODO clean store when logged out
})

export default axios
