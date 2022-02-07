import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { setNotifNeutral, removeNotif } from '../reducers/notifReducer'

const CreateForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    dispatch(createNew(newBlog))
    dispatch(setNotifNeutral(`a new blog ${newBlog.title} by ${newBlog.author} created`))
    setTimeout(() => {
      dispatch(removeNotif())
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
    title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
    author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
    url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create-new">create</button>
      </form>
    </div>
  )
}

export default CreateForm