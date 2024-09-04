import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    lang: 'zh',
    menuList: [],
    breadCrumbList: [],
    btnPermissions: [],
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
    setBtnPermissions: (state, action) => {
      state.btnPermissions = action.payload
    },
  },
})

export const { setLang, setMenuList, setBreadCrumbList, setBtnPermissions } = globalSlice.actions
export default globalSlice.reducer
