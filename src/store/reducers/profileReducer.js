import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    user: {}
  }
}

const saveUserProfile = (state, action) => {
  const newState = {
    ...state,
    user: action.profile
  }
  return newState
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_PROFILE:
      return saveUserProfile(state, action)
    default:
      return state
  }
}

export default reducer
