import axios from './axiosInstance'

class AuthAPI {
  static logIn (payload) {
    return axios.post('/users/authenticate', payload)
  }
}

export default AuthAPI