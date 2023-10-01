import { useState, useEffect } from 'react'
import axios from 'axios';
const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country?.capital?.[0]
  
  useEffect(() => {
    const setCapitalWeather = async () => {
      const apiKey= import.meta.env.VITE_SOME_KEY
      const latitude = country?.capitalInfo?.latlng?.[0]
      const longitude = country?.capitalInfo?.latlng?.[1]
      const receivedWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      if (receivedWeather?.data) {
        const weatherData = receivedWeather?.data;
        if (weatherData) {
          setWeather(() => {
            // console.log(weatherData)
            const weather = { 
              temperature: Math.round((weatherData?.current?.temp - 273.15) * 100)/100, 
              icon:`http://openweathermap.org/img/wn/${weatherData?.current?.weather?.[0]?.icon}@3x.png`, 
              wind: weatherData?.current?.wind_speed
            }
            return weather
          })
        }
      }
    }
    setCapitalWeather()
  }, [capital, country])

  return <>
    <h1> {country?.name?.common}</h1>
    <p> capital {country?.capital?.map(capitalName => <span key={capitalName}> {capitalName} </span>)} </p>
    area {country?.area}
    <h2> languages </h2>
    <ul>
    { Object.keys(country?.languages)?.map(languageKey => <li key={languageKey}> {country.languages[languageKey]} </li>)}
    </ul>
    <img style={{ border: '1px solid black '}} src={country?.flags?.png} alt='not found' />
    {weather && 
      <>
        <h2> Weather in {capital}</h2>
        <p> temperature {weather?.temperature} Celcius </p>
        <img src={weather?.icon} alt='not found' />
        <p> wind {weather?.wind} m/s </p>
      </>
    }
    
  </>
}
const  App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const setInitialCountries = async () => {
    const getInitialCountries = await axios.get(`https://restcountries.com/v3.1/all`)
    if (getInitialCountries?.data)
      setCountries(getInitialCountries.data)
  }

  const getFilteredCountries = (countries = []) => 
    countries.filter(country => country?.name?.common.toLowerCase().includes(countryFilter.toLowerCase()))
    
  
  const filteredCountries = getFilteredCountries(countries)
  useEffect(() => {
    setInitialCountries()
  }, [])
  return (
    <>
      <div>
        find countries: <input value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} />
      </div>
      {
        filteredCountries.length === 1 ?
          <>
            {filteredCountries.map((country, index) => {
              return <Country key={index}  country={country} />
            })}
          </>
          :filteredCountries.length <= 10 ?
            filteredCountries.map((country, index) => <p key={index}> {country?.name?.common} <button onClick={() => setCountryFilter(country?.name?.common)}> show </button> </p>)
            : <p> Too many matches, specify another filter </p>}
    </>

  );
}

export default App;