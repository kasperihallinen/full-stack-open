import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => response.data)
}

const update = (id, changedPerson) => {
  const url = `${baseUrl}/${id}`
  return axios
    .put(url, changedPerson)
    .then(response => response.data)
}

const deleteOne = id => {
  const url = `${baseUrl}/${id}`
  return axios
    .delete(url)
    .then(response => response.data)
}

export default { getAll, create, deleteOne, update }