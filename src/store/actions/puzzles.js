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

export const loadAllPuzzles = () => {
  return async (dispatch) => {
    try {
      let response = await PuzzlesAPI.loadAllPuzzles()
      let puzzles = response.data
      dispatch(savePuzzles({ puzzles }))
    } catch (e) {
      console.log(e)
    }
  }
}
