import { configureStore } from '@reduxjs/toolkit'
import user from './feature/user'
const store = configureStore({
  reducer: {
    user
  }
})

export default store