import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'

import authReducer from '@/store/reducers/authReducer'
import profileReducer from '@/store/reducers/profileReducer'
import puzzlesReducer from '@/store/reducers/puzzlesReducer'

export default (history) => {
  return combineReducers({
    auth: authReducer,
    profile: profileReducer,
    puzzles: puzzlesReducer,
    form: formReducer,
    router: connectRouter(history)
  })
}
