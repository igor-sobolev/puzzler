import { push } from 'connected-react-router'
import * as actionTypes from './actionTypes'
import * as puzzleSteps from '@/enum/puzzleSteps.enum'
import { UPLOAD_FORM_NAME, PUZZLE_FORM_NAME } from '@/enum/forms.enum'
import isNumber from 'lodash/isNumber'

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
  // or updated
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

const saveSelectedPiece = (index) => {
  return {
    type: actionTypes.SAVE_SELECTED_PIECE,
    index
  }
}

const swapPieces = (index1, index2) => {
  return {
    type: actionTypes.SWAP_PIECES,
    index1,
    index2
  }
}

export const clearProcessedPuzzle = () => {
  return {
    type: actionTypes.CLEAR_PROCESSED_PUZZLE
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
      dispatch(startLoading())
      let response = await PuzzlesAPI.loadAllPuzzles()
      let puzzles = response.data
      dispatch(savePuzzles({ puzzles }))
    } finally {
      dispatch(stopLoading())
    }
  }
}

export const loadAllUserPuzzles = () => {
  return async (dispatch) => {
    try {
      dispatch(clearPuzzles())
      dispatch(startLoading())
      let response = await PuzzlesAPI.loadAllUserPuzzles()
      let puzzles = response.data
      dispatch(savePuzzles({ puzzles }))
    } finally {
      dispatch(stopLoading())
    }
  }
}

export const loadPuzzleById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(clearPuzzle())
      dispatch(startLoading())
      let response = await PuzzlesAPI.loadPuzzleById(id)
      let puzzle = response.data
      dispatch(savePuzzle({ puzzle }))
    } finally {
      dispatch(stopLoading())
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
  return async (dispatch) => {
    dispatch(push(`/puzzles/${puzzle._id}/edit`))
  }
}

export const loadPuzzleToProcess = (puzzleId) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      let response = await PuzzlesAPI.loadPuzzleById(puzzleId)
      let puzzle = response.data
      dispatch(saveCreated(puzzle))
    } finally {
      dispatch(stopLoading())
    }
  }
}

export const deletePuzzle = (puzzle) => {
  return async (dispatch) => {
    try {
      await PuzzlesAPI.deletePuzzle(puzzle._id)
      toastService.success('Puzzle was deleted')
      dispatch(loadAllUserPuzzles())
    } catch (e) {
      console.log(e)
      toastService.error('Failed to delete puzzle')
    }
  }
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
  try {
    dispatch(savePuzzleOptionsToModel({ options: getState().form[PUZZLE_FORM_NAME].values }))
    let processedPuzzle = getState().puzzles.processedPuzzle
    dispatch(startLoading())
    let data = await createOrUpdatePuzzle(processedPuzzle)
    dispatch(saveCreated(data))
    dispatch(nextStep())
  } finally {
    dispatch(stopLoading())
  }
}

const saveOptionsAndGoBack = async (dispatch, getState) => {
  try {
    dispatch(savePuzzleOptionsToModel({ options: getState().form[PUZZLE_FORM_NAME].values }))
    dispatch(prevStep())
  } catch (e) {
    console.log(e)
  }
}

const createOrUpdatePuzzle = async (processedPuzzle) => {
  const { file, ...data } = processedPuzzle
  const formData = new FormData()
  formData.append('file', file)
  formData.append('data', JSON.stringify(data))
  let response = processedPuzzle._id
    ? await PuzzlesAPI.updatePuzzle(processedPuzzle._id, data)
    : await PuzzlesAPI.createPuzzle(formData)
  return response.data
}

const finish = async (dispatch, getState) => {
  try {
    let processedPuzzle = getState().puzzles.processedPuzzle
    dispatch(startLoading())
    await createOrUpdatePuzzle(processedPuzzle)
    toastService.success('Puzzle was saved')
    dispatch(push('/puzzles/my'))
  } finally {
    dispatch(stopLoading())
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
        return await finish(dispatch, getState)
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
  return async (dispatch, getState) => {
    let puzzle = getState().puzzles.processedPuzzle
    if (!isNumber(puzzle.currentPiece)) dispatch(saveSelectedPiece(index))
    else dispatch(swapPieces(index, puzzle.currentPiece))
  }
}
