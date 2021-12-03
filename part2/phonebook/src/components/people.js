const People = ({persons, query, handleDelete}) => {
    if (query !== '') {
      const p = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
      return (
        p.map(i => 
          <p key={i.id}>
          {i.name}{i.number}</p>)
      )
    } else return (
      persons.map(i =>  
        <p key={i.id}>
        {i.name} {i.number} 
        <button onClick={() => handleDelete(i.id)}>delete</button>
        </p>
        )
      )
}

export default People