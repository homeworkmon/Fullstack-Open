const _ = require('lodash/collection')

const totalLikes = (array) => {
    const reducer = (c, p) => c + p
    
    const likes = array.map(elem => elem.likes)
    
    return likes.reduce(reducer)
}

const favoriteBlog = (array) => {
    const likes = array.map(elem => elem.likes)
    
    const top = array.find(elem => elem.likes === Math.max(...likes))

    return {
        title: top.title,
        author: top.author,
        likes: top.likes
    }
}

const mostBlogs = (array) => {
    const count = _.countBy(array, 'author')
    const max = Object.entries(count).reduce((a, b) => count[a] > count[b] ? a : b)
    const author = max[0]
    const blogs = max[1]
    return {
        author,
        blogs
    }
}

const mostLikes = (array) => {
    const grouped = _.groupBy(array, 'author')
    const totals = Object.entries(grouped).map(i => (
        { 
            author: i[0],
            likes: totalLikes(i[1]) 
        }
    ))
    const top = totals.reduce((a, b) => a.likes > b.likes ? a : b)
    return top
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}