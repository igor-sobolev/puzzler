import * as actionTypes from '../actions/actionTypes'
import { SELECT_PICTURE, PUZZLE_OPTIONS, PIECES_PLACEMENT } from '@/enum/puzzleSteps.enum'

const initializeState = () => {
  return {
    puzzles: [],
    puzzle: null,
    puzzleStepActive: 0,
    puzzleSteps: [SELECT_PICTURE, PUZZLE_OPTIONS, PIECES_PLACEMENT],
    newPuzzle: {}
  }
}

const clearStep = (state) => {
  return {
    ...state,
    puzzleStepActive: 0
  }
}

const nextStep = (state) => {
  return {
    ...state,
    puzzleStepActive:
      state.puzzleStepActive < state.puzzleSteps.length
        ? state.puzzleStepActive + 1
        : state.puzzleStepActive
  }
}

const prevStep = (state) => {
  return {
    ...state,
    puzzleStepActive:
      state.puzzleStepActive > 0 ? state.puzzleStepActive - 1 : state.puzzleStepActive
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

const saveImage = (state, action) => {
  return {
    ...state,
    newPuzzle: {
      ...state.newPuzzle,
      image: action.image,
      file: action.file
    }
  }
}

const saveOptions = (state, action) => {
  return {
    ...state,
    newPuzzle: {
      ...state.newPuzzle,
      ...action.options
    }
  }
}

const saveCreated = (state, action) => {
  return {
    ...state,
    newPuzzle: {
      ...state.newPuzzle,
      ...action.data
    }
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
    case actionTypes.NEXT_PUZZLE_STEP:
      return nextStep(state)
    case actionTypes.PREV_PUZZLE_STEP:
      return prevStep(state)
    case actionTypes.CLEAR_PUZZLE_STEP:
      return clearStep(state)
    case actionTypes.SAVE_PUZZLE_IMAGE_TO_MODEL:
      return saveImage(state, action)
    case actionTypes.SAVE_PUZZLE_OPTIONS_TO_MODEL:
      return saveOptions(state, action)
    case actionTypes.SAVE_CREATED_PUZZLE:
        return saveCreated(state, action)
    default:
      return state
  }
}

export default reducer
