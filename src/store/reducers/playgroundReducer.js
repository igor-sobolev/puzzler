import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    pieces: null,
    isStarted: false
  }
}

const startGame = (state) => {
  return {
    ...state,
    isStarted: true
  }
}

const setPuzzle = (state, { puzzle }) => {
  return {
    ...state,
    pieces: [...puzzle.piecesToSolve]
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.START_GAME:
      return startGame(state, action)
    case actionTypes.SET_PUZZLE_TO_PLAYGROUND:
      return setPuzzle(state, action)
    default:
      return state
  }
}

export default reducer
