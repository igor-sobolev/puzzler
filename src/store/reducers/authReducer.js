import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  let user = null
  try {
    user = JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    localStorage.clear()
  }
  return {
    user
  }
}

const saveUser = (state, action) => {
  const newState = {
    ...state,
    user: action.authenticatedUser
  }
  if (action.remember) localStorage.setItem('user', JSON.stringify(action.authenticatedUser))
  return newState
}

const clearSession = () => {
  localStorage.clear()
  const newState = initializeState()
  return newState
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return saveUser(state, action)
    case actionTypes.CLEAR_SESSION:
      return clearSession(state)
    default:
      return state
  }
}

export default reducer
