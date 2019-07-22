import { stopSubmit, startSubmit } from 'redux-form'
import * as actionTypes from './actionTypes'
import AuthAPI from '@/api/AuthAPI'
import { push } from 'connected-react-router'
import toastService from '@/services/toastService'

import { LOGIN_FORM_NAME, REGISTER_FORM_NAME } from '@/enum/forms.enum'

export const saveUser = (data) => {
  return {
    type: actionTypes.SAVE_USER,
    ...data
  }
}

export const clearSession = () => {
  return {
    type: actionTypes.CLEAR_SESSION
  }
}

export const logIn = () => {
  return async (dispatch, getState) => {
    const { remember, ...formData } = getState().form[LOGIN_FORM_NAME].values
    dispatch(startSubmit(LOGIN_FORM_NAME))
    try {
      let response = await AuthAPI.logIn(formData)
      let authenticatedUser = response.data
      dispatch(saveUser({ authenticatedUser, remember }))
      dispatch(push('/puzzles'))
    } finally {
      dispatch(stopSubmit(LOGIN_FORM_NAME))
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    // potential api call
    dispatch(clearSession())
  }
}

export const register = () => {
  return async (dispatch, getState) => {
    const { password2, ...formData } = getState().form[REGISTER_FORM_NAME].values
    dispatch(startSubmit(REGISTER_FORM_NAME))
    try {
      await AuthAPI.register(formData)
      toastService.success('Successfuly registered')
      dispatch(push('/login'))
    } finally {
      dispatch(stopSubmit(REGISTER_FORM_NAME))
    }
  }
}
