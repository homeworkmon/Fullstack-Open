import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// services
import loginService from '../services/login'
import blogService from '../services/blogs'
// reducers
import { setNotifError, removeNotif } from '../reducers/notifReducer'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
    } catch(error) {
      if(error.response) {
        dispatch(setNotifError(error.response.data.error))
        setTimeout(() => {
          dispatch(removeNotif())
        }, 5000)
      }
    }
  }

  return (
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
  )
}

export default LoginForm