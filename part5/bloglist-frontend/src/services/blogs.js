import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, changedObject) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, changedObject)
  return response.data
}

const deleteOne = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(url, config)
}

export default { getAll, create, setToken, update, deleteOne }