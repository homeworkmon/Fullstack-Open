import React from 'react'

const Genres = ({ filter, genres }) => {
    return (
        <div>
            {genres.map(genre => 
                <button key ={genre} onClick={() => filter(genre)}>{genre}</button>)}
        </div>
    )
}

export default Genres