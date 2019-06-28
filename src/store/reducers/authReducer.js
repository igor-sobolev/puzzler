// import * as actionTypes from '../actions/actionTypes'

const initialState = {}

const addIngredient = (/*state, action*/) => {
  // do something
  return 'updatedState'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'actionTypes.ADD_INGREDIENT':
      return addIngredient(state, action)
    default:
      return state
  }
}

export default reducer
