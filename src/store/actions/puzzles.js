// import { stopSubmit, startSubmit } from 'redux-form' TODO: remove

import * as actionTypes from './actionTypes'
import * as puzzleSteps from '@/enum/puzzleSteps.enum'
import { UPLOAD_FORM_NAME, PUZZLE_FORM_NAME } from '@/enum/forms.enum'

import PuzzlesAPI from '@/api/PuzzlesAPI'

import toastService from '@/services/toastService'

import { startLoading, stopLoading } from '@/store/actions'

const savePuzzleImageToModel = ({ base64, file }) => {
  return {
    type: actionTypes.SAVE_PUZZLE_IMAGE_TO_MODEL,
    image: base64,
    file
  }
}

const savePuzzleOptionsToModel = (data) => {
  return {
    type: actionTypes.SAVE_PUZZLE_OPTIONS_TO_MODEL,
    ...data
  }
}

const savePuzzles = (data) => {
  return {
    type: actionTypes.SAVE_PUZZLES,
    ...data
  }
}

const saveCreated = (data) => {
  return {
    type: actionTypes.SAVE_CREATED_PUZZLE,
    data
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

const prevStep = () => {
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
  console.log('edit', puzzle)
}

export const deletePuzzle = (puzzle) => {
  console.log('delete', puzzle)
}

const fetchPuzzleImage = async (dispatch, getState) => {
  try {
    let puzzle = getState().puzzles.processedPuzzle
    if (!puzzle._id) {
      const [file] = getState().form[UPLOAD_FORM_NAME].values.files
      dispatch(savePuzzleImageToModel({ file }))
    }
    dispatch(nextStep())
  } catch (e) {
    console.log(e)
    toastService.error('Failed to load image')
  }
}

const saveOptionsAndUpdatePuzzle = async (dispatch, getState) => {
  dispatch(savePuzzleOptionsToModel({ options: getState().form[PUZZLE_FORM_NAME].values }))
  dispatch(createOrUpdatePuzzle())
}

const saveOptionsAndGoBack = async (dispatch, getState) => {
  dispatch(savePuzzleOptionsToModel({ options: getState().form[PUZZLE_FORM_NAME].values }))
  dispatch(prevStep())
}

const createOrUpdatePuzzle = () => {
  return async (dispatch, getState) => {
    try {
      let processedPuzzle = getState().puzzles.processedPuzzle
      const { file, ...data } = processedPuzzle
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(data))
      dispatch(startLoading())
      let response = processedPuzzle._id
        ? await PuzzlesAPI.updatePuzzle(processedPuzzle._id, formData)
        : await PuzzlesAPI.createPuzzle(formData)
      dispatch(saveCreated(response.data))
      dispatch(nextStep())
    } finally {
      dispatch(stopLoading())
    }
  }
}

export const nextPuzzleStep = (currentStep) => {
  return async (dispatch, getState) => {
    switch (currentStep) {
      case puzzleSteps.SELECT_PICTURE:
        return await fetchPuzzleImage(dispatch, getState)
      case puzzleSteps.PUZZLE_OPTIONS:
        return await saveOptionsAndUpdatePuzzle(dispatch, getState)
      case puzzleSteps.PIECES_PLACEMENT:
        return // await updatePuzzlePlacement(dispatch, getState)
      default:
        throw new Error('Bad step')
    }
  }
}

export const prevPuzzleStep = (currentStep) => {
  return async (dispatch, getState) => {
    switch (currentStep) {
      case puzzleSteps.SELECT_PICTURE:
        return
      case puzzleSteps.PUZZLE_OPTIONS:
        return await saveOptionsAndGoBack(dispatch, getState)
      case puzzleSteps.PIECES_PLACEMENT:
        return dispatch(prevStep())
      default:
        throw new Error('Bad step')
    }
  }
}

export const selectPiece = (index) => {
  console.log(index);
}
