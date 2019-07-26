// import { stopSubmit, startSubmit } from 'redux-form' TODO: remove

import * as actionTypes from './actionTypes'
import PuzzlesAPI from '@/api/PuzzlesAPI'
// import toastService from '@/services/toastService' TODO: remove

const savePuzzles = (data) => {
  return {
    type: actionTypes.SAVE_PUZZLES,
    ...data
  }
}

const clearPuzzles = () => {
  return {
    type: actionTypes.CLEAR_PUZZLES
  }
}

const savePuzzle = (data) => {
  return {
    type: actionTypes.SAVE_PUZZLE,
    ...data
  }
}

const clearPuzzle = () => {
  return {
    type: actionTypes.CLEAR_PUZZLE
  }
}

export const loadAllPuzzles = () => {
  return async (dispatch) => {
    try {
      dispatch(clearPuzzles())
      let response = await PuzzlesAPI.loadAllPuzzles()
      let puzzles = response.data
      dispatch(savePuzzles({ puzzles }))
    } catch (e) {
      console.log(e)
    }
  }
}

export const loadAllUserPuzzles = () => {
  return async (dispatch) => {
    try {
      dispatch(clearPuzzles())
      let response = await PuzzlesAPI.loadAllUserPuzzles()
      let puzzles = response.data
      dispatch(savePuzzles({ puzzles }))
    } catch (e) {
      console.log(e)
    }
  }
}

export const loadPuzzleById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(clearPuzzle())
      let response = await PuzzlesAPI.loadPuzzleById(id)
      let puzzle = response.data
      dispatch(savePuzzle({ puzzle }))
    } catch (e) {
      console.log(e)
    }
  }
}

export const voteForPuzzle = ({ puzzleId, rating }) => {
  return async () => {
    try {
      await PuzzlesAPI.voteForPuzzle(puzzleId, rating)
    } catch (e) {
      console.log(e)
    }
  }
}

export const editPuzzle = (puzzle) => {
  console.log('edit')
}

export const deletePuzzle = (puzzle) => {
  console.log('delete')
}
