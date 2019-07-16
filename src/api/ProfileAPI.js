import axios from './axiosInstance'

class ProfileAPI {
  static uploadAvatar (id, payload) {
    return axios.put(`/users/${id}/avatar`, payload, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  }

  static loadUserProfile (id) {
    return axios.get(`/users/${id}`)
  }
}

export default ProfileAPI
