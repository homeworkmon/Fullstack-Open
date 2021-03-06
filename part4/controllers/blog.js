const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { name: 1, username: 1 })
    response.json(blogs)
  })
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if (!user) { response.status(404).json({ error: 'no corresponding blog found'})}
    else if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(blog._id)
      return response.status(204).end()
    } else if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'no permission to delete blog'})
    }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

blogRouter.put('/:id/comments', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogRouter