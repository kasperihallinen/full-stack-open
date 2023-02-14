import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = process.env.REACT_APP_API_KEY

const getWeatherByCity = (cityName) => {
  return axios
    .get(`${baseUrl}q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
}

export default { getWeatherByCity }