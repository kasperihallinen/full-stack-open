import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import loggedUserService from '../services/loggedUser'
import { setNotification } from './notificationReducer'

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = loggedUserSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      loggedUserService.setUser(user)
      dispatch(setNotification('welcome!', 5))
    } catch (e) {
      dispatch(setNotification('wrong username or password', 5, 'error'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
    loggedUserService.clearUser()
    dispatch(setNotification('logged out', 5))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const user = loggedUserService.getUser()
    dispatch(setUser(user))
  }
}

export default loggedUserSlice.reducer
