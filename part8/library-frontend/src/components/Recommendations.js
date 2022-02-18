import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../queries'

const Recommendations = (props) => {
    const [genre, setGenre] = useState('')
    const user = useQuery(GET_USER)

    useEffect(() => {
        if (user.data) {
            if (user.data.me) {
            setGenre(user.data.me.favoriteGenre)
            }
        }
    }, [user.data])

    if(!props.show) {
        return null
    } else if (user.loading) {
        return <div>loading...</div>
    } else {
        return (
            <div>
                <h3>recommendations</h3>
                <p>books in your favorite genre <b>{genre}</b></p>
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
                    {(props.books.filter(b => b.genres.includes(genre)).map(a =>
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }
}

export default Recommendations