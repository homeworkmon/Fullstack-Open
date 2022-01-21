import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, remove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonText = visible ? 'hide' : 'view'

  const addLike = () => {
    blog.likes = blog.likes+1
    const blogObject = { ...blog }
    update(blogObject)
  }

  return (
    <div style={blogStyle} className='container'>

      {blog.title}
      <button onClick={() => setVisible(!visible)} className='detail-button'>{buttonText}</button>

      <div style={showWhenVisible} className='details'>
        {blog.url}
        <div id="likes">
        likes: {blog.likes}
          <button onClick={addLike} id="like-button">like</button>
        </div>
        {blog.author}
        <button onClick={() => remove(blog)}>remove</button>
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog : PropTypes.object.isRequired,
  update : PropTypes.func.isRequired,
  remove : PropTypes.func.isRequired
}

export default Blog