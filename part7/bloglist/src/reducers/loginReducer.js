export const logoutUser = () => {
  return {
    type: 'REMOVE_USER'
  }
}

export const loginUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export default loginReducer