import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    loading: false
  }
}

const startLoading = (state) => {
  return {
    ...state,
    loading: true
  }
}

const stopLoading = (state) => {
  return {
    ...state,
    loading: false
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return startLoading(state, action)
    case actionTypes.STOP_LOADING:
      return stopLoading(state, action)
    default:
      return state
  }
}

export default reducer
