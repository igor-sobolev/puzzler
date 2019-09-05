import * as actionTypes from './actionTypes'
import PuzzlesAPI from '@/api/PuzzlesAPI'

import { startLoading, stopLoading } from './shared'

const saveLeaders = (data) => {
  return {
    type: actionTypes.SAVE_LEADERS,
    ...data
  }
}

export const loadLeaders = (id) => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      let response = await PuzzlesAPI.loadPuzzleLeaders(id)
      let leaders = response.data
      dispatch(saveLeaders({ leaders }))
    } finally {
      dispatch(stopLoading())
    }
  }
}
