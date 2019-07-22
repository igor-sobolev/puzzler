import { stopSubmit, startSubmit } from 'redux-form'

import * as actionTypes from './actionTypes'
import ProfileAPI from '@/api/ProfileAPI'
import toastService from '@/services/toastService'

import { EDIT_USER_FORM_NAME, UPLOAD_FORM_NAME } from '@/enum/forms.enum'

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

export const startEditProfile = () => {
  return {
    type: actionTypes.START_EDIT_PROFILE
  }
}

export const endEditProfile = () => {
  return {
    type: actionTypes.END_EDIT_PROFILE
  }
}

export const uploadAvatar = (id) => {
  return async (dispatch, getState) => {
    const formData = new FormData()
    getState().form.UploadForm.values.files.forEach(file => {
      formData.append('files', file)
    })
    dispatch(startSubmit(UPLOAD_FORM_NAME))
    try {
      await ProfileAPI.uploadAvatar(id, formData)
      dispatch(closeUploadAvatarDialog())
      toastService.success('Successfuly uploaded avatar')
      dispatch(loadUserProfile(id))
    } finally {
      dispatch(stopSubmit(UPLOAD_FORM_NAME))
    }
  }
}

export const updateUserProfile = () => {
  return async (dispatch, getState) => {
    const formData = getState().form[EDIT_USER_FORM_NAME].values
    dispatch(startSubmit(EDIT_USER_FORM_NAME))
    try {
      await ProfileAPI.updateUserProfile(formData._id, formData)
      toastService.success('Successfuly updated profile')
      dispatch(loadUserProfile(formData._id))
      dispatch(endEditProfile())
    } finally {
      dispatch(stopSubmit(EDIT_USER_FORM_NAME))
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
