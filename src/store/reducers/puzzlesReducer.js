import * as actionTypes from '../actions/actionTypes'
import { SELECT_PICTURE, PUZZLE_OPTIONS, PIECES_PLACEMENT } from '@/enum/puzzleSteps.enum'

const initializeState = () => {
  return {
    puzzles: [],
    puzzle: null,
    puzzleStepActive: 0,
    puzzleSteps: [SELECT_PICTURE, PUZZLE_OPTIONS, PIECES_PLACEMENT],
    processedPuzzle: {}
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

const clearProcessedPuzzle = (state) => {
  return {
    ...state,
    processedPuzzle: {}
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
    processedPuzzle: {
      ...state.processedPuzzle,
      image: action.image,
      file: action.file
    }
  }
}

const saveOptions = (state, action) => {
  return {
    ...state,
    processedPuzzle: {
      ...state.processedPuzzle,
      ...action.options
    }
  }
}

const saveCreated = (state, action) => {
  return {
    ...state,
    processedPuzzle: {
      ...state.processedPuzzle,
      ...action.data
    }
  }
}

const saveSelectedPiece = (state, action) => {
  return {
    ...state,
    processedPuzzle: {
      ...state.processedPuzzle,
      currentPiece: action.index
    }
  }
}

const swapPieces = (state, { index1, index2 }) => {
  const swapped = state.processedPuzzle.piecesToSolve.slice()
  const item1 = swapped[index1]
  const item2 = swapped[index2]
  const tmp = item1.order // temporarily save order
  item1.order = item2.order
  item2.order = tmp
  swapped.splice(index1, 1, item2)
  swapped.splice(index2, 1, item1)
  return {
    ...state,
    processedPuzzle: {
      ...state.processedPuzzle,
      piecesToSolve: swapped,
      currentPiece: null
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
    case actionTypes.CLEAR_PROCESSED_PUZZLE:
      return clearProcessedPuzzle(state)
    case actionTypes.SAVE_PUZZLE_IMAGE_TO_MODEL:
      return saveImage(state, action)
    case actionTypes.SAVE_PUZZLE_OPTIONS_TO_MODEL:
      return saveOptions(state, action)
    case actionTypes.SAVE_CREATED_PUZZLE:
      return saveCreated(state, action)
    case actionTypes.SAVE_SELECTED_PIECE:
      return saveSelectedPiece(state, action)
    case actionTypes.SWAP_PIECES:
      return swapPieces(state, action)
    default:
      return state
  }
}

export default reducer
