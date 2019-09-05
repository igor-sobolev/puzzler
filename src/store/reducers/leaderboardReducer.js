import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    leaders: []
  }
}

const saveLeaders = (state, action) => {
  return {
    ...state,
    leaders: action.leaders
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_LEADERS:
      return saveLeaders(state, action)
    default:
      return state
  }
}

export default reducer
