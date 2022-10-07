import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Box, Stack, Toolbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { blue } from '@mui/material/colors'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { LogedProfile } from './LogedProfile'
import { useThemeSelector } from '../hooks/useThemeSelector'
import { LoginDialog } from './LoginDialog'

export default function CustomAppBar ({ setOpen }) {
  const { status } = useSelector(state => state.auth)
  const isLogged = useMemo(() => status === 'authenticated', [status])

  const { theme, themeHandler } = useThemeSelector()

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          disableGutters
          sx={{
            background: `linear-gradient(90deg, ${blue[900]} 40%, ${blue[800]} 90%)`,
            pr: 1,
            borderRadius: '2px'
          }}
        >
          {isLogged ? <LogedProfile /> : <LoginDialog />}

          <Stack // botonera de la appbar
            ml='auto'
            mr={1}
            direction="row"
            spacing={1}>
            <IconButton // dark mode button
              sx={{ p: 0 }}
              size="small"
              color="inherit"
              aria-label="theme"
              onClick={themeHandler}>
              {theme === 'dark' ? <ModeNightIcon /> : <WbSunnyIcon />}
            </IconButton>

            <IconButton // close button on small screens
              sx={{ display: { xs: 'flex', sm: 'none' }, p: 0 }}
              size="small"
              color="inherit"
              aria-label="close"
              onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box >
  )
}
