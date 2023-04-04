import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import userService from '../services/user'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
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

export const { setUser, clearUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      userService.setUser(user)
      dispatch(setNotification('welcome!', 5))
    } catch (e) {
      dispatch(setNotification('wrong username or password', 5, 'error'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
    userService.clearUser()
    dispatch(setNotification('logged out', 5))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const user = userService.getUser()
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
