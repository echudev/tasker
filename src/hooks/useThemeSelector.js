import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../redux/themeSlice'
import { createTheme } from '@mui/material/styles'

export const useThemeSelector = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: 'black'
      }
    }
  })

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: 'rgba(220,220,220)'
      }
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 4
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: 'rgb(77,166,255,0.5)',
              '&:hover': {
                backgroundColor: 'rgb(77,166,255,0.8)'
              }
            },
            '&:hover': {
              backgroundColor: 'rgba(220,220,220)'
            }
          }
        }
      }
    }
  })

  const theme = useSelector(state => state.theme.theme)
  const dispatch = useDispatch()
  const themeHandler = () => {
    dispatch(changeTheme(
      { theme: theme === 'dark' ? 'light' : 'dark' }
    ))
  }

  return { theme, themeHandler, darkTheme, lightTheme }
}
