import { stopSubmit, startSubmit } from 'redux-form'
import * as actionTypes from './actionTypes'
import AuthAPI from '@/api/AuthAPI'

const loginFormName = 'LoginForm'

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
    const { remember, ...formData } = getState().form.LoginForm.values
    dispatch(startSubmit(loginFormName))
    try {
      let response = await AuthAPI.logIn(formData)
      let authenticatedUser = response.data
      dispatch(saveUser({ authenticatedUser, remember }))
    } finally {
      dispatch(stopSubmit(loginFormName))
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    // potential api call
    dispatch(clearSession())
  }
}
