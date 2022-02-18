import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  const [books, setBooks] = useState([])
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState('authors')
  
  const showWhenLoggedIn= { display: token ? '' : 'none'}

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} style={showWhenLoggedIn}>add book</button>
        <button onClick={() => setPage('recommendations')} style={showWhenLoggedIn}>recommend</button>
        <button onClick={token ? () => logout() : () => setPage('login')}>{token ? 'logout' : 'login'}</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'} books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />

      <Recommendations 
        show={page === 'recommendations'} books={books}
      />

    </div>
  )
}

export default App