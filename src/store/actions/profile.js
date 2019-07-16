import { stopSubmit, startSubmit } from 'redux-form'
import * as actionTypes from './actionTypes'
import ProfileAPI from '@/api/ProfileAPI'
// import { push } from 'connected-react-router'

const uploadFormName = 'UploadForm'

const saveUserProfile = (data) => {
  return {
    type: actionTypes.SAVE_USER_PROFILE,
    ...data
  }
}

export const uploadAvatar = (id) => {
  return async (dispatch, getState) => {
    const formData = new FormData()
    getState().form.UploadForm.values.files.forEach(file => {
      formData.append('files', file)
    })
    dispatch(startSubmit(uploadFormName))
    try {
      let response = await ProfileAPI.uploadAvatar(id, formData)
      let profile = response.data
      // dispatch(saveUserProfile({ profile }))
    } finally {
      dispatch(stopSubmit(uploadFormName))
    }
  }
}

export const loadUserProfile = (id) => {
  return async (dispatch) => {
    try {
      let response = await ProfileAPI.loadUserProfile(id)
      let profile = response.data
      dispatch(saveUserProfile({ profile }))
    } catch (e) {
      console.log(e)
    }
  }
}
