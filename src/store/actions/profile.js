import { stopSubmit, startSubmit } from 'redux-form'
import * as actionTypes from './actionTypes'
import ProfileAPI from '@/api/ProfileAPI'
import { push } from 'connected-react-router'

const uploadFormName = 'UploadForm'

export const saveUserProfile = (data) => {
  return {
    type: actionTypes.SAVE_USER_PROFILE,
    ...data
  }
}

export const uploadAvatar = () => {
  return async (dispatch, getState) => {
    const formData = { ...getState().form.UploadForm.values }
    dispatch(startSubmit(uploadFormName))
    try {
      let response = await ProfileAPI.uploadAvatar(formData)
      let updatedUser = response.data
      dispatch(saveUserProfile(updatedUser))
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
      dispatch(saveUserProfile(profile))
    } catch (e) {
      console.log(e)
    }
  }
}
