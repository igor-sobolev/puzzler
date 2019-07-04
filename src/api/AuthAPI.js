import axios from './axiosInstance'

class AuthAPI {
  static logIn (payload) {
    return axios.post('/users/authenticate', payload)
  }

  static register (payload) {
    return axios.post('/users/register', payload)
  }
}

export default AuthAPI