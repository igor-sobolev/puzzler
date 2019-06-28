import axios from 'axios'
import properties from '@/properties'

const { SERVER_URL } = properties

export default axios.create({
  baseURL: SERVER_URL
})