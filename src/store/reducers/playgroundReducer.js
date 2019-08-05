import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    pieces: null,
    isStarted: false,
    activePiece: null,
    moves: 0,
    timer: 0
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

const selectPiece = (state, action) => {
  return {
    ...state,
    activePiece: action.piece
  }
}

const incTimer = (state) => {
  return {
    ...state,
    timer: state.timer + 1
  }
}

const swapPieces = (state, { index1, index2 }) => {
  const swapped = state.pieces.slice()
  const item1 = swapped[index1]
  const item2 = swapped[index2]
  swapped.splice(index1, 1, item2)
  swapped.splice(index2, 1, item1)
  return {
    ...state,
    activePiece: null,
    pieces: swapped,
    moves: state.moves + 1
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.START_GAME:
      return startGame(state, action)
    case actionTypes.SET_PUZZLE_TO_PLAYGROUND:
      return setPuzzle(state, action)
    case actionTypes.CLEAR_PLAYGROUND:
      return initializeState()
    case actionTypes.SELECT_PG_PIECE:
      return selectPiece(state, action)
    case actionTypes.SWAP_PG_PIECES:
      return swapPieces(state, action)
    case actionTypes.INC_PG_TIMER:
      return incTimer(state, action)
    default:
      return state
  }
}

export default reducer
