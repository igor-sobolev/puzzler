import * as actionTypes from '../actions/actionTypes'
import cloneDeep from 'lodash/cloneDeep'

const initializeState = () => {
  return {
    pieces: null,
    isStarted: false,
    activePiece: null,
    moves: 0,
    isSolved: false,
    timer: 0
  }
}

const startGame = (state) => {
  return {
    ...state,
    isStarted: true
  }
}

const finishGame = (state) => {
  return {
    ...state,
    isStarted: false,
    isSolved: true
  }
}

const saveTimer = (state, { time }) => {
  return {
    ...state,
    timer: time
  }
}

const setPuzzle = (state, { puzzle }) => {
  return {
    ...state,
    pieces: cloneDeep(puzzle.piecesToSolve)
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
  const tmp = item1.order // temporarily save order
  item1.order = item2.order
  item2.order = tmp
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
    case actionTypes.FINISH_GAME:
      return finishGame(state, action)
    case actionTypes.SAVE_GAME_TIME:
      return saveTimer(state, action)
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
