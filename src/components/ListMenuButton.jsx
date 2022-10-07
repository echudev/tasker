import * as React from 'react'
import { Divider, IconButton } from '@mui/material/'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch } from 'react-redux/es/exports'
import { changeActiveList } from '../redux/todoSlice'
import { startDeleteList } from '../redux/thunks'

export const ListMenuButton = ({ id, setEditMode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const dispatch = useDispatch()

  const handlerDeleteList = () => {
    dispatch(
      changeActiveList('default')
    )

    dispatch(startDeleteList(id))
    handleClose()
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditListName = () => {
    setEditMode(true)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        sx={{ p: 1, ml: 'auto' }}
        id="list-menu"
        aria-controls={open ? 'list-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleEditListName}>Renombrar</MenuItem>
        <MenuItem disabled>Ordenar por:</MenuItem>
        <Divider />
        <MenuItem onClick={handlerDeleteList} disabled={id === 'default'} sx={{ color: 'error.main' }}>Eliminar Lista</MenuItem>
      </Menu>
    </>
  )
}
