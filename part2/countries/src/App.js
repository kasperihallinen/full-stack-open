import { useState, useEffect } from 'react'

import countryService from './services/countries'
import weatherService from './services/weather'

const Weather = ({ weather, cityName }) => {
  if (weather === null) {
    return
  }

  const temperature = weather.main.temp
  const windSpeed = weather.wind.speed
  const alt = weather.weather[0].description
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  
  return (
    <div>
      <h2>Weather in {cityName}</h2>
      temperature {temperature} Celsius
      <p><img src={iconUrl} alt={alt}></img></p>
      wind {windSpeed} m/s
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const name = country.name.common
  const capital = country.capital[0]
  const area = country.area
  const languages = Object.values(country.languages)
  const flagPngUrl = country.flags.png
  const alt = country.flags.alt

  useEffect(() => {
    weatherService
      .getWeatherByCity(capital)
      .then(result => setWeather(result))
  }, [country])

  return (
    <div>
      <h1>{name}</h1>
      <p>
        capital {capital} <br/>
        area {area}
      </p>
      <h3>languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flagPngUrl} alt={alt}></img>
      <Weather weather={weather} cityName={capital}></Weather>
    </div>
  )
}

const Countries = ({ countries, handleClick }) => {
  if (countries.length === 0) {
    return
  }
  else if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => 
          <div key={country.name.common}>
            {country.name.common} 
            <button onClick={() => handleClick(country)}>show</button>
          </div>)}
        
      </div>
    )
  }
  else {
    return (
      <Country country={countries[0]}></Country>
    )
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => setCountries(allCountries))
  }, [])

  const handleChange = (event) => {
    const value = event.target.value
    setFilter(value)
    setShownCountries(countries.filter(country => 
      country.name.common.toLowerCase().includes(value.toLowerCase())))
  }

  const showCountry = (country) => {
    setShownCountries([country])
    setFilter(country.name.common)
  }

  return (
    <div>
      find countries <input id='filter' value={filter} onChange={handleChange} />
      <Countries countries={shownCountries} handleClick={showCountry}></Countries>
    </div>
  )
}

export default App
