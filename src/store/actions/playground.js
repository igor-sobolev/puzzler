import * as types from './actionTypes'

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

export const startGame = (puzzle) => {
  return async (dispatch) => {
    dispatch(saveStarted())
    dispatch(setPuzzle(puzzle))
  }
}