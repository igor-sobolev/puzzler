// import { stopSubmit, startSubmit } from 'redux-form' TODO: remove

import * as actionTypes from './actionTypes'
import * as puzzleSteps from '@/enum/puzzleSteps.enum'
import PuzzlesAPI from '@/api/PuzzlesAPI'

import { readAsBase64 } from '@/util/files'
import { UPLOAD_FORM_NAME } from '@/enum/forms.enum'
import toastService from '@/services/toastService'

const savePuzzleImageToModel = (base64) => {
  return {
    type: actionTypes.SAVE_PUZZLE_IMAGE_TO_MODEL,
    image: base64
  }
}

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

const nextStep = () => {
  return {
    type: actionTypes.NEXT_PUZZLE_STEP
  }
}

export const prevPuzzleStep = () => {
  return {
    type: actionTypes.PREV_PUZZLE_STEP
  }
}

export const clearPuzzleStep = () => {
  return {
    type: actionTypes.CLEAR_PUZZLE_STEP
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



const fetchPuzzleImage = async (dispatch, getState) => {
  try {
    const [file] = getState().form[UPLOAD_FORM_NAME].values.files
    let base64 = await readAsBase64(file)
    dispatch(savePuzzleImageToModel(base64))
    dispatch(nextStep())
  } catch (e) {
    console.log(e)
    toastService.error('Failed to load image')
  }
}

export const nextPuzzleStep = (currentStep) => {
  return async (dispatch, getState) => {
    switch (currentStep) {
      case puzzleSteps.SELECT_PICTURE:
        return await fetchPuzzleImage(dispatch, getState)
      default:
        throw new Error('Bad step')
    }
  }
}
