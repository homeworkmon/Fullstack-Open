import authorService from '../services/authors'

export const getAllAuthors = () => {
  return async dispatch => {
    const authors = await authorService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: authors
    })
  }
}

export const selectAuthor = (id) => {
  return {
    type: 'SET_SINGLE_USER',
    id
  }
}

const authorReducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  case 'SET_SINGLE_USER':
    return state.map(user => user.id === action.id)
  default:
    return state
  }
}

export default authorReducer