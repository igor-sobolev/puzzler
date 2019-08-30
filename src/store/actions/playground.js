import * as types from './actionTypes'
import PuzzlesAPI from '@/api/PuzzlesAPI'
import isNumber from 'lodash/isNumber'

const saveStarted = () => {
  return {
    type: types.START_GAME
  }
}

const setPuzzle = (puzzle) => {
  return {
    type: types.SET_PUZZLE_TO_PLAYGROUND,
    puzzle
  }
}

const select = (piece) => {
  return {
    type: types.SELECT_PG_PIECE,
    piece
  }
}

const swapPieces = (index1, index2) => {
  return {
    type: types.SWAP_PG_PIECES,
    index1,
    index2
  }
}

export const incTimer = () => {
  return {
    type: types.INC_PG_TIMER
  }
}

export const clearPlayground = () => {
  return {
    type: types.CLEAR_PLAYGROUND
  }
}

export const selectGamePiece = (piece) => {
  return async (dispatch, getState) => {
    let puzzle = getState().puzzles.puzzle
    let solution = getState().playground.pieces
    let active = getState().playground.activePiece
    if (isNumber(active)) {
      dispatch(swapPieces(active, piece))
      let response = await PuzzlesAPI.checkSolution(puzzle._id, solution)
      if (response.data.solved) alert('YRA')
    } else {
      dispatch(select(piece))
    }
  }
}

export const startGame = (puzzle) => {
  return async (dispatch) => {
    dispatch(saveStarted())
    dispatch(setPuzzle(puzzle))
  }
}
