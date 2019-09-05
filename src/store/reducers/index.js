import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'

import authReducer from './authReducer'
import profileReducer from './profileReducer'
import puzzlesReducer from './puzzlesReducer'
import sharedReducer from './sharedReducer'
import playgroundReducer from './playgroundReducer'
import leaderboardReducer from './leaderboardReducer'

export default (history) => {
  return combineReducers({
    auth: authReducer,
    profile: profileReducer,
    puzzles: puzzlesReducer,
    shared: sharedReducer,
    playground: playgroundReducer,
    leaderboard: leaderboardReducer,
    form: formReducer,
    router: connectRouter(history)
  })
}
