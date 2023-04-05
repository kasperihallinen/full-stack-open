import axios from 'axios'
import loggedUserService from './loggedUser'
const baseUrl = '/api/blogs'

const getHeaders = () => {
  const token = loggedUserService.getToken()
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, getHeaders())
  return request.data
}

const update = async (object) => {
  const request = await axios.put(
    `${baseUrl}/${object.id}`,
    object,
    getHeaders()
  )
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getHeaders())
}

const postComment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.data
}

export default { getAll, create, update, remove, postComment }
