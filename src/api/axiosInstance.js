import axios from 'axios'
import properties from '@/properties'
import store from '@/store'
import toastService from '@/services/toastService'

const { SERVER_URL } = properties

const instance = axios.create({
  baseURL: SERVER_URL
})

const authHandler = (config) => {
  const user = store.getState().auth.user
  const token = user ? user.token : null
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: 'Bearer ' + token
    }
  }
  return Promise.resolve(newConfig)
}

const errorHandler = (error) => {
  if (error.response.status !== 401) {
    let message =
      error && error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Something went wrong!'
    toastService.error(message)
  }
  return Promise.reject(error)
}

const authErrorHandler = (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login'
    toastService.error('The session is over')
  }
  return Promise.reject(error)
}

instance.interceptors.request.use(authHandler)
instance.interceptors.response.use(null, errorHandler)
instance.interceptors.response.use(null, authErrorHandler)

export default instance
