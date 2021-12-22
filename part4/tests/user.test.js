const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    user = {
        name: 'Matti',
        username: 'MattiL',
        password: 'sweden'
    }

    let firstUser = new User(user)
    await firstUser.save()
})

test('password must be 3 chars long', async () => {
    const newUser = {
        name: 'monica',
        username: 'monica',
        password: 'j'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password must be longer')
})

test('username must be 3 chars long', async () => {
    const newUser = {
        name: 'monica',
        username: 'm', 
        password: 'aaaa' 
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
    expect(result.body.error).toContain('username or password must be longer')
})

test('password required', async () => {
    const newUser = {
        name: 'monica',
        username: 'monica' 
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
    expect(result.body.error).toContain('password required')
})

test('username must be unique', async () => {
    const newUser = {
        name: 'Matti',
        username: 'MattiL',
        password: 'finland'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
})

afterAll(() => {
    mongoose.connection.close()
})