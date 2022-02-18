import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH, ALL_AUTHORS } from '../queries'

const BirthYear = (props) => {
    const [ name, setName ] = useState('')
    const [ born, setBorn ] = useState('')

    const [ editBirth ] = useMutation(EDIT_BIRTH, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    const submit = (event) => {
        event.preventDefault()
        const b = parseFloat(born)
        editBirth({ variables: { name, born: b } })
        setName('')
        setBorn('')
    }

    if (!props.show) {
        return null
    }
    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    <select
                    name="editAuthor"
                    id="editAuthor"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    >
                    { props.authors.map(a => 
                    <option key={a.name} value={a.name}>{a.name}</option>) }
                    </select>
                </div>
                <div>
                    <input
                    id="born"
                    type="text"
                    name="born"
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BirthYear