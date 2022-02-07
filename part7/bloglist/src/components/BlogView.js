import React from 'react'
import { useDispatch } from 'react-redux'
import { updateLikes, removeBlog } from '../reducers/blogReducer'
import CommentsForm from './CommentsForm'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  const addLike = () => {
    blog.likes = blog.likes+1
    const blogObject = { ...blog }
    dispatch(updateLikes(blogObject))
  }

  const deleteBlog = (blog) => {
    dispatch(removeBlog(blog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <br></br>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={addLike} id="like-button">like</button>
      </div>
      <div>added by {blog.author}</div>
      <br></br>
      <h3>comments</h3>
      <CommentsForm blog={blog}/>
      <ul>
        {blog.comments.map(c => <li key={blog.comments.indexOf(c)}>{c}</li>)}
      </ul>
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </div>
  )
}

export default BlogView