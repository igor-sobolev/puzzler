// import * as actionTypes from './actionTypes'
import AuthAPI from '@/api/AuthAPI'
// import q from 'q'

export const addIngredient = (name) => {
  return {
    type: 'actionTypes.ADD_INGREDIENT',
    ingredientName: name
  }
}

export const logIn = () => {
  return async (dispatch, getState) => {
    const { remember, ...formData } = getState().form.LoginForm.values
    // const deferred = q.defer()
    try {
      let response = await AuthAPI.logIn(formData)
      let authenticatedUser = response.data
      console.log(authenticatedUser)
      // deferred.resolve()
    } catch (e) {
      let error = await e
      console.log(error)
      // deferred.reject()
    }
    // dispatch(addIngredient)
    // return deferred.promise
  }
}
