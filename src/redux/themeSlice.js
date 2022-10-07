import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'dark' },
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload.theme
    }
  }
})

// action creators are generated for each reducer
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
