/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import './index.css'
// components
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import UserPage from './components/UserPage'
import BlogView from './components/BlogView'
// import Nav from './components/Nav'
// reducers
import { initBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { getAllAuthors } from './reducers/authorReducer'
// services
import blogService from './services/blogs'

// <Redirect /> from react-router-dom v6 no longer exists and redirects are done on server

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

const App = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1))
  const user = useSelector(state => state.user)
  const authors = useSelector(state => state.authors)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllAuthors())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5
  }

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

  if(!user){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/">blogs</Link>
        {user.username} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <h2>blog app</h2>

      <Notification />

      <Toggle buttonLabel="create new">
        <CreateForm />
      </Toggle>

      <Routes>
        <Route path="/users/:id" element={<UserPage authors={authors} />}>
        </Route>
        <Route path="/users" element={<UserList />}>
        </Route>
        <Route path="/blogs/:id" element={<BlogView blog={blog}/>}>
        </Route>
        <Route path="/" element={<Blogs blogs={blogs}/>}>
        </Route>
      </Routes>
    </div>
  )
}

export default App