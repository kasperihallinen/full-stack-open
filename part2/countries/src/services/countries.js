import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getAll = () => {
  return axios
    .get(`${baseUrl}/all`)
    .then(response => response.data)
}

export default { getAll }