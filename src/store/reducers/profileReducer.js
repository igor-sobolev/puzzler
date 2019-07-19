import * as actionTypes from '../actions/actionTypes'

const initializeState = () => {
  return {
    user: {},
    uploadAvatar: false,
    editProfile: false
  }
}

const saveUserProfile = (state, action) => {
  return {
    ...state,
    user: action.profile
  }
}

const openUploadAvatarDialog = (state /*, action*/) => {
  return {
    ...state,
    uploadAvatar: true
  }
}

const closeUploadAvatarDialog = (state /*, action*/) => {
  return {
    ...state,
    uploadAvatar: false
  }
}

const startEditProfile = (state /*, action*/) => {
  return {
    ...state,
    editProfile: true
  }
}

const endEditProfile = (state /*, action*/) => {
  return {
    ...state,
    editProfile: false
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
    case actionTypes.START_EDIT_PROFILE:
      return startEditProfile(state, action)
    case actionTypes.END_EDIT_PROFILE:
      return endEditProfile(state, action)
    default:
      return state
  }
}

export default reducer
