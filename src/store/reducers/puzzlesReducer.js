import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    puzzles: []
  }
}

const savePuzzles = (state, action) => {
  return {
    ...state,
    puzzles: action.puzzles
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_PUZZLES:
      return savePuzzles(state, action)
    default:
      return state
  }
}

export default reducer
