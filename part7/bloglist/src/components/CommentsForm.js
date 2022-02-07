import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentsForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const createComment = (event) => {
    event.preventDefault()
    const newBlog = {
      likes: blog.likes,
      comments: blog.comments.concat(comment),
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id
    }
    dispatch(addComment(newBlog))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={createComment}>
        <div>
          <input
            id="comment"
            type="text"
            name="comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  )
}

export default CommentsForm