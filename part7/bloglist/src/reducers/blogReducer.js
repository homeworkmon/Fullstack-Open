import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { setNotifError, removeNotif } from './notifReducer'


export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const blogObject = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: blogObject
    })
  }
}

export const updateLikes = (newBlog) => {
  return async dispatch => {
    const blogObject = await blogService.update(newBlog.id, newBlog)
    dispatch({
      type: 'UPDATE_LIKES',
      data: blogObject
    })
  }
}

export const removeBlog = (blog) => {
  const navigate = useNavigate()
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch({
        type: 'DELETE',
        data: blog
      })
      navigate('/blogs')
    } catch(error) {
      if (error.response) {
        dispatch(setNotifError((error.response.data.error)))
        setTimeout(() => {
          dispatch(removeNotif())
        }, 5000)
      }
    }
  }
}

export const addComment = (blog) => {
  return async dispatch => {
    const blogObject = await blogService.addComment(blog.id, blog)
    dispatch({
      type: 'UPDATE_COMMENT',
      data: blogObject
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE':
    return [...state.concat(action.data)]
  case 'UPDATE_LIKES':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'UPDATE_COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'DELETE':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export default blogReducer