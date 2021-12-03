import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Search = ({ query, handleSearch }) => {
  return (
    <div>
      search: <input
      value={query}
      onChange={handleSearch}
      />
    </div>
  )
}

const Languages = ({langs}) => {
  return (langs.map(lang => <li key={lang}> {lang[1]}</li>))
}

const LanguageSection = ({languages}) => {
  const langs = Object.entries(languages)
  return (
    <div>
      <h2>Languages</h2>
      <ul>
        <Languages langs={langs}/>
      </ul>
    </div>
  )
}

const InfoSection = ({name, capital, population}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
    </div>
  )
}

const WeatherSection = ({capital, temperature, icon, wind}) => {
  console.log(wind)
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {temperature} </p>
      <img src={`https://openweathermap.org/img/wn/${icon.icon}.png`} alt="weather icon"/>
      <p><b>wind:</b> {Object.entries(wind).map((k ,v) => <p>{k}: {v}</p>)} </p>
    </div>
  )
}

const Profile = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country.capital, api_key])

  if (weather.length === 0) return null

  else {
    return (
      <div>
        <InfoSection name={country.name.common} capital={country.capital} population={country.population}/>
        <LanguageSection languages={country.languages}/>
        <img src={country.flags.png} alt="Flag"/>
        <WeatherSection capital={country.capital} temperature={weather.main.temp} icon={weather.weather[0]} wind={weather.wind}/> 
      </div>
    )
  }
}

const ListItem = ({filter, setQuery}) => {
  return (
    filter.map(item => 
      <div key={item.name.common}>
        {item.name.common}
        <ViewButton item={item} setQuery={setQuery}/>
      </div>)
  )
}

const ViewButton = ({item, setQuery}) => {
  return (
    <button onClick={() => setQuery(item.name.common)}>View</button>
  )
}

const List = ({countries, query, setQuery}) => {
  const filter = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  if (filter.length > 1 && filter.length <= 10) {
    return (
      <div>
        <ListItem filter={filter} setQuery={setQuery}/>
      </div>
    )
  } else if (filter.length === 1) {
    return <Profile country={filter[0]} />
  } 
  return (
    <p>Too many matches, please specify</p>
  )
}


function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div >
      <Search query={query} handleSearch={handleSearch}/>
      <List countries={countries} query={query} setQuery={setQuery}/>
    </div>
  )
}

export default App;
