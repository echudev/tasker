import React from 'react'
import { IconButton, Menu, MenuItem, Divider, Avatar, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../redux/auth/thunks'
import { cleanTodoState } from '../redux/todoSlice'

export const LogedProfile = () => {
  const { displayName, photoURL } = useSelector(state => state.auth)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const handleLogOut = () => {
    setAnchorEl(null)
    dispatch(startLogOut())
    dispatch(cleanTodoState())
  }

  return (
        <Stack
            className='animate__animated animate__fadeIn'
            direction='row' alignItems='center' overflow='hidden'>

            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}>
                <Avatar alt={displayName} src={photoURL} />
            </IconButton>

            <Typography
                variant="body1"
                component="div"
                sx={{ userSelect: 'none', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {displayName}
            </Typography>

            {/* Menu de perfil del usuario */}
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Mis Datos</MenuItem>
                <MenuItem onClick={handleClose}>Sincronizar</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut} sx={{ color: 'error.main' }}>Salir</MenuItem>
            </Menu>

        </Stack>
  )
}
