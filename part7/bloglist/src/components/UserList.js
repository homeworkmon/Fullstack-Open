import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserList = () => {
  const authors = useSelector(state => state.authors)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author =>
            <tr key={author.id}>
              <td>
                <Link to={`/users/${author.id}`}>
                  {author.name}
                </Link>
              </td>
              <td>
                {author.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList