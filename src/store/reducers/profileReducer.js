import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    user: {},
    uploadAvatar: false
  }
}

const saveUserProfile = (state, action) => {
  return {
    ...state,
    user: action.profile
  }
}

const openUploadAvatarDialog = (state/*, action*/) => {
  return {
    ...state,
    uploadAvatar: true
  }
}

const closeUploadAvatarDialog = (state/*, action*/) => {
  return {
    ...state,
    uploadAvatar: false
  }
}

const reducer = (state = initializeState(), action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_PROFILE:
      return saveUserProfile(state, action)
    case actionTypes.OPEN_UPLOAD_AVATAR_DIALOG:
      return openUploadAvatarDialog(state, action)
    case actionTypes.CLOSE_UPLOAD_AVATAR_DIALOG:
      return closeUploadAvatarDialog(state, action)
    default:
      return state
  }
}

export default reducer
