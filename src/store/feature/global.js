import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    lang: 'zh',
    menuList: [],
    breadCrumbList: [],
  },

  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload
    },
    setMenuList: (state, action) => {
      state.menuList = action.payload
    },
    setBreadCrumbList: (state, action) => {
      state.breadCrumbList = action.payload
    },
  },
})

export const { setLang, setMenuList, setBreadCrumbList } = globalSlice.actions
export default globalSlice.reducer
