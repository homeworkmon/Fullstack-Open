const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('likes', () => {

    const listWithOneBlog = [
        {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has two blogs, top likes is result', () => {
        const result = listHelper.favoriteBlog(helper.blogs)
        const winner = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(winner)
    })

    test('returns author whose posts are the most liked', () => {
        const result = listHelper.mostLikes(helper.blogs)
        const most = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        expect(result).toEqual(most)
    })
})

describe('posts', () => {
    
    test('when author with the most posts is top', () => {
        const result = listHelper.mostBlogs(helper.blogs)
        const top = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(result).toEqual(top)
    })
})