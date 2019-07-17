import { stopSubmit, startSubmit } from 'redux-form'

import * as actionTypes from './actionTypes'
import ProfileAPI from '@/api/ProfileAPI'

const uploadFormName = 'UploadForm'

const saveUserProfile = (data) => {
  return {
    type: actionTypes.SAVE_USER_PROFILE,
    ...data
  }
}

export const openUploadAvatarDialog = () => {
  return {
    type: actionTypes.OPEN_UPLOAD_AVATAR_DIALOG
  }
}

export const closeUploadAvatarDialog = () => {
  return {
    type: actionTypes.CLOSE_UPLOAD_AVATAR_DIALOG
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
      await ProfileAPI.uploadAvatar(id, formData)
      dispatch(closeUploadAvatarDialog())
      dispatch(loadUserProfile(id))
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
