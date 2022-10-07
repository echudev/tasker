import { useState } from 'react'
import { Drawer, Divider, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CustomAppBar from './CustomAppBar'
import DefaultList from './DefaultList'
import UserLists from './UserLists'
import AddList from './AddList'

export const TemporaryDrawer = () => {
  const drawerWidth = 280
  const [open, setOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  return (
        <div>
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: 'block', sm: 'none' }, p: 0, mr: 'auto', ml: 1 }}
                onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
                <Drawer
                    sx={{
                      width: drawerWidth,
                      flexShrink: 0,
                      '& .MuiDrawer-paperAnchorLeft': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                      }
                    }}
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={toggleDrawer(false)}>

                    <CustomAppBar setOpen={setOpen} />
                    <Divider />
                    <DefaultList />
                    <Divider />
                    <UserLists />

                    <AddList />
                </Drawer>
        </div>
  )
}
