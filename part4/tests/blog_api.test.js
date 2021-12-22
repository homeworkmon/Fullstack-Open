const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token;

beforeEach(async () => {
    await User.deleteMany({})

    const user = {
        name: 'monica',
        username: 'monica',
        password: 'monica'
    }

    const newUser = await api
        .post('/api/users')
        .send(user)
    
    const newLogin = await api 
        .post('/api/login')
        .send(user)
    
    token = newLogin.body.token

    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        const user = await User.findOne({})
        blog.user = user
        let blogObject = new Blog(blog)
        await blogObject.save()
        user.blogs = user.blogs.concat(blogObject._id)
        await user.save()
  }
})

describe('get reqs', () => {

    test('blogs are returned as json', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('correct number of notes returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.blogs.length)
    })
    
    test('unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body[0].id).toBeDefined()
    })
})

describe('post reqs', () => {

    test('post creates new blog post', async () => {
        const newPost = {
            title: "FullstackOpen",
            author: "monica",
            url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
            likes: 5,
        }
    
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${token}`})
            .send(newPost)
            .expect(200)
        
        const postsAtEnd = await helper.blogsInDb()
    
        expect(postsAtEnd).toHaveLength(helper.blogs.length+1)
    
        const title = postsAtEnd.map(p => p.title)
        expect(title).toContain(
            'FullstackOpen'
        )
    })
    
    test('checks if likes is missing, returns 0', async () => {
        const newPost = {
            title: "FullstackOpen",
            author: "Matti",
            url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12"
        }
    
        await api
            .post('/api/blogs')
            .set({'Authorization': `bearer ${token}`})
            .send(newPost)
            .expect(200)
    
        const blogs = await helper.blogsInDb()
        const last = blogs[blogs.length-1]
    
        expect(last.likes).toEqual(0)
    })
    
    test('if title and url are missing respond with 400 error', async () => {
        const newPost = {
            author: "Monica",
            likes: 99
        }
    
        await api 
            .post('/api/blogs')
            .set({'Authorization': `bearer ${token}`})
            .send(newPost)
            .expect(400)
    })
})

describe('post modification', () => {

    test('deleting a blog resource works', async() => {
        const id = '5a422a851b54a676234d17f7'
    
        const initialBlogs = helper.blogs
    
        await api
            .delete(`/api/blogs/${id}`)
            .set({'Authorization': `bearer ${token}`})
            .expect(204)
        
        const blogs = await helper.blogsInDb()
    
        expect(blogs.length).toEqual(initialBlogs.length-1)
    
        const authors = blogs.map(b => b.author)
        expect(authors).not.toContain('Michael Chan')
    })
    
    test('put method updates likes', async () => {
        const id = '5a422a851b54a676234d17f7'
        const initialLikes = helper.blogs.find(b => b._id === id).likes
        const updateLikes = {
            "likes": 500
        }
    
        await api
            .put(`/api/blogs/${id}`)
            .send(updateLikes)
            .expect(200)
        
        const response = await helper.blogsInDb()
        const likes = response.find(b => b.id === id).likes
        expect(likes).toBeGreaterThan(initialLikes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})