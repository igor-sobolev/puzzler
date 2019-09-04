import * as types from './actionTypes'
import PuzzlesAPI from '@/api/PuzzlesAPI'
import isNumber from 'lodash/isNumber'
import { Timer } from '../../util/timer'

let gameTimer = null

const saveStarted = () => {
  return {
    type: types.START_GAME
  }
}

const saveFinished = () => {
  return {
    type: types.FINISH_GAME
  }
}

const saveTime = (time) => {
  return {
    type: types.SAVE_GAME_TIME,
    time
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
      if (response.data.solved) dispatch(finishGame())
    } else {
      dispatch(select(piece))
    }
  }
}

export const startGame = (puzzle) => {
  return async (dispatch) => {
    gameTimer = new Timer(() => dispatch(saveTime(gameTimer.ticks)))
    gameTimer.start()
    dispatch(saveStarted())
    dispatch(setPuzzle(puzzle))
  }
}

export const finishGame = () => {
  return async (dispatch, getState) => {
    dispatch(saveFinished())
    gameTimer.stop()
    let puzzle = getState().puzzles.puzzle
    let moves = getState().playground.moves
    let time = getState().playground.time
    await PuzzlesAPI.saveSolution(puzzle._id, { time, moves })
  }
}

export const stopGame = () => {
  return async (dispatch) => {
    dispatch(clearPlayground())
    gameTimer.stop()
  }
}
