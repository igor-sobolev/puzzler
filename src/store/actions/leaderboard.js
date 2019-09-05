import * as actionTypes from './actionTypes'
import PuzzlesAPI from '@/api/PuzzlesAPI'

const saveLeaders = (data) => {
  return {
    type: actionTypes.SAVE_LEADERS,
    ...data
  }
}

export const loadLeaders = (id) => {
  return async (dispatch) => {
    try {
      let response = await PuzzlesAPI.loadPuzzleLeaders(id)
      let leaders = response.data
      dispatch(saveLeaders({ leaders }))
    } catch (e) {
      console.log(e)
    }
  }
}
