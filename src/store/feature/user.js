import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',

  initialState: {
    id: null,
    name: 'GNAIL',
    email: null,
    address: null,
    themeMode: 'dark',
    hasLogin: false,
  },

  reducers: {
    setUser(state, action) {
      const { id, name, email, address } = action.payload
      state.id = id
      state.name = name
      state.email = email
      state.address = address
    },

    resetUser(state) {
      state.id = null
      state.name = null
      state.email = null
      state.address = null
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
