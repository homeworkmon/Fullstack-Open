import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec
    })
  }
}

export const initAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const votes = anecdote.votes
    const newAnecdote = {
      ...anecdote, 
      votes: votes+1
    }
    const receivedAnec = await anecdoteService.updateVotes(newAnecdote)
    dispatch({
      type: 'VOTE',
      data: receivedAnec
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTE': 
      return action.data
    case 'VOTE':
      return state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : action.data
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default : 
    return state
  }
}

export default anecdoteReducer