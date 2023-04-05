import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return null
    },
  },
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (message, seconds = 5, type = 'success') => {
  return async (dispatch) => {
    dispatch(set({ message, type }))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
