import { combineReducers } from 'redux'
import authReducer from '@/store/reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer
})

export default rootReducer