import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    lang: 'zh',
  },

  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const { setLang } = globalSlice.actions
export default globalSlice.reducer
