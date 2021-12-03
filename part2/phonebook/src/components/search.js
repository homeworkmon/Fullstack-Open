const Search = ({ query, setQuery }) => {

    const handleSearch = (event) => {
      event.preventDefault()
      setQuery(event.target.value)
    }
  
    return (
      <div>
        search: <input
        value={query}
        onChange={handleSearch}
        />
      </div>
    )
}

export default Search