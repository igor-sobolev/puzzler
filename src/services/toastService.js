import ToastServive from 'react-material-toast'
import config from '@/properties'

const { TOAST_TIME } = config

const toast = ToastServive.new({
  place: 'topRight',
  duration: TOAST_TIME,
  maxCount: 5
})

export default toast
