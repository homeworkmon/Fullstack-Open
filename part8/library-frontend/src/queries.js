import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const NEW_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Float, $genres: [String]) {
    addBook (
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        title
        author {
            name
        }
        published
        genres
    }
}
`
export const EDIT_BIRTH = gql`
mutation editAuthor($name: String!, $born: Float!) {
    editAuthor (
        name: $name
        setBornTo: $born
    ) {
        name
        born
    }
}
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const GET_USER = gql`
  query {
      me {
        username,
        favoriteGenre
    }
}
`
export const BOOKS_GENRE = gql`
    query allBooksByGenre($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`