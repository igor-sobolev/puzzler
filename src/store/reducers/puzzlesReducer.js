import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    puzzles: [],
    puzzle: null
  }
}

const savePuzzles = (state, action) => {
  return {
    ...state,
    puzzles: action.puzzles
  }
}

const savePuzzle = (state, action) => {
  return {
    ...state,
    puzzle: action.puzzle
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_PUZZLES:
      return savePuzzles(state, action)
    case actionTypes.SAVE_PUZZLE:
      return savePuzzle(state, action)
    default:
      return state
  }
}

export default reducer
