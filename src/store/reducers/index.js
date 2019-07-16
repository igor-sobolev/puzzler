import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'

import authReducer from '@/store/reducers/authReducer'
import profileReducer from '@/store/reducers/profileReducer'

export default (history) => {
  return combineReducers({
    auth: authReducer,
    profile: profileReducer,
    form: formReducer,
    router: connectRouter(history)
  })
}
