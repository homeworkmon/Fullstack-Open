import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_GENRE } from '../queries'
import Genres from './Genres'

const Books = (props) => {
  const [queryByGenre, result] = useLazyQuery(BOOKS_GENRE)
  const [initBooks, setInitBooks] = useState([])
  const [books, setBooks] = useState([])
  const [filtered, setFiltered] = useState(false)
  const unique = (value, index, self) => self.indexOf(value) === index
  const genres = props.books.flatMap(b => b.genres).filter(unique)

  const filter = (genre) => {
    queryByGenre({ variables: { genre: genre }})
    setFiltered(true)
  }

  useEffect(() => {
    setInitBooks(props.books)
  }, [props.books])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    } 
  }, [result.data])
  
  if (!props.show) {
    return null
  } if (props.books.length < 1) {
    return <div>loading...</div>
  } else {
    const b = filtered ? books : initBooks
    return (
      <div>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {b.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <Genres genres={genres} filter={filter}/>
      </div>
    )
  }
}


export default Books