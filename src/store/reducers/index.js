import { combineReducers } from 'redux'
import authReducer from '@/store/reducers/authReducer'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'

export default (history) => {
  return combineReducers({
    auth: authReducer,
    form: formReducer,
    router: connectRouter(history)
  })
}
