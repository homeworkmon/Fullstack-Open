import React from 'react'
import { useParams } from 'react-router-dom'

const UserPage = ({ authors }) => {
  const id = useParams().id
  const author = authors.find(a => a.id === id)

  if (!author) {
    return null
  }

  return (
    <div>
      <h2>{author.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {author.blogs.map(blog => <li key={blog.id}> {blog.title} </li>) }
      </ul>
    </div>
  )
}

export default UserPage