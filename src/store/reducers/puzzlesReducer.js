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

const clearPuzzle = (state) => {
  return {
    ...state,
    puzzle: null
  }
}

const clearPuzzles = (state) => {
  return {
    ...state,
    puzzles: []
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_PUZZLES:
      return savePuzzles(state, action)
    case actionTypes.SAVE_PUZZLE:
      return savePuzzle(state, action)
    case actionTypes.CLEAR_PUZZLE:
      return clearPuzzle(state)
    case actionTypes.CLEAR_PUZZLES:
      return clearPuzzles(state)
    default:
      return state
  }
}

export default reducer
