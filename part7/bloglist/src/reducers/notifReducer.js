export const setNotifError = (message) => {
  return {
    type: 'SET_NOTIF_ERROR',
    message
  }
}

export const setNotifNeutral = (message) => {
  return{
    type: 'SET_NOTIF_NEUTRAL',
    message
  }
}

export const removeNotif = () => ({ type: 'REMOVE' })

const notifReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_NOTIF_ERROR':
    return { message: action.message, isError: true }
  case 'SET_NOTIF_NEUTRAL':
    return { message: action.message, isError: false }
  case 'REMOVE':
    return null
  default:
    return state
  }
}

export default notifReducer