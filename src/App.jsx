import { useState, useEffect } from 'react'
import { useCheckAuth } from './hooks/useCheckAuth'
import PermanentDrawer from './components/PermanentDrawer'
import TodoList from './components/TodoList'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box, Backdrop, CircularProgress } from '@mui/material'
import { useThemeSelector } from './hooks/useThemeSelector'
import { useGetFirestoreCollections } from './hooks/useGetFirestoreCollections'

export const App = () => {
  const { theme, darkTheme, lightTheme } = useThemeSelector()
  const { status } = useCheckAuth()
  const { loadingFirestoreDB } = useGetFirestoreCollections()

  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (status === 'checking' || loadingFirestoreDB) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [status, loadingFirestoreDB])

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />

      <Backdrop
        sx={{ color: '#fff', zIndex: 9999, backdropFilter: 'blur(5px)' }}
        open={open}>
        <CircularProgress color="secondary" />
      </Backdrop>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: '100vh'
      }}>
        <PermanentDrawer />
        <TodoList />
      </Box>

    </ThemeProvider >
  )
}
