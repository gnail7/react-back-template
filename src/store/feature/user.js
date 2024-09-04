import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',

  initialState: {
    userId: null,
    name: 'GNAIL',
    email: null,
    phone: '',
    themeMode: 'dark',
    hasLogin: false,
  },

  reducers: {
    setUser(state, action) {
      const { userId, name, email, phone } = action.payload
      state.userId = userId
      state.name = name
      state.phone = phone
      state.email = email
      state.hasLogin = true
    },

    resetUser(state) {
      state.userId = null
      state.name = null
      state.email = null
      state.hasLogin = false
    },

    setThemeMode(state, action) {
      const themeMode = action.payload
      state.themeMode = themeMode
      localStorage.setItem('themeMode', themeMode)
    },

    toggleThemeMode(state) {
      const themeMode = state.themeMode === 'dark' ? 'light' : 'dark'
      state.themeMode = themeMode
      localStorage.setItem('themeMode', themeMode)
    },

  },

  extraReducers: () => {},
})
export const { setUser, resetUser, setThemeMode, toggleThemeMode } = userSlice.actions

export default userSlice.reducer
