import { configureStore } from '@reduxjs/toolkit'
import user from './feature/user'
import global from './feature/global'
const store = configureStore({
  reducer: {
    user,
    global,
  },
})

export default store
