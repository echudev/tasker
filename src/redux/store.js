import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import authSlice from './auth/authSlice'
import themeSlice from './themeSlice'

export default configureStore({
  reducer: {
    todo: todoReducer,
    auth: authSlice,
    theme: themeSlice
  }
})
