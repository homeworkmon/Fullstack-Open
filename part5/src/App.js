import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createNew = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setIsError(false)
    } catch (exception){
      setErrorMessage('There was an issue')
      setIsError(true)
    }
    setTimeout(() => {
      setErrorMessage(null)
      setIsError(null)
    }, 5000)
  }

  const update = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      const updatedBlogs = blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog)
      setBlogs(updatedBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
    } catch (exception) {
      setErrorMessage(exception)
      setIsError(true)
    }
    setTimeout(() => {
      setErrorMessage(null)
      setIsError(null)
    }, 5000)
  }

  const removeBlog = async (blog) => {
    if (window.confirm('Do you really want to delete this blog?')) {
      try {
        const response = await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        console.log(response)
      } catch (exception) {
        setErrorMessage('you do not have valid credentials to delete blog')
        setIsError(true)
        setTimeout(() => {
          setErrorMessage(null)
          setIsError(null)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} isError={isError}/>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>

      <h2>blogs</h2>

      <div>{user.username} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <br></br>

      <Notification message={errorMessage} isError={isError}/>

      <Toggle buttonLabel="create new">
        <CreateForm createNew={createNew}/>
      </Toggle>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} update={update} remove={removeBlog}/>
        )}
      </div>

    </div>
  )
}

export default App