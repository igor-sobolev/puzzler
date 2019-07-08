import { stopSubmit, startSubmit } from 'redux-form'
import * as actionTypes from './actionTypes'
import AuthAPI from '@/api/AuthAPI'
import { push } from 'connected-react-router'

const loginFormName = 'LoginForm'
const registerFormName = 'RegisterForm'

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
      dispatch(push('/puzzles'))
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

export const register = () => {
  return async (dispatch, getState) => {
    const { password2, ...formData } = getState().form.RegisterForm.values
    dispatch(startSubmit(registerFormName))
    try {
      await AuthAPI.register(formData)
      dispatch(push('/login'))
    } finally {
      dispatch(stopSubmit(registerFormName))
    }
  }
}
